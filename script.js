/* ===============================
   HELPERS
   =============================== */

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}


/* ===============================
   RED DOT RULE
   =============================== */

function chooseRedDot() {
    // 5% raro – 95% normal
    if (Math.random() < 0.05) return rand(30, 79);
    return rand(80, 200);
}


/* ===============================
   BOTÓN (VERSIÓN FINAL AJUSTADA)
   =============================== */

function generateButton(model, brand) {

    // 1️⃣ iPhone mini – no pasa de 45
    if (model === "iPhone 12 Mini" || model === "iPhone 13 Mini") {
        return rand(30, 45);
    }

    // 2️⃣ iPhone 11 – NO se toca
    if (model === "iPhone 11") {
        return rand(35, 47);
    }

    // 3️⃣ Todos los demás dispositivos
    const chance = Math.random();

    // 99.5% de probabilidad → botón normal (35–65)
    if (chance < 0.995) {
        return rand(35, 65);
    }

    // 0.5% → botón grande (65–100)
    return rand(65, 100);
}


/* ===============================
   GENERADOR PRINCIPAL
   =============================== */

function generate(withDpi) {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const out = document.getElementById("output");

    if (!brand || !model) {
        alert("Selecciona marca y modelo");
        return;
    }

    let general, redDot, x2, x4, button, dpiDisplay = "";

    // GENERAL
    if (model === "iPhone 11") general = rand(120, 200);
    else general = rand(80, 200);

    redDot = chooseRedDot();
    x2 = rand(80, 200);
    x4 = clamp(x2 + rand(-20, 20), 80, 200);

    // 🔥 BOTÓN FINAL
    button = generateButton(model, brand);

    // DPI
    if (withDpi) {
        if (brand === "Apple") {
            const styles = ["Preciso", "Refinado", "Sencillo"];
            const style = styles[rand(0, styles.length - 1)];
            const dpiVal = (model === "iPhone 11") ? rand(50, 120) : rand(90, 120);
            dpiDisplay = `${style} ${dpiVal}`;
        } else {
            if (brand === "OPPO") dpiDisplay = `${rand(350, 700)}`;
            else dpiDisplay = `${rand(300, 900)}`;
        }
    }

    let dpiLine = withDpi ? `DPI: ${dpiDisplay}\n` : "";

    out.style.display = "block";
    out.textContent =
        `────────────────────────────
📱 ${model}
${dpiLine}
General: ${general}
Red Dot: ${redDot}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${button}
────────────────────────────`;
}


/* ===============================
   UPDATE MODELS
   =============================== */

function updateModels() {
    const brand = document.getElementById("brand").value;
    const sel = document.getElementById("model");

    sel.innerHTML = '<option value="">Seleccionar modelo</option>';

    if (!brand || !MODELS[brand]) return;

    MODELS[brand].forEach(m => {
        const o = document.createElement("option");
        o.value = m;
        o.textContent = m;
        sel.appendChild(o);
    });
}
