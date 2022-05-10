let height=5
let width=5

var listNbInput={
    hori:[1,1,1,1,1],
    vert:[1,1,1,1,1]
}

function modificationInput(orientation,nLigne,nInput){
    
    let elements=document.getElementById("config-input-"+orientation+"-"+nLigne+"-"+nInput)
    

    let value=elements.value;
    if(nInput===listNbInput[orientation][nLigne-1]){
        console.log("premiere condition passee")
        if(value!='0' && value!=''){
            console.log("deuxieme condition passee")
            let ligne=document.getElementById(orientation+"-"+nLigne)
            var input = document.createElement("input")
            input.id="config-input-"+orientation+"-"+nLigne+"-"+(nInput+1)
            input.type="number"
            input.min="0"
            input.max="99"
            input.value=""
            //input.onchange="modificationInput("+orientation+","+nLigne+","+(nInput+1)+")"
            input.addEventListener('keyup', function(){
                modificationInput(orientation,nLigne,nInput+1)
              });
            input.classList.add("config-input")
            ligne.appendChild(input)
            listNbInput[orientation][nLigne-1]+=1
        }
    }
}

function addRow(){
    height+=1

    //grow the grid
    //document.getElementById("grille").style["grid-template-rows"]= "100px "+(height*50)+"px 70px"
    document.getElementById("grille").style.setProperty('--height', height)

    //add a column in the config part
    //document.getElementById("config_horizontale").style["grid-template-rows"]="repeat("+height+",minmax(20px,1fr))"
    var nvelleDiv = document.createElement("div")
    nvelleDiv.id = "hori-"+height
    var input = document.createElement("input")
    input.id="config-input-hori-"+height+"-1"
    input.type="number"
    input.min="0"
    input.max="99"
    input.value="0"
    //input.onchange="modificationInput(hori,"+height+",1)"
    input.addEventListener('keyup', function(){
        modificationInput("hori",height,1)
      });
    input.classList.add("config-input")
    nvelleDiv.appendChild(input)
    document.getElementById("config_horizontale").appendChild(nvelleDiv)

    //add elements to cases
    //document.getElementById("cases").style["grid-template-rows"]="repeat("+height+",minmax(20px,1fr))"
    for(let i=0;i<width;i++){
        var nvelleDiv = document.createElement("div")
        document.getElementById("cases").appendChild(nvelleDiv)
    }

    //dynamic control
    listNbInput["hori"].push(1)
}

function addColumn(){
    width+=1

    //grow the grid
    //document.getElementById("grille").style["grid-template-columns"]= "100px "+(width*50)+"px 70px"
    document.getElementById("grille").style.setProperty('--width', width)

    //add a row in the config part
    //document.getElementById("config_verticale").style["grid-template-columns"]="repeat("+width+",minmax(20px,1fr))"
    var nvelleDiv = document.createElement("div")
    nvelleDiv.id = "vert-"+width
    var input = document.createElement("input")
    input.id="config-input-vert-"+width+"-1"
    input.type="number"
    input.min="0"
    input.max="99"
    input.value="0"
    //input.onchange="modificationInput(hori,"+width+",1)"
    input.addEventListener('keyup', function(){
        modificationInput("vert",width,1)
      });
    input.classList.add("config-input")
    nvelleDiv.appendChild(input)
    document.getElementById("config_verticale").appendChild(nvelleDiv)

    //add elements to cases
    //document.getElementById("cases").style["grid-template-columns"]="repeat("+width+",minmax(20px,1fr))"
    for(let i=0;i<height;i++){
        var nvelleDiv = document.createElement("div")
        document.getElementById("cases").appendChild(nvelleDiv)
    }

    
    //dynamic control
    listNbInput["vert"].push(1)
}

document.getElementById("add-row").addEventListener("click",()=>{addRow()})
document.getElementById("add-column").addEventListener("click",()=>{addColumn()})

for(let i=1;i<6;i++){
    let elehor=document.getElementById("config-input-hori-"+i+"-1")
    elehor.addEventListener('keyup', function(){
        modificationInput("hori",i,1)
    });
    let elever=document.getElementById("config-input-vert-"+i+"-1")
    elever.addEventListener('keyup', function(){
        modificationInput("vert",i,1)
    });
}

console.log("page chargée")

//document.getElementById("grille").style.setProperty('--square-side', '50px')