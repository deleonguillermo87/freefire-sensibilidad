// =============================
// Modelos por categoría / tipo
// =============================
const devices = {
    mini: [
        "iPhone 12 mini",
        "iPhone 13 mini"
    ],

    normal: [
        "iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14",
        "Samsung A10", "Samsung A11", "Samsung A12", "Samsung A13",
        "Samsung A14", "Samsung A20", "Samsung A21", "Samsung A22",
        "Samsung A23", "Samsung A24",
        "Xiaomi Redmi 9", "Xiaomi Redmi 10", "Xiaomi Redmi 12",
        "Motorola G20", "Motorola G22", "Motorola G24",

        "Galaxy M12", "Galaxy M13", "Galaxy M14",
        "Redmi 10C", "Redmi 10A", "Redmi 12C",
        "Moto E22", "Moto E32", "Moto G14"
    ],

    medium: [
        "Samsung A30", "Samsung A31", "Samsung A32", "Samsung A33",
        "Samsung A34", "Samsung A50", "Samsung A51", "Samsung A52",
        "Samsung A53", "Samsung A54",
        "Xiaomi Redmi Note 10", "Redmi Note 11", "Redmi Note 12",
        "Motorola G30", "Motorola G31", "Motorola G32", "Motorola G40",
        "Motorola G52", "Motorola G53",

        "Galaxy A25", "Galaxy A35",
        "Redmi Note 13", "Redmi Note 13 4G",
        "Poco M4", "Poco M5", "Poco X4",
        "Moto G60", "Moto G72", "Moto G84"
    ],

    large: [
        "iPhone 12 Pro Max", "iPhone 13 Pro Max", "iPhone 14 Pro Max",
        "Galaxy A70", "Galaxy A71", "Galaxy A73",
        "Redmi Note 12 Pro", "Redmi Note 12 Pro Plus",
        "Poco X5 Pro", "Poco X6 Pro",

        "Galaxy S20 FE", "Galaxy S21 FE",
        "Redmi Note 13 Pro", "Redmi Note 13 Pro Plus",
        "Poco F4", "Poco F5", "Poco F5 Pro"
    ]
};


// =============================
// Rango de botón por categoría
// =============================
const buttonRanges = {
    mini: "25–40",
    normal: "40–55",
    medium: "50–70",
    large: "60–85"
};


// =============================
// Actualizar lista de modelos
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
// Mostrar el rango al elegir modelo
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
