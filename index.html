/* ===========================
   HELPERS
=========================== */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

/* ===========================
   REGLAS DE LA GENERACIÓN
=========================== */

/* Probabilidades:
   A = 42.5%
   B = 42.5%
   C = 15%
*/
function pickMode() {
    const r = Math.random();

    if (r < 0.425) return "A";          // 42.5%
    if (r < 0.425 * 2) return "B";      // 42.5%
    return "C";                         // 15%
}

/* Rango botón por tamaño de pantalla */
function getButtonRangeBySize(model) {
    const miniModels = ["iPhone 12 Mini", "iPhone 13 Mini"];
    if (miniModels.includes(model)) return { min: 35, max: 45 };

    const normalModels = [
        "iPhone 11","iPhone 12","iPhone 13","iPhone 14","Samsung A10","Samsung A11",
        "Samsung A12","Samsung A13","Samsung A14","Samsung A20","Samsung A21",
        "Samsung A22","Samsung A23","Samsung A24","Xiaomi Redmi 9","Xiaomi Redmi 10",
        "Xiaomi Redmi 12","Motorola G20","Motorola G22","Motorola G24",
        "Galaxy M12","Galaxy M13","Galaxy M14","Redmi 10C","Redmi 10A",
        "Redmi 12C","Moto E22","Moto E32","Moto G14"
    ];
    if (normalModels.includes(model)) return { min: 35, max: 65 };

    const mediumModels = [
        "Samsung A30","Samsung A31","Samsung A32","Samsung A33","Samsung A34",
        "Samsung A50","Samsung A51","Samsung A52","Samsung A53","Samsung A54",
        "Xiaomi Redmi Note 10","Redmi Note 11","Redmi Note 12","Motorola G30",
        "Motorola G31","Motorola G32","Motorola G40","Motorola G52","Motorola G53",
        "Galaxy A25","Galaxy A35","Redmi Note 13","Redmi Note 13 4G",
        "Poco M4","Poco M5","Poco X4","Moto G60","Moto G72","Moto G84"
    ];
    if (mediumModels.includes(model)) return { min: 40, max: 70 };

    const largeModels = [
        "iPhone 12 Pro Max","iPhone 13 Pro Max","iPhone 14 Pro Max","Galaxy A70",
        "Galaxy A71","Galaxy A73","Redmi Note 12 Pro","Redmi Note 12 Pro Plus",
        "Poco X5 Pro","Poco X6 Pro","Galaxy S20 FE","Galaxy S21 FE",
        "Redmi Note 13 Pro","Redmi Note 13 Pro Plus","Poco F4","Poco F5","Poco F5 Pro"
    ];
    if (largeModels.includes(model)) return { min: 45, max: 75 };

    return { min: 35, max: 65 }; // default
}

/* Probabilidad casi nula para botones 65–100 */
function generateButton(model) {
    const size = getButtonRangeBySize(model);

    // Mini max 45
    if (size.max === 45) {
        return rand(size.min, size.max);
    }

    // Probabilidad 0.1% para botones gigantes
    if (Math.random() < 0.001) {
        return rand(65, 100);
    }

    // Normal 35–65
    return rand(size.min, Math.min(size.max, 65));
}

/* ===========================
   GENERACIÓN PRINCIPAL
=========================== */
function generate(withDpi) {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const out = document.getElementById("output");

    if (!brand || !model) {
        alert("Selecciona marca y modelo");
        return;
    }

    const mode = pickMode();

    let general, redDot, x2, x4;

    /* =======================
         MODO A — REALISTA
    ======================= */
    if (mode === "A") {
        general = rand(60, 140);
        redDot = rand(60, 110);
        x2 = rand(70, 130);
        x4 = rand(80, 140);
    }

    /* =======================
         MODO B — EQUILIBRADO
    ======================= */
    else if (mode === "B") {
        general = rand(80, 170);
        redDot = rand(70, 150);
        x2 = rand(90, 170);
        x4 = rand(100, 180);
    }

    /* =======================
         MODO C — ORIGINAL
    ======================= */
    else {
        if (model === "iPhone 11") {
            general = rand(120, 200);
        } else {
            general = rand(80, 200);
        }

        redDot = rand(80, 200);
        x2 = rand(80, 200);
        x4 = clamp(x2 + rand(-20, 20), 80, 200);
    }

    const button = generateButton(model);

    /* =========================
        DPI
    ========================= */
    let dpiText = "";

    if (withDpi) {
        if (brand === "Apple") {
            const styles = ["Preciso", "Refinado", "Sencillo"];
            const style = styles[rand(0, 2)];

            const dpiVal = model === "iPhone 11"
                ? rand(50, 120)
                : rand(90, 120);

            dpiText = `DPI: ${style} ${dpiVal}\n`;
        } else {
            dpiText = `DPI: ${rand(300, 900)}\n`;
        }
    }

    out.style.display = "block";
    out.textContent =
`────────────────────────────
📱 ${model}
${dpiText}
General: ${general}
Red Dot: ${redDot}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${button}
────────────────────────────`;
}
