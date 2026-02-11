const MODELS = {
  "Apple":["iPhone 11","iPhone 12","iPhone 13","iPhone 14","iPhone 15","iPhone 16"],
  "Samsung":["Samsung A10","Samsung A12","Samsung A22","Samsung A32","Samsung A52","Samsung S21","Samsung S22","Samsung S23"],
  "Xiaomi":["Redmi Note 10","Redmi Note 11","Redmi Note 12","Poco X3","Poco X5","Mi 11","Mi 12","Mi 13"],
  "OPPO":["OPPO A57","OPPO A78","OPPO Reno 8","OPPO Reno 10"],
  "Vivo":["Vivo Y20","Vivo Y21","Vivo Y33","Vivo V21"],
  "Realme":["Realme 8","Realme 9","Realme 10","Realme GT"],
  "Tecno":["Tecno Spark 8","Tecno Spark 9","Tecno Spark 10"],
  "Infinix":["Infinix Hot 10","Infinix Hot 11","Infinix Hot 12"],
  "Honor":["Honor X6","Honor X7","Honor X8"],
  "Huawei":["Huawei Nova 8","Huawei Nova 9","Huawei Nova 10"]
};

let currentRange = "media";

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }

function updateModels(){
  const brand = document.getElementById("brand").value;
  const modelSel = document.getElementById("model");
  modelSel.innerHTML = '<option value="">Seleccionar modelo</option>';
  if(!MODELS[brand]) return;
  MODELS[brand].forEach(m=>{
    let o = document.createElement("option");
    o.value = m;
    o.textContent = m;
    modelSel.appendChild(o);
  });
}

function setRange(r){
  currentRange = r;
  document.getElementById("lowBtn").classList.remove("active");
  document.getElementById("midBtn").classList.remove("active");
  document.getElementById("highBtn").classList.remove("active");

  if(r==="baja") document.getElementById("lowBtn").classList.add("active");
  if(r==="media") document.getElementById("midBtn").classList.add("active");
  if(r==="alta") document.getElementById("highBtn").classList.add("active");
}

function generate(withDpi){
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const out = document.getElementById("output");

  if(!brand || !model){
    alert("Selecciona marca y modelo");
    return;
  }

  let gMin,gMax;
  if(currentRange==="baja"){
    gMin=80; gMax=120;
  } else if(currentRange==="media"){
    gMin=130; gMax=170;
  } else {
    gMin=170; gMax=200;
  }

  const general = rand(gMin,gMax);
  const red = clamp(general + rand(-60,-20),50,150);
  const x2 = clamp(general + rand(-10,40),70,200);
  const x4 = clamp(general + rand(-15,45),70,200);
  const button = rand(30,70);

  let dpi = "";
  if(withDpi){
    if(brand==="Apple"){
      const styles=["Preciso","Refinado","Sencillo"];
      dpi = styles[rand(0,2)]+" "+rand(90,120);
    } else {
      dpi = rand(350,800);
    }
  }

  out.style.display="block";
  out.textContent =
`📱 ${model}
Rango: ${currentRange.toUpperCase()}
${withDpi?"DPI: "+dpi+"\n":""}
General: ${general}
Punto rojo: ${red}
Mira X2: ${x2}
Mira X4: ${x4}
Botón: ${button}`;
}
