import './style.css'
import './components/token-swatch.js'
import tokensPrimarios from '@coloma-design/tokens/primitive.json'
import tokensSemanticos from "@coloma-design/tokens/semantic.json"
import { flattenTokens } from './flattenTokens.js'
import { resolverAlias } from './resolverAlias.js'


document.querySelector('#app').innerHTML = `
<section id="primarios">
  <h2>Primitivos</h2>
</section>
<section id="semanticos">
  <h2>Semánticos</h2>
</section>
`

const flatPrimarios = flattenTokens(tokensPrimarios);
const flatSemanticosCrudos = flattenTokens(tokensSemanticos);
const flatSemanticos = resolverAlias(flatSemanticosCrudos, flatPrimarios);

function crearAgrupador(nivel) {
  return function (acc, token) {
    const categoria = token.name.split('.').at(nivel);

    if (!acc[categoria]) {
      acc[categoria] = [token];
    } else {
      acc[categoria].push(token);
    }
    
    return acc;
  }
}

const primariosAgrupado = flatPrimarios.reduce(crearAgrupador(0), {});
const semanticosAgrupado = flatSemanticos.reduce(crearAgrupador(1), {});

const primariosSection = document.querySelector('#primarios');
const semanticosSection = document.querySelector('#semanticos');

function categoriasHTML(agrupado, section) {
  Object.entries(agrupado).forEach(([categoria, tokens]) => {
  const categoriaSection = document.createElement('section');
  categoriaSection.classList.add('categoria');
  categoriaSection.innerHTML = `<h3 class="categoria-title">${categoria}</h3>`;
  section.appendChild(categoriaSection);
  const tokenSwatches = tokens.map(token => {
    const swatch = document.createElement('token-swatch');
    swatch.token = token;
    return swatch;
  });
  categoriaSection.append(...tokenSwatches);
});
};

categoriasHTML(primariosAgrupado, primariosSection);
categoriasHTML(semanticosAgrupado, semanticosSection);

console.log(flatSemanticos)