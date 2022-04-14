class Dispatcher{ // fonctionne parfaitement
    constructor(max_ele,max_som){
        this.grid = [...Array(max_ele)].map(e => Array(max_som).fill(0));
        this.max_ele=max_ele
        this.max_som=max_som
    }

    get_list(ele,som){
        if(ele<this.max_ele && som<this.max_som && this.grid[ele][som]!=0){
            // console.log("recuperation dans stockage")
            return this.grid[ele][som]
        }
        else{
            if(ele<=0){
                return [[]]
            }else if(ele===1){
                return [[som]]
            }else if(som<=0){
                return [Array(ele).fill(0)]
            }else {
                let liste=[]
            
                for(let dernier_el=0 ; dernier_el<=som ; dernier_el++){
                    let sub_liste=this.get_list(ele-1,som-dernier_el)
                    let sub_liste_update=[]
                    for(let sol=0 ; sol<sub_liste.length ; sol++){
                        let intermediaire=[]
                        sub_liste[sol].forEach(element => {
                            intermediaire.push(element)
                        })
                        intermediaire.push(dernier_el)
                        sub_liste_update.push(intermediaire)
                    }
                    liste=[...liste,...sub_liste_update]
                }

                if(ele<this.max_ele && som<this.max_som){
                    this.grid[ele][som] = liste
                }

                return liste
            }
            
        }
    }
}