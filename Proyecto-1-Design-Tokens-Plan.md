# Proyecto 1 — Tu Design System open source (tokens + visor)
### Plan de fin de semana · Modo tutor

**Para:** Carlos Coloma · **Fecha:** 1 ago 2026
**Qué construyes:** un paquete de **design tokens propio, open source y publicable en NPM**, más un **visor** que los documenta visualmente.
**Tech nueva:** Vite · Web Components (Custom Elements + Shadow DOM) · npm workspaces
**Huecos de JS que cierra:** `Object.entries()` · DOM · eventos · y un primer encuentro *con sentido* con `async/await`

---

## ⚠️ Regla de este documento: aquí no hay código

Este plan te da **arquitectura, decisiones, conceptos y retos** — no soluciones. Tu portafolio lo escribiste línea por línea y eso es precisamente lo que te hizo aprender; no vamos a romper ese método ahora.

Donde aparece un bloque de texto técnico es porque es un **estándar externo** que necesitas conocer (el formato DTCG), no lógica tuya. **Todo el JavaScript lo escribes tú.** Yo te acompaño con preguntas cuando te trabes.

---

## 1 · Por qué este proyecto es tu mejor jugada de carrera

Tu instinto con el NDA es correcto y profesionalmente maduro. Pero conviene ver la oportunidad que hay detrás:

**Con FrYDA** siempre existirá la duda —justa— de cuánto del sistema fue decisión tuya y cuánto herencia del equipo o de la marca. No es cuestionar tu liderazgo: es cómo lo lee un evaluador externo que no puede ver el repo.

**Con un sistema propio y público**, cada decisión es demostrablemente tuya, cada commit lleva tu nombre, y puedes enseñarlo, publicarlo e instalarlo sin pedir permiso. Para un rol de DS Manager eso vale más que cualquier captura que no puedas mostrar.

Y hay un efecto compuesto: estos tokens van a alimentar tu portafolio (que ya usa Tailwind v4), tus componentes del Proyecto 2 y el pipeline del Proyecto 3. Un solo activo, cuatro proyectos.

---

## 2 · El firewall de NDA (léelo antes de abrir el editor)

La línea que separa lo que puedes usar de lo que no es clara: **el know-how es tuyo; los activos son de Yanbal.**

### ✅ Te lo llevas puesto (es tu experiencia profesional)
- La **arquitectura** de un sistema de tokens en capas (primitivas → semánticas → componente).
- Las **convenciones de nomenclatura como método** (categoría-propiedad-variante-escala).
- El **criterio de gobernanza**: qué se versiona, qué rompe, cómo se deprecia.
- Los **patrones de pipeline** design-to-code.
- Las **lecciones aprendidas** sobre adopción y mantenimiento de un sistema.

### ❌ Nunca cruza (son activos protegidos)
- Valores concretos de los tokens de FrYDA (hex, escalas, medidas específicas).
- La paleta o identidad de marca de Yanbal.
- El inventario o los nombres propios de componentes de FrYDA.
- Código, capturas, archivos de Figma, documentación interna, enlaces.
- Cualquier dato que revele decisiones de producto de Yanbal.

### ⚠️ Zona gris — resuélvela por el lado seguro
- **No replicar nombres distintivos.** Si un nombre de token de FrYDA es característico, deriva el tuyo. Convenciones genéricas del sector (`color-text-primary`) son estándar y no son propiedad de nadie.
- **No copiar la escala exacta** si es distintiva. Diseña la tuya desde tu criterio.

### 🧼 Higiene práctica
**No tengas el repo de FrYDA abierto mientras trabajas en este proyecto.** No es desconfianza: es que el copy-paste accidental es real y así lo eliminas de raíz. Si necesitas consultar algo de arquitectura, escríbelo de memoria — si lo entiendes de verdad, te saldrá; y lo que te salga será tuyo.

> El caso de estudio que ya escribiste demuestra que sabes hablar de FrYDA sin comprometerlo. Aplica el mismo criterio aquí.

---

## 3 · Decisiones a tomar antes de codear (sábado, 30 min)

### 3.1 Nombre del paquete
Necesitas un nombre npm disponible. Tres caminos:

| Opción | Ejemplo | Nota |
|---|---|---|
| Scoped bajo tu usuario | `@tuusuario/tokens` | Gratis y público; el *scope* es tu usuario npm. Recomendado |
| Scoped bajo organización | `@coloma-design/tokens` | Requiere crear una org en npm (gratis para paquetes públicos) |
| Sin scope | `coloma-tokens` | Más simple, pero el nombre debe estar libre |

Verifica disponibilidad en npmjs.com antes de decidir. **Sugerencia:** un *scope* propio te deja espacio para `/tokens`, `/components`, `/icons` después — encaja con el monorepo.

### 3.2 Licencia
**MIT.** Es la estándar de facto en design systems open source, permisiva y comprensible. Ojo con el contraste: la licencia de tu portafolio es restrictiva (contenido propio, correcto); esta es lo opuesto a propósito, porque aquí quieres adopción.

### 3.3 Formato de tokens: DTCG (el estándar)
Usa el formato del **Design Tokens Community Group (W3C)**. Tres razones:

1. Es el estándar hacia el que converge la industria (Tokens Studio, Style Dictionary v4, Figma).
2. **Style Dictionary lo consume nativamente** — el Proyecto 3 te va a salir casi solo.
3. Como DS Manager, adoptar el estándar en vez de inventar el tuyo es exactamente la señal de criterio que quieres dar.

La forma del estándar (esto es documentación externa, no tu lógica):

```jsonc
{
  "color": {
    "blue": {
      "500": { "$value": "#3b82f6", "$type": "color" }
    }
  }
}
```

Las claves con `$` son del estándar: `$value`, `$type`, `$description`. Una referencia a otro token se escribe entre llaves: `"{color.blue.500}"`.

> 📖 **Tarea de lectura (20 min):** la especificación del DTCG. No entera — busca `$value`, `$type`, los tipos permitidos (`color`, `dimension`, `fontFamily`, `duration`) y cómo funcionan los *aliases*. Es lectura de norma técnica: una habilidad de DS Manager por sí misma.

### 3.4 Arquitectura en dos capas (tres, más adelante)
Para este fin de semana, dos capas. La tercera llega con los componentes del Proyecto 2.

- **Capa 1 — Primitivas.** El inventario crudo, sin significado: `color.blue.500`, `space.4`, `fontSize.16`. Nadie las consume directamente.
- **Capa 2 — Semánticas.** El significado, referenciando primitivas: `color.text.primary → {color.blue.900}`, `color.surface.default`. **Esta es la capa que consume tu portafolio.**
- *(Capa 3 — Componente, en el Proyecto 2: `button.background.default`.)*

**El punto pedagógico:** la capa semántica es lo que permite cambiar de tema sin tocar los componentes. Si entiendes *por qué* existe esa indirección, entiendes el 70% de la arquitectura de tokens.

### 3.4b ¿Y si diseño las variables en Figma primero?

Puedes — y de hecho **es buena idea diseñarlas ahí**, porque elegir 27 colores a ciegas en un JSON es peor que verlos. Pero con una condición: **el JSON de este proyecto se escribe a mano.**

**Por qué no automatizar el export ahora:**

1. **Pedagógico.** Exportar te salta justo la parte donde interiorizas el formato DTCG y el **mecanismo de aliases**. Peor: muchos plugins **resuelven los aliases a valores literales**, lo que destruiría tu capa semántica — el concepto central del proyecto.
2. **Estratégico.** La sincronización Figma↔código **es el Proyecto 3**. Hacerla ahora le quita su razón de ser.
3. La transcripción manual no es trabajo perdido: **es el aprendizaje**.

**⚠️ Si creas la librería en Figma: hazlo en tu cuenta y archivo personal, nunca en el workspace de Yanbal.** Construirla dentro de la organización enreda el activo con la propiedad intelectual de tu empleador y contamina justo lo que este proyecto busca mantener limpio.

**Para cuando llegue el Proyecto 3** (contexto técnico ya investigado):

- **Vías viables:** plugins de comunidad que exportan a DTCG (*Token Press*, *Tokens Bruecke*, *Design Token Exporter*) o **Tokens Studio** (sincroniza con GitHub; su formato nativo no es exactamente DTCG pero exporta a él).
- **Descartada:** la **Variables REST API de Figma requiere plan Enterprise** con asiento Full — no es opción en cuenta personal.
- **Dato útil:** las variables de Figma agrupan con `/` (`color/blue/500`), que mapea limpiamente al anidamiento del JSON.
- **Problema conocido:** los exports salen sucios (aliases resueltos, modos verbosos, metadata del plugin). Limpiarlos es trabajo real de DS Manager.
- **La pregunta de gobernanza que resolverás ahí:** ¿*Figma-first* (diseño manda, se exporta al repo) o *code-first* (el JSON manda, se importa a Figma)? No hay respuesta única: es criterio, y es exactamente lo que se le pide a un DS Manager.

### 3.5 Estructura del monorepo
Con **npm workspaces** — nativo de npm, sin herramientas extra. Aprendes el concepto sin pelearte con Turborepo.

```text
coloma-design-system/
├── package.json               # raíz, privada, declara los workspaces
├── LICENSE                    # MIT
├── README.md
├── packages/
│   └── tokens/                # 📦 el paquete NPM publicable
│       ├── package.json
│       ├── README.md
│       └── tokens/
│           ├── primitives.json
│           └── semantic.json
└── apps/
    └── token-viewer/          # 🔍 el visor (Vite + Web Components)
        ├── package.json
        ├── index.html
        └── src/
```

`packages/` = lo que se publica · `apps/` = lo que se despliega. Es la convención real de los monorepos de design systems.

---

## 4 · El plan del fin de semana, por fases

Cada fase termina en un **commit**. Si una fase se alarga, corta alcance — no te salgas del fin de semana.

### 🗓️ SÁBADO

#### Fase 1 · Setup del monorepo (1 h)
Crear el repo, el `package.json` raíz con el array de `workspaces`, el `.gitignore`, la licencia MIT y un `npm install` desde la raíz.

- **Concepto nuevo:** qué es un *workspace* y por qué `node_modules` se instala una sola vez en la raíz (*hoisting*).
- **Pregunta para responderte:** ¿por qué el `package.json` de la raíz debe llevar `"private": true`?
- ✅ *Commit:* `chore: inicializar monorepo con npm workspaces`

#### Fase 2 · Diseñar las primitivas (1,5-2 h) — tu terreno
La parte de diseñador, y la más importante del proyecto. Sin código todavía.

Define tu inventario crudo en `primitives.json` (formato DTCG). Recomendación de alcance para no ahogarte:

- **Color:** 2-3 familias (una de marca, una neutra, y opcionalmente una de acento) × 9 pasos (50→900).
- **Espaciado:** una escala de 6-8 pasos. Decide si es lineal (4, 8, 12…) o modular.
- **Tipografía:** familias (ya tienes Figtree y Montserrat en tu portafolio), 6-7 tamaños, 3-4 pesos.
- **Radios y sombras:** 3-4 pasos cada uno.

**Decisiones que debes poder justificar** (esto es lo que te preguntarán en una entrevista): ¿por qué esa escala y no otra? ¿por qué 9 pasos de color? ¿qué criterio usaste para los neutros?

- ✅ *Commit:* `feat(tokens): agregar capa de primitivas en formato DTCG`

#### Fase 3 · Diseñar las semánticas (1 h)
En `semantic.json`, define los tokens con significado que **referencian** primitivas mediante aliases.

Mínimo útil: `text` (primary, secondary, muted, inverse), `surface` (default, subtle, raised), `border` (default, strong), `interactive` (default, hover, pressed, disabled), y estados (`success`, `warning`, `danger`, `info`).

- **Reto de criterio:** un token semántico **nunca** debe llevar un valor literal. Si te ves escribiendo un hex aquí, falta una primitiva.
- ✅ *Commit:* `feat(tokens): agregar capa semántica con aliases`

#### Fase 4 · Vite + leer el JSON (1,5 h) — aquí entra el JS
Levanta el visor con Vite (`vanilla`, sin framework) e importa los JSON de tokens.

- **Hueco que cierras:** `Object.entries()`. Tu JSON es un **objeto anidado**, no un array — `map()` solo no te sirve. Tendrás que recorrer niveles.
- **El reto real:** el anidamiento es de profundidad variable (`color.blue.500` son tres niveles; `space.4` son dos). Necesitas una función que **aplane** el objeto a una lista de `{ nombre, valor, tipo }`.
- **Pregunta guía:** ¿cómo sabes si llegaste a un token o si todavía estás en un grupo intermedio? *(Pista: mira qué claves tiene el objeto. El estándar DTCG te da la respuesta.)*
- Si te trabas: escríbeme *"explícame cómo pensar el recorrido de un objeto anidado, sin darme el código"*.
- ✅ *Commit:* `feat(viewer): aplanar tokens anidados a lista consumible`

#### Fase 5 · Tu primer Web Component (2 h)
Un Custom Element que muestre **un** token: su muestra visual, su nombre y su valor.

- **Concepto nuevo:** `class ... extends HTMLElement`, `customElements.define()`, el ciclo de vida (`connectedCallback`), y **Shadow DOM** (encapsulación de estilos).
- **El "ajá" conceptual:** el Shadow DOM aísla tus estilos del resto de la página. Por eso un Web Component funciona en cualquier framework — y por eso un DS necesita entenderlo.
- **Decisión de diseño:** ¿cómo le pasas datos al componente, por atributos HTML o por propiedades JS? Los atributos solo aceptan strings. Piénsalo antes de elegir.
- **Ojo:** un componente que muestra un color y uno que muestra un espaciado necesitan render distinto. ¿Un componente con variantes, o varios componentes? *Es una decisión de DS, no de código* — y es exactamente el tipo de decisión que define tu rol.
- ✅ *Commit:* `feat(viewer): agregar componente de muestra de token`

### 🗓️ DOMINGO

#### Fase 6 · La galería completa (2 h)
Renderiza todos los tokens agrupados por categoría, con encabezados de sección.

- **JS que practicas:** `filter()` por tipo, `Object.entries()` para agrupar, creación de nodos en el DOM.
- **Trabajo de diseño:** esto es documentación de un DS — la jerarquía visual importa. Aplica tu criterio de UX: ¿cómo se escanea una galería de 80 tokens?
- ✅ *Commit:* `feat(viewer): renderizar galería agrupada por categoría`

#### Fase 7 · Copiar al portapapeles (1 h) — 🎯 tu momento `async`
Click en un token → copia su nombre. Es la feature más útil del visor y **está diseñada a propósito para que te topes con la asincronía**.

- `navigator.clipboard.writeText()` **devuelve una Promesa.** Aquí `async/await` deja de ser abstracto: tienes una operación que tarda y puede fallar (permisos del navegador).
- **Preguntas que debes responderte** — son las mismas que te propuse para el Supabase de tu portafolio: ¿por qué esta función necesita ser `async`? ¿qué pasa exactamente durante el `await`? ¿qué hago si falla, y por qué necesito `try/catch`?
- **UX:** dar *feedback* de que se copió. Un estado temporal ("¡Copiado!") que se revierte — practicas eventos y manejo de estado en DOM puro.
- ✅ *Commit:* `feat(viewer): copiar nombre de token al portapapeles`

#### Fase 8 · README, deploy y cierre (1,5 h)
- **README del paquete de tokens:** qué es, cómo se instala, la arquitectura de capas, cómo se consume. Ya demostraste que escribes buenos READMEs — este es la portada de tu bandera open source, así que trátalo como pieza de portafolio.
- **Deploy del visor** en Vercel (terreno conocido).
- **Merge a `main`** siguiendo tu flujo de ramas.
- ✅ *Commit:* `docs: documentar arquitectura de tokens y uso del paquete`

#### 🎁 Opcional (si sobra tiempo y energía): publicar en NPM
Publicar `v0.1.0` del paquete de tokens. Es solo JSON, así que el riesgo es bajísimo y la motivación altísima: **tendrías un paquete público con tu nombre este mismo domingo.**

Adelanta parte del aprendizaje del Proyecto 4 (semver, `npm publish`, el campo `files`). Si no llegas, no pasa nada: es su lugar natural.

---

## 5 · Alcance: lo que NO haces este fin de semana

La disciplina de alcance es lo que hizo que tu portafolio saliera. Al backlog de v2:

- Validación de contraste WCAG *(muy alineado a tu perfil — buen candidato para v2)*
- Búsqueda y filtros
- Modo oscuro / theming multi-marca *(llega natural en el Proyecto 3)*
- Exportar a CSS/JS *(eso **es** el Proyecto 3)*
- Integración con la API de Figma
- Consumir estos tokens desde tu portafolio *(hazlo después, con calma)*

---

## 6 · Definición de "terminado"

- [ ] Monorepo con npm workspaces funcionando
- [ ] `primitives.json` y `semantic.json` en formato DTCG válido, con aliases
- [ ] Ningún token semántico con valor literal
- [ ] El visor lee los JSON y aplana el anidamiento correctamente
- [ ] Al menos un Web Component propio con Shadow DOM
- [ ] Galería agrupada por categoría
- [ ] Copiar al portapapeles con feedback visual
- [ ] READMEs (raíz + paquete) escritos
- [ ] Visor desplegado y accesible por URL
- [ ] Historial de commits limpio, mergeado a `main`
- [ ] **Puedes explicar en voz alta por qué existe la capa semántica** ← el más importante

---

## 7 · Cómo pedirme ayuda durante el fin de semana

Ya tienes el bloque de modo tutor para tu `CLAUDE.md` (cópialo también a este repo). Para este proyecto, los pedidos más útiles:

- *"Explícame cómo pensar X, sin darme el código."*
- *"Estoy intentando Y y obtengo Z. Ayúdame a diagnosticarlo con preguntas, no con la solución."*
- *"Revisa el criterio de mi arquitectura de tokens: ¿qué le falta o qué está mal pensado?"* ← aquí sí aporto mucho
- *"Ya lo escribí. Critícalo: ¿qué haría distinto un DS Manager senior?"*

Lo que **no** conviene pedirme: *"escríbeme la función que aplana el objeto"*. Esa función es justo donde vas a aprender `Object.entries()` y recursión.

---

## Resumen

Construyes tu propio design system open source: dos capas de tokens en el estándar DTCG dentro de un monorepo, más un visor en Web Components que los documenta y permite copiarlos. Cero riesgo de NDA, un activo 100% tuyo, base de los tres proyectos siguientes — y en el camino cierras `Object.entries()`, el DOM y tu primer `async/await` con sentido.
