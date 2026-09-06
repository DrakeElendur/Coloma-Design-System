class TokenSwatch extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        if (!this.token) return;

        const { name, value, type } = this.token;
        const { previewHTML, valueHTML } = this.constructor.getTemplateData(type, value);

        this.shadowRoot.innerHTML = previewHTML + `<span class="token-value">${valueHTML}</span><br><span class="token-name">${name}</span>`;
    };

    static getTemplateData(type, value) {
        let previewHTML;
        let valueHTML;

        switch (type) {
            case "color":
                previewHTML = `<div class="swatch" style="background-color: ${value.hex}; width: 100px; height: 100px;"></div>`
                valueHTML =`${value.hex}`;
                break;
            case "dimension":
                previewHTML = `<div class="swatch" style="width: ${value.value}${value.unit}; height: ${value.value}${value.unit}; background-color: #ccc;"></div>`
                valueHTML = `${value.value}${value.unit}`;
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
                previewHTML = `<div class="swatch" style="box-shadow: ${shadowValue}; width: 100px; height: 100px; background-color: #f3f3f3;"></div>`;
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