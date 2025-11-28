// ========================
// BASE DE MODELOS
// ========================
const phones = {
  "Apple": [
    { model: "iPhone 11", screenSize: 6.1 },
    { model: "iPhone 11 Pro", screenSize: 5.8 },
    { model: "iPhone 11 Pro Max", screenSize: 6.5 },
    { model: "iPhone 12", screenSize: 6.1 },
    { model: "iPhone 12 Mini", screenSize: 5.4 },
    { model: "iPhone 12 Pro", screenSize: 6.1 },
    { model: "iPhone 12 Pro Max", screenSize: 6.7 },
    { model: "iPhone 13", screenSize: 6.1 },
    { model: "iPhone 13 Mini", screenSize: 5.4 },
    { model: "iPhone 13 Pro", screenSize: 6.1 },
    { model: "iPhone 13 Pro Max", screenSize: 6.7 },
    { model: "iPhone 14", screenSize: 6.1 },
    { model: "iPhone 14 Plus", screenSize: 6.7 },
    { model: "iPhone 14 Pro", screenSize: 6.1 },
    { model: "iPhone 14 Pro Max", screenSize: 6.7 },
    { model: "iPhone 15", screenSize: 6.1 },
    { model: "iPhone 15 Plus", screenSize: 6.7 },
    { model: "iPhone 15 Pro", screenSize: 6.1 },
    { model: "iPhone 15 Pro Max", screenSize: 6.7 },
    { model: "iPhone 16", screenSize: 6.3 },
    { model: "iPhone 16 Plus", screenSize: 6.9 },
    { model: "iPhone 16 Pro", screenSize: 6.3 },
    { model: "iPhone 16 Pro Max", screenSize: 6.9 },
    { model: "iPhone 17", screenSize: 6.4 },
    { model: "iPhone 17 Pro", screenSize: 6.3 },
    { model: "iPhone 17 Pro Max", screenSize: 6.8 }
  ],

  "Samsung": [
    { model: "Samsung S23 Ultra", screenSize: 6.8, dpi: 520 },
    { model: "Samsung A54", screenSize: 6.4, dpi: 405 },
    { model: "Samsung A34", screenSize: 6.6, dpi: 390 }
  ],

  "Xiaomi": [
    { model: "Xiaomi Poco X3 Pro", screenSize: 6.67, dpi: 395 },
    { model: "Xiaomi Poco X5 Pro", screenSize: 6.67, dpi: 405 },
    { model: "Xiaomi Redmi Note 12", screenSize: 6.67, dpi: 395 }
  ],

  "Oppo": [
    { model: "Oppo Reno 11", screenSize: 6.7, dpi: 410 },
    { model: "Oppo Reno 10", screenSize: 6.7, dpi: 405 }
  ]
};

// ========================
// UTILIDADES
// ========================
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========================
// CARGAR MODELOS SEGÚN MARCA
// ========================
function loadModels() {
  const brand = document.getElementById("brand").value;
  const modelList = document.getElementById("model");

  modelList.innerHTML = "";
  phones[brand].forEach(phone => {
    let opt = document.createElement("option");
    opt.value = phone.model;
    opt.textContent = phone.model;
    modelList.appendChild(opt);
  });
}

// ========================
// GENERAR SENSIBILIDAD
// ========================
function generateSens(mode) {
  const brand = document.getElementById("brand").value;
  const modelName = document.getElementById("model").value;
  const phone = phones[brand].find(p => p.model === modelName);

  let dpi = mode === "dpi" ? phone.dpi || random(350, 500) : "N/A";

  let styles = ["Preciso", "Refinado", "Sencillo"];
  let style = styles[random(0, styles.length - 1)];

  let general = random(120, 200);
  let redDot = random(70, 100);
  let x2 = random(60, 95);
  let x4 = random(40, 80);

  // BOTÓN DE DISPARO POR TAMAÑO REAL
  let shoot;
  if (phone.screenSize < 6.0) shoot = random(25, 45);
  else if (phone.screenSize <= 6.2) shoot = random(30, 55);
  else if (phone.screenSize <= 6.6) shoot = random(35, 65);
  else if (phone.screenSize <= 6.8) shoot = random(40, 80);
  else shoot = random(45, 100);

  // MOSTRAR RESULTADOS
  document.getElementById("results").innerHTML = `
────────────────────────────
📱 ${modelName}
${brand === "Apple" ? `DPI: ${style} ${random(90,115)}` : `DPI: ${dpi}`}
General: ${general}
Red Dot: ${redDot}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${shoot}
────────────────────────────
  `;
}
