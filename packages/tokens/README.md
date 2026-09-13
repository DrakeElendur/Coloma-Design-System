# @coloma-design/tokens

Design tokens del **Coloma Design System**, en formato estándar **[DTCG](https://tr.designtokens.org/format/)** (W3C Design Tokens Community Group). Sin build step, sin dependencias — solo JSON.

## Qué es

Un paquete de tokens de diseño organizado en dos capas:

- **Primitivas** — los valores crudos del sistema (color, espaciado, tipografía, radios, sombras, z-index). Sin significado semántico propio.
- **Semánticas** — el vocabulario de uso real (`content`, `surface`, `border`). Cada valor es un *alias* a una primitiva — nunca un valor literal.

Publicado bajo licencia MIT, pensado para ser adoptado libremente.

## Instalación

```bash
npm install @coloma-design/tokens
```

> **Nota:** este paquete aún no ha sido publicado en NPM (pendiente en el roadmap del proyecto). Mientras tanto, se consume directamente dentro del monorepo vía npm workspaces.

## Arquitectura de capas

### Primitivas (`primitive.json`)

| Grupo | Contenido |
|---|---|
| `color` | 8 familias × 7 pasos (`primary`, `accent`, `neutral`, `dark_alpha`, `light_alpha`, `red`, `green`, `yellow`) |
| `spacing` | Escala de 11 pasos, en `px` |
| `fontFamily` | `primary` (Montserrat), `secondary` (Playfair Display) |
| `fontSize` | 8 pasos, en `rem` |
| `fontWeight` | `regular` (400), `medium` (500), `bold` (700) |
| `lineHeight` | 8 pasos, unitless |
| `letterSpacing` | 8 pasos, en `em` |
| `radius` | 6 pasos, en `px` (incluye `9999` para formas de píldora) |
| `shadow` | 3 niveles, valor compuesto (`color`, `offsetX`, `offsetY`, `blur`, `spread`) |
| `zIndex` | 6 pasos, unitless |

### Semánticas (`semantic.json`)

Un único eje de color, organizado en tres propiedades:

| Eje | Roles |
|---|---|
| `content` | `action`, `feedback`, `state`, `effect` |
| `surface` | `action`, `feedback`, `state`, `effect`, `overlay` |
| `border` | `action`, `feedback`, `state`, `effect` |

**Regla no negociable de esta capa:** ningún token semántico tiene un valor literal. Todos son alias hacia una primitiva, con la forma `"{color.primary.100}"`.

## Cómo consumirlo

Al ser JSON plano, se importa directamente — sin build step:

```js
import primitivas from '@coloma-design/tokens/primitive.json';
import semanticas from '@coloma-design/tokens/semantic.json';
```

Cada token sigue la forma estándar DTCG:

```json
{
  "$value": "...",
  "$type": "color"
}
```

Al ser un formato estándar, es compatible con herramientas del ecosistema como **Style Dictionary** para pipelines de transformación a CSS/JS — esa integración no forma parte de este paquete todavía, pero el formato ya está preparado para ella.

## Licencia

[MIT](../../LICENSE)
