/**
 * Runs synchronously in <head> so the nav's JS-driven states apply before
 * first paint. Without it the CSS falls back to hover/focus-within panels
 * and a stacked mobile list. Everything else lives in main.js.
 */
document.documentElement.classList.add("js");
