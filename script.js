const MODELS = {
  "Apple":[
    "iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max",
    "iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max",
    "iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max",
    "iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
    "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max",
    "iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max"
  ],
  "Samsung":[
    "Samsung A03s","Samsung A04","Samsung A04s","Samsung A05s","Samsung A10",
    "Samsung A12","Samsung A22","Samsung A23","Samsung A32","Samsung A34",
    "Samsung A52","Samsung A54","Samsung A72","Samsung M54","Samsung S20",
    "Samsung S21","Samsung S22","Samsung S23","Samsung S24"
  ],
  "OPPO":[
    "OPPO Reno 11","OPPO Reno 11F","OPPO Reno 10","OPPO Reno 10 Pro",
    "OPPO Reno 9","OPPO Reno 9 Pro","OPPO Reno 8","OPPO Reno 8 Pro",
    "OPPO Reno 7","OPPO Reno 7 Pro","OPPO A96","OPPO A78","OPPO A77",
    "OPPO A57","OPPO A38","OPPO Find X5","OPPO Find X7"
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

function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

function updateModels(){
  const brand=document.getElementById("brand").value;
  const model=document.getElementById("model");
  model.innerHTML='<option value="">Selecciona modelo</option>';
  if(!MODELS[brand]) return;
  MODELS[brand].forEach(m=>{
    let o=document.createElement("option");
    o.value=m;o.textContent=m;
    model.appendChild(o);
  });
}

function generate(withDpi){
  const brand=document.getElementById("brand").value;
  const model=document.getElementById("model").value;
  const out=document.getElementById("output");

  if(!brand||!model){alert("Selecciona marca y modelo");return;}

  let general=rand(120,200);
  let red=rand(60,120);
  let x2=rand(110,160);
  let x4=rand(100,150);
  let button=rand(35,70);

  let dpi="";
  if(withDpi){
    if(brand==="Apple"){
      const styles=["Preciso","Refinado","Sencillo"];
      dpi=styles[rand(0,2)]+" "+rand(90,120);
    }else{
      dpi=rand(350,800);
    }
  }

  out.innerText=
`=== MEMO SENSI CONFIG ===

DISPOSITIVO : ${model}
SISTEMA     : ${brand}

GENERAL     : ${general}%
PUNTO ROJO  : ${red}%
MIRA X2     : ${x2}%
MIRA X4     : ${x4}%
BOTÓN DISP. : ${button}%
${withDpi?"DPI         : "+dpi:""}
`;
}
