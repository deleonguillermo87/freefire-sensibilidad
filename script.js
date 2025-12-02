const models = {
  Apple: ["iPhone XR", "iPhone 11", "iPhone 12", "iPhone 13", "iPhone 14", "iPhone 15"],
  Samsung: ["A03s", "A10", "A12", "A13", "A20", "A21s", "A22", "A23", "A24", "A30", "A32", "A33", "A50", "A51", "A52", "A54", "A70", "A71"],
  Xiaomi: ["Redmi 9A", "Redmi 9C", "Redmi 10", "Redmi Note 8", "Redmi Note 9", "Redmi Note 10", "Redmi Note 11", "Redmi Note 12", "Poco X3 Pro", "Poco M3", "Poco X4"],
  OPPO: ["A15", "A16", "A17", "A54", "A57", "A58", "A74"],
  Vivo: ["Y20", "Y21", "Y22", "Y27", "Y33", "Y53", "Y55", "Y73"],
  Realme: ["C11", "C15", "C25", "8i", "9i"],
  Tecno: ["Spark 6", "Spark 7", "Spark 8", "Spark 10", "Pova Neo", "Pop 6"],
  Infinix: ["Hot 10", "Hot 11", "Hot 12", "Hot 30", "Note 7", "Note 10", "Note 12"],
  Honor: ["X6", "X7", "X8", "X9"],
  Huawei: ["Y7", "Y8", "Y9", "P20 Lite", "P30 Lite"]
};

function updateModels() {
  const brand = document.getElementById("brand").value;
  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML = "<option value=''>Seleccionar modelo</option>";

  if (models[brand]) {
    models[brand].forEach(model => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rareBoost() {
  return Math.random() < 0.25 ? random(65, 100) : random(30, 64);
}

function generate(allowDPI) {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;

  if (!brand || !model) {
    alert("Selecciona marca y modelo primero.");
    return;
  }

  // Parámetros calibrados
  const general = rareBoost();
  const mira2 = random(30, 90);
  const mira4 = random(10, 80);
  const awm = random(0, 60);
  const miraRoja = random(40, 95);

  // Botón de disparo según sensibilidad
  let fireButton;
  if (general <= 40) fireButton = random(0, 40);
  else if (general <= 60) fireButton = random(45, 60);
  else fireButton = random(61, 100);

  // DPI
  let dpiText = "";
  if (allowDPI) {
    if (brand === "Apple") {
      const styles = ["Preciso", "Refinado", "Sencillo"];
      dpiText = `• Estilo: ${styles[random(0, 2)]}\n• Nivel: ${random(0, 120)}`;
    } else {
      dpiText = `${random(100, 900)}`;
    }
  } else {
    dpiText = "No aplicado";
  }

  // Sensibilidad Calibrada (lo que pediste agregar)
  const calibrada = Math.round((general + mira2 + mira4 + awm + miraRoja) / 5);

  const output = `
📱 *${brand} — ${model}*
────────────────────────
🎯 *Sensibilidad Calibrada:* ${calibrada}

🔥 *GENERAL:* ${general}
🔴 *Mira Roja:* ${miraRoja}
🔭 *2x:* ${mira2}
🎯 *4x:* ${mira4}
🏹 *AWM:* ${awm}

🎮 *Botón de disparo:* ${fireButton}

🖥️ *DPI:* ${dpiText}

🚀 Configuración generada con algoritmo Pro Aim.
`;

  const box = document.getElementById("output");
  box.style.display = "block";
  box.textContent = output;
}
