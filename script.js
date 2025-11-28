const models = {
    Apple: [
        "iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max","iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max",
        "iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max",
        "iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
        "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max",
        "iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max",
        "iPhone 17","iPhone 17 Pro","iPhone 17 Pro Max"
    ],
    Samsung: ["A32", "A52", "A54", "A72", "S20", "S21", "S22", "S23", "S23 Ultra"],
    Xiaomi: ["Xiaomi 12", "Xiaomi 13", "Xiaomi 14", "Xiaomi 14 Pro"],
    Redmi: ["Redmi Note 10", "Redmi Note 11", "Redmi Note 12", "Redmi Note 13"],
    POCO: ["POCO X3 Pro", "POCO X4 Pro", "POCO F3", "POCO F4"],
    OPPO: ["Reno 11"]
};

function loadModels() {
    const brand = document.getElementById("brand").value;
    const modelSelect = document.getElementById("model");
    modelSelect.innerHTML = "<option>Seleccione modelo</option>";
    if (models[brand]) models[brand].forEach(m => {
        modelSelect.innerHTML += `<option>${m}</option>`;
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSens(withDpi) {
    const brand = document.getElementById("brand").value;

    let dpiValue = "";
    let styleLabel = "";

    if (brand === "Apple") {
        const types = ["Preciso", "Refinado", "Sencillo"];
        styleLabel = types[random(0, 2)];
        dpiValue = `${styleLabel} ${random(80,120)}`;
    } else if (withDpi) {
        dpiValue = random(300, 900) + " DPI";
    }

    document.getElementById("dpi").innerHTML = dpiValue ? `DPI: ${dpiValue}` : "";

    let general = random(120, 200);
    document.getElementById("general").innerHTML = "General: " + general;
    document.getElementById("red").innerHTML = "Red Dot: " + random(50, 120);
    document.getElementById("x2").innerHTML = "X2: " + random(50, 120);
    document.getElementById("x4").innerHTML = "X4: " + random(50, 120);

    // -----------------------------
    // BOTÓN ALEATORIO 0–100
    // -----------------------------
    let shoot = random(0, 100);
    document.getElementById("shoot").innerHTML = "Botón de disparo: " + shoot;
}
