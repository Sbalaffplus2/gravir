const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const {
    customerName,
    customerEmail,
    customerAddress,
    customerPhone,
    orderNote,
    paymentMethod,
    summaryHTML,
    uploadedImage,
  } = JSON.parse(event.body);

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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    replyTo: customerEmail,
    subject: `Új megrendelés: ${customerName}`,
    html: `
      <h2>Új megrendelés érkezett</h2>
      <p><strong>Név:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Cím:</strong> ${customerAddress}</p>
      <p><strong>Telefon:</strong> ${customerPhone || 'Nincs megadva'}</p>
      <p><strong>Megjegyzés:</strong> ${orderNote || 'Nincs megadva'}</p>
      <p><strong>Fizetési mód:</strong> ${paymentMethod}</p>
      <hr>
      <h3>Rendelés részletei:</h3>
      ${summaryHTML}
    `,
    attachments: [],
  };

  if (uploadedImage) {
    mailOptions.attachments.push({
      filename: 'feltoltott-kep.png',
      content: uploadedImage.split('base64,')[1],
      encoding: 'base64',
    });
  }
  
  // Also send a confirmation to the customer
  const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: 'GravírAjándék - Megrendelés visszaigazolás',
      html: `
        <h2>Kedves ${customerName}!</h2>
        <p>Köszönjük a megrendelésed! Hamarosan feldolgozzuk és felvesszük veled a kapcsolatot.</p>
        <p>A megrendelésed részletei:</p>
        ${summaryHTML}
        <hr>
        <p>Üdvözlettel,<br>A GravírAjándék csapata</p>
      `
  };

  try {
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
      body: JSON.stringify({ message: 'Failed to send order email.' }),
    };
  }
};
