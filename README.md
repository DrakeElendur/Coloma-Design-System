# Coloma Design System

El design system personal y open source de **Carlos Coloma**, Design System Manager. Construido desde cero, pieza por pieza, como activo de portafolio: 100% propio, publicable y demostrable.

## Qué es esto

Un monorepo con dos entregables:

- **[`packages/tokens`](./packages/tokens)** — paquete de design tokens en formato estándar **[DTCG](https://tr.designtokens.org/format/)** (W3C), licencia MIT, publicado en NPM como `@coloma-design/tokens`.
- **[`apps/token-viewer`](./apps/token-viewer)** — visor que documenta esos tokens visualmente: una galería agrupada por categoría, con muestra visual, nombre y valor de cada uno, y construida enteramente con **Web Components nativos** (Custom Elements + Shadow DOM), sin ningún framework de por medio.

## Arquitectura y decisiones

| Decisión | Elección | Por qué |
|---|---|---|
| Monorepo | npm workspaces | Nativo, sin herramientas de build adicionales |
| Formato de tokens | DTCG (W3C) | Estándar de industria, con soporte de alias/referencias entre tokens |
| Capas de tokens | Primitivas → Semánticas | Las semánticas nunca usan valores literales, solo referencias a primitivas |
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
│       ├── primitive.json
│       ├── semantic.json
│       └── package.json
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

## El visor

Una galería que:

- Aplana la estructura anidada de ambos archivos de tokens con una función recursiva propia.
- Resuelve las referencias de alias de la capa semántica contra la capa primitiva, mostrando siempre el valor final.
- Agrupa los tokens por categoría real (no por tipo DTCG) y los renderiza con un único Custom Element (`<token-swatch>`) que adapta su vista según el tipo de token.

## Estado del proyecto

- [x] Fase 0-1 — Setup del monorepo con npm workspaces
- [x] Fase 2 — Capa de primitivas en DTCG válido
- [x] Fase 3 — Capa semántica con aliases, sin valores literales
- [x] Fase 4 — Motor de aplanado recursivo de tokens
- [x] Fase 5 — Primer Web Component (`token-swatch`) con Shadow DOM
- [x] Fase 6 — Galería completa agrupada por categoría, con resolución de alias
- [ ] Fase 7 — Copiar tokens al portapapeles
- [ ] Fase 8 — Documentación final, despliegue del visor y publicación en NPM

## Cómo correrlo localmente

```bash
npm install
npm run dev -w apps/token-viewer
```

## Licencia

[MIT](./LICENSE)

## Autor

**Carlos Coloma** — Design System Manager · [coloma.design](https://coloma.design)
