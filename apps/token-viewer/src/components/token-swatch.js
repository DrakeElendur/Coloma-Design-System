class TokenSwatch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.isCopying = false;
        this.addEventListener('click', () => this.copiarNombre());
    }

    connectedCallback() {
        if (!this.token) return;

        const { name, value, type } = this.token;
        const categoria = name.split('.').at(0);
        const { previewHTML, valueHTML } = this.constructor.getTemplateData(type, value, categoria);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: center;
                    gap: 12px;
                    font-family: sans-serif;
                    cursor: pointer;
                    transition: transform 0.1s ease;
                }
                :host(:active) {
                    transform: scale(0.98);
                }
                .swatch {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120px; 
                    height: 120px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    overflow: hidden;
                }
                .token-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .token-name { font-weight: bold; font-size: 14px; transition: color 0.2s ease; }
                .token-value { font-size: 12px; color: #666; }
            </style>
            ${previewHTML}
            <div class="token-info">
                <span class="token-name">${name}</span>
                <span class="token-value">${valueHTML}</span>
            </div>`;
    }

    async copiarNombre() {
        if (this.isCopying) return;
        this.isCopying = true;

        const nameNode = this.shadowRoot.querySelector('.token-name');
        const nombreOriginal = this.token.name;

        try {
            await navigator.clipboard.writeText(nombreOriginal);
            nameNode.textContent = "¡Copiado!";
            nameNode.style.color = "#10b981";
        } catch (error) {
            console.error("Fallo al acceder al portapapeles:", error);
            nameNode.textContent = "¡Error!";
            nameNode.style.color = "#ef4444";
        } finally {
            setTimeout(() => {
                nameNode.textContent = nombreOriginal;
                nameNode.style.color = "";
                this.isCopying = false;
            }, 2000);
        }
    }

    static getTemplateData(type, value, categoria) {
        let previewHTML;
        let valueHTML;

        switch (type) {
            case "color":
                previewHTML = `<div class="swatch" style="background-color: ${value.hex}; width: 120px; height: 120px;"></div>`
                valueHTML =`${value.hex}`;
                break;
            case "dimension":
                switch (categoria) {
                    case "spacing":
                        previewHTML = `<div class="swatch" style="width: ${value.value}${value.unit}; height: ${value.value}${value.unit}; background-color: #ccc;"></div>`;
                        valueHTML = `${value.value}${value.unit}`;
                        break;
                    case "radius":
                        previewHTML = `<div class="swatch" style="width: 120px; height: 120px; border-radius: ${value.value}${value.unit}; background-color: #ccc;"></div>`;
                        valueHTML = `${value.value}${value.unit}`;
                        break;
                    case "fontSize":
                        previewHTML = `<div class="swatch" style="font-size: ${value.value}${value.unit};">Sample Text</div>`;
                        valueHTML = `${value.value}${value.unit}`;
                        break;
                    case "letterSpacing":
                        previewHTML = `<div class="swatch" style="letter-spacing: ${value.value}${value.unit};">Sample Text</div>`;
                        valueHTML = `${value.value}${value.unit}`;
                        break;
                    default:
                        previewHTML = `<div class="swatch">No preview available</div>`;
                        valueHTML = `No value available`;
                }
                break;
            case "fontFamily":
                previewHTML = `<div class="swatch" style="font-family: ${value};">Sample Text</div>`
                valueHTML = `${value}`;
                break;
            case "fontWeight":
                previewHTML = `<div class="swatch" style="font-weight: ${value};">Sample Text</div>`
                valueHTML = `${value}`;
                break;
            case "number":
                previewHTML = `<div class="swatch">${value}</div>`;
                valueHTML = `${value}`;
                break;
            case "shadow": {
                const shadowValue = `${value.offsetX.value}${value.offsetX.unit} ${value.offsetY.value}${value.offsetY.unit} ${value.blur.value}${value.blur.unit} ${value.spread.value}${value.spread.unit} ${value.color.hex}`;
                previewHTML = `<div class="swatch" style="box-shadow: ${shadowValue}; width: 120px; height: 120px; background-color: #f3f3f3;"></div>`;
                valueHTML = `${shadowValue}`;
                break;
            }
            default:
                previewHTML = `<div class="swatch">No preview available</div>`
                valueHTML = `No value available`;
        }
        return { previewHTML, valueHTML };
    }
}  

window.customElements.define("token-swatch", TokenSwatch);