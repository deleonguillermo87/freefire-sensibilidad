// ===============================
// script.js FINAL con pantalla categorizada
// ===============================

// Modelos disponibles
const models = {
    "Apple": [
        "iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max",
        "iPhone 12","iPhone 12 Mini","iPhone 12 Pro","iPhone 12 Pro Max",
        "iPhone 13","iPhone 13 Mini","iPhone 13 Pro","iPhone 13 Pro Max",
        "iPhone 14","iPhone 14 Plus","iPhone 14 Pro","iPhone 14 Pro Max",
        "iPhone 15","iPhone 15 Plus","iPhone 15 Pro","iPhone 15 Pro Max",
        "iPhone 16","iPhone 16 Plus","iPhone 16 Pro","iPhone 16 Pro Max",
        "iPhone 17","iPhone 17 Pro","iPhone 17 Pro Max"
    ],
    "Samsung": ["S20","S21","S21 FE","S22","S22 Ultra","S23","S23 Ultra","S24","S24 Ultra","A52","A53","A54","A72","A73"],
    "Xiaomi": ["Mi 11","Mi 11T","Mi 11 Lite","Mi 12","Mi 12 Pro","Mi 13","Mi 13 Pro"],
    "Redmi": ["Note 10","Note 10 Pro","Note 11","Note 11 Pro","Note 12","Note 12 Pro"],
    "POCO": ["X3 Pro","X4 Pro","F3","F4","F5","F5 Pro","X5","X6"],
    "OPPO": ["Reno 8","Reno 8 Pro","Reno 9","Reno 9 Pro","Reno 10","Reno 11","Reno 11 Pro"],
    "Vivo": ["Vivo Y20","Vivo Y21","Vivo Y33","Vivo Y35","Vivo V20","Vivo V21","Vivo V23","Vivo V25"],
    "Realme": ["Realme 7","Realme 8","Realme 9","Realme 10","Realme 10 Pro","Realme GT Master","Realme GT Neo 2"],
    "Tecno": ["Tecno Spark 8","Tecno Spark 9","Tecno Spark 10","Tecno Pova 2","Tecno Pova 3"],
    "Infinix": ["Infinix Hot 10","Infinix Hot 11","Infinix Hot 12","Infinix Note 11","Infinix Note 12"],
    "Honor": ["Honor X6","Honor X7","Honor X8","Honor X9","Honor Magic 5 Lite"],
    "Huawei": ["Huawei Nova 7i","Huawei Nova 8","Huawei Nova 8i","Huawei Nova 9 SE","Huawei Nova 10","Huawei Nova 11i"]
};

// Clasificación por tamaño real de pantalla
const screenCategory = {
    normal: [
        "iPhone 11","iPhone 12","iPhone 13","iPhone 14"
    ],
    medium: [
        "iPhone 11 Pro Max","iPhone 12 Pro Max","iPhone 13 Pro Max","iPhone 14 Plus",
        "iPhone 14 Pro Max","iPhone 15 Plus","iPhone 15 Pro Max",
        "Note 10","Note 10 Pro","Note 11","Note 11 Pro","Note 12","Note 12 Pro",
        "A52","A53","A54","F3","F4","X3 Pro","X4 Pro"
    ],
    large: [
        "F5","F5 Pro","X5","X6","S23 Ultra","S24 Ultra","Mi 13 Pro"
    ]
};

function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
function clamp200(v){ return Math.max(0,Math.min(200,Math.round(v))); }

// ===========================
// Nuevo generador de botón con rareza de gigante
// ===========================
function generateButtonSize(model, brand, generalSensitivity){
    const rareBigChance = 0.15; // 15% probabilidad de salir un botón gigante (65-100)
    const isRareBig = Math.random() < rareBigChance;

    if(isRareBig) return rand(65,100);

    // Botones normales según pantalla y marca
    if(screenCategory.normal.includes(model)){
        return rand(30,55);
    } else if(screenCategory.medium.includes(model)){
        // botón mediano o alto según sensibilidad
        if(generalSensitivity >= 151) return rand(40,85);
        if(generalSensitivity >= 101) return rand(35,75);
        return rand(30,65);
    } else if(screenCategory.large.includes(model)){
        // botón grande pero con variación
        if(generalSensitivity >= 151) return rand(50,85);
        if(generalSensitivity >= 101) return rand(40,75);
        return rand(35,70);
    }
    // default
    return rand(30,65);
}

// ===========================
// Actualizar lista de modelos
// ===========================
function updateModels(){
    const brand = document.getElementById("brand").value;
    const sel = document.getElementById("model");
    sel.innerHTML = `<option value="">Seleccionar modelo</option>`;
    if(models[brand]){
        models[brand].forEach(m=>{
            const o=document.createElement("option");
            o.value=m; o.textContent=m;
            sel.append(o);
        });
    }
}

// ===========================
// Identificar categoría de pantalla
// ===========================
function getButtonRange(model){
    if(screenCategory.normal.includes(model)) return {min:30,max:51};
    if(screenCategory.medium.includes(model)) return {min:30,max:65};
    if(screenCategory.large.includes(model)) return {min:30,max:90};
    return {min:30,max:65};
}

function buildSights(g){
    return {
        red: clamp200(g*0.60),
        x2: clamp200(g*0.53),
        x4: clamp200(g*0.14)
    };
}

// ===========================
// SIN DPI
// ===========================
function generateWithoutDPI(){
    const brand=document.getElementById("brand").value;
    const model=document.getElementById("model").value;
    const out=document.getElementById("result");
    if(!brand||!model) return out.textContent="⚠ Selecciona marca y modelo";

    const general=rand(80,190);
    const s=buildSights(general);

    const shoot=generateButtonSize(model,brand,general);

    out.textContent=`
📱 ${model}
────────────────────────
General: ${general}
Red Dot: ${s.red}
X2: ${s.x2}
X4: ${s.x4}
Botón de disparo: ${shoot} (auto)
DPI: No aplicado
`;
}

// ===========================
// CON DPI
// ===========================
function generateWithDPI(){
    const brand=document.getElementById("brand").value;
    const model=document.getElementById("model").value;
    const out=document.getElementById("result");
    if(!brand||!model) return out.textContent="⚠ Selecciona marca y modelo";

    const general = rand(80,190);
    const s = buildSights(general);
    const shoot = generateButtonSize(model,brand,general);

    let dpi="";
    if(brand==="Apple"){
        const styles=["Preciso","Refinado","Sencillo"];
        dpi=`${styles[rand(0,2)]} ${rand(85,120)}`;
    } else {
        dpi=`${rand(300,900)} DPI`;
    }

    out.textContent=`
📱 ${model}
────────────────────────
General: ${general}
Red Dot: ${s.red}
X2: ${s.x2}
X4: ${s.x4}
Botón de disparo: ${shoot} (auto)
DPI: ${dpi}
`;
}
