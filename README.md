# FUNDASERINCO — Ecosistema Técnico Orbital

Portafolio interactivo multi-dispositivo con 7 disciplinas técnicas, layout adaptativo
(desktop / tablet / mobile) y soporte bilingüe ES/EN. Cero build step — HTML + CSS + JS
con Tailwind CDN y módulos cargados por `<script>`.

## Estructura

```
index.html
assets/
  css/    base.css · desktop.css · tablet.css · mobile.css
  img/    logo.jpg · logo-mark.png · favicon.ico · favicon-32.png · favicon-192.png · apple-touch-icon.png
  js/     data.js · core.js · utils.js · modal.js · app.js
          layouts/desktop.js · layouts/tablet.js · layouts/mobile.js
```

## Marca

- `assets/img/logo.jpg` — logo original recibido (fondo blanco).
- `assets/img/logo-mark.png` — símbolo recortado, fondo transparente; se usa en las cabeceras de
  desktop/tablet/mobile y en el dossier.
- Los iconos del navegador (`favicon.ico`, `favicon-32.png`, `favicon-192.png`,
  `apple-touch-icon.png`) se enlazan desde `index.html`.
