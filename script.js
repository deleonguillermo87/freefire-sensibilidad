let selectedRange = "media";

function setRange(r){
  selectedRange = r;
}

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
  "Samsung":["A05","A15","A25","A34","A54","S20","S21","S22","S23","S24"],
  "Xiaomi":["Redmi Note 10","Redmi Note 11","Redmi Note 12","Poco X3","Poco X4","Poco X5"],
  "Motorola":["Moto G34","Moto G54","Moto G84"],
  "Honor":["X7","X8","X8B"]
};

function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}
function clamp(v,min,max){
  return Math.max(min,Math.min(max,v));
}

function updateModels(){
  const brand=document.getElementById("brand").value;
  const modelSel=document.getElementById("model");
  modelSel.innerHTML='<option value="">Modelo</option>';
  if(!MODELS[brand]) return;
  MODELS[brand].forEach(m=>{
    let o=document.createElement("option");
    o.textContent=m;
    o.value=m;
    modelSel.appendChild(o);
  });
}

function baseByRange(){
  if(selectedRange==="baja") return rand(80,120);
  if(selectedRange==="media") return rand(120,170);
  return rand(170,200);
}

function generate(withDpi){
  const brand=document.getElementById("brand").value;
  const model=document.getElementById("model").value;
  if(!brand||!model){alert("Selecciona marca y modelo");return;}

  let general = baseByRange();

  let red = clamp(general - rand(40,70),50,200);
  let x2 = clamp(general + rand(5,30),80,200);
  let x4 = clamp(x2 + rand(5,30),80,200);

  let button = rand(20,55);

  let dpi="";
  if(withDpi){
    if(brand==="Apple"){
      let styles=["Preciso","Refinado","Sencillo"];
      dpi=styles[rand(0,2)]+" "+rand(70,120);
    }else{
      dpi=rand(400,700);
    }
  }else{
    dpi="Sin DPI";
  }

  document.getElementById("output").textContent=
`=== MEMO SENSI CONFIG ===

DISPOSITIVO : ${model}
SISTEMA : ${brand}
RANGO : ${selectedRange.toUpperCase()}

GENERAL : ${general}%
PUNTO ROJO : ${red}%
MIRA X2 : ${x2}%
MIRA X4 : ${x4}%
BOTÓN DISP. : ${button}%

DPI : ${dpi}`;
}
