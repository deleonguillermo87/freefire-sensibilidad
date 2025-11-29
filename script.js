/* ===========================
   MODELOS
   =========================== */

const MODELS = {
  "Apple":[
    "iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max",
    "iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max",
    "iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max",
    "iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
    "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max",
    "iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max",
    "iPhone 17","iPhone 17 Pro","iPhone 17 Pro Max"
  ],

  "OPPO":[
    "OPPO Reno 11","OPPO Reno 11F","OPPO Reno 10","OPPO Reno 10 Pro",
    "OPPO Reno 9","OPPO Reno 9 Pro","OPPO Reno 8","OPPO Reno 8 Pro",
    "OPPO Reno 7","OPPO Reno 7 Pro","OPPO A96","OPPO A78","OPPO A77",
    "OPPO A57","OPPO A38","OPPO Find X5","OPPO Find X7"
  ],

  "Samsung":[
    "Samsung A03s","Samsung A04","Samsung A04s","Samsung A05s","Samsung A10",
    "Samsung A12","Samsung A22","Samsung A23","Samsung A32","Samsung A34",
    "Samsung A52","Samsung A54","Samsung A72","Samsung M54","Samsung S20",
    "Samsung S21","Samsung S22","Samsung S23","Samsung S24"
  ],

  "Xiaomi":[
    "Xiaomi 11 Lite 5G","Poco X3 Pro","Poco X4 Pro","Poco X5 Pro","Poco M4",
    "Redmi Note 10","Redmi Note 11","Redmi Note 12","Redmi Note 13",
    "Mi 11","Mi 12","Mi 13","Mi 14"
  ],

  "Vivo":[
    "Vivo Y20","Vivo Y21","Vivo Y33","Vivo Y35",
    "Vivo V20","Vivo V21","Vivo V23","Vivo V25"
  ],

  "Realme":[
    "Realme 7","Realme 8","Realme 9","Realme 10",
    "Realme 10 Pro","Realme GT Master","Realme GT Neo 2"
  ],

  "Tecno":[
    "Tecno Spark 8","Tecno Spark 9","Tecno Spark 10",
    "Tecno Pova 2","Tecno Pova 3"
  ],

  "Infinix":[
    "Infinix Hot 10","Infinix Hot 11","Infinix Hot 12",
    "Infinix Note 11","Infinix Note 12"
  ],

  "Honor":[
    "Honor X6","Honor X7","Honor X8","Honor X9","Honor Magic 5 Lite"
  ],

  "Huawei":[
    "Huawei Nova 7i","Huawei Nova 8","Huawei Nova 8i",
    "Huawei Nova 9 SE","Huawei Nova 10","Huawei Nova 11i"
  ]
};


/* ===========================
   HELPERS
   =========================== */

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }


/* ===========================
   UPDATE MODELS
   =========================== */

function updateModels(){
  const brand = document.getElementById('brand').value;
  const sel = document.getElementById('model');

  sel.innerHTML = '<option value="">Seleccionar modelo</option>';

  if(!brand || !MODELS[brand]) return;

  MODELS[brand].forEach(m=>{
    const o = document.createElement('option');
    o.value = m; 
    o.textContent = m;
    sel.appendChild(o);
  });
}


/* ===========================
   BOTÓN (MODIFICADO COMO PEDISTE)
   =========================== */

function generateButton(model, brand) {

    // --- iPhone Mini: botón NO mayor a 45 ---
    if (model === "iPhone 12 Mini" || model === "iPhone 13 Mini") {
        return rand(30, 45);
    }

    // --- iPhone 11 (NO TOCAR) ---
    if (model === "iPhone 11") {
        return rand(35, 47);
    }

    // --- TODOS LOS DEMÁS ---
    // 99% botón normal, 1% botón grande
    const chance = Math.random();

    if (chance < 0.99) {
        return rand(35, 65);
    }

    // botón grande (pero 1% probabilidad)
    return rand(65, 100);
}


/* ===========================
   RED DOT RULE
   =========================== */

function chooseRedDot(){
  if(Math.random() < 0.05) return rand(30,79);
  return rand(80,200);
}


/* ===========================
   GENERAR CONFIGURACIÓN
   =========================== */

function generate(withDpi){
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const out = document.getElementById('output');

  if(!brand || !model){
    alert('Selecciona marca y modelo');
    return;
  }

  let general, redDot, x2, x4, button, dpiDisplay='';

  // general
  if(model === 'iPhone 11'){
    general = rand(120,200);
  } else {
    general = rand(80,200);
  }

  redDot = chooseRedDot();
  x2 = rand(80,200);
  x4 = clamp(x2 + rand(-20,20),80,200);

  // === BOTÓN FINAL ===
  button = generateButton(model, brand);

  // === DPI ===
  if(withDpi){
    if(brand === 'Apple'){
      const styles = ['Preciso','Refinado','Sencillo'];
      const style = styles[rand(0,styles.length-1)];
      const dpiVal = (model === 'iPhone 11') ? rand(50,120) : rand(90,120);
      dpiDisplay = `${style} ${dpiVal}`;
    } else {
      if(brand === 'OPPO') dpiDisplay = `${rand(350,700)}`;
      else dpiDisplay = `${rand(300,900)}`;
    }
  }

  let dpiLine = withDpi ? `DPI: ${dpiDisplay}\n` : '';

  out.style.display = 'block';
  out.textContent =
`────────────────────────────
📱 ${model}
${dpiLine}
General: ${general}
Red Dot: ${redDot}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${button}
────────────────────────────`;
}
