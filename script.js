// ================================
// BASE DE SENSIBILIDAD POR MODELO
// ================================
const baseSensibilidad = {
    "iPhone 11": { general: 140, rojo: 80, x2: 110, x4: 100, refinado: 60 },
    "iPhone 12": { general: 145, rojo: 83, x2: 112, x4: 102, refinado: 63 },
    "iPhone XR": { general: 138, rojo: 78, x2: 108, x4: 97, refinado: 59 },
    "Samsung A15": { general: 130, rojo: 75, x2: 105, x4: 95, refinado: 55 },
    "Samsung A23": { general: 135, rojo: 79, x2: 109, x4: 98, refinado: 58 },
    "Xiaomi Redmi 12": { general: 128, rojo: 72, x2: 103, x4: 92, refinado: 54 }
};


// ================================
// FUNCIÓN LIMITAR (0–200)
// ================================
function limitar(v) {
    return Math.max(0, Math.min(200, v));
}


// ================================
// FUNCIÓN RANDOM
// ================================
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ================================
// GENERADOR CALIBRADO FINAL
// ================================
function generarSensibilidad(modelo, dpi, hz, conDpi = true) {

    const base = baseSensibilidad[modelo];
    if (!base) return { error: "Modelo no encontrado." };

    const laguna = Math.random() * 6 - 3;
    const factorDpi = conDpi ? (dpi / 20) : 0;
    const factorHz = hz / 10;

    const general = limitar(base.general + factorDpi + factorHz + laguna + aleatorio(10, 25));
    const rojo = limitar(base.rojo + factorDpi * 0.4 + factorHz * 0.5 + laguna + aleatorio(5, 15));
    const x2 = limitar(base.x2 + factorDpi * 0.5 + factorHz * 0.4 + laguna + aleatorio(8, 18));
    const x4 = limitar(base.x4 + factorDpi * 0.3 + factorHz * 0.4 + laguna + aleatorio(5, 15));
    const refinado = limitar(base.refinado + factorDpi * 0.2 + factorHz * 0.3 + laguna + aleatorio(3, 10));

    let boton = 50;
    if (general >= 150) boton = aleatorio(0, 40);
    else if (general >= 120) boton = aleatorio(45, 60);
    else boton = aleatorio(61, 100);

    return { general, rojo, x2, x4, refinado, boton };
}



// ================================
// ACTUALIZAR MODELOS SEGÚN MARCA
// ================================
function updateModels() {
    const brand = document.getElementById("brand").value;
    const modelSelect = document.getElementById("model");

    modelSelect.innerHTML = "<option value=''>Seleccionar modelo</option>";

    let modelos = [];

    if (brand === "Apple") {
        modelos = ["iPhone 11", "iPhone 12", "iPhone XR"];
    }
    else if (brand === "Samsung") {
        modelos = ["Samsung A15", "Samsung A23"];
    }
    else if (brand === "Xiaomi") {
        modelos = ["Xiaomi Redmi 12"];
    }

    modelos.forEach(m => {
        const op = document.createElement("option");
        op.value = op.textContent = m;
        modelSelect.appendChild(op);
    });
}


// ================================
// MOSTRAR RESULTADO FINAL FORMATEADO
// ================================
function mostrarResultado(modelo, data, dpiTxt) {

    const out = document.getElementById("output");
    out.style.display = "block";

    out.innerHTML = `
        <div class="result-box">
            <h3>📱 ${modelo}</h3>
            ${dpiTxt ? `<b>DPI:</b> ${dpiTxt}<br><br>` : ""}
            <b>General:</b> ${data.general}<br>
            <b>Red Dot:</b> ${data.rojo}<br>
            <b>X2:</b> ${data.x2}<br>
            <b>X4:</b> ${data.x4}<br>
            <b>Botón de disparo:</b> ${data.boton}<br>
            <b>Refinado:</b> ${data.refinado}<br>
        </div>
        <p class="nota">
            Nota: Apple muestra estilo + número (Preciso/Refinado/Sencillo).  
            Otras marcas muestran solo el número DPI.
        </p>
    `;
}



// ================================
// BOTÓN: GENERAR CON DPI
// ================================
document.querySelector("button[onclick=\"generate(true)\"]").addEventListener("click", () => {

    const modelo = document.getElementById("model").value;
    const brand = document.getElementById("brand").value;

    let dpiTxt = "";
    let dpiValor = 0;

    if (brand === "Apple") {
        const estilos = ["Sencillo", "Refinado", "Preciso"];
        const estilo = estilos[Math.floor(Math.random() * estilos.length)];
        dpiValor = aleatorio(40, 100);
        dpiTxt = `${estilo} ${dpiValor}`;
    } else {
        dpiValor = aleatorio(200, 900);
        dpiTxt = dpiValor;
    }

    const hz = 90; // interno como pediste

    const result = generarSensibilidad(modelo, dpiValor, hz, true);
    mostrarResultado(modelo, result, dpiTxt);
});



// ================================
// BOTÓN: GENERAR SIN DPI
// ================================
document.querySelector("button[onclick=\"generate(false)\"]").addEventListener("click", () => {

    const modelo = document.getElementById("model").value;
    const hz = 90;

    const result = generarSensibilidad(modelo, 0, hz, false);
    mostrarResultado(modelo, result, null);
});
