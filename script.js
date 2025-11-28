/* script.js
   Reglas implementadas:
   - DB interna con DPI y Hz por modelo (DPI y Hz se usan pero no se muestran).
   - "Generar con DPI": usa DPI del modelo.
   - "Generar sin DPI": usa DPI estándar (fallback) pero mantiene Hz del modelo.
   - Rango tamaño botón 0-100 → sensibilidad (0–40 alta, 41–60 media, 61–100 baja).
   - Fórmula: raw = DPI * (60 / Hz) * (100 / btn) * 0.2
     General = round(clamp(raw, 0, 200))
     PuntoRojo = round(General * 0.60)
     MiraX2 = round(General * 0.53)   // valor de conveniencia para X2
     MiraX4 = round(General * 0.14)
   - Para iPhone: estilo depende de sensibilidad general:
       alta => "Sencillo"
       media => "Refinado"
       baja => "Preciso"
*/

(() => {
  // --- Base de datos de modelos (ejemplos) ---
  // Añade o ajusta modelos aquí; cada modelo tiene: dpi y hz
  const db = {
    "Apple": [
      { id: "iphone11", name: "iPhone 11", dpi: 326, hz: 60 },
      { id: "iphone12", name: "iPhone 12", dpi: 460, hz: 60 },
      { id: "iphone13", name: "iPhone 13", dpi: 460, hz: 60 },
      { id: "iphone14", name: "iPhone 14", dpi: 460, hz: 60 }
    ],
    "Samsung": [
      { id: "s_a32", name: "Samsung A32", dpi: 412, hz: 90 },
      { id: "s_s20", name: "Samsung S20", dpi: 563, hz: 120 },
      { id: "s_s21", name: "Samsung S21", dpi: 525, hz: 120 }
    ],
    "Xiaomi / Redmi": [
      { id: "redmi_note11", name: "Redmi Note 11", dpi: 409, hz: 90 },
      { id: "redmi_14c", name: "Redmi 14C", dpi: 395, hz: 90 },
      { id: "poco_x3", name: "Poco X3", dpi: 395, hz: 120 }
    ],
    "OnePlus": [
      { id: "oneplus9", name: "OnePlus 9", dpi: 402, hz: 120 },
    ],
    "Otros (estándar)": [
      { id: "generic", name: "Genérico (fallback)", dpi: 400, hz: 60 }
    ]
  };

  const FALLBACK_DPI = 400; // DPI usado cuando el usuario elige "Generar sin DPI" (modelo no usado)
  const CLAMP = (v,min,max) => Math.max(min, Math.min(max, v));
  const round = (v) => Math.round(v);

  // --- DOM elements ---
  const brandEl = document.getElementById('brand');
  const modelEl = document.getElementById('model');
  const btnRange = document.getElementById('btnSize');
  const btnValue = document.getElementById('btnValue');
  const genWithDpi = document.getElementById('genWithDpi');
  const genWithoutDpi = document.getElementById('genWithoutDpi');
  const result = document.getElementById('result');
  const resultText = document.getElementById('resultText');

  // --- populate brands ---
  const brands = Object.keys(db);
  brands.forEach(b => {
    const o = document.createElement('option');
    o.value = b;
    o.textContent = b;
    brandEl.appendChild(o);
  });

  function populateModelsForBrand(brand){
    modelEl.innerHTML = '';
    const list = db[brand] || [];
    list.forEach(m => {
      const o = document.createElement('option');
      o.value = m.id;
      o.textContent = m.name;
      modelEl.appendChild(o);
    });
  }

  // When brand changes, populate models
  brandEl.addEventListener('change', () => {
    populateModelsForBrand(brandEl.value);
  });

  // initialize selects
  brandEl.value = brands[0];
  populateModelsForBrand(brands[0]);

  // update displayed button value
  btnValue.textContent = btnRange.value;
  btnRange.addEventListener('input', () => {
    btnValue.textContent = btnRange.value;
  });

  // helper find model object
  function getModel(brand, modelId){
    const arr = db[brand] || [];
    return arr.find(m => m.id === modelId) || arr[0] || { id: 'generic', name: 'Genérico', dpi: FALLBACK_DPI, hz: 60 };
  }

  // map button size -> sensibilidad general category (alta/media/baja)
  function classifyByBtn(btn){
    const b = Number(btn);
    if (b <= 40) return 'alta';
    if (b <= 60) return 'media';
    return 'baja';
  }

  // map sensibilidad category -> iPhone style naming
  function iphoneStyleForCategory(cat){
    // Segun reglas confirmadas:
    // alta -> Sencillo
    // media -> Refinado
    // baja -> Preciso
    if (cat === 'alta') return 'Sencillo';
    if (cat === 'media') return 'Refinado';
    return 'Preciso';
  }

  // main calculation: params -> {general, puntoRojo, miraX2, miraX4}
  function calculateSensitivity({ dpi, hz, btnSize }) {
    let btn = Number(btnSize);
    if (btn <= 0) btn = 1; // evitar divisiones por 0

    // fórmula base: raw = DPI * (60 / Hz) * (100 / btn) * 0.2
    const raw = dpi * (60 / hz) * (100 / btn) * 0.2;
    const general = round(CLAMP(raw, 0, 200));

    const puntoRojo = round(CLAMP(Math.round(general * 0.60), 0, 200));
    const miraX2 = round(CLAMP(Math.round(general * 0.53), 0, 200)); // X2 factor de conveniencia
    const miraX4 = round(CLAMP(Math.round(general * 0.14), 0, 200));

    return { general, puntoRojo, miraX2, miraX4 };
  }

  // render result box text
  function renderResultText({ modelName, dpiUsed, hzUsed, btnSize, calc, styleName, sensitivityCategory, usingDpi }) {
    // siguiendo formato del ejemplo en la imagen
    const lines = [];
    lines.push(`Modelo: ${modelName}`);
    lines.push(`Sensibilidad General: ${calc.general}`);
    lines.push(`Sensibilidad Mira de Punto Rojo: ${calc.puntoRojo}`);
    lines.push(`Sensibilidad Mira X2: ${calc.miraX2}`);
    lines.push(`Sensibilidad Mira X4: ${calc.miraX4}`);
    lines.push(`Tamaño del Botón: ${btnSize}`);
    // Para iPhone mostramos el estilo (Sencillo/Refinado/Preciso) según reglas
    if (brandEl.value === 'Apple') {
      lines.push(`Estilo: ${styleName}`);
    } else {
      lines.push(`Preciso: ${calc.general}`); // si no es Apple mostramos "Preciso" como en ejemplo su cuadro final
    }

    // Nota: no mostramos DPI ni Hz en UI. (usamos internamente)
    // Añadimos una línea opcional si el usuario generó sin DPI (informativa pequeña)
    if (!usingDpi) {
      lines.push(`(Generado sin DPI del modelo — usado DPI estándar)`);
    }

    resultText.textContent = lines.join('\n');
    result.hidden = false;
  }

  // Evento de generación
  function handleGenerate({ useModelDpi }) {
    const brand = brandEl.value;
    const modelId = modelEl.value;
    const modelObj = getModel(brand, modelId);
    const dpi = useModelDpi ? (modelObj.dpi || FALLBACK_DPI) : FALLBACK_DPI;
    const hz = modelObj.hz || 60;
    const btn = Number(btnRange.value) || 49;

    const calc = calculateSensitivity({ dpi, hz, btnSize: btn });

    const category = classifyByBtn(btn); // alta/media/baja según tamaño del botón
    const styleName = iphoneStyleForCategory(category);

    renderResultText({
      modelName: modelObj.name,
      dpiUsed: dpi,
      hzUsed: hz,
      btnSize: btn,
      calc,
      styleName,
      sensitivityCategory: category,
      usingDpi: useModelDpi
    });
  }

  // Attach events
  genWithDpi.addEventListener('click', () => handleGenerate({ useModelDpi: true }));
  genWithoutDpi.addEventListener('click', () => handleGenerate({ useModelDpi: false }));

  // Accessibility: allow Enter on selects to trigger calculation with DPI
  modelEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGenerate({ useModelDpi: true });
  });

  // Pre-generate initial display for default values
  handleGenerate({ useModelDpi: true });

})();
