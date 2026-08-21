export function flattenTokens(nodo, tipoHeredado = null, ruta = [], acumulador = []) {
    const tipoActual = nodo.$type !== undefined ? nodo.$type : tipoHeredado;
    const esToken = nodo.$value !== undefined;
    if (esToken) {
        acumulador.push({
            name: ruta.join("."),
            type: tipoActual,
            value: nodo.$value
        });
        return acumulador;
    }

    for (const [clave, valor] of Object.entries(nodo)) {
        if (clave.startsWith("$")) continue;

        if (typeof valor === "object" && valor !== null) {
            flattenTokens(valor, tipoActual, [...ruta, clave], acumulador)
        }
    }
    return acumulador;
}