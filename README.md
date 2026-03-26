# GravírAjándék – Beüzemelési útmutató

## 1. Fájlok
```
gravir/
  index.html   ← a weboldal
  style.css    ← stílusok
  app.js       ← minden logika
```

## 2. EmailJS beállítás (KÖTELEZŐ az e-mail küldéshez)

### a) Fiók létrehozása
1. Menj: https://www.emailjs.com/ → Sign Up (ingyenes, 200 levél/hó)
2. **Email Services** → Add New Service → válaszd a Gmailt → kapcsold össze a `sbalaffplus2@gmail.com` fiókkal
3. Jegyezd fel a **Service ID**-t (pl. `service_abc123`)

### b) E-mail sablon létrehozása
1. **Email Templates** → Create New Template
2. Hozz létre **két sablont** (vagy egyet, és állítsd be a `to_email` változót):
   - **Admin sablon** (neked küldött, megrendelés részletei)
   - **Vevői sablon** (visszaigazoló)

**Ajánlott sablon tartalma (HTML):**
```
Új megrendelés! #{{order_number}}

Vevő: {{customer_name}}
Email: {{customer_email}}
Telefon: {{customer_phone}}
Szállítási cím: {{delivery_address}}

Termék: {{product}}
Tartalom: {{content}}
Összeg: {{total}}
Fizetési mód: {{payment}}
Megjegyzés: {{note}}
```

3. Jegyezd fel a **Template ID**-t (pl. `template_xyz789`)

### c) Public Key másolás
1. **Account** → **General** → API Keys → másold a **Public Key**-t

### d) Beillesztés az app.js-be
Nyisd meg az `app.js` fájlt, és cseréld ki ezeket a sorokat (kb. 280. sor):

```javascript
const EMAILJS_SERVICE_ID  = 'service_abc123';   // ← a te Service ID-d
const EMAILJS_TEMPLATE_ID = 'template_xyz789';  // ← a te Template ID-d
const EMAILJS_PUBLIC_KEY  = 'abcDEF123xyz';     // ← a te Public Key-d
```

## 3. Bankszámlaszám frissítése
Az `app.js`-ben keresd meg ezt a sort és cseréld le a saját IBAN-odra:
```
IBAN: HU12 3456 7890 1234 5678 0000 0000
```

## 4. Közzététel (Netlify – INGYENES)

### Legegyszerűbb mód:
1. Menj: https://netlify.com → Sign up (ingyenes)
2. **Sites** → drag & drop a `gravir` mappát a böngészőbe
3. Kész! Kapsz egy URL-t (pl. `your-site.netlify.app`)
4. Opcionálisan: **Domain settings** → saját domain hozzáadása

## 5. SimplePay / Barion éles fizetés (opcionális, jövőbeli fejlesztés)
- Jelenleg a SimplePay/Barion gomb működési kerete készül
- Éles fizetéshez SimplePay/Barion merchant fiók kell (vállalkozói regisztráció)
- A gomb linkjét az `app.js`-ben a `pay_redirect-btn` `href` értékével lehet beállítani

## 6. Árak módosítása
Az `app.js` tetején:
```javascript
const PRICES = { pen: 3990, keychain: 2490, imageSurcharge: 500 };
```
