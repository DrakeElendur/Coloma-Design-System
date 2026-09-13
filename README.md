# Coloma Design System

El design system personal y open source de **Carlos Coloma**, Design System Manager. Construido desde cero, pieza por pieza, como activo de portafolio: 100% propio, publicable y demostrable.

## Qué es esto

Un monorepo con dos entregables:

- **[`packages/tokens`](./packages/tokens)** — paquete de design tokens en formato estándar **[DTCG](https://tr.designtokens.org/format/)** (W3C), licencia MIT, publicado en NPM como `@coloma-design/tokens`. Incluye un pipeline con **Style Dictionary** que transforma el JSON fuente en variables CSS listas para consumir.
- **[`apps/token-viewer`](./apps/token-viewer)** — visor que documenta esos tokens visualmente: una galería agrupada por categoría, con muestra visual, nombre y valor de cada uno, y construida enteramente con **Web Components nativos** (Custom Elements + Shadow DOM), sin ningún framework de por medio.

## Arquitectura y decisiones

| Decisión | Elección | Por qué |
|---|---|---|
| Monorepo | npm workspaces | Nativo, sin herramientas de build adicionales |
| Formato de tokens | DTCG (W3C) | Estándar de industria, con soporte de alias/referencias entre tokens |
| Capas de tokens | Primitivas → Semánticas | Las semánticas nunca usan valores literales, solo referencias a primitivas |
| Pipeline de tokens | Style Dictionary | Transforma el JSON fuente en variables CSS, resolviendo los alias automáticamente |
| Build del visor | Vite (vanilla) | DOM puro, sin dependencia de ningún framework de UI |
| UI del visor | Web Components (Custom Elements + Shadow DOM) | Encapsulación de estilos real; el componente funciona igual en cualquier stack |
| Licencia | MIT | Busca adopción |

## Estructura del repositorio

```
coloma-design-system/
├── package.json          # raíz, privada, declara los workspaces
├── LICENSE               # MIT
├── packages/
│   └── tokens/           # 📦 paquete publicable en NPM
│       ├── tokens/
│       │   ├── primitive.json
│       │   └── semantic.json
│       ├── config.json          # configuración de Style Dictionary
│       ├── dist/
│       │   └── css/
│       │       └── variables.css   # generado por Style Dictionary, no versionado en git
│       ├── package.json
│       └── README.md
└── apps/
    └── token-viewer/      # 🔍 visor desplegable
        └── src/
            ├── main.js
            ├── flattenTokens.js
            ├── resolverAlias.js
            └── components/
                └── token-swatch.js
```

`packages/` contiene lo publicable · `apps/` contiene lo desplegable.

## Los tokens

Dos capas, sin excepciones:

- **Primitivas** (`primitive.json`) — los valores crudos del sistema: color (8 familias × 7 pasos), espaciado, tipografía (familias, tamaños, pesos, interlineado, tracking), radios, sombras y z-index. No tienen significado semántico propio.
- **Semánticas** (`semantic.json`) — el vocabulario de uso real (`content`, `surface`, `border`, cada uno con sus roles de acción, feedback, estado y efecto). Cada valor es un alias a una primitiva — ningún valor literal.

## El pipeline

`packages/tokens` transforma ambos archivos con **Style Dictionary** en variables CSS (`--color-primary-100`, etc.), con los alias de la capa semántica ya resueltos al valor final de su primitiva. El build corre automáticamente en cada `npm install` del paquete — nunca hace falta regenerarlo a mano. Detalle completo de consumo (JSON fuente vs. CSS compilado) en [`packages/tokens/README.md`](./packages/tokens/README.md).

## El visor

Una galería que:

- Aplana la estructura anidada de ambos archivos de tokens con una función recursiva propia.
- Resuelve las referencias de alias de la capa semántica contra la capa primitiva, mostrando siempre el valor final.
- Agrupa los tokens por categoría real (no por tipo DTCG) y los renderiza con un único Custom Element (`<token-swatch>`) que adapta su vista según el tipo de token.

## Estado del proyecto

- [x] **Proyecto 1 — Tokens + visor.** Completo: monorepo con npm workspaces, dos capas de tokens en DTCG válido, motor de aplanado recursivo, primer Web Component con Shadow DOM, galería completa agrupada por categoría, copiar al portapapeles con `async`/`await`, documentación, visor desplegado en Vercel y paquete publicado en NPM (`@coloma-design/tokens@0.1.0`).
- [x] **Proyecto 2 — Pipeline Style Dictionary.** Completo: transformación JSON → variables CSS, con los alias ya resueltos y el build automatizado en cada instalación.
- [ ] **Proyecto 3 — Capa de componentes.** Pospuesto. Primer componente planeado: `Button`, consumiendo las variables CSS del Proyecto 2.

## Cómo correrlo localmente

```bash
npm install
npm run dev -w apps/token-viewer
```

`npm install` desde la raíz también regenera las variables CSS de `packages/tokens` automáticamente.

## Licencia

[MIT](./LICENSE)

## Autor

**Carlos Coloma** — Design System Manager · [coloma.design](https://portafolio.coloma.design)
