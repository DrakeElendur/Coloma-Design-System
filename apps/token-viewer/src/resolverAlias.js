export function resolverAlias(TokensSemanticos, TokensPrimarios) {
    return TokensSemanticos.map(seman => {
        const esALias = typeof seman.value === "string" && seman.value.startsWith("{") && seman.value.endsWith("}");
        if (esALias) {
            const nombreAlias = seman.value.slice(1, -1);
            const tokenReferenciado = TokensPrimarios.find(prim => prim.name === nombreAlias);
            if (tokenReferenciado) {
                return {
                    name: seman.name,
                    type: tokenReferenciado.type,
                    value: tokenReferenciado.value
                };
            }
        }
        return seman;
    })
}