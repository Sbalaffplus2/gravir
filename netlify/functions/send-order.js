const nodemailer = require('nodemailer');
const https = require('https');

// Airtable helper – saves order record, fails silently if not configured
async function saveToAirtable(fields) {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) return;
  const data = JSON.stringify({ records: [{ fields }] });
  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.airtable.com',
      path: `/v0/${process.env.AIRTABLE_BASE_ID}/Orders`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }, (res) => {
      res.resume();
      resolve();
    });
    req.on('error', (e) => { console.error('Airtable error:', e.message); resolve(); });
    req.write(data);
    req.end();
  });
}

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Check environment variables are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Email service not configured. Set EMAIL_USER and EMAIL_PASS in Netlify.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid request body.' }) };
  }

  const {
    customerName,
    customerEmail,
    customerAddress,
    customerPhone,
    orderNote,
    paymentMethod,
    orderNumber,
    product,
    content,
    total,
    uploadedImage,
  } = body;

  // --- Server-side validation ---
  if (!customerName || !customerEmail || !customerAddress) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing required fields.' }),
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const orderDetailsHtml = `
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;">
      <tr><td style="padding:6px 12px;background:#f5f3ef;font-weight:bold;">Rendelés szám</td><td style="padding:6px 12px;">${orderNumber}</td></tr>
      <tr><td style="padding:6px 12px;background:#f5f3ef;font-weight:bold;">Termék</td><td style="padding:6px 12px;">${product}</td></tr>
      <tr><td style="padding:6px 12px;background:#f5f3ef;font-weight:bold;">Tartalom</td><td style="padding:6px 12px;">${content}</td></tr>
      <tr><td style="padding:6px 12px;background:#f5f3ef;font-weight:bold;">Összeg</td><td style="padding:6px 12px;font-weight:bold;">${total}</td></tr>
      <tr><td style="padding:6px 12px;background:#f5f3ef;font-weight:bold;">Fizetési mód</td><td style="padding:6px 12px;">${paymentMethod}</td></tr>
    </table>
  `;

  const bankTransferHtml = paymentMethod === 'Banki átutalás' ? `
    <div style="background:#fffbe6;border:1px solid #c4820e;border-radius:8px;padding:16px;margin-top:16px;">
      <h3 style="color:#c4820e;margin:0 0 8px;">Banki átutalás adatai</h3>
      <p style="margin:4px 0;"><strong>Kedvezményezett:</strong> GravírAjándék</p>
      <p style="margin:4px 0;"><strong>IBAN:</strong> ${process.env.BANK_IBAN || 'HU00 0000 0000 0000 0000 0000 0000'}</p>
      <p style="margin:4px 0;"><strong>Közlemény:</strong> ${orderNumber}</p>
      <p style="margin:4px 0;"><strong>Összeg:</strong> ${total}</p>
      <p style="margin:8px 0 0;font-size:0.9em;color:#666;">Kérjük, az utalás megjegyzés rovatába írja be a rendelésszámot. A rendelést az utalás beérkezése után dolgozzuk fel.</p>
    </div>` : '';

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: customerEmail,
    subject: `Új megrendelés [${orderNumber}]: ${customerName}`,
    html: `
      <h2 style="color:#c4820e;">Új megrendelés érkezett</h2>
      <p><strong>Név:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Cím:</strong> ${customerAddress}</p>
      <p><strong>Telefon:</strong> ${customerPhone || 'Nincs megadva'}</p>
      <p><strong>Megjegyzés:</strong> ${orderNote || 'Nincs megadva'}</p>
      <hr>
      <h3>Rendelés részletei:</h3>
      ${orderDetailsHtml}
      ${paymentMethod === 'Banki átutalás' ? '<p style="color:#c4820e;font-weight:bold;">⏳ Fizetés státusza: UTALÁSRA VÁR</p>' : ''}
    `,
    attachments: [],
  };

  if (uploadedImage) {
    mailOptions.attachments.push({
      filename: 'gravir-kep.png',
      content: uploadedImage.split('base64,')[1],
      encoding: 'base64',
    });
  }

  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: `GravírAjándék – Megrendelés visszaigazolás [${orderNumber}]`,
    html: `
      <h2 style="color:#c4820e;">Köszönjük a megrendelést!</h2>
      <p>Kedves ${customerName}!</p>
      <p>Megkaptuk a rendelését. ${paymentMethod === 'Banki átutalás' ? 'Az utalás beérkezése után dolgozzuk fel.' : 'Hamarosan felvesszük Önnel a kapcsolatot.'}</p>
      <hr>
      <h3>Rendelés részletei:</h3>
      ${orderDetailsHtml}
      ${bankTransferHtml}
      <hr>
      <p style="color:#8a8075;font-size:0.9em;">Üdvözlettel,<br><strong>A GravírAjándék csapata</strong></p>
    `,
  };

  try {
    // Save to Airtable (non-blocking, optional)
    await saveToAirtable({
      'OrderNumber': orderNumber,
      'Status': paymentMethod === 'Banki átutalás' ? 'Fizetésre vár' : 'Feldolgozás alatt',
      'CustomerName': customerName,
      'CustomerEmail': customerEmail,
      'CustomerPhone': customerPhone || '',
      'CustomerAddress': customerAddress,
      'Product': product,
      'Content': content,
      'Total': total,
      'PaymentMethod': paymentMethod,
      'Note': orderNote || '',
      'CreatedAt': new Date().toISOString(),
    });

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(customerMailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order sent successfully!' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send order email: ' + error.message }),
    };
  }
};
