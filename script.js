function calcularSensibilidad() {
    let dpi = document.getElementById("dpi").value;
    let tasa = document.getElementById("hz").value;

    if (dpi === "" || tasa === "") {
        document.getElementById("resultado").innerHTML = "Ingrese todos los datos.";
        return;
    }

    dpi = Number(dpi);
    tasa = Number(tasa);

    // Fórmula básica ajustada por tasa de refresco (ejemplo)
    let x = ((dpi / 10) * (tasa / 60)).toFixed(2);
    let y = ((dpi / 8) * (tasa / 60)).toFixed(2);
    let mira = ((dpi / 12) * (tasa / 60)).toFixed(2);

    document.getElementById("resultado").innerHTML =
        `✔ Sensibilidad recomendada<br>
         - General: ${x}<br>
         - Mira de punto rojo: ${y}<br>
         - 2X / 4X: ${mira}`;
}
