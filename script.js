function generarBotonDisparo(modelo) {
    let random = Math.random();

    // === iPhone Mini: límite absoluto 45 ===
    if (modelo.toLowerCase().includes("mini")) {
        return Math.floor(Math.random() * (45 - 35 + 1)) + 35; 
    }

    // === Para todos los demás ===
    // 99.9% → valores entre 35 - 65
    if (random < 0.999) {
        return Math.floor(Math.random() * (65 - 35 + 1)) + 35;
    }

    // 0.1% → valores entre 65 - 100 (casi nulo)
    return Math.floor(Math.random() * (100 - 65 + 1)) + 65;
}


// ===============================
// RESTO DEL CÓDIGO PRINCIPAL
// ===============================

function generarSensibilidad(modelo) {
    const general = Math.floor(Math.random() * (200 - 120 + 1)) + 120;
    const redDot = Math.floor(Math.random() * (200 - 180 + 1)) + 180;
    const x2 = Math.floor(Math.random() * (200 - 185 + 1)) + 185;
    const x4 = Math.floor(Math.random() * (200 - 190 + 1)) + 190;

    const botonDisparo = generarBotonDisparo(modelo);

    return {
        general,
        redDot,
        x2,
        x4,
        botonDisparo
    };
}

function mostrarResultados(modelo) {
    const datos = generarSensibilidad(modelo);

    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = `
        <h3>📱 ${modelo}</h3>
        <p>General: ${datos.general}</p>
        <p>Red Dot: ${datos.redDot}</p>
        <p>X2: ${datos.x2}</p>
        <p>X4: ${datos.x4}</p>
        <p>Botón de disparo: ${datos.botonDisparo}</p>
        <hr>
    `;
}

document.getElementById("generarSinDpiBtn").addEventListener("click", () => {
    const modelo = document.getElementById("modelo").value;
    mostrarResultados(modelo);
});
