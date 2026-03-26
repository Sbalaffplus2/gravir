/* ===================================================
   APP.JS – GravírAjándék teljes logika
   Tartalmazza:
   - Többnyelvűség (HU/EN)
   - Termékkiválasztás
   - Tab váltás (szöveg / kép / sablon)
   - Canvas előnézet (toll + kulcstartó)
   - Képfeltöltés
   - Sablonok
   - Megrendelés összesítő
   - Fizetési módok
   - EmailJS küldés
   =================================================== */

// ─── I18N ────────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  hu: {
    site_title: "GravírAjándék – Egyedi gravírozott termékek",
    nav_products: "Termékek",
    nav_how: "Hogyan működik",
    nav_config: "Tervezés",
    nav_contact: "Kapcsolat",
    hero_tag: "Kézzel gravírozott, örök emlék",
    hero_title: "Egyedi ajándék,<br/>ami maradandó",
    hero_sub: "Töltsd fel a képedet vagy add meg a szövegedet – mi kigravírozzuk tollra vagy kulcstartóra, és házhoz küldjük.",
    hero_cta: "Tervezés most",
    products_title: "Termékeink",
    products_sub: "Prémium minőség, személyre szabva",
    pen_name: "Gravírozott Toll",
    pen_desc: "Elegáns fém toll egyedi gravírozással. Tökéletes ajándék bármilyen alkalomra.",
    keychain_name: "Gravírozott Kulcstartó",
    keychain_desc: "Arany- vagy ezüstszínű fém kulcstartó, személyes üzenettel vagy képpel.",
    price_img: "+500 Ft kép esetén",
    btn_customize: "Testreszabás",
    how_title: "Hogyan működik?",
    step1_title: "Válassz terméket",
    step1_desc: "Toll vagy kulcstartó – mindkettő prémium fém alapanyagból.",
    step2_title: "Add meg a tartalmat",
    step2_desc: "Írj szöveget, vagy tölts fel képet/logót. Akár sablont is választhatsz.",
    step3_title: "Előnézet & megrendelés",
    step3_desc: "Valós idejű előnézeten ellenőrizd az eredményt, majd fizess biztonságosan.",
    step4_title: "Kézbesítés",
    step4_desc: "3–5 munkanapon belül elkészítjük és postázzuk a gravírozott ajándékot.",
    templates_title: "Sablonok",
    templates_sub: "Válassz egyet, vagy tervezd meg a sajátodat",
    config_title: "Tervezd meg az ajándékod",
    step_ind_product: "Termék",
    step_ind_design: "Tartalom",
    step_ind_order: "Megrendelés",
    config_step1_h: "Melyik terméket szeretnéd?",
    config_step2_h: "Mit gravírozzunk rá?",
    config_step3_h: "Megrendelés adatai",
    tab_text: "Szöveg",
    tab_image: "Kép feltöltése (+500 Ft)",
    tab_tpl: "Sablon",
    label_line1: "1. sor (pl. név):",
    label_line2: "2. sor (pl. dátum, üzenet):",
    label_font: "Betűtípus:",
    font_serif: "Klasszikus (talpas)",
    font_script: "Kézírásos",
    font_modern: "Modern (talpatlan)",
    upload_hint: "Kattints vagy húzd ide a képet",
    upload_note: "JPG, PNG, SVG – max. 5 MB",
    btn_clear_img: "✕ Kép törlése",
    preview_title: "Előnézet",
    preview_note: "* Az előnézet tájékoztató jellegű. A valódi gravírozás eltérhet.",
    btn_back: "← Vissza",
    btn_next: "Tovább →",
    label_name: "Teljes név:",
    label_email: "E-mail cím:",
    label_phone: "Telefonszám:",
    label_address: "Szállítási cím:",
    label_note: "Megjegyzés a megrendeléshez:",
    payment_title: "Fizetési mód",
    pay_transfer: "Banki átutalás",
    pay_transfer_note: "Megrendelés után e-mailben küldöm a bankszámlaszámot",
    pay_simplepay_note: "Bankkártyás fizetés (OTP SimplePay)",
    pay_barion_note: "Bankkártya / Apple Pay / Google Pay",
    accept_terms: "Elfogadom az",
    terms_link: "általános szerződési feltételeket",
    btn_order: "Megrendelés leadása",
    success_title: "Megrendelés elküldve!",
    success_msg: "Köszönjük! Visszaigazolást kapsz e-mailben. Hamarosan felvesszük veled a kapcsolatot.",
    btn_close: "Bezárás",
    terms_title: "Általános Szerződési Feltételek",
    terms_body: "",
    contact_title: "Kapcsolat",
    contact_email_label: "E-mail",
    contact_response: "Válaszidő",
    contact_response_val: "1 munkanapon belül",
    contact_delivery: "Szállítás",
    contact_delivery_val: "3–5 munkanap (Magyarország)",
    footer_rights: "Minden jog fenntartva.",
    footer_contact: "Kapcsolat",
    order_product: "Termék",
    order_content: "Tartalom",
    order_price: "Alapár",
    order_surcharge: "Képfelár",
    order_total: "Összesen",
    content_text: "Szöveg",
    content_image: "Kép",
    content_template: "Sablon",
    err_no_product: "Kérjük, válassz terméket!",
    err_no_content: "Kérjük, add meg a gravírozandó szöveget, tölts fel képet, vagy válassz sablont!",
    err_fill_form: "Kérjük, töltsd ki az összes kötelező mezőt!",
    err_accept_terms: "Kérjük, fogadd el az ÁSZF-et!",
    err_sending: "Hiba az üzenet küldésekor. Kérjük, próbáld újra!",
    pay_transfer_info: "<strong>Bankszámla:</strong><br/>IBAN: HU12 3456 7890 1234 5678 0000 0000<br/>Kedvezményezett: GRAVÍR AJÁNDÉK<br/>Megjegyzés: [rendelésszám – e-mailben megküldöm]<br/>Összeg: <strong id='transferAmount'></strong>",
    pay_simplepay_info: "A megrendelés leadása után átirányítunk az OTP SimplePay biztonságos fizetési felületére.<br/>A fizetés befejezése után visszaigazolást küldünk.",
    pay_barion_info: "A megrendelés leadása után átirányítunk a Barion fizetési oldalára.<br/>Elfogadott fizetési módok: bankkártya, Apple Pay, Google Pay.",
  },
  en: {
    site_title: "GravírAjándék – Custom Engraved Gifts",
    nav_products: "Products",
    nav_how: "How it works",
    nav_config: "Design",
    nav_contact: "Contact",
    hero_tag: "Hand-engraved, lasting memories",
    hero_title: "A unique gift<br/>that lasts forever",
    hero_sub: "Upload your image or enter your text — we'll engrave it on a pen or keychain and deliver it to your door.",
    hero_cta: "Design now",
    products_title: "Our Products",
    products_sub: "Premium quality, personalised",
    pen_name: "Engraved Pen",
    pen_desc: "Elegant metal pen with custom engraving. The perfect gift for any occasion.",
    keychain_name: "Engraved Keychain",
    keychain_desc: "Gold or silver metal keychain with a personal message or image.",
    price_img: "+500 HUF for image",
    btn_customize: "Customize",
    how_title: "How it works",
    step1_title: "Choose a product",
    step1_desc: "Pen or keychain – both made from premium metal.",
    step2_title: "Add your content",
    step2_desc: "Type your text or upload an image/logo. You can also pick a template.",
    step3_title: "Preview & order",
    step3_desc: "Check the real-time preview, then pay securely.",
    step4_title: "Delivery",
    step4_desc: "We engrave and ship your gift within 3–5 business days.",
    templates_title: "Templates",
    templates_sub: "Pick one or design your own",
    config_title: "Design your gift",
    step_ind_product: "Product",
    step_ind_design: "Content",
    step_ind_order: "Order",
    config_step1_h: "Which product would you like?",
    config_step2_h: "What should we engrave?",
    config_step3_h: "Order details",
    tab_text: "Text",
    tab_image: "Upload image (+500 HUF)",
    tab_tpl: "Template",
    label_line1: "Line 1 (e.g. name):",
    label_line2: "Line 2 (e.g. date, message):",
    label_font: "Font style:",
    font_serif: "Classic (serif)",
    font_script: "Handwriting",
    font_modern: "Modern (sans-serif)",
    upload_hint: "Click or drag an image here",
    upload_note: "JPG, PNG, SVG – max 5 MB",
    btn_clear_img: "✕ Remove image",
    preview_title: "Preview",
    preview_note: "* Preview is illustrative. Actual engraving may differ slightly.",
    btn_back: "← Back",
    btn_next: "Next →",
    label_name: "Full name:",
    label_email: "Email address:",
    label_phone: "Phone number:",
    label_address: "Delivery address:",
    label_note: "Order notes:",
    payment_title: "Payment method",
    pay_transfer: "Bank transfer",
    pay_transfer_note: "I'll send bank details by email after the order",
    pay_simplepay_note: "Card payment via OTP SimplePay",
    pay_barion_note: "Card / Apple Pay / Google Pay",
    accept_terms: "I accept the",
    terms_link: "general terms and conditions",
    btn_order: "Place Order",
    success_title: "Order placed!",
    success_msg: "Thank you! You'll receive a confirmation email shortly.",
    btn_close: "Close",
    terms_title: "General Terms and Conditions",
    terms_body: "",
    contact_title: "Contact",
    contact_email_label: "Email",
    contact_response: "Response time",
    contact_response_val: "Within 1 business day",
    contact_delivery: "Shipping",
    contact_delivery_val: "3–5 business days (Hungary)",
    footer_rights: "All rights reserved.",
    footer_contact: "Contact",
    order_product: "Product",
    order_content: "Content",
    order_price: "Base price",
    order_surcharge: "Image surcharge",
    order_total: "Total",
    content_text: "Text",
    content_image: "Image",
    content_template: "Template",
    err_no_product: "Please select a product!",
    err_no_content: "Please enter text, upload an image, or select a template!",
    err_fill_form: "Please fill in all required fields!",
    err_accept_terms: "Please accept the terms and conditions!",
    err_sending: "Error sending message. Please try again!",
    pay_transfer_info: "<strong>Bank account:</strong><br/>IBAN: HU12 3456 7890 1234 5678 0000 0000<br/>Beneficiary: GRAVÍR AJÁNDÉK<br/>Reference: [order number – sent by email]<br/>Amount: <strong id='transferAmount'></strong>",
    pay_simplepay_info: "After placing your order, you'll be redirected to OTP SimplePay's secure payment page.",
    pay_barion_info: "After placing your order, you'll be redirected to Barion.<br/>Accepted: card, Apple Pay, Google Pay.",
  }
};

let currentLang = 'hu';

function setLang(lang) {
  currentLang = lang;
  document.getElementById('lang-hu').classList.toggle('active', lang === 'hu');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  applyTranslations();
  updatePreview();
  renderTemplates();
  buildOrderSummary();
  showPaymentInfo();
}

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['hu'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (val === '') return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.getAttribute('placeholder')) el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });
  document.title = t('site_title');
}

// ─── STATE ───────────────────────────────────────────────────────────────────
const STATE = {
  product: null,       // 'pen' | 'keychain'
  activeTab: 'text',   // 'text' | 'image' | 'template'
  line1: '',
  line2: '',
  font: 'serif',
  uploadedImage: null, // base64 data URL
  selectedTemplate: null,
  currentStep: 1,
};

const PRICES = { pen: 3990, keychain: 2490, imageSurcharge: 500 };

// ─── TEMPLATES ───────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: 'heart', nameHu: 'Szív & Monogram', nameEn: 'Heart & Monogram',
    line1: 'A & B', line2: '♥ Örökre ♥',
    svg: `<svg viewBox="0 0 80 50" width="80" height="50">
      <text x="40" y="20" text-anchor="middle" font-size="11" font-family="serif" fill="#b8860b" font-style="italic">A &amp; B</text>
      <text x="40" y="38" text-anchor="middle" font-size="14" fill="#c9382e">♥</text>
    </svg>`
  },
  {
    id: 'date', nameHu: 'Évforduló', nameEn: 'Anniversary',
    line1: 'Örökké', line2: '2024. dec. 24.',
    svg: `<svg viewBox="0 0 80 50" width="80" height="50">
      <text x="40" y="20" text-anchor="middle" font-size="10" font-family="serif" fill="#b8860b" font-style="italic">Örökké</text>
      <text x="40" y="36" text-anchor="middle" font-size="8.5" font-family="sans-serif" fill="#7a6540">2024. dec. 24.</text>
    </svg>`
  },
  {
    id: 'star', nameHu: 'Csillag & Üzenet', nameEn: 'Star & Message',
    line1: '★ Köszönöm ★', line2: '',
    svg: `<svg viewBox="0 0 80 50" width="80" height="50">
      <text x="40" y="29" text-anchor="middle" font-size="10" font-family="serif" fill="#b8860b">★ Köszönöm ★</text>
    </svg>`
  },
  {
    id: 'name', nameHu: 'Egyszerű Név', nameEn: 'Simple Name',
    line1: 'Anna', line2: '',
    svg: `<svg viewBox="0 0 80 50" width="80" height="50">
      <text x="40" y="30" text-anchor="middle" font-size="18" font-family="serif" fill="#c9a96e" font-style="italic">Anna</text>
    </svg>`
  },
  {
    id: 'flower', nameHu: 'Virág & Dátum', nameEn: 'Flower & Date',
    line1: '✿ Születésnapra ✿', line2: '2024',
    svg: `<svg viewBox="0 0 80 50" width="80" height="50">
      <text x="40" y="20" text-anchor="middle" font-size="8" font-family="serif" fill="#b8860b">✿ Születésnapra ✿</text>
      <text x="40" y="36" text-anchor="middle" font-size="12" font-family="serif" fill="#c9a96e">2024</text>
    </svg>`
  },
  {
    id: 'initial', nameHu: 'Monogram', nameEn: 'Monogram',
    line1: 'JK', line2: '',
    svg: `<svg viewBox="0 0 80 50" width="80" height="50">
      <text x="40" y="34" text-anchor="middle" font-size="26" font-family="serif" fill="#c9a96e" font-style="italic" font-weight="bold">JK</text>
    </svg>`
  },
];

function renderTemplates() {
  const grid = document.getElementById('templatesGrid');
  const miniGrid = document.getElementById('templatesMiniGrid');
  if (!grid || !miniGrid) return;

  [grid, miniGrid].forEach((g, isMini) => {
    g.innerHTML = TEMPLATES.map(tpl => {
      const name = currentLang === 'en' ? tpl.nameEn : tpl.nameHu;
      const selected = STATE.selectedTemplate === tpl.id ? 'selected' : '';
      return `<div class="template-card ${selected}" onclick="selectTemplate('${tpl.id}')">
        ${tpl.svg}
        <span>${name}</span>
      </div>`;
    }).join('');
  });
}

function selectTemplate(id) {
  STATE.selectedTemplate = id;
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  STATE.line1 = tpl.line1;
  STATE.line2 = tpl.line2;
  if (document.getElementById('text-line1')) document.getElementById('text-line1').value = tpl.line1;
  if (document.getElementById('text-line2')) document.getElementById('text-line2').value = tpl.line2;
  renderTemplates();
  updatePreview();
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function selectProduct(type) {
  STATE.product = type;
  document.getElementById('choice-pen').classList.toggle('selected', type === 'pen');
  document.getElementById('choice-keychain').classList.toggle('selected', type === 'keychain');
}

function scrollToConfig() {
  document.getElementById('configurator').scrollIntoView({ behavior: 'smooth' });
}

function goToStep(n) {
  if (n === 2 && !STATE.product) { alert(t('err_no_product')); return; }
  if (n === 3) {
    const hasContent = (
      (STATE.activeTab === 'text' && (STATE.line1.trim() || STATE.line2.trim())) ||
      (STATE.activeTab === 'image' && STATE.uploadedImage) ||
      (STATE.activeTab === 'template' && STATE.selectedTemplate)
    );
    if (!hasContent) { alert(t('err_no_content')); return; }
    buildOrderSummary();
    showPaymentInfo();
  }

  STATE.currentStep = n;
  [1,2,3].forEach(i => {
    document.getElementById(`config-step-${i}`).classList.toggle('hidden', i !== n);
    const ind = document.getElementById(`step-ind-${i}`);
    ind.classList.remove('active', 'done');
    if (i === n) ind.classList.add('active');
    else if (i < n) ind.classList.add('done');
  });
  document.getElementById('configurator').scrollIntoView({ behavior: 'smooth' });
}

function switchTab(tab) {
  STATE.activeTab = tab;
  ['text','image','template'].forEach(t => {
    document.getElementById(`tab-${t}-content`).classList.toggle('hidden', t !== tab);
    document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
  });
  updatePreview();
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ─── IMAGE UPLOAD ─────────────────────────────────────────────────────────────
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { alert('A fájl mérete max. 5 MB lehet!'); return; }

  const reader = new FileReader();
  reader.onload = e => {
    STATE.uploadedImage = e.target.result;
    document.getElementById('uploadedPreviewImg').src = STATE.uploadedImage;
    document.getElementById('uploadedPreviewWrap').classList.remove('hidden');
    updatePreview();
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  STATE.uploadedImage = null;
  document.getElementById('imageUpload').value = '';
  document.getElementById('uploadedPreviewWrap').classList.add('hidden');
  updatePreview();
}

// Drag and drop support
document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('uploadArea');
  if (area) {
    area.addEventListener('dragover', e => { e.preventDefault(); area.style.borderColor = 'var(--gold)'; });
    area.addEventListener('dragleave', () => { area.style.borderColor = ''; });
    area.addEventListener('drop', e => {
      e.preventDefault();
      area.style.borderColor = '';
      if (e.dataTransfer.files[0]) {
        const dt = new DataTransfer();
        dt.items.add(e.dataTransfer.files[0]);
        document.getElementById('imageUpload').files = dt.files;
        handleImageUpload({ target: { files: dt.files } });
      }
    });
  }
  applyTranslations();
  renderTemplates();
  showPaymentInfo();
  updatePreview();
});

// ─── CANVAS PREVIEW ──────────────────────────────────────────────────────────
function getFontCSS(fontKey, size) {
  switch (fontKey) {
    case 'script':  return `${size}px 'Palatino Linotype', 'Book Antiqua', Palatino, serif`;
    case 'modern':  return `${size}px 'Inter', Arial, sans-serif`;
    default:        return `italic ${size}px 'Georgia', 'Times New Roman', serif`;
  }
}

function updatePreview() {
  STATE.line1 = (document.getElementById('text-line1') || {}).value || STATE.line1;
  STATE.line2 = (document.getElementById('text-line2') || {}).value || STATE.line2;
  STATE.font  = (document.getElementById('font-select') || {}).value || STATE.font;

  const cnv = document.getElementById('previewCnv');
  if (!cnv) return;
  const ctx = cnv.getContext('2d');
  const W = 500, H = 200;
  cnv.width = W; cnv.height = H;

  // Background
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0, '#fdf8f0');
  bg.addColorStop(1, '#f5e8c8');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  if (STATE.product === 'pen' || !STATE.product) {
    drawPenPreview(ctx, W, H);
  } else {
    drawKeychainPreview(ctx, W, H);
  }
}

function drawPenPreview(ctx, W, H) {
  const pX = 30, pY = H/2 - 20, pW = 360, pH = 40, r = 20;

  // Pen body gradient
  const grad = ctx.createLinearGradient(pX, pY, pX, pY+pH);
  grad.addColorStop(0, '#e8c97e');
  grad.addColorStop(0.3, '#c9a96e');
  grad.addColorStop(0.7, '#b8860b');
  grad.addColorStop(1, '#c9a96e');

  ctx.beginPath();
  ctx.moveTo(pX + r, pY);
  ctx.lineTo(pX + pW - r, pY);
  ctx.quadraticCurveTo(pX + pW, pY, pX + pW, pY + r);
  ctx.lineTo(pX + pW, pY + pH - r);
  ctx.quadraticCurveTo(pX + pW, pY + pH, pX + pW - r, pY + pH);
  ctx.lineTo(pX + r, pY + pH);
  ctx.quadraticCurveTo(pX, pY + pH, pX, pY + pH - r);
  ctx.lineTo(pX, pY + r);
  ctx.quadraticCurveTo(pX, pY, pX + r, pY);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Pen clip
  ctx.fillStyle = '#7a5010';
  ctx.fillRect(pX + pW - 10, pY - 8, 8, pH + 8);
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(pX + pW - 6, pY - 8, 5, 0, Math.PI * 2);
  ctx.fill();

  // Pen tip
  ctx.beginPath();
  ctx.moveTo(pX, pY + r);
  ctx.lineTo(pX - 18, pY + pH/2);
  ctx.lineTo(pX, pY + pH - r);
  ctx.fillStyle = '#b8860b';
  ctx.fill();

  // Engrave area
  ctx.save();
  ctx.beginPath();
  ctx.rect(pX + 30, pY + 4, pW - 80, pH - 8);
  ctx.clip();
  drawEngravingContent(ctx, pX + 30, pY + pH/2, pW - 80, pH - 10);
  ctx.restore();

  // Shine
  const shine = ctx.createLinearGradient(pX, pY, pX, pY + pH * 0.4);
  shine.addColorStop(0, 'rgba(255,255,255,0.35)');
  shine.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.moveTo(pX + r, pY);
  ctx.lineTo(pX + pW - r, pY);
  ctx.quadraticCurveTo(pX + pW, pY, pX + pW, pY + r);
  ctx.lineTo(pX + pW, pY + pH * 0.4);
  ctx.lineTo(pX, pY + pH * 0.4);
  ctx.lineTo(pX, pY + r);
  ctx.quadraticCurveTo(pX, pY, pX + r, pY);
  ctx.fillStyle = shine;
  ctx.fill();
}

function drawKeychainPreview(ctx, W, H) {
  const kX = W/2 - 55, kY = 20, kW = 110, kH = 130, r = 14;

  // Ring
  ctx.strokeStyle = '#c9a96e';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(W/2, kY + 5, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(W/2, kY, 10, 0, Math.PI * 2);
  ctx.stroke();

  // Body gradient
  const grad = ctx.createLinearGradient(kX, kY + 28, kX + kW, kY + 28 + kH);
  grad.addColorStop(0, '#e8c97e');
  grad.addColorStop(0.5, '#d4af37');
  grad.addColorStop(1, '#b8860b');

  ctx.beginPath();
  ctx.moveTo(kX + r, kY + 28);
  ctx.lineTo(kX + kW - r, kY + 28);
  ctx.quadraticCurveTo(kX + kW, kY + 28, kX + kW, kY + 28 + r);
  ctx.lineTo(kX + kW, kY + 28 + kH - r);
  ctx.quadraticCurveTo(kX + kW, kY + 28 + kH, kX + kW - r, kY + 28 + kH);
  ctx.lineTo(kX + r, kY + 28 + kH);
  ctx.quadraticCurveTo(kX, kY + 28 + kH, kX, kY + 28 + kH - r);
  ctx.lineTo(kX, kY + 28 + r);
  ctx.quadraticCurveTo(kX, kY + 28, kX + r, kY + 28);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Engraving area
  ctx.save();
  ctx.beginPath();
  ctx.rect(kX + 10, kY + 38, kW - 20, kH - 20);
  ctx.clip();
  drawEngravingContent(ctx, kX + 10, kY + 28 + kH/2, kW - 20, kH - 20);
  ctx.restore();

  // Shine
  const shine = ctx.createLinearGradient(kX, kY+28, kX, kY+28+kH*0.4);
  shine.addColorStop(0, 'rgba(255,255,255,0.3)');
  shine.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.roundRect ? ctx.roundRect(kX, kY+28, kW, kH*0.4, [r,r,0,0]) : ctx.rect(kX, kY+28, kW, kH*0.4);
  ctx.fillStyle = shine;
  ctx.fill();
}

function drawEngravingContent(ctx, x, midY, maxW, maxH) {
  const tab = STATE.activeTab;

  if (tab === 'image' && STATE.uploadedImage) {
    const img = new Image();
    img.src = STATE.uploadedImage;
    if (img.complete && img.naturalWidth > 0) {
      const scale = Math.min((maxW - 10) / img.naturalWidth, (maxH - 10) / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.globalAlpha = 0.55;
      ctx.filter = 'grayscale(1) contrast(1.4)';
      ctx.drawImage(img, x + (maxW - dw)/2, midY - dh/2, dw, dh);
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
    } else {
      img.onload = () => updatePreview();
    }
    return;
  }

  const l1 = (tab === 'text') ? STATE.line1 : (TEMPLATES.find(t => t.id === STATE.selectedTemplate) || {}).line1 || '';
  const l2 = (tab === 'text') ? STATE.line2 : (TEMPLATES.find(t => t.id === STATE.selectedTemplate) || {}).line2 || '';

  ctx.fillStyle = 'rgba(90,60,10,0.7)';
  ctx.globalAlpha = 0.85;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (l1 && l2) {
    ctx.font = getFontCSS(STATE.font, 18);
    ctx.fillText(truncateText(ctx, l1, maxW - 10), x + maxW/2, midY - 12);
    ctx.font = getFontCSS(STATE.font, 14);
    ctx.fillText(truncateText(ctx, l2, maxW - 10), x + maxW/2, midY + 12);
  } else if (l1) {
    ctx.font = getFontCSS(STATE.font, 20);
    ctx.fillText(truncateText(ctx, l1, maxW - 10), x + maxW/2, midY);
  } else {
    ctx.fillStyle = 'rgba(90,60,10,0.25)';
    ctx.font = getFontCSS('modern', 13);
    ctx.fillText(currentLang === 'hu' ? 'A gravírozás itt jelenik meg...' : 'Engraving appears here...', x + maxW/2, midY);
  }
  ctx.globalAlpha = 1;
}

function truncateText(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
  return t + '…';
}

// ─── ORDER SUMMARY ────────────────────────────────────────────────────────────
function buildOrderSummary() {
  const box = document.getElementById('orderSummary');
  if (!box) return;
  const prod = STATE.product || 'pen';
  const basePrice = PRICES[prod];
  const isImage = STATE.activeTab === 'image';
  const surcharge = isImage ? PRICES.imageSurcharge : 0;
  const total = basePrice + surcharge;
  const prodName = t(prod === 'pen' ? 'pen_name' : 'keychain_name');

  let contentDesc = '';
  if (STATE.activeTab === 'text') contentDesc = t('content_text') + (STATE.line1 ? `: "${STATE.line1}${STATE.line2 ? ' / ' + STATE.line2 : ''}"` : '');
  else if (STATE.activeTab === 'image') contentDesc = t('content_image');
  else if (STATE.activeTab === 'template') {
    const tpl = TEMPLATES.find(tp => tp.id === STATE.selectedTemplate);
    contentDesc = t('content_template') + (tpl ? `: ${currentLang==='en'?tpl.nameEn:tpl.nameHu}` : '');
  }

  box.innerHTML = `<table>
    <tr><td>${t('order_product')}</td><td>${prodName}</td></tr>
    <tr><td>${t('order_content')}</td><td>${contentDesc}</td></tr>
    <tr><td>${t('order_price')}</td><td>${basePrice.toLocaleString('hu-HU')} Ft</td></tr>
    ${isImage ? `<tr><td>${t('order_surcharge')}</td><td>+${surcharge.toLocaleString('hu-HU')} Ft</td></tr>` : ''}
    <tr class="total-row"><td>${t('order_total')}</td><td>${total.toLocaleString('hu-HU')} Ft</td></tr>
  </table>`;
}

function getTotal() {
  const basePrice = PRICES[STATE.product || 'pen'];
  const surcharge = STATE.activeTab === 'image' ? PRICES.imageSurcharge : 0;
  return basePrice + surcharge;
}

// ─── PAYMENT INFO ─────────────────────────────────────────────────────────────
function showPaymentInfo() {
  const box = document.getElementById('paymentInfoBox');
  if (!box) return;
  const sel = document.querySelector('input[name="payment"]:checked');
  const method = sel ? sel.value : 'transfer';
  const total = getTotal();

  const infos = {
    transfer: t('pay_transfer_info'),
    simplepay: t('pay_simplepay_info') + `<br/><a href="#" class="pay-redirect-btn" onclick="return false">Fizetés SimplePay-jel →</a>`,
    barion:    t('pay_barion_info')    + `<br/><a href="#" class="pay-redirect-btn" onclick="return false">Fizetés Barion-nal →</a>`,
  };

  box.innerHTML = infos[method] || '';
  const ta = document.getElementById('transferAmount');
  if (ta) ta.textContent = total.toLocaleString('hu-HU') + ' Ft';
}

// ─── EMAILJS SUBMIT ──────────────────────────────────────────────────────────
// !! FONTOS: Cseréld ki a lenti értékeket a saját EmailJS fiók adataira !!
const EMAILJS_SERVICE_ID  = 'service_k6jumcf';
const EMAILJS_TEMPLATE_ID = 'template_n1viil8';
const EMAILJS_PUBLIC_KEY  = '8XTzOjDofiyONfv2X';

async function submitOrder(event) {
  event.preventDefault();

  const name    = document.getElementById('customerName').value.trim();
  const email   = document.getElementById('customerEmail').value.trim();
  const phone   = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const note    = document.getElementById('orderNote').value.trim();
  const terms   = document.getElementById('acceptTerms').checked;
  const paymentSel = document.querySelector('input[name="payment"]:checked');
  const payment = paymentSel ? paymentSel.value : '';

  if (!name || !email || !address) { alert(t('err_fill_form')); return; }
  if (!terms) { alert(t('err_accept_terms')); return; }

  const prod = STATE.product || 'pen';
  const prodName = prod === 'pen' ? 'Toll / Pen' : 'Kulcstartó / Keychain';
  let contentDesc = '';
  if (STATE.activeTab === 'text') contentDesc = `Szöveg: "${STATE.line1}" | "${STATE.line2}" | Betűtípus: ${STATE.font}`;
  else if (STATE.activeTab === 'image') contentDesc = 'Kép feltöltve (mellékletként)';
  else if (STATE.activeTab === 'template') {
    const tpl = TEMPLATES.find(tp => tp.id === STATE.selectedTemplate);
    contentDesc = `Sablon: ${tpl ? tpl.nameHu : STATE.selectedTemplate}`;
  }

  const total = getTotal();
  const paymentLabel = { transfer: 'Banki átutalás', simplepay: 'SimplePay', barion: 'Barion' }[payment] || payment;
  const orderNum = 'GR-' + Date.now().toString().slice(-6);

  // ── Emailszöveg az eladónak
  const adminParams = {
    to_email:      'sbalaffplus2@gmail.com',
    order_number:  orderNum,
    customer_name: name,
    customer_email: email,
    customer_phone: phone || '–',
    delivery_address: address,
    product:       prodName,
    content:       contentDesc,
    total:         total.toLocaleString('hu-HU') + ' Ft',
    payment:       paymentLabel,
    note:          note || '–',
    image_data:    STATE.uploadedImage ? STATE.uploadedImage : '(nincs kép)',
  };

  // ── Visszaigazoló email a vevőnek
  const customerParams = {
    to_email:      email,
    order_number:  orderNum,
    customer_name: name,
    product:       prodName,
    content:       contentDesc,
    total:         total.toLocaleString('hu-HU') + ' Ft',
    payment:       paymentLabel,
  };

  const btn = document.querySelector('.btn-order');
  btn.disabled = true;
  btn.textContent = '⏳ Küldés...';

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, adminParams);
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, customerParams);

    document.getElementById('successModal').classList.remove('hidden');
    document.getElementById('orderForm').reset();
    STATE.product = null;
    STATE.uploadedImage = null;
    STATE.selectedTemplate = null;
    STATE.activeTab = 'text';
    goToStep(1);
  } catch (err) {
    console.error('EmailJS error:', err);
    alert(t('err_sending'));
  } finally {
    btn.disabled = false;
    btn.textContent = t('btn_order');
  }
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function closeModal() {
  document.getElementById('successModal').classList.add('hidden');
}

function showTerms() {
  document.getElementById('termsModal').classList.remove('hidden');
}

function closeTermsModal() {
  document.getElementById('termsModal').classList.add('hidden');
}

// Close modals on overlay click
document.addEventListener('click', e => {
  if (e.target.id === 'successModal') closeModal();
  if (e.target.id === 'termsModal') closeTermsModal();
});

// Close mobile menu on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const ham = document.querySelector('.hamburger');
  if (menu && ham && !menu.contains(e.target) && !ham.contains(e.target)) {
    menu.classList.remove('open');
  }
});
