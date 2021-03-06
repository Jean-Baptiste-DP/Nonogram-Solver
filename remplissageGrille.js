let gridData={
    gridDim:{
        hori:5,
        vert:5
    },
    numberList:{
        hori:5,
        vert:5
    },
    listNbInput:{
        hori:[1,1,1,1,1],
        vert:[1,1,1,1,1]
    },
    deletedLine:{
        hori:[false,false,false,false,false],
        vert:[false,false,false,false,false]
    },
    numberCases:25
}

function modificationInput(orientation,nLigne,nInput){
    
    let elements=document.getElementById("config-input-"+orientation+"-"+nLigne+"-"+nInput)
    

    let value=elements.value;
    if(nInput===gridData.listNbInput[orientation][nLigne-1]){
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
            gridData.listNbInput[orientation][nLigne-1]+=1
        }
    }
}

function addLine(orientation){// hori or vert

    let invOrient="hori"
    if(orientation==="hori"){invOrient="vert"}

    // update of the data
    gridData.gridDim[orientation]+=1
    gridData.numberList[orientation]+=1
    gridData.listNbInput[orientation].push(1)
    gridData.deletedLine[orientation].push(false)

    // disparition of the row to add more row
    document.getElementById("add-"+orientation).style="opacity:0"
    document.getElementById("add-"+orientation).style.display="none"

    //grow the grid
    //document.getElementById("grille").style["grid-template-rows"]= "100px "+(height*50)+"px 70px"
    document.getElementById("grille").style.setProperty("--"+orientation, gridData.gridDim[orientation])

    //add a column in the config part
    //document.getElementById("config_horizontale").style["grid-template-rows"]="repeat("+height+",minmax(20px,1fr))"
    var nvelleDiv = document.createElement("div")
    nvelleDiv.id = orientation+"-"+gridData.numberList[orientation]
    var input = document.createElement("input")
    input.id="config-input-"+orientation+"-"+gridData.numberList[orientation]+"-1"
    input.type="number"
    input.min="0"
    input.max="99"
    input.value="0"
    //input.onchange="modificationInput(hori,"+height+",1)"
    input.addEventListener('keyup', function(){
        modificationInput(orientation,gridData.numberList[orientation],1)
      });
    input.classList.add("config-input")

    // add cross to div
    let crossdiv=document.createElement("div")
    crossdiv.id="cross-"+orientation+"-"+gridData.numberList[orientation]
    crossdiv.classList.add("cross")
    crossdiv.classList.add("cross-"+orientation)
    let i=gridData.numberList[orientation]
    crossdiv.addEventListener("click",()=>{deleteLine(orientation,i)})
    // need function of deleting line

    nvelleDiv.appendChild(input)
    nvelleDiv.appendChild(crossdiv)
    document.getElementById("config_"+orientation).appendChild(nvelleDiv)

    //add elements to cases
    //document.getElementById("cases").style["grid-template-rows"]="repeat("+height+",minmax(20px,1fr))"
    for(let i=0;i<gridData.gridDim[invOrient];i++){
        var nvelleDiv = document.createElement("div")
        nvelleDiv.id="case-"+gridData.numberCases
        gridData.numberCases+=1
        document.getElementById("cases").appendChild(nvelleDiv)
    }

    //one more case in add column
    document.getElementById("add-"+invOrient).appendChild(document.createElement("div"))

    //apparition of the row to add more row
    setTimeout(function(){
        document.getElementById("add-"+orientation).style.display="grid"
    }, 1);

    setTimeout(function(){
        document.getElementById("add-"+orientation).style=""
    },20);
}


function deleteLine(orientation,number){
    gridData.deletedLine[orientation][number-1]=true
    gridData.gridDim[orientation]-=1
    
    let invOrient="hori"
    if(orientation==="hori"){invOrient="vert"}

    let config_to_delete= document.getElementById(orientation+"-"+number)

    //delete cases
    for(let i=0;i<gridData.gridDim[invOrient];i++){
        gridData.numberCases-=1
        document.getElementById("case-"+gridData.numberCases).remove()
    }

    //delete case in add line
    document.querySelector(".add-" + invOrient + " > div:last-of-type").remove()

    config_to_delete.remove()

    document.getElementById("grille").style.setProperty("--"+orientation, gridData.gridDim[orientation])
}

function captureSide(orientation){
    let size=gridData.numberList[orientation]
    let list=[]
    for(let i=1;i<size+1;i++){
        if(!gridData.deletedLine[orientation][i-1]){
            let number_of_entry=gridData.listNbInput[orientation][i-1]
            let lineList=[]
            for (let j=1;j<number_of_entry+1;j++){
                console.log("config-input-"+orientation+"-"+i+"-"+j)
                let value=document.getElementById("config-input-"+orientation+"-"+i+"-"+j).value
                if(value!='' && value!='0'){
                    lineList.push(Math.abs(parseInt(value)))
                }
            }
            if(lineList.length===0){
                lineList.push(0)
            }
            list.push(lineList)
        }
    }
    return list
}

async function captureGrid(){
    let vert_list=captureSide("vert")
    let hori_list=captureSide("hori")
    grid=await resolution(hori_list,vert_list)
    console.log(grid)
    console.log(grid.length)
    console.log(grid[0].length)
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[i].length;j++){
            let cases=document.getElementById("case-"+(i*grid[i].length+j))
            console.log("i : ",i,", j : ",j)
            if(grid[i][j]===1){
                cases.classList.add("case-cross")
            }else if(grid[i][j]===2){
                cases.classList.add("case-full")
            }
        }
    }
}

document.getElementById("bouton").addEventListener("click",()=>{captureGrid()})

document.getElementById("add-hori").addEventListener("click",()=>{addLine("hori")})
document.getElementById("add-vert").addEventListener("click",()=>{addLine("vert")})

for(let i=1;i<6;i++){
    let elehor=document.getElementById("config-input-hori-"+i+"-1")
    elehor.addEventListener('keyup', function(){
        modificationInput("hori",i,1)
    });
    let elever=document.getElementById("config-input-vert-"+i+"-1")
    elever.addEventListener('keyup', function(){
        modificationInput("vert",i,1)
    });
    document.getElementById("cross-hori-"+i).addEventListener("click",()=>{deleteLine("hori",i)})
    document.getElementById("cross-vert-"+i).addEventListener("click",()=>{deleteLine("vert",i)})
}

console.log("page charg??e")

//document.getElementById("grille").style.setProperty('--square-side', '50px')