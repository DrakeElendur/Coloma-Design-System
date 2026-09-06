class TokenSwatch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
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
                }
                .token-name { font-weight: bold; font-size: 14px; }
                .token-value { font-size: 12px; color: #666; }
            </style>
            ${previewHTML}
            <div class="token-info">
                <span class="token-name">${name}</span>
                <span class="token-value">${valueHTML}</span>
            </div>`;
    };

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