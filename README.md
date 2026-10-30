# FUNDASERINCO — Ecosistema Técnico Orbital

Portafolio interactivo multi-dispositivo con 7 disciplinas técnicas, layout adaptativo
(desktop / tablet / mobile) y soporte bilingüe ES/EN. Cero build step — HTML + CSS + JS
con Tailwind CDN y módulos cargados por `<script>`.

## Estructura

```
index.html
assets/
  css/    tokens.css · base.css · desktop.css · tablet.css · mobile.css
  img/    logo.jpg · logo-mark.png · favicon.ico · favicon-32.png · favicon-192.png · apple-touch-icon.png
          services/  imagen fija de cada disciplina (640×640)
  js/     data.js · core.js · utils.js · transition.js · modal.js · app.js
          layouts/desktop.js · layouts/tablet.js · layouts/mobile.js
  video/  clips de transición del núcleo (ver abajo)
```

## Sistema visual

Reglas fijas para que la interfaz se mantenga coherente entre los tres layouts.

**Tipografía** — Inter para todo el texto; Space Grotesk solo en la marca y en los
titulares de servicio; JetBrains Mono solo en códigos y cifras (`CIV-01`, `001`, `1-2 sem`).
Pesos 400–500 (600 únicamente en la marca y en el badge numérico del footer). Etiquetas en
mayúsculas con `tracking-[0.06em]` y 10–10.5px, nunca `font-bold` + `tracking-wide`.

**Color** — escala neutra definida en [assets/css/tokens.css](assets/css/tokens.css):
`--bg #0b0b0c`, `--surface #111113`, `--surface-2 #17171a`, `--line #232326`,
`--text #ededef`, `--text-muted #8a8a93`. El acento `--live #6ee7b7` está reservado al
estado "en vivo" del topbar; cualquier otro uso rompe la jerarquía.

**Superficies** — una sola tarjeta por panel (`.specular-card`: `blur(12px)`, borde de 1px,
sin `inset` highlights ni sombras grandes). Las secciones internas no son cajas: se separan
con una hairline superior (`border-t border-white/[0.06] pt-3`).

**Indicador de disciplinas** — `.disc-dots` / `.disc-dot` en [assets/css/base.css](assets/css/base.css).
Los puntos viven en **su propia franja** de 36px justo encima del footer (`.disc-lane`: fondo `#000`
puro, sin blur, sin bordes y sin luz ambiental — nada brilla ahí). **En reposo la hilera no existe
visualmente**: sólo se leen los puntos (4px, `#4a4a51`; el activo en blanco con `scale(1.45)`). Al
pasar el ratón por cualquier punto se activa la lente liquid glass para toda la hilera:

| Propiedad | Valor en hover |
|---|---|
| relleno | `#fff` 3.5 % + gradiente `160deg` 11 %→3.5 %→0→5.5 % |
| blur | `backdrop-filter: blur(24px) saturate(1.9) brightness(1.22)` |
| rim (`::after`) | anillo de 1px desde gradiente 145°: 65 %→5 %→55 % |
| especular (`::before`) | pozo radial arriba-izq. 24 % + franja diagonal 7 % + rebote 8 % |
| sombras | `inset` blanco 30 % / negro 50 % / `inset 0 0 16px` 5 % / proyección `0 16px 36px -18px` |
| interacción | `scale(1.015)`, `scale(.99)` al pulsar |

El rim se construye con dos máscaras (`mask-clip: content-box, border-box` + `mask-composite:
exclude`) sobre un gradiente de 145°, de modo que la luz "viaja" por el borde en vez de ser un borde
uniforme. Todo (fondo, gradiente, sombras, rim y especular) está en `0` por defecto y sólo se enciende
con `:hover` / `:focus-within`. El estado activo se marca con `aria-current="true"`. El markup se
genera en [desktop.js](assets/js/layouts/desktop.js) y [tablet.js](assets/js/layouts/tablet.js).

**Bloque de cobertura** — en las tarjetas laterales la cobertura ya no se recorta: etiqueta,
valor y detalle van apilados (sin `truncate`, con `text-balance` / `text-pretty`) y la etiqueta se
reescribe desde `sync()` para que siga el cambio de idioma.

**Nombres de disciplina en los selectores** — el anillo y los chips siguen mostrando el código corto
(`CIVIL`, `TELECOM`, `DEPORTIVAS`…), pero cada selector expone el nombre completo en
`data-full` / `aria-label` y lo muestra como tooltip al pasar el ratón o al enfocar con teclado:
chip de 9,5px mono, borde hairline y fondo `rgba(17,17,19,.94)` con blur. La clase `tt-below` (que
[desktop.js](assets/js/layouts/desktop.js) y [tablet.js](assets/js/layouts/tablet.js) aplican según
la mitad del anillo) voltea el tooltip debajo del nodo para que nunca salga del escenario. Los nodos
del escritorio además son `role="button"` + `tabindex="0"` y responden a Enter/Espacio.

**Panel de tabs del móvil** — `#m-tab-content` mide 88 px y las tres vistas caben completas:
las filas de **TIEMPOS** se compactaron (`py-[2px]`, `gap-[3px]`, chip de tiempo `leading-[13px]`)
y el centrado se hace con `m-auto` en el contenido en vez de `justify-center`, de modo que si una
traducción crece la lista se desplaza (`overflow-y-auto`) en lugar de recortarse.

## Transiciones del núcleo

Al pasar de un servicio a otro, el círculo central reproduce un clip de morph entre las dos
disciplinas. El registro vive en [assets/js/transition.js](assets/js/transition.js):

```js
FD.CORE_VIDEOS = {
  "1-2": "assets/video/1-2.mp4", // Ingeniería civil → Seguridad electrónica
  "2-1": "assets/video/2-1.mp4", // el mismo morph, reproducido al revés
  "1-3": "assets/video/1-3.mp4", // Ingeniería civil → Telecomunicaciones
  "3-1": "assets/video/3-1.mp4",
  "1-4": "assets/video/1-4.mp4", // Ingeniería civil → Energía y RETIE
  "4-1": "assets/video/4-1.mp4",
  "1-5": "assets/video/1-5.mp4", // Ingeniería civil → Tecnología y Software
  "5-1": "assets/video/5-1.mp4",
  "1-6": "assets/video/1-6.mp4", // Ingeniería civil → Proyectos Integrales
  "6-1": "assets/video/6-1.mp4",
  "1-7": "assets/video/1-7.mp4", // Ingeniería civil → Instalaciones Deportivas
  "7-1": "assets/video/7-1.mp4",
  "2-3": "assets/video/2-3.mp4", // Seguridad electrónica → Telecomunicaciones
  "3-2": "assets/video/3-2.mp4",
  "2-4": "assets/video/2-4.mp4", // Seguridad electrónica → Energía y RETIE
  "4-2": "assets/video/4-2.mp4",
  "2-5": "assets/video/2-5.mp4", // Seguridad electrónica → Tecnología y Software
  "5-2": "assets/video/5-2.mp4",
  "2-6": "assets/video/2-6.mp4", // Seguridad electrónica → Proyectos Integrales
  "6-2": "assets/video/6-2.mp4",
  "2-7": "assets/video/2-7.mp4", // Seguridad electrónica → Instalaciones Deportivas
  "7-2": "assets/video/7-2.mp4",
  "3-4": "assets/video/3-4.mp4", // Telecomunicaciones → Energía y RETIE
  "4-3": "assets/video/4-3.mp4",
  "3-5": "assets/video/3-5.mp4", // Telecomunicaciones → Tecnología y Software
  "5-3": "assets/video/5-3.mp4",
  "3-6": "assets/video/3-6.mp4", // Telecomunicaciones → Proyectos Integrales
  "6-3": "assets/video/6-3.mp4",
  "3-7": "assets/video/3-7.mp4", // Telecomunicaciones → Instalaciones Deportivas
  "7-3": "assets/video/7-3.mp4",
  "4-5": "assets/video/4-5.mp4", // Energía y RETIE → Tecnología y Software
  "5-4": "assets/video/5-4.mp4",
  "4-6": "assets/video/4-6.mp4", // Energía y RETIE → Proyectos Integrales
  "6-4": "assets/video/6-4.mp4",
  "4-7": "assets/video/4-7.mp4", // Energía y RETIE → Instalaciones Deportivas
  "7-4": "assets/video/7-4.mp4",
  "5-6": "assets/video/5-6.mp4", // Tecnología y Software → Proyectos Integrales
  "6-5": "assets/video/6-5.mp4",
  "5-7": "assets/video/5-7.mp4", // Tecnología y Software → Instalaciones Deportivas
  "7-5": "assets/video/7-5.mp4",
  "6-7": "assets/video/6-7.mp4", // Proyectos Integrales → Instalaciones Deportivas
  "7-6": "assets/video/7-6.mp4",
};
```

- Las claves son los números de servicio (1 → 7) en el orden de `FD.DATA`: civil, seguridad,
  telecom, energía, software, proyectos, deportivas.
- Al navegar en sentido inverso se usa el clip espejo, de modo que el video se ve devolverse.
  Para un clip nuevo `N-M` hay que generar también `M-N` invirtiéndolo:

  ```bash
  ffmpeg -i assets/video/1-2.mp4 -vf reverse -an -c:v libx264 -crf 26 -pix_fmt yuv420p \
    -movflags +faststart assets/video/2-1.mp4
  ```

- Codificación de referencia (recorte cuadrado, 640×640, sin audio, GOP de 2 s y `faststart`
  para que empiece a reproducir antes de terminar de descargar):

  ```bash
  ffmpeg -i origen.mp4 -vf "crop='min(iw,ih)':'min(iw,ih)',scale=640:640:flags=lanczos,minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" \
    -an -c:v libx264 -profile:v high -crf 26 -preset slow -g 120 -keyint_min 120 \
    -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart assets/video/1-2.mp4
  ```

  El `minterpolate` a **60 fps** es importante: los clips originales vienen a 24 fps y sobre
  una pantalla de 60 Hz cada frame dura 2 o 3 refrescos (judder 3:2), que se percibe como
  tirones aunque no se pierda ni un frame. A 60 fps el patrón es 1:1 y la reproducción se ve
  fluida, con apenas ~10 % más de peso.

- Cada disciplina tiene su **imagen fija** en `assets/img/services/` (referenciada desde
  `data.js → image`). Esa imagen es la base del núcleo: se pinta al instante (~45 KB) y evita
  cualquier hueco mientras carga el video.
- Cuando el servicio ya tiene clip, su imagen fija se extrae **del propio clip** para que el
  cambio video → imagen sea idéntico píxel a píxel (si se usa otra foto, su brillo no coincide
  y se nota el salto):

  ```bash
  # primer frame (servicio de origen) y último frame (servicio de destino)
  ffmpeg -i assets/video/1-2.mp4 -vf "select=eq(n\,0)"   -vframes 1 -q:v 2 assets/img/services/ingenieria-civil.jpg
  ffmpeg -i assets/video/1-2.mp4 -vf "select=eq(n\,232)" -vframes 1 -q:v 2 assets/img/services/seguridad-electronica.jpg
  ```
- Mientras el clip corre, la imagen se oculta (`.core-media.is-playing .core-still`), así no se
  transparenta ni se ve doble detrás del video.
- Al terminar, el video se **pausa en su último frame y ese frame queda como imagen del
  servicio**. Es la única forma de que cada clip cierre sin saltos: cada par se renderiza con
  su propia iluminación y encuadre, y una foto genérica del servicio no coincidiría (por eso
  tampoco se guardan stills por clip, que serían casi duplicados).
- La foto del servicio queda debajo como respaldo: se vuelve a ella al navegar a un par sin
  clip, al abrir el overview o al reconstruirse el layout (resize / cambio de idioma).
- Los clips se muestran con sus **colores originales**, a sangre dentro del círculo: el núcleo
  no tiene marco ni padding y tanto la imagen como el video se disuelven en el fondo con la
  misma máscara radial (`.core-still` / `.core-morph` en `base.css`), así la luz se integra al
  escenario sin cortes y sin tocar los anillos orbitales.
- No hay texto superpuesto al núcleo.
- Si no hay clip para un par de servicios, el cambio es directo, sin animación.
- El sonido se silencia y, si el navegador bloquea la reproducción automática o el usuario
  pide movimiento reducido, la transición simplemente se omite.

## Marca

- `assets/img/logo.jpg` — logo original recibido (fondo blanco).
- `assets/img/logo-mark.png` — símbolo recortado, fondo transparente; se usa en las cabeceras de
  desktop/tablet/mobile y en el dossier.
- Los iconos del navegador (`favicon.ico`, `favicon-32.png`, `favicon-192.png`,
  `apple-touch-icon.png`) se enlazan desde `index.html`.
