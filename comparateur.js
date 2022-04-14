class comparateur{
    constructor(schema,plateau){ //large booleen pour savoir si besoin de compiler 
        this.taille=plateau.length;
        this.schema=schema;//valeur en extrémité de ligne
        this.plateau=plateau; // ce qu'il y a sur le plateau actuellement (0 vide, 1 croix, 2 carré)
        this.intersection=Array(plateau.length).fill(3)
        this.sum=-1;
        for (let i=0; i<schema.length; i++){
            this.sum+=(schema[i]+1)//calcul de la place prise place virtuelle
        }
        if(schema.length===0){
            this.intersection.fill(1)
        }
    }

    estRealisable(){//permet de savoir si une combinaison a aboutie
        return (!(this.intersection[0]===3))
    }

    compilerSchema(combinaison){
        let possibilitee=Array(this.taille).fill(1)
        let i=0
        for(let croix=0; croix<this.schema.length; croix++){
            i+= combinaison[croix]
            for(let j=0; j<this.schema[croix]; j++){
                possibilitee[i]=2
                i++;
            }
            i+=1;
        }
        return possibilitee
    }

    estValide_1(combinaison){
        let sum_comb=0
        for(let i=0; i<combinaison.length;i++){
            sum_comb+=combinaison[i]
        }
        return (this.sum+sum_comb===this.taille && combinaison.length===this.schema.length+1)
    }

    estValide_2(possibilitee){
        for(let i=0;i<possibilitee.length;i++){
            if((this.plateau[i]==1 && possibilitee[i]==2) || (this.plateau[i]==2 && possibilitee[i]==1)){
                return false
            }
        }
        return true
    }

    nouvelleCombinaison(combinaison){
        if(this.estValide_1(combinaison)){
            let possibilitee=this.compilerSchema(combinaison);
            if (this.estValide_2(possibilitee)){
                if(this.intersection[0]===3){
                    this.intersection=possibilitee
                }else{
                    for(let i=0;i<possibilitee.length;i++){
                        if((possibilitee[i]==1 && this.intersection[i]==2) || (possibilitee[i]==2 && this.intersection[i]==1) || (possibilitee[i]==0)){
                            this.intersection[i]=0
                        }
                    }
                }
            }
            // else{console.log("passe pas 2 test")}
        }
        // else{console.log("passe pas 1 test")}
    }

    nouvellePosibilitee(possibilitee){
        if (this.estValide_2(possibilitee)){
            if(this.intersection[0]===3){
                this.intersection=possibilitee
            }else{
                for(let i=0;i<possibilitee.length;i++){
                    if((possibilitee[i]==1 && this.intersection[i]==2) || (possibilitee[i]==2 && this.intersection[i]==1) || (possibilitee[i]==0)){
                        this.intersection[i]=0
                    }
                }
            }
        }
    }

    toutesCombinaisons(liste){
        liste.forEach(element => {
            this.nouvelleCombinaison(element)
        });
        return this.intersection
    }

    getSolution(){
        return this.intersection
    }
}