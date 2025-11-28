const devices = {
    mini: [
        "iPhone 12 mini",
        "iPhone 13 mini",

        // Nuevos mini
        "iPhone 14 mini",
        "iPhone 15 mini",
        "Samsung A3 Core",
        "Samsung A01 Core",
        "Xiaomi 12 Lite",
        "Poco M5s"
    ],

    normal: [
        // EXISTENTES (NO SE TOCARON)
        "iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14",
        "Samsung A10", "Samsung A11", "Samsung A12", "Samsung A13",
        "Samsung A14", "Samsung A20", "Samsung A21", "Samsung A22",
        "Samsung A23", "Samsung A24",
        "Xiaomi Redmi 9", "Xiaomi Redmi 10", "Xiaomi Redmi 12",
        "Motorola G20", "Motorola G22", "Motorola G24",

        // NUEVOS NORMAL
        "Galaxy M12", "Galaxy M13", "Galaxy M14",
        "Redmi 10C", "Redmi 10A", "Redmi 12C",
        "Moto E22", "Moto E32", "Moto G14",
        "Huawei Y9a", "Huawei Y7", "Huawei P20 Lite",
        "Vivo Y21", "Vivo Y22", "Vivo Y27",
        "Realme C51", "Realme C53", "Realme 9",
        "Tecno Spark 10", "Tecno Spark 20",
        "Infinix Hot 12", "Infinix Smart 7",
        "Pixel 8", "Pixel 9",
        "OnePlus Nord CE 3 Lite",
        "Samsung S23", "Samsung S24"
    ],

    medium: [
        // EXISTENTES
        "Samsung A30", "Samsung A31", "Samsung A32", "Samsung A33",
        "Samsung A34", "Samsung A50", "Samsung A51", "Samsung A52",
        "Samsung A53", "Samsung A54",
        "Xiaomi Redmi Note 10", "Redmi Note 11", "Redmi Note 12",
        "Motorola G30", "Motorola G31", "Motorola G32", "Motorola G40",
        "Motorola G52", "Motorola G53",

        // NUEVOS MEDIUM
        "Galaxy A25", "Galaxy A35",
        "Redmi Note 13", "Redmi Note 13 4G",
        "Poco M4", "Poco M5", "Poco X4",
        "Moto G60", "Moto G72", "Moto G84",
        "Huawei Nova 9", "Huawei Nova 11i",
        "Vivo V25", "Vivo Y36",
        "Realme 10", "Realme 11",
        "Tecno Camon 19", "Tecno Camon 20",
        "Infinix Note 12", "Infinix Note 30",
        "Pixel 8 Pro",
        "OnePlus 10T", "OnePlus 11"
    ],

    large: [
        // EXISTENTES
        "iPhone 12 Pro Max", "iPhone 13 Pro Max", "iPhone 14 Pro Max",
        "Galaxy A70", "Galaxy A71", "Galaxy A73",
        "Redmi Note 12 Pro", "Redmi Note 12 Pro Plus",
        "Poco X5 Pro", "Poco X6 Pro",

        // NUEVOS LARGE
        "iPhone 15 Pro Max", "iPhone 16 Pro Max", "iPhone 17 Pro Max",
        "Galaxy S20 FE", "Galaxy S21 FE",
        "Galaxy S22 Ultra", "Galaxy S23 Ultra", "Galaxy S24 Ultra", "Galaxy S25 Ultra",
        "Samsung Z Fold 4", "Samsung Z Fold 5", "Samsung Z Fold 6",
        "Samsung Z Flip 4", "Samsung Z Flip 5", "Samsung Z Flip 6",
        "Redmi Note 13 Pro", "Redmi Note 13 Pro Plus",
        "Poco F4", "Poco F5", "Poco F5 Pro",
        "Xiaomi 12 Pro", "Xiaomi 13 Pro", "Xiaomi 14 Pro",
        "OnePlus 12", "OnePlus 12R",
        "Pixel 9 Pro"
    ]
};


// =============================
// Selección del tipo de teléfono
// =============================
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


// =============================
// Rango de botones por categoría
// =============================
const buttonRanges = {
    mini: "25–40",
    normal: "40–55",
    medium: "50–70",
    large: "60–85"
};


// =============================
// Mostrar rango cuando eligen modelo
// =============================
document.getElementById("model").addEventListener("change", function () {
    const brandType = document.getElementById("brand").value;
    const resultBox = document.getElementById("result");

    if (buttonRanges[brandType]) {
        resultBox.innerHTML = `
            <h3>Configuración recomendada:</h3>
            <p><b>Botón de disparo:</b> ${buttonRanges[brandType]}</p>
        `;
    }
});
