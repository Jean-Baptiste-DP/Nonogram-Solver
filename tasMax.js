class TasMax{ //testé
    constructor(taille){
        this.taille=taille
        this.tas=Array(taille)
        this.nbElements=0
        this.valeur="poids"
        this.traitement="en_cours_traitement"
    }

    estVide(){
        return (this.nbElements===0)
    }

    ajout(element){
        if(this.nbElements>=this.taille){
            console.log("Problème de Taille")
            console.log(this.tas)
        }
        if(this.nbElements<this.taille && !element[this.traitement]){
            let indice=this.nbElements
            this.nbElements+=1

            while(indice>0 && element[this.valeur]>this.tas[(indice-1)%2][this.valeur]){
                this.tas[indice]=this.tas[(indice-1)%2]
                indice=(indice-1)%2
            }

            this.tas[indice]=element
        }
    }

    supprimer(){
        if(this.nbElements>0){
            let racine=this.tas[0]
            this.nbElements-=1
            let valeur_pere=this.tas[this.nbElements][this.valeur]
            let valeur_gauche=0
            let valeur_droite=0
            // this.tas[0]=this.tas[this.nbElements]

            let indice=0
            while(indice*2+2<this.nbElements){
                valeur_gauche=this.tas[indice*2+1][this.valeur]
                valeur_droite=this.tas[indice*2+2][this.valeur]
                if (valeur_gauche>valeur_droite && valeur_gauche>valeur_pere){
                    this.tas[indice]=this.tas[indice*2+1]
                    indice=indice*2+1
                }
                else if (valeur_droite>valeur_pere){
                    this.tas[indice]=this.tas[indice*2+2]
                    indice=indice*2+2
                }
                else{
                    this.tas[indice]=this.tas[this.nbElements]
                    indice=this.nbElements
                }
            }
            if(indice*2+1<this.nbElements){
                if(this.tas[indice*2+1][this.valeur]>valeur_pere){
                    this.tas[indice]=this.tas[indice*2+1]
                    indice=indice*2+1
                }
            }

            this.tas[indice]=this.tas[this.nbElements]
            return racine
        }
        
    }
}