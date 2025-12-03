// ===============================
// script.js FINAL REALISTA
// ===============================

// ===============================
// Lista de modelos
// ===============================
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
  "Vivo":["Vivo Y20","Vivo Y21","Vivo Y33","Vivo Y35","Vivo V20","Vivo V21","Vivo V23","Vivo V25"],
  "Realme":["Realme 7","Realme 8","Realme 9","Realme 10","Realme 10 Pro","Realme GT Master","Realme GT Neo 2"],
  "Tecno":["Tecno Spark 8","Tecno Spark 9","Tecno Spark 10","Tecno Pova 2","Tecno Pova 3"],
  "Infinix":["Infinix Hot 10","Infinix Hot 11","Infinix Hot 12","Infinix Note 11","Infinix Note 12"],
  "Honor":["Honor X6","Honor X7","Honor X8","Honor X9","Honor Magic 5 Lite"],
  "Huawei":["Huawei Nova 7i","Huawei Nova 8","Huawei Nova 8i","Huawei Nova 9 SE","Huawei Nova 10","Huawei Nova 11i"]
};

// ===============================
// Helpers
// ===============================
function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }

// ===============================
// Clasificación realista por gama
// ===============================
function getTier(brand,model){

  // Alta
  const HIGH = [
    "Pro","Pro Max","Ultra","GT","Neo","Find","X7","X5",
    "S20","S21","S22","S23","S24",
    "Poco X3 Pro","Poco X4 Pro","Poco X5 Pro",
    "Mi 11","Mi 12","Mi 13","Mi 14"
  ];

  // Baja
  const LOW = [
    "A03","A04","A05","A10","A12","A38","A57","Y20","Y21","Y33","Y35",
    "Spark","Hot"
  ];

  const name = model.toLowerCase();

  if(HIGH.some(w=>name.includes(w.toLowerCase()))) return "alta";
  if(LOW.some(w=>name.includes(w.toLowerCase()))) return "baja";
  return "media";
}

// ===============================
// Rango realista según gama
// ===============================
function getRangeByTier(tier){
  switch(tier){
    case "alta": return [80,170];
    case "media": return [100,190];
    case "baja": return [110,200];
    default: return [100,190];
  }
}

// ===============================
// General realista y uniforme
// ===============================
function generateGeneral(brand,model,withDpi){
  const tier = getTier(brand,model);
  const [min,max] = getRangeByTier(tier);
  return rand(min,max);
}

// ===============================
// X2, X4 y Punto Rojo realistas
// ===============================
function generateSight(brand,model){
  const tier = getTier(brand,model);
  const [min,max] = getRangeByTier(tier);
  return rand(min,max);
}

// ===============================
// Red Dot
// ===============================
function chooseRedDot(brand,model){
  return generateSight(brand,model);
}

// ===============================
// Botón de disparo (tu lógica intacta)
// ===============================
function getButton(model,general){
  if(model === "iPhone 11") return rand(35,47);
  if(model.includes("Mini")) return rand(25,45);

  let min,max;
  if(model.includes("Pro Max") || model.includes("Ultra") || model.includes("Plus")){
    min = 50; max = 85;
  } else if(model.includes("A") || model.includes("Note") || model.includes("Redmi") || model.includes("Poco")){
    min = 40; max = 70;
  } else {
    min = 35; max = 65;
  }

  if(Math.random()<0.995){
    max = Math.min(max,65);
  } else {
    max = 100;
  }

  if(general>150 && Math.random()>0.5){
    min = Math.max(min,50);
  }

  return rand(min,max);
}

// ===============================
// DPI (tu lógica intacta)
// ===============================
function generateDpi(brand,model){
  if(brand==="Apple"){
    const styles = ['Preciso','Refinado','Sencillo'];
    return styles[rand(0,styles.length-1)] + ' ' + (model==="iPhone 11" ? rand(50,120) : rand(90,120));
  } else if(brand==="OPPO"){
    return rand(350,700);
  } else {
    return rand(300,900);
  }
}

// ===============================
// Actualizar modelos
// ===============================
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

// ===============================
// GENERAR
// ===============================
function generate(withDpi){
  const brand = document.getElementById('brand').value;
  const model = document.getElementById('model').value;
  const out = document.getElementById('output');
  if(!brand||!model){ alert('Selecciona marca y modelo'); return; }

  const general = generateGeneral(brand,model,withDpi);
  const red = chooseRedDot(brand,model);
  const x2 = generateSight(brand,model);
  const x4 = generateSight(brand,model);
  const button = getButton(model,general);

  let dpi = '';
  if(withDpi) dpi = generateDpi(brand,model);

  out.style.display = 'block';
  out.textContent =
`────────────────────────────
📱 ${model}
${withDpi?'DPI: '+dpi+'\n':''}
General: ${general}
Red Dot: ${red}
X2: ${x2}
X4: ${x4}
Botón de disparo: ${button}
────────────────────────────`;
}
