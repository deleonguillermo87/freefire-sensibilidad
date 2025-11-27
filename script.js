// --- BASE DE DATOS SIMULADA (MODELO -> DPI, HZ) ---

const DEVICE_DATA = {

    'iPhone 15 Pro': { dpi: 460, hz: 120 },

    'iPhone 11': { dpi: 375, hz: 60 },

    'Samsung S23': { dpi: 480, hz: 120 },

    'Samsung A32': { dpi: 412, hz: 90 },

    'Xiaomi Poco X3': { dpi: 400, hz: 120 },

    'Motorola G50': { dpi: 395, hz: 90 },

    'Otro/Manual': { dpi: 450, hz: 120 } 

};

// --- 1. Detección de Tasa de Refresco (Hz) ---

let detectedHz = 60; 

function detectRefreshRate() {

    if (window.requestAnimationFrame) {

        let lastTime = performance.now();

        let frameCount = 0;

        function step(currentTime) {

            frameCount++;

            const elapsed = currentTime - lastTime;

            if (elapsed >= 1000) { 

                const fps = (frameCount / (elapsed / 1000));

                

                if (fps >= 110 && fps < 130) {

                    detectedHz = 120;

                } else if (fps >= 80 && fps < 100) {

                    detectedHz = 90;

                } else if (fps >= 130 && fps < 150) {

                    detectedHz = 144;

                } else {

                    detectedHz = 60;

                }

                document.getElementById('target-hz').value = detectedHz;

                document.getElementById('hz-display').innerHTML = `Hz Detectado (Oculto): \(\({detectedHz} Hz\)`

                return;

            }

            requestAnimationFrame(step);

        }

        requestAnimationFrame(step);

    }

}

// --- 2. Algoritmos de Escalado ---

function scaleLinear(sensBase, hzBase, hzTarget) {

    if (hzBase === 0) return sensBase;

    let scaled = sensBase * (hzTarget / hzBase);

    return scaled; 

}

function scaleGamma(sensBase, hzBase, hzTarget) {

    if (hzBase === 0) return sensBase;

    const ratio = hzTarget / hzBase;

    let scaled = sensBase * Math.pow(ratio, 0.85); 

    return scaled;

}

// --- 3. Lógica de Clasificación (Punto 1 y 4) ---

function getControlType(sensGeneralCalculated) {

    if (sensGeneralCalculated <= 65) return "Preciso";

    if (sensGeneralCalculated <= 85) return "Refinado";

    return "Sencillo";

}

function getButtonSize(sensGeneralCalculated) {

    if (sensGeneralCalculated >= 66) return "Grande (Baja Sensi)"; 

    if (sensGeneralCalculated >= 46) return "Mediano (Media Sensi)"; 

    return "Pequeño (Alta Sensi)"; 

}

// --- 4. Función Principal ---

function generarSensibilidades() {

    const baseHz = parseInt(document.getElementById('base-hz').value);

    const targetHz = parseInt(document.getElementById('target-hz').value);

    const scaleType = document.getElementById('scale-type').value;

    const selectedModel = document.getElementById('device-model').value;

    

    const sensBase = {

        general: parseInt(document.getElementById('sens-general').value),

        reddot: parseInt(document.getElementById('sens-reddot').value),

        scope2x: parseInt(document.getElementById('sens-scope2x').value),

        scope4x: parseInt(document.getElementById('sens-scope4x').value),

        sniper: parseInt(document.getElementById('sens-sniper').value)

    };

    // Obtener datos del dispositivo (Punto 2 y 3)

    const deviceData = DEVICE_DATA[selectedModel] || DEVICE_DATA['Otro/Manual'];

    const recommendedDPI = deviceData.dpi;

    

    document.getElementById('dpi-display').innerHTML = `DPI Sugerido: \(\){recommendedDPI}\)`;

    let scaler;

    if (scaleType === 'linear') {

        scaler = scaleLinear;

    } else {

        scaler = scaleGamma;

    }

    // Calcular Sensibilidades (Punto 5 - Escala base)

    const resultsRaw = {

        general: scaler(sensBase.general, baseHz, targetHz),

        reddot: scaler(sensBase.reddot, baseHz, targetHz),

        scope2x: scaler(sensBase.scope2x, baseHz, targetHz),

        scope4x: scaler(sensBase.scope4x, baseHz, targetHz),

        sniper: scaler(sensBase.sniper, baseHz, targetHz)

    };

    

    // Clasificaciones

    const controlStyle = getControlType(resultsRaw.general);

    const buttonSize = getButtonSize(resultsRaw.general);

    mostrarResultados(resultsRaw, baseHz, targetHz, controlStyle, buttonSize, recommendedDPI);

}

function mostrarResultados(resultsRaw, baseHz, targetHz, controlStyle, buttonSize, dpi) {

    const container = document.getElementById('resultados');

    

    // Formatear: Redondeo y límite 200 para TODOS los resultados

    const formatResult = (value) => {

        return Math.min(200, Math.max(0, Math.round(value))); 

    };

    const finalResults = {};

    for (const key in resultsRaw) {

        finalResults[key] = formatResult(resultsRaw[key]);

    }

    let html = `

        <p><strong>Escalado:</strong> \(\({baseHz} Hz \(\rightarrow\) \){targetHz} Hz. (DPI Base: \(\){dpi}\)</p>

        <hr>

        <div class="result-item" style="background-color: #d1e7dd;">

            <span>Estilo de Control (iPhone):</span>

            <strong>\${controlStyle}</strong>

        </div>

        <div class="result-item" style="background-color: #d1e7dd;">

            <span>Tamaño Botón Disparo:</span>

            <strong>\${buttonSize}</strong>

        </div>

        <hr>

        <h3>Sensibilidades FF (Rango 0-200)</h3>

    `;

    const sensMap = {

        general: "General",

        reddot: "Red Dot",

        scope2x: "Mira 2X",

        scope4x: "Mira 4X",

        sniper: "Sniper"

    };

    for (const key in finalResults) {

        html += `

            <div class="result-item">

                <span>\${sensMap[key]}</span>

                <strong>\${finalResults[key]}</strong>

            </div>

        `;

    }

    container.innerHTML = html;

}

// --- Inicialización ---

function initialize() {

    detectRefreshRate();

    

    const modelSelect = document.getElementById('device-model');

    Object.keys(DEVICE_DATA).forEach(model => {

        const option = document.createElement('option');

        option.value = model;

        option.textContent = model;

        modelSelect.appendChild(option);

    });

}

window.onload = initialize;
