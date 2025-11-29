// ===============================
// script.js FINAL con pantalla categorizada y botones ajustados
// ===============================

// Modelos disponibles por tamaño
const devices = {
    mini: [
        "iPhone 12 mini",
        "iPhone 13 mini"
    ],
    normal: [
        "iPhone 11","iPhone 12","iPhone 13","iPhone 14",
        "Samsung A10","Samsung A11","Samsung A12","Samsung A13",
        "Samsung A14","Samsung A20","Samsung A21","Samsung A22",
        "Samsung A23","Samsung A24",
        "Xiaomi Redmi 9","Xiaomi Redmi 10","Xiaomi Redmi 12",
        "Motorola G20","Motorola G22","Motorola G24",
        "Galaxy M12","Galaxy M13","Galaxy M14",
        "Redmi 10C","Redmi 10A","Redmi 12C",
        "Moto E22","Moto E32","Moto G14"
    ],
    medium: [
        "Samsung A30","Samsung A31","Samsung A32","Samsung A33",
        "Samsung A34","Samsung A50","Samsung A51","Samsung A52",
        "Samsung A53","Samsung A54",
        "Xiaomi Redmi Note 10","Redmi Note 11","Redmi Note 12",
        "Motorola G30","Motorola G31","Motorola G32","Motorola G40",
        "Motorola G52","Motorola G53",
        "Galaxy A25","Galaxy A35",
        "Redmi Note 13","Redmi Note 13 4G",
        "Poco M4","Poco M5","Poco X4",
        "Moto G60","Moto G72","Moto G84"
    ],
    large: [
        "iPhone 12 Pro Max","iPhone 13 Pro Max","iPhone 14 Pro Max",
        "Galaxy A70","Galaxy A71","Galaxy A73",
        "Redmi Note 12 Pro","Redmi Note 12 Pro Plus",
        "Poco X5 Pro","Poco X6 Pro",
        "Galaxy S20 FE","Galaxy S21 FE",
        "Redmi Note 13 Pro","Redmi Note 13 Pro Plus",
        "Poco F4","Poco F5","Poco F5 Pro"
    ]
};

// ===============================
// Selección del tipo de teléfono
// ===============================
document.getElementById("brand").addEventListener("change", function () {
    const type = this.value;
    const modelSelect = document.getElementById("model");
    modelSelect.innerHTML = "<option value=''>Selecciona el modelo</option>";
    if (devices[type]) {
        devices[type].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
});

// ===============================
// Generar botón con lógica de probabilidad
// ===============================
function generateButton(model, sensitivity) {
    // iPhone mini máximo 45
    if (devices.mini.includes(model)) return Math.floor(Math.random() * (45 - 25 + 1)) + 25;

    // Definir rangos base según categoría
    let min = 35, max = 65, rareMin = 65, rareMax = 100;
    let cat = "normal";
    for (const key in devices) {
        if (devices[key].includes(model)) cat = key;
    }

    if(cat === "medium") { min = 40; max = 70; rareMin = 70; rareMax = 100; }
    if(cat === "large") { min = 50; max = 85; rareMin = 85; rareMax = 100; }

    // Probabilidad de que salga botón grande muy baja (0.1 a 5%)
    const rareProb = 0.001; // 0.1% por defecto
    let prob = Math.random();
    if(prob < rareProb) {
        return Math.floor(Math.random() * (rareMax - rareMin + 1)) + rareMin;
    }

    // Ajuste según sensibilidad
    if(sensitivity >= 151) { // alta
        // ligera posibilidad de rare
        if(Math.random() < 0.05) return Math.floor(Math.random() * (rareMax - rareMin + 1)) + rareMin;
        else return Math.floor(Math.random() * (max - min + 1)) + min;
    } else if(sensitivity >= 101) { // media
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else { // baja
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// ===============================
// Generar sensibilidades
// ===============================
function buildSights(general) {
    return {
        red: Math.max(0,Math.min(200,Math.round(general * 0.60))),
        x2: Math.max(0,Math.min(200,Math.round(general * 0.53))),
        x4: Math.max(0,Math.min(200,Math.round(general * 0.14)))
    };
}

// ===============================
// Generar sin DPI
// ===============================
function generateWithoutDPI() {
    const brand=document.getElementById("brand").value;
    const model=document.getElementById("model").value;
    const out=document.getElementById("result");
    if(!brand||!model) return out.textContent="⚠ Selecciona marca y modelo";

    const general = Math.floor(Math.random() * (190 - 80 + 1)) + 80;
    const s = buildSights(general);
    const shoot = generateButton(model, general);

    out.textContent=
`📱 ${model}
────────────────────────
General: ${general}
Red Dot: ${s.red}
X2: ${s.x2}
X4: ${s.x4}
Botón de disparo: ${shoot} (auto)
DPI: No aplicado`;
}

// ===============================
// Generar con DPI
// ===============================
function generateWithDPI() {
    const brand=document.getElementById("brand").value;
    const model=document.getElementById("model").value;
    const out=document.getElementById("result");
    if(!brand||!model) return out.textContent="⚠ Selecciona marca y modelo";

    const general = Math.floor(Math.random() * (190 - 80 + 1)) + 80;
    const s = buildSights(general);
    const shoot = generateButton(model, general);

    let dpi="";
    if(brand==="Apple"){
        const styles=["Preciso","Refinado","Sencillo"];
        dpi=`${styles[Math.floor(Math.random()*styles.length)]} ${model==="iPhone 11"? Math.floor(Math.random()*(120-50+1))+50 : Math.floor(Math.random()*(120-90+1))+90}`;
    } else if(brand==="OPPO"){
        dpi=`${Math.floor(Math.random()*(700-350+1))+350}`;
    } else {
        dpi=`${Math.floor(Math.random()*(900-300+1))+300}`;
    }

    out.textContent=
`📱 ${model}
────────────────────────
General: ${general}
Red Dot: ${s.red}
X2: ${s.x2}
X4: ${s.x4}
Botón de disparo: ${shoot} (auto)
DPI: ${dpi}`;
}
