// ================================
// BASE DE SENSIBILIDAD POR MODELO
// ================================
const baseSensibilidad = {
    "iPhone 11": { general: 140, rojo: 80, x2: 110, x4: 100, refinado: 60 },
    "iPhone 12": { general: 145, rojo: 83, x2: 112, x4: 102, refinado: 63 },
    "iPhone XR": { general: 138, rojo: 78, x2: 108, x4: 97, refinado: 59 },
    "Samsung A15": { general: 130, rojo: 75, x2: 105, x4: 95, refinado: 55 },
    "Samsung A23": { general: 135, rojo: 79, x2: 109, x4: 98, refinado: 58 },
    "Xiaomi Redmi 12": { general: 128, rojo: 72, x2: 103, x4: 92, refinado: 54 }
};

// ================================
// FUNCIÓN LIMITAR (0–200)
// ================================
function limitar(valor) {
    return Math.max(0, Math.min(200, valor));
}

// ================================
// FUNCIÓN DE GENERACIÓN CALIBRADA
// ================================
function generarSensibilidad(modelo, dpi, hz, conDpi = true) {

    const base = baseSensibilidad[modelo];

    if (!base) {
        return { error: "Modelo no encontrado." };
    }

    // Lagunas internas (esto hace que todo sea más real)
    const laguna = Math.random() * 6 - 3; // [-3, +3]

    // Factores dinámicos
    const factorDpi = conDpi ? (dpi / 20) : 0;
    const factorHz = hz / 10;

    // Fórmulas calibradas
    const general = limitar(base.general + factorDpi + factorHz + laguna + aleatorio(10, 25));
    const rojo = limitar(base.rojo + factorDpi * 0.4 + factorHz * 0.5 + laguna + aleatorio(5, 15));
    const x2 = limitar(base.x2 + factorDpi * 0.5 + factorHz * 0.4 + laguna + aleatorio(8, 18));
    const x4 = limitar(base.x4 + factorDpi * 0.3 + factorHz * 0.4 + laguna + aleatorio(5, 15));
    const refinado = limitar(base.refinado + factorDpi * 0.2 + factorHz * 0.3 + laguna + aleatorio(3, 10));

    // Tamaño del botón según sensibilidad final
    let boton = 50;
    if (general >= 150) boton = aleatorio(0, 40);
    else if (general >= 120) boton = aleatorio(45, 60);
    else boton = aleatorio(61, 100);

    return {
        general,
        rojo,
        x2,
        x4,
        refinado,
        boton
    };
}

// ================================
// FUNCIÓN RANDOM
// ================================
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ================================
// EVENTOS PARA TU HTML
// ================================
document.getElementById("generarConDpi").addEventListener("click", () => {
    const modelo = document.getElementById("modelo").value;
    const dpi = parseInt(document.getElementById("dpi").value);
    const hz = parseInt(document.getElementById("hz").value);

    const result = generarSensibilidad(modelo, dpi, hz, true);
    mostrarResultado(modelo, result);
});

document.getElementById("generarSinDpi").addEventListener("click", () => {
    const modelo = document.getElementById("modelo").value;
    const hz = parseInt(document.getElementById("hz").value);

    const result = generarSensibilidad(modelo, 0, hz, false);
    mostrarResultado(modelo, result);
});

// ================================
// MOSTRAR EN PANTALLA
// ================================
function mostrarResultado(modelo, data) {
    if (data.error) {
        document.getElementById("result").innerHTML = data.error;
        return;
    }

    document.getElementById("result").innerHTML = `
        <h3>${modelo}</h3>
        General: ${data.general}<br>
        Mira de Punto Rojo: ${data.rojo}<br>
        Mira X2: ${data.x2}<br>
        Mira X4: ${data.x4}<br>
        Tamaño del Botón: ${data.boton}<br>
        Refinado: ${data.refinado}
    `;
}
