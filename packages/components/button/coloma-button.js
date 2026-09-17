class ColomaButton extends HTMLElement {
    static formAssociated = true;
    constructor() {
        super();
        this.internals = this.attachInternals();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    cursor: not-allowed;
                }
                button {
                    overflow: hidden;
                    position: relative;
                    cursor: pointer;
                    font-family: var(--font-family-primary);
                    font-weight: var(--font-weight-medium);
                    font-size: var(--font-size-200);
                    padding: var(--spacing-12) var(--spacing-16);
                    border: none;
                    border-radius: var(--radius-8);
                    background-color: var(--color-surface-action-primary);
                    color: var(--color-content-action-primary);
                    height: var(--spacing-48);
                    isolation: isolate;
                }
                :host([variant="secondary"]) button {
                    background: none;
                    color: var(--color-content-action-secondary);
                    box-shadow: 0 0 0 2px var(--color-border-action-secondary);
                }
                :host([variant="ghost"]) button {
                    background: none;
                    color: var(--color-content-action-ghost);
                }
                :host([variant="link"]) button {
                    background: none;
                    color: var(--color-content-action-link);
                    padding: var(--spacing-0);
                    height: auto;
                }
                :host([variant="link"]) button::before {
                    content: none;
                }
                :host([variant="link"]) button:hover {
                    text-decoration: underline;
                }
                :host([variant="link"]) button:active {
                    text-decoration: underline;
                    text-decoration-thickness: 2px;
                }
                button::before {
                    content: "";
                    position: absolute;
                    inset: 0px;
                    background-color: transparent;
                    z-index: -1;
                }
                button:hover::before {
                    background-color: var(--color-surface-overlay-state-layer-hover);
                }
                button:active::before {
                    background-color: var(--color-surface-overlay-state-layer-pressed);
                }
                button:focus-visible {
                    outline: 2px solid var(--color-border-effect-focus);
                    outline-offset: 4px;
                }
                :host(:disabled) button {
                    background-color: var(--color-surface-effect-disabled-base);
                    color: var(--color-content-effect-disabled-soft);
                    pointer-events: none;
                }
                :host([variant="secondary"]:disabled) button {
                    background-color: transparent;
                    color: var(--color-content-effect-disabled-soft);
                    box-shadow: 0 0 0 2px var(--color-border-effect-disabled);
                }
                :host([variant="link"]:disabled) button {
                    background-color: transparent;
                    color: var(--color-content-effect-disabled-soft);
                }

            </style>
            <button type="button">
                <slot></slot>
            </button>
        `;
        this.$button = this.shadowRoot.querySelector('button');
        this.$button.addEventListener('click', () => this._handleClick());
    }

    _handleClick() {
        const form = this.internals.form;
        if (!form) return;

        const type = this.getAttribute('type') || 'submit';

        if (type === 'submit') {
            form.requestSubmit();
        } else if (type === 'reset') {
            form.reset();
        }
    }

    get variant() {
        return this.getAttribute('variant');
    }

    set variant(value) {
        if (value) {
            this.setAttribute('variant', value);
        } else {
            this.removeAttribute('variant');
        }
    }

    formDisabledCallback(disabled) {
        this.$button.disabled = disabled;
    }
}
window.customElements.define('coloma-button', ColomaButton);