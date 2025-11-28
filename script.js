// Base de modelos por marca
const models = {
    "Apple": [
        "iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max",
        "iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max",
        "iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max",
        "iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
        "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max",
        "iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max",
        "iPhone 17","iPhone 17 Pro","iPhone 17 Pro Max",
    ],
    "Samsung": [
        "S20","S21","S21 FE","S22","S22 Ultra",
        "S23","S23 Ultra","S24","S24 Ultra","A52","A53","A54","A72","A73"
    ],
    "Xiaomi": [
        "Mi 11","Mi 11T","Mi 11 Lite","Mi 12","Mi 12 Pro","Mi 13","Mi 13 Pro"
    ],
    "Redmi": [
        "Note 10","Note 10 Pro","Note 11","Note 11 Pro","Note 12","Note 12 Pro"
    ],
    "POCO": [
        "X3 Pro","X4 Pro","F3","F4","F5","F5 Pro","X5","X6"
    ],
    "OPPO": [
        "Reno 8","Reno 8 Pro","Reno 9","Reno 9 Pro","Reno 10","Reno 11","Reno 11 Pro"
    ]
};

// Actualizar lista de modelos
function updateModels() {
    const brand = document.getElementById("brand").value;
    const modelSelect = document.getElementById("model");

    modelSelect.innerHTML = `<option value="">Seleccionar modelo</option>`;

    if (models[brand]) {
        models[brand].forEach(model => {
            const opt = document.createElement("option");
            opt.value = model;
            opt.textContent = model;
            modelSelect.appendChild(opt);
        });
    }
}

// Generar números aleatorios dentro de un rango
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar sin DPI
function generateWithoutDPI() {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;

    if (!brand || !model) {
        document.getElementById("result").textContent = "⚠ Selecciona marca y modelo";
        return;
    }

    const general = rand(110, 200);
    const redDot = rand(70, 100);
    const x2 = rand(60, 95);
    const x4 = rand(45, 80);
    const shoot = rand(30, 100); // botón aleatorio como pediste

    document.getElementById("result").textContent = `
📱 ${model}
────────────────────────
General: ${general}
Red dot: ${redDot}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${shoot} (auto)
DPI: No aplicado
`;
}

// Generar con DPI y estilo Apple
function generateWithDPI() {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;

    if (!brand || !model) {
        document.getElementById("result").textContent = "⚠ Selecciona marca y modelo";
        return;
    }

    let dpi, mode;
    if (brand === "Apple") {
        const modes = ["Preciso", "Refinado", "Sencillo"];
        mode = modes[rand(0,2)];
        dpi = rand(85, 120);
    } else {
        dpi = rand(350, 850);
        mode = "";
    }

    const general = rand(120, 200);
    const redDot = rand(75, 98);
    const x2 = rand(65, 95);
    const x4 = rand(50, 80);
    const shoot = rand(30, 100);

    document.getElementById("result").textContent = `
📱 ${model}
────────────────────────
General: ${general}
Red Dot: ${redDot}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${shoot} (auto)
DPI: ${brand === "Apple" ? mode + " " + dpi : dpi}
`;
}
