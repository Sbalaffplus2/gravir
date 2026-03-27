/* ===========================================
   APP.JS – GravírAjándék v2
   =========================================== */

// ── EmailJS ──────────────────────────────────
// DEPRECATED in favor of server.js backend
// const EMAILJS_SERVICE_ID  = 'service_k6jumcf';
// const EMAILJS_TEMPLATE_ID = 'template_n1viil8';
// const EMAILJS_PUBLIC_KEY  = '8XTzOjDofiyONfv2X';

// ── Character limits based on real dimensions ─
// Pen: 14.5cm × 1.1cm → engravable ~8.5cm × 0.8cm → max 22 chars/line (at ~3.8mm/char)
// Keychain: 5cm × 3cm → engravable ~4.2cm × 2.5cm → max 14 chars/line (at ~3mm/char)
const CHAR_LIMITS = {
  pen:      { line1: 22, line2: 22 },
  keychain: { line1: 14, line2: 14 }
};

// ── Translations ─────────────────────────────
const TRANSLATIONS = {
  hu: {
    site_title: "GravírAjándék – Egyedi gravírozott termékek",
    nav_products: "Termékek", nav_how: "Hogyan működik", nav_config: "Tervezés", nav_contact: "Kapcsolat",
    hero_tag: "Valódi lézer gravírozás",
    hero_title: "Egyedi ajándék,<br/>ami maradandó",
    hero_sub: "Töltsd fel a képedet vagy add meg a szövegedet – mi kigravírozzuk bambusz tollra vagy fa kulcstartóra, és házhoz küldjük.",
    hero_cta: "Tervezés most",
    products_title: "Termékeink", products_sub: "Prémium bambusz és bükkfa, lézer gravírozással",
    pen_name: "Bambusz Toll",
    pen_size: "14,5 × 1,1 cm &nbsp;·&nbsp; max. 22 karakter/sor",
    pen_size_short: "14,5 × 1,1 cm · max. 22 kar./sor",
    pen_desc: "Elegáns bambusz toll egyedi gravírozással. Környezetbarát, tartós anyag.",
    keychain_name: "Fa Kulcstartó",
    keychain_size: "5 × 3 cm &nbsp;·&nbsp; max. 14 karakter/sor",
    keychain_size_short: "5 × 3 cm · max. 14 kar./sor",
    keychain_desc: "Bükkfa kulcstartó személyes üzenettel vagy képpel.",
    price_img: "+500 Ft kép esetén", btn_customize: "Testreszabás",
    how_title: "Hogyan működik?",
    step1_title: "Válassz terméket", step1_desc: "Bambusz toll vagy bükkfa kulcstartó.",
    step2_title: "Add meg a tartalmat", step2_desc: "Szöveg, kép vagy sablon alapján.",
    step3_title: "Előnézet & megrendelés", step3_desc: "Valós idejű előnézet, majd biztonságos fizetés.",
    step4_title: "Kézbesítés", step4_desc: "3–5 munkanapon belül postázzuk.",
    templates_title: "Sablonok", templates_sub: "Válassz egyet, vagy tervezd meg a sajátodat",
    config_title: "Tervezd meg az ajándékod",
    step_ind_product: "Termék", step_ind_design: "Tartalom", step_ind_order: "Megrendelés",
    config_step1_h: "Melyik terméket szeretnéd?",
    config_step2_h: "Mit gravírozzunk rá?",
    config_step3_h: "Megrendelés adatai",
    tab_text: "Szöveg", tab_image: "Kép (+500 Ft)", tab_tpl: "Sablon",
    label_line1: "1. sor:", label_line2: "2. sor:", label_font: "Betűstílus:",
    font_serif: "Klasszikus (talpas)", font_script: "Kézírásos", font_modern: "Modern (talpatlan)",
    upload_hint: "Kattints vagy húzd ide a képet", upload_note: "JPG, PNG – max. 5 MB",
    btn_clear_img: "✕ Kép törlése",
    preview_title: "Előnézet",
    preview_flat_label: "Gravírozás részlete (valós arányok)",
    preview_note: "* Az előnézet tájékoztató jellegű. A valódi gravírozás eltérhet.",
    btn_back: "← Vissza", btn_next: "Tovább →",
    label_name: "Teljes név", label_email: "E-mail", label_phone: "Telefonszám",
    label_address: "Szállítási cím", label_note: "Megjegyzés",
    payment_title: "Fizetési mód",
    pay_transfer: "Banki átutalás", pay_transfer_note: "Megrendelés után e-mailben küldöm a bankszámlaszámot",
    pay_simplepay_note: "Bankkártyás fizetés", pay_barion_note: "Bankkártya / Apple Pay / Google Pay",
    accept_terms: "Elfogadom az", terms_link: "általános szerződési feltételeket",
    btn_order: "Megrendelés leadása",
    success_title: "Megrendelés elküldve!", success_msg: "Köszönjük! Visszaigazolást kapsz e-mailben hamarosan.",
    btn_close: "Bezárás",
    terms_title: "Általános Szerződési Feltételek",
    contact_title: "Kapcsolat", contact_email_label: "E-mail",
    contact_response: "Válaszidő", contact_response_val: "1 munkanapon belül",
    contact_delivery: "Szállítás", contact_delivery_val: "3–5 munkanap",
    footer_brand: "GravírAjándék – Egyedi, szívvel készült ajándékok.",
    footer_rights: "Minden jog fenntartva.", footer_contact: "Kapcsolat",
    order_product: "Termék", order_content: "Tartalom", order_price: "Alapár",
    order_surcharge: "Képfelár", order_total: "Összesen",
    content_text: "Szöveg", content_image: "Kép", content_template: "Sablon",
    err_no_product: "Kérjük, válassz terméket!", err_no_content: "Kérjük, add meg a gravírozandó szöveget, tölts fel képet, vagy válassz sablont!",
    err_fill_form: "Kérjük, töltsd ki az összes kötelező mezőt!", err_accept_terms: "Kérjük, fogadd el az ÁSZF-et!",
    err_sending: "Hiba az üzenet küldésekor. Kérjük, próbáld újra!",
    pay_transfer_info: "<strong>Bankszámla:</strong><br/>IBAN: HU12 3456 7890 1234 5678 0000 0000<br/>Kedvezményezett: GravírAjándék<br/>Összeg: <strong id='transferAmount'></strong>",
    pay_simplepay_info: "A megrendelés leadása után átirányítunk az OTP SimplePay biztonságos fizetési oldalára.",
    pay_barion_info: "A megrendelés leadása után átirányítunk a Barion fizetési oldalára.<br/>Elfogadott: bankkártya, Apple Pay, Google Pay.",
  },
  en: {
    site_title: "GravírAjándék – Custom Engraved Gifts",
    nav_products: "Products", nav_how: "How it works", nav_config: "Design", nav_contact: "Contact",
    hero_tag: "Real laser engraving",
    hero_title: "A unique gift<br/>that lasts forever",
    hero_sub: "Upload your image or enter your text — we'll engrave it on a bamboo pen or wooden keychain and deliver it to you.",
    hero_cta: "Design now",
    products_title: "Our Products", products_sub: "Premium bamboo and beech wood, laser engraved",
    pen_name: "Bamboo Pen",
    pen_size: "14.5 × 1.1 cm &nbsp;·&nbsp; max. 22 characters/line",
    pen_size_short: "14.5 × 1.1 cm · max. 22 chars/line",
    pen_desc: "Elegant bamboo pen with custom engraving. Eco-friendly and durable.",
    keychain_name: "Wooden Keychain",
    keychain_size: "5 × 3 cm &nbsp;·&nbsp; max. 14 characters/line",
    keychain_size_short: "5 × 3 cm · max. 14 chars/line",
    keychain_desc: "Beech wood keychain with a personal message or image.",
    price_img: "+500 HUF for image", btn_customize: "Customize",
    how_title: "How it works?",
    step1_title: "Choose a product", step1_desc: "Bamboo pen or beech wood keychain.",
    step2_title: "Add your content", step2_desc: "Text, image or template.",
    step3_title: "Preview & order", step3_desc: "Real-time preview, then secure payment.",
    step4_title: "Delivery", step4_desc: "Shipped within 3–5 business days.",
    templates_title: "Templates", templates_sub: "Pick one or design your own",
    config_title: "Design your gift",
    step_ind_product: "Product", step_ind_design: "Content", step_ind_order: "Order",
    config_step1_h: "Which product would you like?",
    config_step2_h: "What should we engrave?",
    config_step3_h: "Order details",
    tab_text: "Text", tab_image: "Image (+500 HUF)", tab_tpl: "Template",
    label_line1: "Line 1:", label_line2: "Line 2:", label_font: "Font style:",
    font_serif: "Classic (serif)", font_script: "Handwriting", font_modern: "Modern (sans-serif)",
    upload_hint: "Click or drag image here", upload_note: "JPG, PNG – max 5 MB",
    btn_clear_img: "✕ Remove image",
    preview_title: "Preview",
    preview_flat_label: "Engraving detail (real proportions)",
    preview_note: "* Preview is illustrative. Actual engraving may differ slightly.",
    btn_back: "← Back", btn_next: "Next →",
    label_name: "Full name", label_email: "Email", label_phone: "Phone",
    label_address: "Delivery address", label_note: "Notes",
    payment_title: "Payment method",
    pay_transfer: "Bank transfer", pay_transfer_note: "I'll send bank details by email after the order",
    pay_simplepay_note: "Card payment via OTP SimplePay", pay_barion_note: "Card / Apple Pay / Google Pay",
    accept_terms: "I accept the", terms_link: "general terms and conditions",
    btn_order: "Place Order",
    success_title: "Order placed!", success_msg: "Thank you! You'll receive a confirmation email shortly.",
    btn_close: "Close",
    terms_title: "Terms and Conditions",
    contact_title: "Contact", contact_email_label: "Email",
    contact_response: "Response time", contact_response_val: "Within 1 business day",
    contactbrand: "GravírAjándék – Unique gifts made with heart.",
    footer__delivery: "Shipping", contact_delivery_val: "3–5 business days",
    footer_rights: "All rights reserved.", footer_contact: "Contact",
    order_product: "Product", order_content: "Content", order_price: "Base price",
    order_surcharge: "Image surcharge", order_total: "Total",
    content_text: "Text", content_image: "Image", content_template: "Template",
    err_no_product: "Please select a product!", err_no_content: "Please enter text, upload an image, or select a template!",
    err_fill_form: "Please fill in all required fields!", err_accept_terms: "Please accept the terms and conditions!",
    err_sending: "Error sending message. Please try again!",
    pay_transfer_info: "<strong>Bank account:</strong><br/>IBAN: HU12 3456 7890 1234 5678 0000 0000<br/>Beneficiary: GravírAjándék<br/>Amount: <strong id='transferAmount'></strong>",
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
  renderTemplates();
  buildOrderSummary();
  showPaymentInfo();
  updatePreview();
}

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['hu'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.placeholder !== undefined) el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });
  document.title = t('site_title');
}

// ── STATE ─────────────────────────────────────
const STATE = {
  product: null,
  activeTab: 'text',
  line1: '', line2: '',
  font: 'serif',
  uploadedImage: null,
  selectedTemplate: null,
  currentStep: 1,
};

const PRICES = { pen: 3990, keychain: 2490, imageSurcharge: 500 };

// ── TEMPLATES ────────────────────────────────
const TEMPLATES = [
  { id: 'heart',   nameHu: 'Szív & Monogram',  nameEn: 'Heart & Monogram',
    line1: 'A & B', line2: '♥ Örökre ♥',
    svg: `<svg viewBox="0 0 80 46" width="80" height="46"><text x="40" y="18" text-anchor="middle" font-size="11" font-family="serif" fill="#7a4e18" font-style="italic">A &amp; B</text><text x="40" y="36" text-anchor="middle" font-size="14" fill="#b03030">♥</text></svg>` },
  { id: 'date',    nameHu: 'Évforduló',         nameEn: 'Anniversary',
    line1: 'Örökké', line2: '2024. dec. 24.',
    svg: `<svg viewBox="0 0 80 46" width="80" height="46"><text x="40" y="18" text-anchor="middle" font-size="10" font-family="serif" fill="#7a4e18" font-style="italic">Örökké</text><text x="40" y="34" text-anchor="middle" font-size="8" font-family="sans-serif" fill="#6b4f2a">2024. dec. 24.</text></svg>` },
  { id: 'star',    nameHu: 'Csillag',            nameEn: 'Star',
    line1: '★ Köszönöm ★', line2: '',
    svg: `<svg viewBox="0 0 80 46" width="80" height="46"><text x="40" y="28" text-anchor="middle" font-size="10" font-family="serif" fill="#7a4e18">★ Köszönöm ★</text></svg>` },
  { id: 'name',    nameHu: 'Egyszerű Név',       nameEn: 'Simple Name',
    line1: 'Anna', line2: '',
    svg: `<svg viewBox="0 0 80 46" width="80" height="46"><text x="40" y="30" text-anchor="middle" font-size="18" font-family="serif" fill="#b07830" font-style="italic">Anna</text></svg>` },
  { id: 'flower',  nameHu: 'Virág & Dátum',      nameEn: 'Flower & Date',
    line1: '✿ Születésnapra ✿', line2: '2024',
    svg: `<svg viewBox="0 0 80 46" width="80" height="46"><text x="40" y="18" text-anchor="middle" font-size="8" font-family="serif" fill="#7a4e18">✿ Születésnapra ✿</text><text x="40" y="34" text-anchor="middle" font-size="12" font-family="serif" fill="#b07830">2024</text></svg>` },
  { id: 'initial', nameHu: 'Monogram',            nameEn: 'Monogram',
    line1: 'JK', line2: '',
    svg: `<svg viewBox="0 0 80 46" width="80" height="46"><text x="40" y="33" text-anchor="middle" font-size="26" font-family="serif" fill="#b07830" font-style="italic" font-weight="bold">JK</text></svg>` },
];

function renderTemplates() {
  ['templatesGrid', 'templatesMiniGrid'].forEach(id => {
    const g = document.getElementById(id);
    if (!g) return;
    g.innerHTML = TEMPLATES.map(tpl => {
      const name = currentLang === 'en' ? tpl.nameEn : tpl.nameHu;
      const sel = STATE.selectedTemplate === tpl.id ? 'selected' : '';
      return `<div class="template-card ${sel}" onclick="selectTemplate('${tpl.id}')">${tpl.svg}<span>${name}</span></div>`;
    }).join('');
  });
}

function selectTemplate(id) {
  STATE.selectedTemplate = id;
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return;
  STATE.line1 = tpl.line1;
  STATE.line2 = tpl.line2;
  const l1 = document.getElementById('text-line1');
  const l2 = document.getElementById('text-line2');
  if (l1) l1.value = tpl.line1;
  if (l2) l2.value = tpl.line2;
  
  document.querySelectorAll('.template-card').forEach(el => el.classList.remove('selected'));
  const card = document.querySelector(`.template-card[onclick="selectTemplate('${id}')"]`);
  if (card) card.classList.add('selected');

  updatePreview();
  updateCharCounters();
}

// ── NAVIGATION ───────────────────────────────
function selectProduct(type) {
  STATE.product = type;
  document.querySelectorAll('.choice-card').forEach(el => el.classList.remove('selected'));
  document.getElementById('choice-' + type).classList.add('selected');
  
  // Update photo preview
  const photoImg = document.getElementById('productPhotoImg');
  if (photoImg) { photoImg.src = type + '.png'; }

  // Update overlay positioning class (pen=diagonal, keychain=upright)
  const overlay = document.getElementById('photoEngraveOverlay');
  if (overlay) { overlay.className = 'photo-engrave-overlay ' + type; }
  updateCharLimits();
  updatePreview();
}

function updateCharLimits() {
  const prod = STATE.product || 'pen';
  const limits = CHAR_LIMITS[prod];
  const l1 = document.getElementById('text-line1');
  const l2 = document.getElementById('text-line2');
  if (l1) l1.maxLength = limits.line1;
  if (l2) l2.maxLength = limits.line2;
  updateCharCounters();
}

function updateCharCounters() {
  const prod = STATE.product || 'pen';
  const limits = CHAR_LIMITS[prod];
  const l1val = (document.getElementById('text-line1') || {}).value || '';
  const l2val = (document.getElementById('text-line2') || {}).value || '';

  const c1 = document.getElementById('counter-line1');
  const c2 = document.getElementById('counter-line2');
  if (c1) {
    c1.textContent = `${l1val.length} / ${limits.line1}`;
    c1.className = 'char-counter' + (l1val.length >= limits.line1 ? ' full' : l1val.length >= limits.line1 * 0.8 ? ' warn' : '');
  }
  if (c2) {
    c2.textContent = `${l2val.length} / ${limits.line2}`;
    c2.className = 'char-counter' + (l2val.length >= limits.line2 ? ' full' : l2val.length >= limits.line2 * 0.8 ? ' warn' : '');
  }
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
  [1, 2, 3].forEach(i => {
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
  ['text', 'image', 'template'].forEach(t => {
    document.getElementById(`tab-${t}-content`).classList.toggle('hidden', t !== tab);
    document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
  });
  updatePreview();
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── IMAGE UPLOAD ──────────────────────────────
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const pica = window.pica();
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 1024;

  // Show a temporary loading state
  const uploadArea = document.getElementById('uploadArea');
  uploadArea.innerHTML = '<p>Kép feldolgozása...</p>';

  const offScreenImg = new Image();
  offScreenImg.src = URL.createObjectURL(file);

  offScreenImg.onload = async () => {
    const aspectRatio = offScreenImg.width / offScreenImg.height;
    let targetWidth = offScreenImg.width;
    let targetHeight = offScreenImg.height;

    if (targetWidth > MAX_WIDTH) {
      targetWidth = MAX_WIDTH;
      targetHeight = targetWidth / aspectRatio;
    }
    if (targetHeight > MAX_HEIGHT) {
      targetHeight = MAX_HEIGHT;
      targetWidth = targetHeight * aspectRatio;
    }

    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = targetWidth;
    offScreenCanvas.height = targetHeight;

    try {
      const result = await pica.resize(offScreenImg, offScreenCanvas, {
        unsharpAmount: 80,
        unsharpRadius: 0.6,
        unsharpThreshold: 2,
      });

      const resizedDataUrl = result.toDataURL('image/jpeg', 0.9); // High quality JPEG
      STATE.uploadedImage = resizedDataUrl;

      document.getElementById('uploadedPreviewImg').src = STATE.uploadedImage;
      document.getElementById('uploadedPreviewWrap').classList.remove('hidden');
      updatePreview();

    } catch (error) {
      console.error('Image resize error:', error);
      alert('Hiba a kép átméretezése közben. Próbáljon meg egy másik képet.');
      clearImage(); // Reset UI
    } finally {
       // Restore upload area content
      uploadArea.innerHTML = `
        <div class="upload-icon">📁</div>
        <p data-i18n="upload_hint">${t('upload_hint')}</p>
        <p class="upload-note" data-i18n="upload_note">${t('upload_note')}</p>
      `;
    }
  };
  offScreenImg.onerror = () => {
      alert('Hiba a kép betöltésekor.');
      clearImage();
  };
}

function clearImage() {
  STATE.uploadedImage = null;
  document.getElementById('imageUpload').value = '';
  document.getElementById('uploadedPreviewWrap').classList.add('hidden');
  updatePreview();
}

// Drag & drop
document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('uploadArea');
  if (area) {
    area.addEventListener('dragover', e => { e.preventDefault(); area.style.borderColor = 'var(--wood-light)'; });
    area.addEventListener('dragleave', () => { area.style.borderColor = ''; });
    area.addEventListener('drop', e => {
      e.preventDefault(); area.style.borderColor = '';
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
  updateCharLimits();
  updatePreview();
});

// ── CANVAS PREVIEW (flat engraving area) ─────
// Pen engravable area: 8.5cm × 0.85cm (real ratio ~10:1)
// Scaled: 500px × 60px displayed, canvas at 2× for sharpness = 1000×120

// Keychain engravable area: 5cm × 3cm (real ratio ~1.67:1)
// Scaled: 310px × 186px, canvas at 2× = 620×372

const CANVAS_SCALE = 2; // retina/HiDPI

function getFontCSS(fontKey, size) {
  switch (fontKey) {
    case 'script': return `italic ${size}px 'Palatino Linotype', 'Book Antiqua', Palatino, serif`;
    case 'modern': return `${size}px 'Inter', Arial, sans-serif`;
    default:       return `italic ${size}px Georgia, 'Times New Roman', serif`;
  }
}

function updatePreview() {
  STATE.line1 = (document.getElementById('text-line1') || {}).value || STATE.line1 || '';
  STATE.line2 = (document.getElementById('text-line2') || {}).value || STATE.line2 || '';
  STATE.font  = (document.getElementById('font-select') || {}).value || STATE.font || 'serif';

  updatePhotoOverlay();
  updateFlatCanvas();
}

// ── Photo overlay (CSS-based, positioned on product image) ──
function updatePhotoOverlay() {
  const l1El = document.getElementById('photoEngraveLine1');
  const l2El = document.getElementById('photoEngraveLine2');
  if (!l1El || !l2El) return;

  const tab = STATE.activeTab;
  let l1 = '', l2 = '';

  if (tab === 'text') {
    l1 = STATE.line1;
    l2 = STATE.line2;
  } else if (tab === 'template' && STATE.selectedTemplate) {
    const tpl = TEMPLATES.find(t => t.id === STATE.selectedTemplate);
    if (tpl) { l1 = tpl.line1; l2 = tpl.line2; }
  } else if (tab === 'image' && STATE.uploadedImage) {
    l1 = '[ kép ]';
    l2 = '';
  }

  // Font mapping for CSS
  const fontMap = { serif: "'Palatino Linotype', serif", script: "'Palatino Linotype', serif", modern: "Arial, sans-serif" };
  const fontStyle = STATE.font === 'modern' ? 'normal' : 'italic';
  l1El.style.fontFamily = fontMap[STATE.font] || fontMap.serif;
  l1El.style.fontStyle = fontStyle;
  l2El.style.fontFamily = fontMap[STATE.font] || fontMap.serif;
  l2El.style.fontStyle = fontStyle;

  l1El.textContent = l1;
  l2El.textContent = l2;
  l2El.style.display = l2 ? 'block' : 'none';
}

// ── Flat canvas ──
function updateFlatCanvas() {
  const cnv = document.getElementById('previewCnv');
  if (!cnv) return;
  const ctx = cnv.getContext('2d');
  const prod = STATE.product || 'pen';

  // Display dimensions (CSS pixels)
  const displayW = prod === 'pen' ? 500 : 310;
  const displayH = prod === 'pen' ? 68  : 186;

  // Canvas internal resolution (for sharpness)
  cnv.width  = displayW * CANVAS_SCALE;
  cnv.height = displayH * CANVAS_SCALE;
  cnv.style.width  = displayW + 'px';
  cnv.style.height = displayH + 'px';

  ctx.scale(CANVAS_SCALE, CANVAS_SCALE);

  if (prod === 'pen') drawPenCanvas(ctx, displayW, displayH);
  else                drawKeychainCanvas(ctx, displayW, displayH);
}

// ── Wood grain helper ──
function drawWoodGrain(ctx, W, H, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  // Horizontal grain lines
  for (let i = 0; i < 12; i++) {
    const y = (i / 12) * H + (Math.sin(i * 2.71828) * 2);
    const darkness = 0.3 + Math.random() * 0.7;
    ctx.strokeStyle = `rgba(55, 25, 5, ${darkness})`;
    ctx.lineWidth = 0.5 + Math.random() * 0.6;
    ctx.beginPath();
    ctx.moveTo(0, y);
    const cp1x = W * 0.3, cp1y = y + Math.sin(i * 1.61) * 2;
    const cp2x = W * 0.65, cp2y = y + Math.sin(i * 2.23 + 0.8) * 1.5;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, W, y + Math.cos(i * 1.41) * 1.5);
    ctx.stroke();
  }
  ctx.restore();
}

// ── Pen flat canvas (bamboo barrel top view) ──
function drawPenCanvas(ctx, W, H) {
  const R = H / 2 - 3; // corner radius for pill shape

  ctx.clearRect(0, 0, W, H);

  // Cylindrical gradient (lighter in center = light source above)
  const cylGrad = ctx.createLinearGradient(0, 0, 0, H);
  cylGrad.addColorStop(0,    '#8a6030');  // dark shadow top edge
  cylGrad.addColorStop(0.12, '#c49050');  // transition
  cylGrad.addColorStop(0.45, '#ddb870');  // highlight center (bamboo color)
  cylGrad.addColorStop(0.55, '#d4aa60');
  cylGrad.addColorStop(0.88, '#aa7838');  // transition
  cylGrad.addColorStop(1,    '#7a5020');  // dark shadow bottom edge

  // Pill-shaped pen barrel
  ctx.beginPath();
  ctx.moveTo(R + 3, 3);
  ctx.lineTo(W - R - 3, 3);
  ctx.arcTo(W - 3, 3, W - 3, H - 3, R);
  ctx.lineTo(W - 3, H - 3 - R);
  ctx.arcTo(W - 3, H - 3, W - R - 3, H - 3, R);
  ctx.lineTo(R + 3, H - 3);
  ctx.arcTo(3, H - 3, 3, H - 3 - R, R);
  ctx.lineTo(3, R + 3);
  ctx.arcTo(3, 3, R + 3, 3, R);
  ctx.closePath();

  ctx.fillStyle = cylGrad;
  ctx.fill();

  // Wood grain
  ctx.save();
  ctx.clip(); // clip grain to pill shape
  drawWoodGrain(ctx, W, H, 0.09);
  ctx.restore();

  // Bamboo node rings (characteristic bamboo detail)
  [-0.28, 0.28].forEach(offset => {
    const x = W / 2 + offset * W;
    const ringGrad = ctx.createLinearGradient(0, 0, 0, H);
    ringGrad.addColorStop(0, 'rgba(60,30,5,0.55)');
    ringGrad.addColorStop(0.5, 'rgba(90,50,10,0.4)');
    ringGrad.addColorStop(1, 'rgba(40,20,0,0.55)');
    ctx.fillStyle = ringGrad;
    ctx.fillRect(x - 2, 3, 4, H - 6);
  });

  // Slight highlight shine (top center)
  const shine = ctx.createLinearGradient(0, 3, 0, H * 0.38);
  shine.addColorStop(0, 'rgba(255,255,240,0.28)');
  shine.addColorStop(1, 'rgba(255,255,240,0)');
  ctx.save();
  ctx.beginPath();
  // Clip to top half of pill shape
  ctx.rect(3, 3, W - 6, (H - 6) * 0.45);
  ctx.clip();
  ctx.fillStyle = shine;
  ctx.fillRect(3, 3, W - 6, (H - 6) * 0.45);
  ctx.restore();

  // Engraving content
  drawEngravingOnCanvas(ctx, 40, W - 40, H / 2, W - 80, H - 12);
}

// ── Keychain flat canvas (beech wood face) ──
function drawKeychainCanvas(ctx, W, H) {
  const R = 10;
  const pad = 3;

  ctx.clearRect(0, 0, W, H);

  // Flat wood surface gradient (slightly darker edges, like wood with slight vignette)
  const woodGrad = ctx.createRadialGradient(W/2, H/2, H * 0.1, W/2, H/2, H * 0.7);
  woodGrad.addColorStop(0,   '#ddb060');  // lighter center
  woodGrad.addColorStop(0.6, '#c89848');
  woodGrad.addColorStop(1,   '#a0742a');  // darker edges

  // Rounded rect (keychain face)
  roundedRect(ctx, pad, pad, W - pad * 2, H - pad * 2, R);
  ctx.fillStyle = woodGrad;
  ctx.fill();

  // Wood grain
  ctx.save();
  ctx.clip();
  drawWoodGrain(ctx, W, H, 0.11);
  ctx.restore();

  // Subtle border highlight
  ctx.strokeStyle = 'rgba(200,150,60,0.5)';
  ctx.lineWidth = 1;
  roundedRect(ctx, pad, pad, W - pad * 2, H - pad * 2, R);
  ctx.stroke();

  // Engraving content
  drawEngravingOnCanvas(ctx, 18, W - 18, H / 2, W - 36, H - 28);
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ── Engraving content on canvas ──
function drawEngravingOnCanvas(ctx, x, xEnd, midY, maxW, maxH) {
  const tab = STATE.activeTab;

  // Laser-engraved appearance
  ctx.fillStyle = 'rgba(28, 10, 0, 0.72)';
  ctx.shadowColor = 'rgba(80, 35, 0, 0.35)';
  ctx.shadowBlur = 1.5;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const centerX = x + maxW / 2;

  if (tab === 'image' && STATE.uploadedImage) {
    const img = new Image();
    img.src = STATE.uploadedImage;
    const drawIt = () => {
      if (img.naturalWidth === 0) return;
      const scale = Math.min((maxW - 16) / img.naturalWidth, (maxH - 8) / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.save();
      ctx.globalAlpha = 0.58;
      ctx.filter = 'grayscale(1) contrast(1.5)';
      ctx.drawImage(img, centerX - dw / 2, midY - dh / 2, dw, dh);
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      ctx.restore();
    };
    if (img.complete && img.naturalWidth > 0) drawIt();
    else img.onload = () => updateFlatCanvas();
    return;
  }

  let l1 = '', l2 = '';
  if (tab === 'text') {
    l1 = STATE.line1; l2 = STATE.line2;
  } else if (tab === 'template' && STATE.selectedTemplate) {
    const tpl = TEMPLATES.find(t => t.id === STATE.selectedTemplate);
    if (tpl) { l1 = tpl.line1; l2 = tpl.line2; }
  }

  if (!l1 && !l2) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(80, 40, 5, 0.28)';
    const placeholderFont = STATE.product === 'pen' ? 11 : 14;
    ctx.font = getFontCSS('modern', placeholderFont);
    ctx.fillText(currentLang === 'hu' ? 'A gravírozás itt jelenik meg...' : 'Engraving appears here...', centerX, midY);
    return;
  }

  if (l1 && l2) {
    const fs = STATE.product === 'pen' ? 13 : 16;
    ctx.font = getFontCSS(STATE.font, fs);
    const t1 = clampText(ctx, l1, maxW - 8);
    ctx.fillText(t1, centerX, midY - fs * 0.72);
    const fs2 = STATE.product === 'pen' ? 11 : 13;
    ctx.font = getFontCSS(STATE.font, fs2);
    const t2 = clampText(ctx, l2, maxW - 8);
    ctx.fillText(t2, centerX, midY + fs * 0.72);
  } else {
    const fs = STATE.product === 'pen' ? 15 : 20;
    ctx.font = getFontCSS(STATE.font, fs);
    const t1 = clampText(ctx, l1 || l2, maxW - 8);
    ctx.fillText(t1, centerX, midY);
  }

  ctx.shadowBlur = 0;
}

function clampText(ctx, text, maxW) {
  if (!text) return '';
  if (ctx.measureText(text).width <= maxW) return text;
  let s = text;
  while (s.length > 1 && ctx.measureText(s + '…').width > maxW) s = s.slice(0, -1);
  return s + '…';
}

// ── Order summary ────────────────────────────
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
  if (STATE.activeTab === 'text') {
    contentDesc = t('content_text') + (STATE.line1 ? `: "${STATE.line1}${STATE.line2 ? ' / ' + STATE.line2 : ''}"` : '');
  } else if (STATE.activeTab === 'image') {
    contentDesc = t('content_image');
  } else if (STATE.activeTab === 'template') {
    const tpl = TEMPLATES.find(tp => tp.id === STATE.selectedTemplate);
    contentDesc = t('content_template') + (tpl ? `: ${currentLang === 'en' ? tpl.nameEn : tpl.nameHu}` : '');
  }

  box.innerHTML = `<table>
    <tr><td>${t('order_product')}</td><td>${prodName}</td></tr>
    <tr><td>${t('order_content')}</td><td>${contentDesc}</td></tr>
    <tr><td>${t('order_price')}</td><td>${basePrice.toLocaleString('hu-HU')} Ft</td></tr>
    ${isImage ? `<tr><td>${t('order_surcharge')}</td><td>+${surcharge.toLocaleString('hu-HU')} Ft</td></tr>` : ''}
    <tr class="total-row"><td><strong>${t('order_total')}</strong></td><td><strong>${total.toLocaleString('hu-HU')} Ft</strong></td></tr>
  </table>`;
}

function getTotal() {
  return PRICES[STATE.product || 'pen'] + (STATE.activeTab === 'image' ? PRICES.imageSurcharge : 0);
}

// ── Payment info ─────────────────────────────
function showPaymentInfo() {
  const box = document.getElementById('paymentInfoBox');
  if (!box) return;
  const sel = document.querySelector('input[name="payment"]:checked');
  const method = sel ? sel.value : 'transfer';

  const infos = {
    transfer: t('pay_transfer_info'),
    simplepay: t('pay_simplepay_info') + `<br/><a href="#" class="pay-redirect-btn" onclick="return false">Fizetés SimplePay-jel →</a>`,
    barion:    t('pay_barion_info')    + `<br/><a href="#" class="pay-redirect-btn" onclick="return false">Fizetés Barion-nal →</a>`,
  };

  box.innerHTML = infos[method] || '';
  const ta = document.getElementById('transferAmount');
  if (ta) ta.textContent = getTotal().toLocaleString('hu-HU') + ' Ft';
}

// ── EmailJS submit ────────────────────────────
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
  const prodName = prod === 'pen' ? 'Bambusz Toll' : 'Fa Kulcstartó';
  let contentDesc = '';
  if (STATE.activeTab === 'text') contentDesc = `Szöveg 1: "${STATE.line1}" | Szöveg 2: "${STATE.line2}" | Betűtípus: ${STATE.font}`;
  else if (STATE.activeTab === 'image') contentDesc = 'Kép feltöltve';
  else if (STATE.activeTab === 'template') {
    const tpl = TEMPLATES.find(tp => tp.id === STATE.selectedTemplate);
    contentDesc = `Sablon: ${tpl ? tpl.nameHu : STATE.selectedTemplate}`;
  }

  const total = getTotal();
  const paymentLabel = { transfer: 'Banki átutalás', simplepay: 'SimplePay', barion: 'Barion' }[payment] || payment;
  const orderNum = 'GR-' + Date.now().toString().slice(-6);

  const adminParams = {
    to_email: 'sbalaffplus2@gmail.com',
    order_number: orderNum, customer_name: name, customer_email: email,
    customer_phone: phone || '–', delivery_address: address,
    product: prodName, content: contentDesc,
    total: total.toLocaleString('hu-HU') + ' Ft',
    payment: paymentLabel, note: note || '–',
    image_data: STATE.uploadedImage || '(nincs kép)',
  };

  const customerParams = {
    to_email: email,
    order_number: orderNum, customer_name: name,
    product: prodName, content: contentDesc,
    total: total.toLocaleString('hu-HU') + ' Ft',
    payment: paymentLabel,
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
    STATE.product = null; STATE.uploadedImage = null;
    STATE.selectedTemplate = null; STATE.activeTab = 'text';
    STATE.line1 = ''; STATE.line2 = '';
    goToStep(1);
  } catch (err) {
    console.error('EmailJS error:', err);
    alert(t('err_sending'));
  } finally {
    btn.disabled = false;
    btn.textContent = t('btn_order');
  }
}

// ── Modals ──────────────────────────────────
function closeModal()      { document.getElementById('successModal').classList.add('hidden'); }
function showTerms()       { document.getElementById('termsModal').classList.remove('hidden'); }
function closeTermsModal() { document.getElementById('termsModal').classList.add('hidden'); }

document.addEventListener('click', e => {
  if (e.target.id === 'successModal') closeModal();
  if (e.target.id === 'termsModal') closeTermsModal();
  const menu = document.getElementById('mobileMenu');
  const ham = document.querySelector('.hamburger');
  if (menu && ham && !menu.contains(e.target) && !ham.contains(e.target)) {
    menu.classList.remove('open');
  }
});
