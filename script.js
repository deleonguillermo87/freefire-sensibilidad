(() => {
  // --- Base de datos de modelos (placeholder DPI/Hz si no hay datos reales) ---
  const db = {
    "Apple": [
      { id: "iphone11", name: "iPhone 11" },
      { id: "iphone12", name: "iPhone 12" },
      { id: "iphone13", name: "iPhone 13" },
      { id: "iphone13pro", name: "iPhone 13 Pro" },
      { id: "iphone14", name: "iPhone 14" }
    ],
    "Samsung": [
      { id: "s_a32", name: "Samsung A32", dpi: 412, hz: 90 },
      { id: "s_s20", name: "Samsung S20", dpi: 563, hz: 120 }
    ],
    "OPPO": [
      { id: "oppo_reno11", name: "OPPO Reno 11", dpi: 400, hz: 90 }
    ],
    "Generic Android": [
      { id: "generic", name: "Genérico Android", dpi: 400, hz: 60 }
    ]
  };

  const CLAMP = (v, min, max) => Math.max(min, Math.min(max, v));
  const round = v => Math.round(v);

  const brandEl = document.getElementById('brand');
  const modelEl = document.getElementById('model');
  const btnRange = document.getElementById('btnSize');
  const btnValue = document.getElementById('btnValue');
  const genBtn = document.getElementById('gen');
  const result = document.getElementById('result');
  const resultText = document.getElementById('resultText');

  // Poblamos marcas
  Object.keys(db).forEach(b => {
    const o = document.createElement('option');
    o.value = b;
    o.textContent = b;
    brandEl.appendChild(o);
  });

  function populateModels(brand){
    modelEl.innerHTML = '';
    db[brand].forEach(m => {
      const o = document.createElement('option');
      o.value = m.id;
      o.textContent = m.name;
      modelEl.appendChild(o);
    });
  }

  brandEl.addEventListener('change', () => populateModels(brandEl.value));

  // Init
  brandEl.value = Object.keys(db)[0];
  populateModels(brandEl.value);

  btnValue.textContent = btnRange.value;
  btnRange.addEventListener('input', () => btnValue.textContent = btnRange.value);

  function getModel(brand, modelId) {
    return (db[brand].find(m => m.id === modelId)) || null;
  }

  function randomStyleValue() {
    // generamos un número aleatorio entre 80 y 120 para DPI-estilo
    return 80 + Math.floor(Math.random() * 41);
  }

  function calculate({ dpi, hz, btnSize }) {
    let btn = Number(btnSize);
    if (btn <= 0) btn = 1;

    const raw = dpi * (60 / hz) * (100 / btn) * 0.2;
    const general = round(CLAMP(raw, 0, 200));
    const red = round(CLAMP(general * 0.60, 0, 200));
    const x2 = round(CLAMP(general * 0.53, 0, 200));
    const x4 = round(CLAMP(general * 0.14, 0, 200));

    return { general, red, x2, x4 };
  }

  function generateConfig() {
    const brand = brandEl.value;
    const model = getModel(brand, modelEl.value);
    const btn = btnRange.value;

    let dpiDisplay = '';
    let dpiUsed = 400;
    let hzUsed = 60;

    if (brand === 'Apple') {
      const styleNames = ['Preciso', 'Refinado', 'Sencillo'];
      const style = styleNames[Math.floor(Math.random() * styleNames.length)];
      const styleVal = randomStyleValue();
      dpiDisplay = `${style} ${styleVal}`;
      dpiUsed = styleVal;
      hzUsed = 60;
    } else {
      dpiUsed = model.dpi || 400;
      hzUsed = model.hz || 60;
      dpiDisplay = dpiUsed;
    }

    const sens = calculate({ dpi: dpiUsed, hz: hzUsed, btnSize: btn });

    const lines = [];
    lines.push('────────────────────────');
    lines.push(`📱 ${model.name}`);
    lines.push(`DPI: ${dpiDisplay}`);
    lines.push(`General: ${sens.general}`);
    lines.push(`Red dot: ${sens.red}`);
    lines.push(`X2: ${sens.x2}`);
    lines.push(`X4: ${sens.x4}`);
    lines.push(`Botón: ${btn}`);
    lines.push('────────────────────────');

    resultText.textContent = lines.join('\n');
    result.hidden = false;
  }

  genBtn.addEventListener('click', generateConfig);

  // Generar una al cargar
  generateConfig();

})();
