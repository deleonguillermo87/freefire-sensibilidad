document.getElementById("deviceForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const brand = document.getElementById("brand").value;
    const modelSelect = document.getElementById("model");
    const model = modelSelect.value;
    const deviceData = modelSelect.options[modelSelect.selectedIndex].dataset;

    // Obtener valores internos que NO se muestran al usuario
    const screenSize = parseFloat(deviceData.screensize || 0);
    const refreshRate = parseInt(deviceData.hz || 60);
    const deviceTier = deviceData.tier || "medium";

    // Generación de sensibilidad (0–200)
    const baseSensitivity = generateSensitivity(deviceTier, screenSize, refreshRate);

    // Generación del botón de disparo con la nueva lógica
    const fireButtonSize = generateFireButtonSize(baseSensitivity, brand, model);

    // Mostrar resultados
    document.getElementById("result").innerHTML = `
        <h2>Resultados</h2>
        <p><strong>Marca:</strong> ${brand}</p>
        <p><strong>Modelo:</strong> ${model}</p>
        <p><strong>Sensibilidad:</strong> ${baseSensitivity}</p>
        <p><strong>Tamaño del Botón de Disparo:</strong> ${fireButtonSize}%</p>
    `;
});

/* ------------------------------------------
   GENERACIÓN DE SENSIBILIDADES
---------------------------------------------*/

function generateSensitivity(tier, screen, hz) {
    let base;

    switch (tier) {
        case "low":
            base = randomRange(40, 120);
            break;
        case "medium":
            base = randomRange(80, 160);
            break;
        case "high":
            base = randomRange(110, 200);
            break;
        default:
            base = randomRange(70, 150);
    }

    // Ajuste por tamaño de pantalla
    if (screen >= 6.5) base += 5;
    if (screen <= 5.8) base -= 5;

    // Ajuste por Hz
    if (hz >= 120) base += 10;
    if (hz <= 60) base -= 5;

    return Math.min(200, Math.max(0, Math.round(base)));
}

/* ------------------------------------------
   GENERACIÓN DEL BOTÓN DE DISPARO (🔥 NUEVA LÓGICA)
---------------------------------------------*/

function generateFireButtonSize(sensitivity, brand, model) {

    // ⚠️ iPhone 11 permanece EXACTAMENTE igual
    if (brand === "Apple" && model === "iPhone 11") {
        return randomRange(40, 60);
    }

    let range;

    // Probabilidad 85% → rango 35–65
    // Probabilidad 15% → rango 65–100
    const probability = Math.random();

    if (probability <= 0.85) {
        range = [35, 65];
    } else {
        range = [65, 100];
    }

    // El rango se respeta COMPLETO, todos los números 100% disponibles
    let value = randomRange(range[0], range[1]);

    // Ajustes suaves según sensibilidad
    if (sensitivity >= 150) {
        // Sensibilidad alta → más tendencia a valores 50+
        value = Math.max(value, randomWeighted(50, range[1]));
    } else if (sensitivity <= 80) {
        // Sensibilidad baja → más tendencia a valores 40-55
        value = Math.min(value, randomWeighted(range[0], 55));
    }

    return value;
}

/* ------------------------------------------
   UTILIDADES RANDOM
---------------------------------------------*/

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Da más probabilidad a valores cercanos al límite superior o inferior
function randomWeighted(min, max) {
    return Math.floor(min + (Math.random() ** 2) * (max - min));
}
