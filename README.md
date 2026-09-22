# Mason Dixon — Menú de navegación

Header de dos niveles para Mason Dixon Animal Emergency Hospital, construido sobre el
design system del sitio principal
([imageworksc/mason-dixon](https://github.com/imageworksc/mason-dixon) → `DESIGN.md`).

**Demo en vivo:** https://imageworksc.github.io/menu-mason-dixon/

## Estructura

Misma organización de archivos que el repo del sitio, para que el menú se pueda mover
tal cual:

```
index.html              solo markup — sin estilos ni scripts inline
assets/css/base.css     tokens, escalado para pantallas grandes, reset, tipografía
assets/css/components.css  barra utility, header, nav, paneles, drawer
assets/css/sections.css    la ficha técnica de esta preview (no es parte del menú)
assets/js/head.js       una línea, síncrona: agrega la clase `js` antes del primer pintado
assets/js/main.js       módulo ES, un init por feature
assets/images/logo.png  el logo real del sitio (327×94)
scripts/stamp-assets.js sella `?v=` en las referencias CSS/JS
```

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

Los 30 destinos llevan un ícono y una línea sobre qué son, para que el panel se lea de
un vistazo en vez de tener que descifrarlo. Las descripciones de servicios son las del
propio sitio (sección *services* de su `index.html`), no texto inventado.

- **Emergency Care** y **Our Hospital** abren en dos columnas (10 y 8 destinos).
  En una sola columna se pasaban del fold en una pantalla de 720p.
- **Symptoms & Conditions** arranca con *Is This an Emergency?* como bloque destacado
  en rojo — es lo primero que alguien en pánico tiene que encontrar.
- **Contact Us** cierra con la dirección y un botón de llamada, así no hace falta
  abrir una página para conseguir el dato.
- En el drawer las descripciones se ocultan: ahí estás scrolleando una lista, y con
  descripciones Emergency Care ocupaba una pantalla entera de teléfono.

El sprite de íconos copia el del sitio hasta `#icon-star`; los ocho de abajo
(`alert`, `clipboard`, `layers`, `credit-card`, `help`, `building`, `book`, `send`)
son agregados del menú, dibujados con la misma especificación (24×24, trazo 1.8,
puntas redondeadas).

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

Verificado en 24 anchos de escritorio (320–2560px) y 19 de drawer: sin scroll
horizontal, sin colisiones entre logo / nav / CTA, y con todos los paneles contenidos
dentro del viewport incluso en una pantalla de 720p.

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
node scripts/stamp-assets.js
```

Eso actualiza el `?v=` de los CSS/JS para que Pages no sirva archivos viejos durante
los 10 minutos de caché.
