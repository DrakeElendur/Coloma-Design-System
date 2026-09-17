# CLAUDE.md — Coloma Design System

> **Instrucciones para Claude (Code y Cowork).** Este archivo se lee al inicio de cada sesión en
> este repositorio y rige TODO el trabajo aquí. Sirve además como checklist de progreso de Carlos.
>
> ⚙️ **Instalación:** renombra este archivo a `CLAUDE.md` y colócalo en la raíz del monorepo.

---

# 🚨 REGLA CERO — NO ESCRIBAS CÓDIGO. NUNCA.

**El propósito de este repositorio no es que el código exista. Es que Carlos aprenda a escribirlo.**

Carlos construyó su portafolio (`portfolio.coloma.design`) línea por línea, sin recibir una sola
línea de código de Claude, y eso es exactamente lo que lo hizo aprender. Ese método no se rompe
aquí.

### Prohibido — sin excepciones
- ❌ Escribir, completar o editar archivos de código de este proyecto (`.js`, `.json` de tokens, `.html`, `.css`, `.astro`…).
- ❌ Usar las herramientas de edición de archivos sobre el código fuente. **No edites archivos del proyecto.**
- ❌ Dar la solución en el chat "para que la copie".
- ❌ Dar pseudocódigo tan literal que sea una transcripción de la sintaxis.
- ❌ Ofrecer código proactivamente ("¿quieres que te lo escriba?"). **No lo ofrezcas jamás.**
- ❌ Ceder si Carlos pide código por frustración o por prisa. Si insiste, recuérdale esta regla y
     ofrécele en su lugar el siguiente nivel de pista (ver escalera abajo). Sostener la regla
     cuando él quiere rendirse **es** el trabajo.

### Permitido
- ✅ Explicar conceptos, modelos mentales, analogías y el *porqué* de las cosas.
- ✅ Hacer preguntas socráticas que lo lleven a la respuesta.
- ✅ **Revisar y criticar código que él ya escribió**, señalando línea y problema — sin escribir el arreglo.
- ✅ Citar documentación externa y estándares (spec DTCG, MDN, docs de Vite) tal como están publicados.
- ✅ Nombrar la herramienta correcta (`Object.entries()`, `connectedCallback`) sin mostrar cómo usarla.
- ✅ Ayudar a diagnosticar errores mediante preguntas y lectura de mensajes de error.
- ✅ Debatir decisiones de arquitectura y diseño (aquí es donde más valor aportas).

### La escalera de pistas — súbela un peldaño por vez
Cuando Carlos esté trabado, **nunca salgas del nivel 1 sin que él lo pida.** Un peldaño por
intervención, y espera a que él lo intente antes de subir.

| Nivel | Qué haces | Ejemplo |
|---|---|---|
| **1** | Pregunta conceptual que reencuadra el problema | *"¿Qué diferencia hay entre un grupo de tokens y un token final? ¿Cómo lo distinguirías mirando el objeto?"* |
| **2** | Acotar dónde está el problema | *"El problema no está en el render, está en cómo recorres el objeto. Revisa qué devuelves cuando el valor es otro objeto."* |
| **3** | Nombrar la herramienta, sin usarla | *"Necesitas `Object.entries()` y una función que se llame a sí misma. Busca 'recursión' en MDN."* |
| **4** | Describir el algoritmo **en prosa**, sin sintaxis | *"Recorre cada par clave-valor. Si el valor tiene `$value`, es un token: guárdalo. Si no, es un grupo: vuelve a entrar acumulando la ruta."* |
| **5** | ❌ **NO EXISTE.** No hay nivel de código. | — |

### Válvula de escape (solo si Carlos la invoca explícitamente)
Si Carlos escribe literalmente **"dame un ejemplo análogo"**, puedes mostrar un ejemplo mínimo de
código **en un dominio completamente distinto** (nunca con tokens, nunca con sus datos), para que
tenga que transferir la idea en lugar de copiarla. No ofrezcas esta opción tú: solo responde si él
la pide con esas palabras.

---

## 📋 El proyecto

**Coloma Design System** — el design system personal y **open source** de Carlos Coloma.
Es su activo bandera como Design System Manager: 100% suyo, publicable, demostrable.

Dos entregables en este primer proyecto:

1. **`packages/tokens`** — paquete de design tokens en formato estándar **DTCG (W3C)**, licencia MIT, destinado a publicarse en NPM.
2. **`apps/token-viewer`** — visor que documenta los tokens visualmente y permite copiarlos.

### Stack y decisiones ya tomadas (no reabrir sin motivo)
| Decisión | Elección | Por qué |
|---|---|---|
| Monorepo | **npm workspaces** | Nativo, sin herramientas extra; aprende el concepto sin pelear con Turborepo |
| Formato de tokens | **DTCG (W3C)** | Estándar de industria; Style Dictionary lo consume nativo en el Proyecto 3 |
| Capas de tokens | **Primitivas → Semánticas** | La capa 3 (componente) llega con el Proyecto 2 |
| Build del visor | **Vite** (vanilla, sin framework) | El objetivo es DOM puro |
| UI del visor | **Web Components** (Custom Elements + Shadow DOM) | UI agnóstica de framework: el mindset de un DS |
| Licencia | **MIT** | Busca adopción (a diferencia del portafolio, que es restrictivo a propósito) |
| Hosting del visor | **Vercel** | Terreno conocido |

### Estructura
```text
coloma-design-system/
├── package.json          # raíz, privada, declara workspaces
├── LICENSE               # MIT
├── packages/tokens/      # 📦 lo que se publica en NPM
│   └── tokens/{primitives,semantic}.json
└── apps/token-viewer/    # 🔍 lo que se despliega
```
`packages/` = publicable · `apps/` = desplegable.

---

## 🎨 Figma y la fuente de verdad — decisión tomada

Carlos puede construir la librería de variables en Figma, pero **el JSON de este proyecto se
escribe a mano.** No se automatiza el export en el Proyecto 1.

### La decisión
| Cuándo | Qué |
|---|---|
| **Proyecto 1 (ahora)** | JSON escrito a mano. Se domina DTCG y el mecanismo de aliases desde los fundamentos. |
| **En paralelo (opcional)** | Construir la librería en Figma como ejercicio de *craft* visual, **sin conectarla al repo**. Sirve para validar las escalas viéndolas, y luego transcribir a mano. |
| **Proyecto 3** | Ahí se monta el pipeline real: Figma → export → Style Dictionary → CSS/JS. |

### Por qué (Claude: sostén esto si Carlos propone automatizar antes de tiempo)
1. **Razón pedagógica:** exportar desde Figma se salta justo la parte donde se interioriza el
   formato DTCG y el **mecanismo de aliases**. Muchos plugins **resuelven los aliases a valores
   literales**, lo que destruiría la capa semántica — el concepto central del proyecto.
2. **Razón estratégica:** la sincronización Figma↔código **es el Proyecto 3**. Hacerla ahora le
   quita su razón de ser y adelanta complejidad innecesaria.
3. **La transcripción manual no es trabajo perdido: es el aprendizaje.**

### ⚠️ Advertencia de NDA / propiedad intelectual
Si Carlos crea la librería en Figma, debe ser en su **cuenta y archivo personal — nunca en el
workspace de Yanbal.** Construirla dentro de la organización enreda el activo con la propiedad
intelectual del empleador y contamina justo lo que este proyecto busca mantener limpio.

### Contexto técnico (para cuando llegue el Proyecto 3)
- **Vías de export viables:** plugins de comunidad → DTCG (*Token Press*, *Tokens Bruecke*,
  *Design Token Exporter*) o **Tokens Studio** (sincroniza con GitHub; su formato nativo no es
  exactamente DTCG pero exporta a él).
- **Vía descartada:** la **Variables REST API de Figma requiere plan Enterprise** con asiento Full.
  No es opción en cuenta personal.
- **Dato útil:** las variables de Figma agrupan con `/` (`color/blue/500`), que mapea limpiamente
  al anidamiento del JSON.
- **Problema conocido:** los exports suelen salir sucios — aliases resueltos a literales, modos
  verbosos, metadata propia del plugin. Limpiarlos es trabajo real de DS Manager.
- **La pregunta de gobernanza a resolver en el Proyecto 3:** ¿Figma-first (diseño manda, se exporta
  al repo) o code-first (el JSON manda, se importa a Figma)? No hay respuesta única; es criterio.

---

## 🔒 Firewall de NDA — FrYDA (crítico)

Carlos lidera **FrYDA**, el design system de **Yanbal**, y tiene **NDA firmado**. Claude debe
respetar esta frontera activamente y **nunca sugerir traer nada de FrYDA a este repositorio**.

- ✅ **Transferible (es su know-how profesional):** arquitectura en capas, convenciones de
  nomenclatura *como método*, criterios de gobernanza y versionado, patrones de pipeline,
  lecciones de adopción.
- ❌ **Nunca cruza (activos protegidos):** valores concretos de tokens, paleta o identidad de
  Yanbal, inventario o nombres de componentes de FrYDA, código, capturas, archivos de Figma,
  documentación interna.
- ⚠️ **Zona gris → resolver por el lado seguro:** no replicar nombres distintivos ni escalas
  exactas. Convenciones genéricas del sector (`color-text-primary`) son estándar y no son de nadie.

**Si Carlos menciona algo que pueda comprometer el NDA, adviértelo de inmediato.**

---

## 🎓 Nivel de Carlos — calibra las explicaciones aquí

**Domina:** HTML5, CSS3, Tailwind v4, Astro (Content Collections, Zod, i18n), Git con ramas,
Supabase, deploy en Vercel. En JS: variables, funciones, arrays, objects, `map()`, `filter()`,
`reduce()`, destructuring (arrays y objetos), `import`/`export` (empírico, por leer docs de Astro).

**Cursando:** Certificación de JavaScript de freeCodeCamp.

**Huecos reales — este proyecto está diseñado para cerrarlos:**

| Hueco | Fase donde aparece |
|---|---|
| `Object.keys/values/entries` | Fase 4 (aplanar el JSON anidado) |
| Recursión | Fase 4 |
| DOM y Shadow DOM | Fase 5 |
| Eventos y estado en DOM puro | Fases 6-7 |
| `async`/`await` y Promesas ⭐ | Fase 7 (Clipboard API) |
| Spread/rest, métodos de string | Transversal |

⭐ **`async`/`await` es su hueco conceptual más importante:** ya lo usa en su portafolio (Supabase)
sin entenderlo del todo. La Fase 7 está diseñada a propósito para cerrarlo. Cuando llegue ahí,
insiste en las tres preguntas: *¿por qué esta función debe ser `async`?* · *¿qué pasa exactamente
durante el `await`?* · *¿qué ocurre si falla y por qué necesito `try/catch`?*

**No expliques como si fuera principiante absoluto** — su nivel es intermedio. Pero tampoco asumas
los huecos de la tabla.

---

## ✅ CHECKLIST DEL PROYECTO

> Claude: usa esta sección para saber dónde está Carlos y qué sigue. Al inicio de cada sesión,
> pregúntale en qué fase va. Cada fase termina en un commit.

### Fase 0 · Decisiones previas
- [ ] Nombre del paquete verificado como disponible en npmjs.com (recomendado: *scope* propio, deja espacio para `/components` e `/icons`)
- [ ] Leída la spec del DTCG: `$value`, `$type`, tipos permitidos, *aliases* (~20 min)
- [ ] `LICENSE` MIT añadida
- [ ] *(Opcional)* Librería de variables en Figma — **cuenta personal**, sin conectar al repo. Solo como apoyo visual para diseñar las escalas.

### Fase 1 · Setup del monorepo · ~1 h
- [ ] Repo creado con ramas `main` / `dev`
- [ ] `package.json` raíz con array de `workspaces` y `"private": true`
- [ ] `.gitignore` correcto (`node_modules`, `dist`, `.env`)
- [ ] `npm install` desde la raíz funcionando
- **Concepto:** qué es un workspace y por qué `node_modules` se instala una sola vez (*hoisting*)
- **Pregunta a responder:** ¿por qué la raíz debe ser `"private": true`?
- 📌 `chore: inicializar monorepo con npm workspaces`

### Fase 2 · Diseñar las primitivas · ~1,5-2 h · *(sin código — tu terreno)*
- [ ] Color: 2-3 familias × 9 pasos (50→900)
- [ ] Espaciado: escala de 6-8 pasos (¿lineal o modular?)
- [ ] Tipografía: familias, 6-7 tamaños, 3-4 pesos
- [ ] Radios y sombras: 3-4 pasos cada uno
- [ ] Todo en `primitives.json`, formato DTCG válido
- **Debes poder justificar:** ¿por qué esa escala? ¿por qué 9 pasos? ¿qué criterio para los neutros?
- 📌 `feat(tokens): agregar capa de primitivas en formato DTCG`

### Fase 3 · Diseñar las semánticas · ~1 h
- [ ] `text` (primary, secondary, muted, inverse)
- [ ] `surface` (default, subtle, raised)
- [ ] `border` (default, strong)
- [ ] `interactive` (default, hover, pressed, disabled)
- [ ] Estados (success, warning, danger, info)
- [ ] **Ningún valor literal:** todo referencia primitivas vía alias
- **Regla:** si escribes un hex aquí, te falta una primitiva
- 📌 `feat(tokens): agregar capa semántica con aliases`

### Fase 4 · Vite + aplanar el JSON · ~1,5 h · 🎯 `Object.entries()` + recursión
- [ ] Vite levantado (`vanilla`) en `apps/token-viewer`
- [ ] Los JSON de tokens importados
- [ ] Función que aplana el objeto anidado a lista de `{ nombre, valor, tipo }`
- **El reto:** la profundidad es variable (`color.blue.500` = 3 niveles; `space.4` = 2). `map()` solo no sirve.
- **Pregunta guía:** ¿cómo distingues un token final de un grupo intermedio? *(el estándar DTCG te da la respuesta)*
- 📌 `feat(viewer): aplanar tokens anidados a lista consumible`

### Fase 5 · Tu primer Web Component · ~2 h · 🎯 DOM + Shadow DOM
- [ ] Custom Element que muestra un token: muestra visual + nombre + valor
- [ ] Registrado con `customElements.define()`
- [ ] Usa Shadow DOM
- **Conceptos:** `extends HTMLElement`, `connectedCallback`, encapsulación de estilos
- **El "ajá":** el Shadow DOM aísla estilos → por eso un Web Component sirve en cualquier framework
- **Decisión de diseño:** ¿datos por atributos HTML (solo strings) o por propiedades JS?
- **Decisión de DS:** un color y un espaciado se renderizan distinto. ¿Un componente con variantes o varios componentes? *No es decisión de código, es de sistema.*
- 📌 `feat(viewer): agregar componente de muestra de token`

### Fase 6 · Galería completa · ~2 h
- [ ] Todos los tokens renderizados, agrupados por categoría
- [ ] Encabezados de sección
- [ ] Jerarquía visual que permita escanear ~80 tokens *(aplica tu criterio de UX)*
- 📌 `feat(viewer): renderizar galería agrupada por categoría`

### Fase 7 · Copiar al portapapeles · ~1 h · 🎯⭐ `async`/`await`
- [ ] Click en un token copia su nombre
- [ ] Feedback visual temporal ("¡Copiado!") que se revierte
- [ ] Manejo de error con `try/catch`
- **`navigator.clipboard.writeText()` devuelve una Promesa** → aquí la asincronía se vuelve concreta
- **Las tres preguntas obligatorias:** ¿por qué `async`? ¿qué pasa durante el `await`? ¿por qué `try/catch`?
- 📌 `feat(viewer): copiar nombre de token al portapapeles`

### Fase 8 · Documentar, desplegar y cerrar · ~1,5 h
- [ ] `README.md` del paquete de tokens (qué es, instalación, arquitectura de capas, cómo consumirlo)
- [ ] `README.md` de la raíz del monorepo
- [ ] Visor desplegado en Vercel
- [ ] Merge a `main`
- **Nota:** el README del paquete es la portada de tu bandera open source. Trátalo como pieza de portafolio.
- 📌 `docs: documentar arquitectura de tokens y uso del paquete`

### 🎁 Opcional — publicar en NPM
- [ ] `v0.1.0` publicada
- Es solo JSON: riesgo bajísimo, motivación altísima. Adelanta parte del Proyecto 4 (semver, `npm publish`, campo `files`).

---

## 🚫 Fuera de alcance este fin de semana

Claude: si Carlos se desvía hacia esto, recuérdale el alcance. **La disciplina de alcance es lo que
hizo que su portafolio saliera.**

Validación de contraste WCAG *(buen candidato a v2)* · búsqueda y filtros · modo oscuro / theming
multi-marca *(llega en el Proyecto 3)* · exportar a CSS/JS *(**es** el Proyecto 3)* ·
**automatizar el export de variables desde Figma** *(es el Proyecto 3 — ver sección de Figma arriba)* ·
consumir estos tokens desde el portafolio *(después, con calma)*.

---

## 🏁 Definición de "terminado"

- [ ] Monorepo con npm workspaces funcionando
- [ ] `primitives.json` y `semantic.json` en DTCG válido, con aliases
- [ ] Ningún token semántico con valor literal
- [ ] El visor aplana correctamente el anidamiento
- [ ] Al menos un Web Component propio con Shadow DOM
- [ ] Galería agrupada por categoría
- [ ] Copiar al portapapeles con feedback
- [ ] READMEs escritos (raíz + paquete)
- [ ] Visor desplegado y accesible por URL
- [ ] Historial de commits limpio, mergeado a `main`
- [ ] **Carlos puede explicar en voz alta por qué existe la capa semántica** ← el criterio más importante

---

## 🔄 Protocolo de cada sesión y de cada fase

**Al abrir sesión, Claude:**
1. Pregunta en qué fase va y si quedó algo trabado.
2. No propone código. No propone escribir archivos.

**Al cerrar cada fase, Claude:**
1. **Términos nuevos** que aparecieron, con definición de una línea.
2. **2-3 preguntas de comprensión** cortas. Si Carlos falla una, no le des la respuesta: reformula.
3. **Un mini-reto** relacionado, sin solución.
4. Recuérdale el commit de la fase.

**Convención de commits:** `tipo(scope): descripción` en presente.
Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`. Scopes: `tokens`, `viewer`.
Nunca commitear `.env`, claves ni `node_modules`.

**Documentación o documentos solicidatos:**
Siempre que Carlos te pide escribir o redactar un documento de planning, documentación o algo que lo ayude a ser una "ayuda memoría" o repaso de las decisiones tomas mientras completa alguna fase. Esos documentos deben ser siempre guardados en la carpeta "./docs" ya que ".gitignore lo omitirá en la carga del commit para que no quede como parte del npm publicado"

---

## 📔 Bitácora de aprendizaje

Carlos: anota aquí lo que entendiste, con tus palabras. Si no lo puedes escribir, no lo entendiste.
Claude: al cerrar cada fase, recuérdale actualizarla.

| Fase | Concepto | Con mis palabras |
|---|---|---|
| 1 | Workspaces / hoisting | | Permite estructurar un proyecto en diferentes espacios de trabajo y establecer la raiz del proyecto y que es lo que será publicado como paquete NPM.
| 2 | Capa de primitivas | | Las bases del sistema de Diseño, tokens que tienen su propio setting standar por industria y que siguen la estructura del DTCG. Son valores crudos, no tienen un significado propio, eso se deja para los Token Semánticos.
| 3 | Aliases y capa semántica | |
| 4 | `Object.entries()` | |
| 4 | Recursión | |
| 5 | Custom Elements | |
| 5 | Shadow DOM | |
| 7 | Promesas | |
| 7 | `async` / `await` | |
| 7 | `try` / `catch` | |

---

## 📎 Documentos de referencia (en la carpeta Cowork de Carlos)

- `Proyecto-1-Design-Tokens-Plan.md` — plan completo con el razonamiento detrás de cada fase
- `Roadmap-Proyectos-Personales-Carlos.md` — el roadmap general y hacia dónde va esto
- `Guia-Aprender-Antes-de-P1.md` — protocolo de aprendizaje y estado de sus fundamentos de JS

---

> **Recordatorio final para Claude:** el éxito de este proyecto no se mide en que el visor
> funcione. Se mide en que Carlos pueda explicar cada línea que escribió. Si le das código,
> el proyecto fracasa aunque compile.

---
---

# 🎛️ PROYECTO 2 — PIPELINE FIGMA → STYLE DICTIONARY

> Continúa en el mismo monorepo. **Todo lo de arriba sigue vigente sin cambios:** Regla Cero,
> escalera de pistas, válvula de escape y firewall de NDA. Esta sección no los repite — los aplica.

**Decisión de reordenamiento (13 sep 2026):** Carlos decidió invertir el orden original del
roadmap. Este proyecto (antes "Proyecto 3") pasa a ser el **Proyecto 2**, y la capa de componentes
(antes "Proyecto 2") pasa a ser el **Proyecto 3** — ver más abajo, pospuesta.

**Razón (con palabras de Carlos):** construir el `Button` primero obligaría a leer los tokens
semánticos directo del JSON en JS (como hace el visor) para luego tener que **reescribir** esa
lógica de consumo en cuanto exista el export real a CSS. Construyendo el pipeline primero, el
componente nace consumiendo variables CSS reales desde el día uno — sin trabajo duplicado.

**Proyecto 1 (tokens + visor) está completo y publicado** (`@coloma-design/tokens@0.1.0` en NPM,
visor en Vercel, merge a `main`). Este proyecto construye sobre esa base: un pipeline real que
transforma `packages/tokens` (DTCG) en variables CSS/JS consumibles, y resuelve la sincronización
con Figma.

## 📋 El proyecto

Montar **Style Dictionary** sobre `packages/tokens` para transformar `primitive.json` y
`semantic.json` en salidas reales (variables CSS como mínimo). Incluye resolver la pregunta de
gobernanza Figma↔código que ya quedó anotada en la sección "🎨 Figma y la fuente de verdad" de
este mismo archivo (ver arriba) — no se repite aquí, se resuelve ahí.

### Contexto ya documentado (no repetir, ya está arriba en este archivo)
Ver la sección **"🎨 Figma y la fuente de verdad"**: vías de export viables (Token Press, Tokens
Bruecke, Design Token Exporter, Tokens Studio), la vía descartada (Variables REST API, requiere
Enterprise), el dato del mapeo `/` → anidamiento JSON, el problema conocido de exports sucios, y la
pregunta abierta de gobernanza (Figma-first vs. code-first).

## 🚧 Fase 0 · Decisiones pendientes

- [x] **Alcance de esta vuelta:** resuelto (13 sep 2026) — **solo el pipeline JSON → CSS con Style
      Dictionary, sin tocar Figma.** Figma sigue siendo únicamente referencia visual de
      acompañamiento, no herramienta de documentación ni de trabajo activo en este proyecto.
- [x] **Formatos de salida:** resuelto (13 sep 2026) — **solo CSS.** Criterio de Carlos: es lo
      indispensable para construir la capa de componentes (Proyecto 3) de forma eficiente; un
      output JS/JSON no tiene consumidor real todavía y se evalúa si aparece esa necesidad más
      adelante.
- [ ] **Gobernanza Figma↔código:** **fuera de alcance esta vuelta** (ver decisión de arriba) — la
      pregunta sigue anotada en la sección de Figma de este archivo, para cuando corresponda
      retomarla en una iteración futura.
- [x] **Dónde vive la configuración de Style Dictionary:** resuelto (13 sep 2026) — **dentro de
      `packages/tokens`**, ampliando el paquete ya publicado. Criterio explícito de Carlos:
      prioriza adopción futura y simplicidad de instalación por sobre la pureza arquitectónica de
      separar "fuente" y "build" en paquetes distintos.

## ✅ Checklist tentativo de fases

> Se ajusta según lo que se decida en la Fase 0.

- [x] **Fase 1** · Instalar y configurar Style Dictionary sobre `packages/tokens` — completada
      (13 sep 2026): `tokens/` como subcarpeta de origen, `config.json` con `usesDtcg: true`,
      `package.json` con `files`/`exports` actualizados, script `prepare` automatiza el build en
      cada `npm install`.
- [x] **Fase 2** · Primera transformación: `primitive.json` + `semantic.json` → variables CSS —
      completada (13 sep 2026): `dist/css/variables.css` generado y revisado línea por línea;
      los aliases de la capa semántica se resuelven correctamente contra las primitivas.
- ~~**Fase 3** · Resolver la pregunta de gobernanza Figma↔código~~ — **omitida esta vuelta.**
  Ya quedó resuelta en la Fase 0 de este proyecto como fuera de alcance (Figma es solo referencia
  visual personal, sin sincronización). Se retoma en una iteración futura si corresponde.
- [x] **Fase 4** · Documentar el pipeline (README actualizado de `packages/tokens`) — completada
      (13 sep 2026): corregidas las afirmaciones obsoletas ("sin build step", "aún no publicado"),
      documentadas las dos formas de consumo (JSON fuente y variables CSS vía `@coloma-design/tokens/css`).

**Con esto, Proyecto 2 (Pipeline Style Dictionary) queda completo** — Fases 1, 2 y 4 cerradas;
Fase 3 (gobernanza Figma) omitida por decisión de Fase 0. También se actualizó el `README.md` raíz
del monorepo (13 sep 2026): estructura del repo, tabla de decisiones y estado del proyecto por
Proyecto (1 completo, 2 completo, 3 pospuesto) en vez de por fase suelta. Pendiente: commit final
de la sesión.

## 📔 Bitácora de aprendizaje — Proyecto 2 (Style Dictionary)

| Fase | Concepto | Con mis palabras |
|---|---|---|
| 1 | ¿Qué es exports y por qué lo necesitaste? | Es el cortafuegos del package.json. Lo implementamos para sellar la arquitectura interna del paquete, pasando de una simple carpeta abierta a una API estricta. Nos permite exponer rutas limpias y estables (como /css) y bloquea el acceso a archivos crudos, garantizando que podamos reestructurar el interior del repositorio mañana sin romper las importaciones de los consumidores. |
| 2 | ¿Qué diferencia hay entre lo que resuelve resolverAlias.js y lo que resuelve Style Dictionary? | resolverAlias.js es una utilidad táctica que opera en tiempo de ejecución (runtime) dentro del navegador; su único trabajo es desenredar las referencias para poder pintar la interfaz de la documentación. Style Dictionary es la maquinaria industrial de compilación (compile-time); destruye los alias durante el build para generar el CSS estático definitivo y agnóstico que se consumirá en producción. |
| 3 | *(omitida — gobernanza Figma quedó fuera de alcance en Fase 0)* | — |

---
---

# 🧩 PROYECTO 3 — CAPA DE COMPONENTES (pospuesto)

> **Pospuesto hasta que el Proyecto 2 (pipeline Style Dictionary) exista.** El `Button` debe
> consumir variables CSS reales desde el día uno, no tokens leídos directo del JSON en JS. Todo lo
> de arriba sigue vigente sin cambios: Regla Cero, escalera de pistas, válvula de escape, firewall
> de NDA y protocolo de sesión/fase. Esta sección no los repite — los aplica.

**Proyecto 1 (tokens + visor) está completo y publicado** (`@coloma-design/tokens@0.1.0` en NPM,
visor en Vercel, merge a `main`). Este proyecto construye sobre esa base: una librería de
componentes Web que consume esos tokens.

## 📋 El proyecto

Nuevo entregable: **`packages/components`** — librería de Web Components que consumen
`@coloma-design/tokens`, publicable como `@coloma-design/components`.

Primer componente: **Button**, ya diseñado por Carlos en Figma (cuenta personal — confirmado
NDA-safe el 13 sep 2026, sin conexión al workspace de Yanbal).

### Decisiones ya tomadas
| Decisión | Elección | Por qué |
|---|---|---|
| Ubicación | Mismo monorepo, `packages/components` | Misma forma de trabajar que en FrYDA (Yanbal) |
| Stack | Web Components (Custom Elements + Shadow DOM) | Continúa el mismo enfoque agnóstico de framework de `apps/token-viewer` |
| Nombre del paquete | `@coloma-design/components` | Mismo scope que `@coloma-design/tokens` |
| Primer componente | `Button` | Ya diseñado en Figma; suficientemente simple para validar el patrón completo antes de escalar |
| Licencia | MIT | Igual que el resto del repo |
| Versionado de la dependencia hacia `@coloma-design/tokens` | **Rango estricto** (`^0.1.0`) en `packages/components`; **rango laxo** (`*` o similar) en `apps/token-viewer` | Un paquete publicado en NPM (`components`) convierte su campo `dependencies` en un contrato público — un rango laxo ahí expone a consumidores externos a rupturas silenciosas si `tokens` publica un cambio incompatible. Un consumidor interno que nunca se publica (`token-viewer`) no tiene ese riesgo: Carlos controla ambos lados dentro del mismo monorepo, así que la agilidad de iterar sin tocar configuración pesa más que el candado. (13 sep 2026 — también corregido: `token-viewer` no declaraba `@coloma-design/tokens` como dependencia real, dependía de un efecto colateral de hoisting de npm workspaces — *phantom dependency* — ya arreglado.) |

### Estructura (actualizada)
```text
coloma-design-system/
├── packages/
│   ├── tokens/          # 📦 ya publicado
│   └── components/      # 📦 nuevo — este proyecto
└── apps/token-viewer/    # 🔍 sin cambios (posible candidato futuro para mostrar componentes en vivo)
```

## 🚧 Fase 0 · Decisiones pendientes (resolver ANTES de escribir código)

Claude: esto se resuelve en conversación, con preguntas socráticas y debate de arquitectura —
nunca proponiendo la respuesta directamente.

- [x] **Variantes del Button:** resuelto (13 sep 2026) — el diseño de Figma **mapea uno a uno**
      contra los roles ya definidos en `semantic.json` bajo `color.*.action` (`primary`,
      `secondary`, `ghost`, `link`). No se necesitan variantes nuevas en la capa semántica.
- [x] **Estados de interacción:** resuelto (13 sep 2026) — cada pseudo-estado (hover, pressed,
      disabled, focus) ya tiene su token semántico específico definido. No se necesitan tokens
      nuevos para el `Button`.
- [x] **Cómo consume el componente los tokens:** resuelto por el reordenamiento — `packages/components`
      consumirá las **variables CSS reales** que produzca el Proyecto 2 (Style Dictionary), no el
      JSON leído directo en JS. Queda pendiente solo el detalle de implementación una vez ese
      pipeline exista.
- [x] **Accesibilidad:** resuelto (13 sep 2026) — se envuelve un `<button>` nativo dentro del
      Shadow DOM (hereda semántica, teclado y foco gratis). El `Button` debe soportar los tres
      `type` nativos (`button`, `submit`, `reset`) y participar de formularios externos en el DOM
      ligero. Carlos identificó el problema clave por su cuenta: la asignación de "form owner" del
      navegador no cruza el límite del Shadow DOM, así que un `<button type="submit">` enterrado en
      el shadow root no se asocia automáticamente con un `<form>` externo. Pendiente de
      investigación por Carlos: **form-associated custom elements** / `ElementInternals` /
      `attachInternals()` (MDN) como mecanismo para cerrar ese puente — se retoma cuando termine de
      investigarlo.
- [x] **Testing:** resuelto (13 sep 2026) — Carlos decide **no posponerlo**: habrá pruebas
      automatizadas desde esta fase. Framework elegido: **Vitest** (curva de aprendizaje más suave,
      sinergia futura con Storybook en Fase 5). Storybook queda deliberadamente fuera de esta
      decisión — se mantiene en la Fase 5 como estaba planeado, sin mezclar las dos herramientas.
      Modo de ejecución: **Browser Mode** (navegador real vía Playwright) — decisión explícita de
      Carlos precisamente porque el caso de `ElementInternals`/form-participation a través del
      límite del Shadow DOM necesita comportamiento real de navegador, no una emulación jsdom.
- [x] **Nombre de la etiqueta del Custom Element:** resuelto (13 sep 2026) — **`coloma-button`**.
      Carlos confirma que mantendrá su nombre personal como convención para todos los componentes
      de este paquete (`coloma-input`, `coloma-card`, etc.), a diferencia de `token-swatch` en
      Proyecto 1, que describe su función porque es una utilidad del visor, no una pieza de un DS
      de cara a terceros.

## ✅ Checklist tentativo de fases

> Se ajusta según lo que se decida en la Fase 0 — no es definitivo todavía.

- [x] **Fase 1** · Setup de `packages/components` — completada (13 sep 2026): `package.json` con
  `type: module`, `exports` con patrón de comodines (`./components/coloma-*.js` → `./*/coloma-*.js`),
  dependencia estricta a `@coloma-design/tokens`, Vitest Browser Mode instalado. Estructura plana:
  una carpeta por componente colgando de la raíz del paquete.
- [x] **Fase 2** · Estructura base del `Button` — completada (13 sep 2026): Custom Element
  `formAssociated` con `ElementInternals`, Shadow DOM con `<button type="button">` nativo + `<slot>`,
  getter/setter de `variant` (sin `attributeChangedCallback` — el CSS reacciona solo vía
  `:host([variant])`), despacho submit/reset con `requestSubmit()` / `reset()`, cuatro variantes
  consumiendo variables CSS reales de `@coloma-design/tokens/css`. Decisiones detalladas en
  `docs/Decisiones-Button-Proyecto-3.md`.
- [x] **Fase 3** · Estados de interacción — completada (16 sep 2026): hover/pressed como state
  layer (`::before` + `isolation: isolate`, excluido en `link` a favor de subrayado), foco con
  `:focus-visible` + `outline`, `disabled` vía `formDisabledCallback` (una línea:
  `this.$button.disabled = disabled`) + `:host(:disabled)` real (gracias a `formAssociated`) +
  `pointer-events: none` para matar el hover fantasma + `cursor: not-allowed` en el host. Overrides
  de disabled por variante (`secondary`, `link`) resueltos con selectores `:host()` compuestos, sin
  depender de orden en la hoja. Decisiones detalladas en `docs/Decisiones-Button-Proyecto-3.md`.
- **Fase 4** · Accesibilidad (teclado, foco visible, lector de pantalla)
- **Fase 5** · Documentar (`README.md` del paquete + posible mini-galería de componentes)
- **Fase 6** · Publicar en NPM

## 🔒 NDA — nota específica de este proyecto

Confirmado el 13 sep 2026: el archivo de Figma del `Button` vive en la cuenta **personal** de
Carlos, sin conexión al workspace de Yanbal. El firewall de NDA de FrYDA (sección de arriba) sigue
aplicando sin excepción al resto de componentes que se agreguen después — verificar caso por caso,
no asumir.

## 📔 Bitácora de aprendizaje — Proyecto 3 (Componentes)

| Fase | Concepto | Con mis palabras |
|---|---|---|
| 1 | `exports` con comodines: clave = contrato público, valor = ruta física. ¿Por qué pueden cambiar por separado? | El contrato público es lo que el consumidor importa, la ruta es dónde guardo el archivo. Puedo reorganizar mis carpetas internas sin romper el código de quien usa la librería. Es un cortafuegos. |
| 2 | Constructor vs `connectedCallback`: ¿qué va en cada uno y qué pasaría si el setup viviera en el segundo? | Constructor para el setup inicial único (Shadow DOM, ElementInternals). connectedCallback para cuando entra al DOM. Si pongo el setup en el segundo, se duplicaría o rompería si el nodo se mueve de lugar en el árbol. |
| 2 | Property-attribute reflection: ¿por qué `variant` necesita getter/setter pero **no** `attributeChangedCallback`? | El getter/setter sincroniza el DOM con JS. No necesito el callback porque el CSS reacciona solo mediante :host([variant]). Si no hay lógica extra que correr, usar el callback es escribir código muerto. |
| 2 | `<slot>`: ¿dónde vive el nodo "Guardar" y por qué `querySelector` en el shadow root no lo encuentra? | Sigue viviendo en el Light DOM. El <slot> es solo un proyector visual. querySelector adentro del Shadow DOM no lo encuentra porque estructuralmente el nodo nunca entró ahí. |
| 2 | `formAssociated` + `ElementInternals`: ¿qué resuelve el navegador solo y qué sigue siendo responsabilidad mía? | El navegador encuentra el <form> padre y hace el enlace automáticamente. Mi responsabilidad es capturar el clic y ordenarle explícitamente al formulario que se envíe o se limpie. |
| 2 | `requestSubmit()` vs `submit()`: ¿por qué el primero y no el segundo? | requestSubmit() actúa como un botón real: pasa por las validaciones de HTML5 y dispara el evento submit. submit() fuerza el envío ignorando validaciones y dejando ciegos a los listeners. |
| 2 | Tokens en el Shadow DOM: ¿por qué las variables CSS del `:root` del consumidor llegan adentro sin que yo las importe? | Porque las custom properties son la excepción a la regla: perforan el aislamiento heredándose en cascada desde el Light DOM. Mi componente simplemente las consume desde adentro. |
| 3 | State layer vs. color de reemplazo: ¿por qué una capa translúcida sirve para las 3 variantes con fondo distinto sin tokens nuevos? | |
| 3 | `isolation: isolate` + `z-index: -1` en el `::before`: ¿qué stacking context resuelve y qué pasaría sin `isolate`? | |
| 3 | `:focus-visible` vs `:focus`: ¿por qué el segundo hubiera sido el error? | |
| 3 | `:host(:disabled)` como selector de estado real, no de atributo: ¿qué lo habilita y por qué no es lo mismo que `:host([variant])`? | |
| 3 | `pointer-events: none` y el cursor perdido: ¿por qué `cursor: pointer` dejó de verse, y dónde se resuelve? | |
| 4 | — | |

---

> **Recordatorio para Claude:** el mismo criterio de éxito de Proyecto 1 aplica aquí. No se mide en
> que el `Button` renderice — se mide en que Carlos pueda explicar cada decisión de API y cada línea
> que escribió.
