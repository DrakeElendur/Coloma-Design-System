# @coloma-design/tokens

Design tokens del **Coloma Design System**, en formato estándar **[DTCG](https://tr.designtokens.org/format/)** (W3C Design Tokens Community Group), con un pipeline de **[Style Dictionary](https://styledictionary.com/)** que los transforma en variables CSS listas para usar.

## Qué es

Un paquete de tokens de diseño organizado en dos capas:

- **Primitivas** — los valores crudos del sistema (color, espaciado, tipografía, radios, sombras, z-index). Sin significado semántico propio.
- **Semánticas** — el vocabulario de uso real (`content`, `surface`, `border`). Cada valor es un *alias* a una primitiva — nunca un valor literal.

El paquete distribuye ambas capas en dos formatos, según lo que necesites:

- **JSON fuente** (DTCG) — para inspeccionar los tokens en crudo o alimentar tu propio pipeline de transformación.
- **Variables CSS** ya compiladas — generadas automáticamente a partir del JSON fuente, listas para importar en cualquier hoja de estilos sin que tengas que correr ningún build de tu lado.

Publicado bajo licencia MIT, pensado para ser adoptado libremente.

## Instalación

```bash
npm install @coloma-design/tokens
```

Dentro de este monorepo, se consume directamente vía npm workspaces sin necesidad de instalarlo por separado.

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

Dos formas de consumo, según lo que necesites.

### JSON fuente

Se importa directamente, sin build step de tu lado:

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

Los alias de la capa semántica (`"{color.primary.100}"`) llegan sin resolver — quien consuma este JSON directo es responsable de resolverlos contra la capa primitiva.

### Variables CSS

```css
@import '@coloma-design/tokens/css';
```

Expone todas las variables como custom properties bajo `:root`, con nombres en kebab-case (por ejemplo, `--color-primary-100`). A diferencia del JSON fuente, aquí los alias de la capa semántica **ya vienen resueltos** al valor final de su primitiva — no hay referencias `{...}` sin resolver en el CSS.

Esta salida se genera con [Style Dictionary](https://styledictionary.com/) a partir de los mismos dos archivos JSON fuente. El build corre automáticamente en cada `npm install` de este paquete (hook de ciclo de vida `prepare`), así que la salida CSS siempre está sincronizada con el JSON — nunca hay que regenerarla a mano.

## Licencia

[MIT](../../LICENSE)
