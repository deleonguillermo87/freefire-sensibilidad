const modelSelect = document.getElementById("model");
const resultCard = document.getElementById("resultCard");

// BASE DE DATOS
const phones = {
    Apple: ["iPhone 12", "iPhone 13", "iPhone 13 Pro Max", "iPhone 14", "iPhone 15", "iPhone 16", "iPhone 17 Pro Max"],
    OPPO: ["Oppo Reno 11", "Oppo Reno 11 Pro", "Oppo Find X6", "Oppo Find X7", "Oppo A98"]
};

const dpiAppleStyles = ["Preciso", "Refinado", "Sencillo"];

const androidDPI = {
    "Oppo Reno 11": 410,
    "Oppo Reno 11 Pro": 420,
    "Oppo Find X6": 460,
    "Oppo Find X7": 480,
    "Oppo A98": 412
};

// Cargar modelos
document.getElementById("brand").addEventListener("change", e => {
    const brand = e.target.value;
    modelSelect.innerHTML = "";
    phones[brand].forEach(m => modelSelect.innerHTML += `<option value="${m}">${m}</option>`);
});

// GENERADOR BASE
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate(buttonDpi = true) {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;

    if (!brand || !model) return alert("Selecciona marca y modelo");

    let dpiText = "No aplica";
    let general = randomRange(130, 160);
    let rd = randomRange(80, 95);
    let x2 = randomRange(75, 90);
    let x4 = randomRange(65, 80);

    // Botón generado automáticamente según sensibilidad
    let buttonShoot;
    if (general >= 145) buttonShoot = randomRange(35, 45);
    else if (general >= 138) buttonShoot = randomRange(46, 68);
    else buttonShoot = randomRange(69, 100);

    if (buttonDpi) {
        if (brand === "Apple") {
            const style = dpiAppleStyles[Math.floor(Math.random() * dpiAppleStyles.length)];
            const number = randomRange(90, 120);
            dpiText = `${style} ${number}`;
        } else {
            dpiText = androidDPI[model] + " DPI";
        }
    }

    resultCard.classList.remove("hidden");
    resultCard.innerHTML = `
        <strong>${model}</strong><br><br>
        General: ${general}<br>
        Red Dot: ${rd}<br>
        X2: ${x2}<br>
        X4: ${x4}<br>
        Botón de disparo: ${buttonShoot}<br>
        DPI: ${dpiText}
    `;
}

// BOTONES
document.getElementById("withDpi").addEventListener("click", () => generate(true));
document.getElementById("withoutDpi").addEventListener("click", () => generate(false));
