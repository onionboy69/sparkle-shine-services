# Curățenie Pro - Website Servicii Profesionale de Curățenie

Un website modern și complet pentru servicii de curățenie profesională în Târgoviște, România.

## 🚀 Pornire Rapidă

Website-ul rulează automat. Accesați-l din panoul Replit.

## 📋 Caracteristici Implementate

✅ **Secțiuni Complete:**
- Hero cu animații și CTA-uri
- De ce noi? (4 beneficii)
- Cum Lucrăm (proces în 4 pași)
- Servicii (6 categorii)
- Prețuri & Pachete COMBO
- Statistici Animate (contoare)
- Carusel Testimoniale (auto-rotație 5s)
- Garanții & Siguranță
- FAQ (acordeon)
- Blog/Articole
- Formular Contact + WhatsApp
- Buton WhatsApp Sticky

✅ **Design & Animații:**
- Responsive (mobile, tablet, desktop)
- Animații hover
- Scroll animations
- Gradient backgrounds
- Icon pack complet

✅ **SEO & Optimizări:**
- Meta tags românești
- Keywords locale
- Google Fonts (Inter)
- Cache control

## 🔧 Personalizare

### 1. Modificați Numărul de Telefon

În fișierul `src/App.jsx`, căutați și înlocuiți:
```javascript
const whatsappNumber = '+40123456789'
```
cu numărul dvs. real de WhatsApp.

Căutați și înlocuiți toate instanțele de `+40123456789` cu numărul dvs.:
- Header "Sună Acum" button
- Contact section
- Sticky WhatsApp button

### 2. Modificați Email-ul

În `src/App.jsx`, secțiunea Contact, schimbați:
```
contact@curateniepr o.ro
```
cu email-ul dvs.

### 3. Personalizați Prețurile

În `src/App.jsx`, găsiți secțiunea "Prețuri & Pachete" și actualizați tarifele conform prețurilor dvs.

### 4. Schimbați Imaginile

Înlocuiți URL-urile imaginilor din Unsplash cu propriile imagini:
- Hero section image
- Blog article images
- Orice alte imagini

### 5. Modificați Testimonialele

În `src/App.jsx`, găsiți array-ul `testimonials` și actualizați cu recenzii reale de la clienții dvs.

### 6. Personalizați Culorile

În `tailwind.config.js`, modificați:
```javascript
colors: {
  primary: '#2563EB',    // Albastru principal
  secondary: '#10B981',  // Verde secundar
  accent: '#F3F4F6',     // Gri deschis
  dark: '#1F2937',       // Negru pentru text
}
```

## 📱 Testare

- **Desktop**: Vizualizați direct în Replit
- **Mobile**: Deschideți link-ul generat pe telefon
- **Responsive**: Folosiți Developer Tools în browser (F12)

## 🌐 Publicare

Pentru a publica website-ul:
1. Click pe butonul "Deploy" din Replit
2. Configurați domeniul custom (opțional)
3. Website-ul va fi live!

## 📞 Note Importante

**Înainte de publicare, OBLIGATORIU:**
1. ✅ Înlocuiți numărul de telefon placeholder
2. ✅ Actualizați email-ul de contact
3. ✅ Verificați toate prețurile
4. ✅ Adăugați testimoniale reale
5. ✅ Testați formularul de contact
6. ✅ Testați butonul WhatsApp

## 🛠️ Tehnologii Utilizate

- **React 19.2.0** - Framework UI
- **Vite 7.2.2** - Build tool
- **Tailwind CSS 4.1.17** - Styling
- **Framer Motion 12.23.24** - Animations
- **React Icons 5.5.0** - Icons

## 📄 Licență

Proiect personalizat pentru Curățenie Pro © 2025
