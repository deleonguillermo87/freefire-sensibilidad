function generarBotonDisparo(sensibilidad, modelo) {
    let boton = 0;

    // iPhone 11: NO TOCAR (se deja exactamente como estaba)
    if (modelo === "iPhone 11") {
        if (sensibilidad <= 150) {
            boton = Math.floor(Math.random() * (45 - 25 + 1)) + 25; 
        } else {
            boton = Math.floor(Math.random() * (60 - 35 + 1)) + 35;
        }
        return boton;
    }

    // iPhone Mini: nunca mayor a 45
    const esMini = modelo.toLowerCase().includes("mini");

    // Probabilidades globales
    const prob = Math.random(); // número entre 0 y 1

    // 0.001 = 0.1% de probabilidad → casi nulo
    if (prob < 0.001 && !esMini) {
        // RANGO 65–100 (ULTRA RARO)
        boton = Math.floor(Math.random() * (100 - 65 + 1)) + 65;
        return boton;
    }

    // 35–65 → probabilidad NORMAL dentro del 99.9% restante
    if (prob < 0.60) {
        let min = 35;
        let max = esMini ? 45 : 65; // minis no pasan de 45
        boton = Math.floor(Math.random() * (max - min + 1)) + min;
        return boton;
    }

    // 10–35 → botones pequeños (resto)
    let minP = 10;
    let maxP = esMini ? 35 : 35;
    boton = Math.floor(Math.random() * (maxP - minP + 1)) + minP;

    return boton;
}
