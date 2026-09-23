# Mason Dixon — Menú de navegación

Header de dos niveles para Mason Dixon Animal Emergency Hospital, construido sobre el
design system del sitio principal
([imageworksc/mason-dixon](https://github.com/imageworksc/mason-dixon) → `DESIGN.md`).

## Las dos versiones

| | Link | Diferencia |
|---|---|---|
| **A** | https://imageworksc.github.io/menu-mason-dixon/ | Con íconos en las filas de los desplegables |
| **B** | https://imageworksc.github.io/menu-mason-dixon/no-icons/ | Sin esos íconos |

En la B se van **solo** los íconos de las filas de los desplegables. Se quedan el maletín
de Careers y el portapapeles de Patient Intake Form, los chevrones de las pestañas, el
teléfono del CTA y el botón de menú.

`no-icons/index.html` **se genera, no se edita a mano** — así las dos páginas no se
pueden desincronizar. Comparten los mismos CSS y JS; lo único distinto es el markup, que
sale de `index.html`:

```
node scripts/stamp-assets.js && node scripts/build-variant.js
```

El script borra las 29 filas de íconos y, de paso, los 21 símbolos del sprite que quedan
sin usar, así la variante no arrastra peso muerto.

Las páginas están en blanco a propósito: solo el menú, sobre un lienzo vacío de 150vh
para que se pueda ver el comportamiento sticky del header al scrollear.

Para llevarlo al sitio hacen falta solo `base.css` + `components.css` + los dos JS.
`sections.css` es andamiaje de la preview y se descarta junto con su `<link>`.

## Estructura

Misma organización de archivos que el repo del sitio, para que el menú se pueda mover
tal cual:

```
index.html              versión A — solo markup, sin estilos ni scripts inline
no-icons/index.html     versión B — generada desde index.html, no editar a mano
assets/css/base.css     tokens, escalado para pantallas grandes, reset, tipografía
assets/css/components.css  barra utility, header, nav, paneles, drawer
assets/css/sections.css    andamiaje de la preview — no es parte del menú
assets/js/head.js       una línea, síncrona: agrega la clase `js` antes del primer pintado
assets/js/main.js       módulo ES, un init por feature
assets/images/logo.png  el logo real del sitio (327×94)
scripts/stamp-assets.js sella `?v=` en las referencias CSS/JS
scripts/build-variant.js genera no-icons/ desde index.html
```

## Convenciones de código

Mismas reglas que el repo del sitio:

- `index.html` es **solo markup**. Cero `style=""`, cero bloques `<style>`, cero
  handlers inline (`onclick=`…). Los dos scripts se cargan por `src`.
- Los estilos viven en los tres CSS; el comportamiento, en los dos JS. El JS tampoco
  escribe estilos: el bloqueo de scroll del drawer es una clase (`body.nav-open`), no
  `element.style`.
- `assets/js/main.js` es un módulo ES: `const` y `let`, arrow functions, un `init` por
  feature. No hay `var` en el proyecto.

## Design system

Todos los colores, tamaños, radios, sombras y curvas de easing salen de `DESIGN.md`.
Lo único que este menú agrega son valores que el sistema no define porque nada más en
el sitio los necesita — están agrupados bajo `Menu additions` en `base.css`:

| Token | Para qué |
|---|---|
| `--color-open` / `--color-open-soft` | punto de estado 24/7 y el maletín de Careers |
| `--color-red-tint` | fondo del link destacado en hover |
| `--alert-h`, `--header-h`, `--logo-h`, `--nav-btn-pad` | alturas y ritmo del header |
| `--panel-w`, `--panel-w-wide`, `--shadow-panel` | paneles desplegables |

Una desviación consciente: el logo va a `3.55rem` en vez de los `3.85rem` del sitio.
El header del sitio lleva cinco links cortos; este lleva cinco etiquetas desplegables
largas y necesita el ancho.

## Estructura del menú

**Tier 1 — Utility:** estado "Open 24/7", Careers y Patient Intake Form.

**Tier 2 — Main:** logo, cinco desplegables (Symptoms & Conditions, Emergency Care,
Your Visit, Our Hospital, Contact Us) y el teléfono. Los referrals viven dentro de
Contact Us; no hay pestaña separada de "For Veterinarians".

## Paneles

Los 30 destinos están repartidos en **10 grupos con nombre**, y cada uno lleva una línea
sobre qué es. La estructura la cargan los grupos — etiqueta chica en versalitas sobre
una línea de 1px — así las filas pueden quedarse calladas: título, descripción apagada,
y un ícono de 16px al lado, sin recuadro de color detrás.

Las descripciones de servicios son las del propio sitio (sección *services* de su
`index.html`), no texto inventado.

- **Emergency Care** (Treatment · Stabilization / Diagnostics · Continuing care) y
  **Our Hospital** (The hospital / For pet owners) abren en dos columnas. En una sola
  se pasaban del fold en una pantalla de 720p.
- **Symptoms & Conditions** arranca con *Is This an Emergency?* marcado con una regla
  roja y separado por una línea — no una tarjeta.
- **Contact Us** cierra con un colofón: estado, dirección y el teléfono como número
  tipográfico grande, no como botón.
- En el drawer las descripciones se ocultan: ahí estás scrolleando una lista, y con
  descripciones Emergency Care ocupaba una pantalla entera de teléfono.

El rojo se gasta en una sola cosa por panel como máximo, para que siga significando algo
cuando aparece.

El sprite de íconos copia el del sitio hasta `#icon-star`; los siete de abajo
(`clipboard`, `layers`, `credit-card`, `help`, `building`, `book`, `send`) son agregados
del menú, dibujados con la misma especificación (24×24, trazo 1.8, puntas redondeadas).

## Responsive

La barra baja en tres etapas antes de convertirse en drawer, porque cinco etiquetas
largas + el wordmark + el teléfono no entran en una sola fila a cualquier ancho:

| Ancho | Qué cambia |
|---|---|
| ≥ 1301px | logo 3.55rem, nav 0.9rem |
| ≤ 1300px | logo 3.3rem, nav 0.875rem, se oculta la tercera nota de estado |
| ≤ 1240px | logo 2.9rem, nav 0.82rem, CTA más compacto |
| ≤ 1120px | drawer lateral; los quick links pasan adentro |
| ≤ 600px | logo 2.25rem, se oculta la segunda nota de estado |
| ≤ 380px | todo se comprime para que entre en 320px |

Hacia arriba no hay breakpoints de layout: todo está en `rem` y lo que crece es la raíz,
así el menú mantiene sus proporciones en vez de quedar como una franja en el centro de
un monitor grande.

| Viewport | `html` |
|---|---|
| < 1920px | 16px |
| ≥ 1920px | 17px |
| ≥ 2560px | 20px |
| ≥ 3440px | 24px |
| ≥ 3840px (4K) | 28px |
| ≥ 5120px (5K) | 36px |

A 5K el contenedor mide 80rem × 36px = 2880px. Verificado en **35 anchos de escritorio
(1121 → 5120)**, **19 de drawer (320 → 1120)** y **3 de teléfono en horizontal**
(932×430, 844×390, 740×360): sin scroll horizontal, sin colisiones entre logo / nav /
CTA, la raíz escalando en cada escalón, los paneles contenidos dentro del viewport
—con altura realista por resolución, no 720p fingido en 5K— y el drawer scrolleando
con el último link alcanzable en pantallas de 360px de alto.

## Accesibilidad

- Patrón *disclosure navigation*: `aria-expanded` + `aria-controls` en cada botón.
- Teclado: `↓` / `↑` abren el panel y recorren los links, `Home` / `End` saltan a los
  extremos, `Esc` cierra primero el panel y después el drawer.
- El drawer cerrado usa `visibility: hidden`, así sus links no quedan en el orden de
  tabulación. Abierto atrapa el foco y se lo devuelve al botón al cerrarse.
- Sin JS los paneles abren con `:hover` / `:focus-within`, y en mobile la lista se
  apila siempre visible.
- Todo el movimiento está detrás de `prefers-reduced-motion`.

## Notas

- Dos destinos (*Is This an Emergency?*, *FAQs*) son páginas nuevas que todavía no
  existen en el sitio en producción.
- Los links internos son rutas absolutas (`/careers`, `/faqs`, …) pensadas para el
  dominio final, así que en GitHub Pages no resuelven.

## Deploy

GitHub Pages sirve `main` desde la raíz. Antes de commitear:

```
node scripts/stamp-assets.js && node scripts/build-variant.js
```

Lo primero actualiza el `?v=` de los CSS/JS para que Pages no sirva archivos viejos
durante los 10 minutos de caché. Lo segundo regenera `no-icons/` desde `index.html`,
heredando ese mismo sello — de ahí que el orden importe.
