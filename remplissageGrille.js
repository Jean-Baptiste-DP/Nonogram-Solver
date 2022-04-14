let height=5
let width=5

function addRow(){
    height+=1

    //grow the grid
    document.getElementById("grille").style["grid-template-rows"]= "100px "+(height*50)+"px 70px"

    //add a column in the config part
    document.getElementById("config_horizontale").style["grid-template-rows"]="repeat("+height+",minmax(20px,1fr))"
    var nvelleDiv = document.createElement("div")
    document.getElementById("config_horizontale").appendChild(nvelleDiv)

    //add elements to cases
    document.getElementById("cases").style["grid-template-rows"]="repeat("+height+",minmax(20px,1fr))"
    for(let i=0;i<width;i++){
        var nvelleDiv = document.createElement("div")
        document.getElementById("cases").appendChild(nvelleDiv)
    }
}

function addColumn(){
    width+=1

    //grow the grid
    document.getElementById("grille").style["grid-template-columns"]= "100px "+(width*50)+"px 70px"

    //add a row in the config part
    document.getElementById("config_verticale").style["grid-template-columns"]="repeat("+width+",minmax(20px,1fr))"
    var nvelleDiv = document.createElement("div")
    document.getElementById("config_verticale").appendChild(nvelleDiv)

    //add elements to cases
    document.getElementById("cases").style["grid-template-columns"]="repeat("+width+",minmax(20px,1fr))"
    for(let i=0;i<height;i++){
        var nvelleDiv = document.createElement("div")
        document.getElementById("cases").appendChild(nvelleDiv)
    }
}

document.getElementById("plus-horizontal").addEventListener("click",()=>{addRow()})
document.getElementById("plus-vertical").addEventListener("click",()=>{addColumn()})

console.log("page chargé")