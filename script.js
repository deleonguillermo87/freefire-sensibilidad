// Base de datos de teléfonos
const telefonos = {
    "iPhone 11": { dpi: 326, hz: 60 },
    "iPhone 12": { dpi: 460, hz: 60 },
    "iPhone 13": { dpi: 460, hz: 60 },
    "Samsung A32": { dpi: 412, hz: 90 },
    "Samsung A52": { dpi: 405, hz: 90 },
    "Samsung S21": { dpi: 421, hz: 120 },
    "Xiaomi Redmi Note 10": { dpi: 394, hz: 60 },
    "Xiaomi Redmi Note 11": { dpi: 409, hz: 90 },
    "Poco X3 Pro": { dpi: 440, hz: 120 },
    "Poco X5 Pro": { dpi: 395, hz: 120 }
};

// Mostrar valores si seleccionan un teléfono
function seleccionarTelefono() {
    const modelo = document.getElementById("telefono").value;

    if (modelo !== "") {
        const { dpi, hz } = telefonos[modelo];
        document.getElementById("dpi").value = dpi;
        document.getElementById("hz").value = hz;
    }
}

// Calcular sensibilidad
function calcularSensibilidad() {
    let dpi = Number(document.getElementById("dpi").value);
    let tasa = Number(document.getElementById("hz").value);

    if (!dpi || !tasa) {
        document.getElementById("resultado").innerHTML = "Seleccione un teléfono o ingrese valores.";
        return;
    }

    let general = ((dpi / 10) * (tasa / 60)).toFixed(1);
    let puntoRojo = ((dpi / 8) * (tasa / 60)).toFixed(1);
    let mira4x = ((dpi / 12) * (tasa / 60)).toFixed(1);

    document.getElementById("resultado").innerHTML =
        `✔ Sensibilidad recomendada<br>
         General: ${general}<br>
         Punto rojo: ${puntoRojo}<br>
         Mira 4X: ${mira4x}`;
}
