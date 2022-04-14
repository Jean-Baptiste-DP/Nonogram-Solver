class solveurLigne{
    constructor(hauteur,largueur){
        // this.configuration=[];
        // this.ligne=[];
        let maxi=Math.max(hauteur,largueur)
        let valeur= Math.floor(maxi/3)
        this.dispatch=new Dispatcher(valeur,valeur);
    }

    nouvelleLigne(config,ligne){ //résoud la ligne
        // this.ligne=ligne;
        // this.configuration=config;
        // let nombreAlignement=config.length;

        if(this.ligneDejaComplete(ligne)){
            return ligne
        }

        let lignefinale= new comparateur(config,ligne)
        let Parties=this.sousParties(ligne,config.length)

        // console.log(Parties)

        let combinaisonSousParties=this.dispatch.get_list(Parties.sousPart.length,Parties.fin-Parties.depart) // passer quels alignement dans quelle sous partie

        combinaisonSousParties.forEach(element => {
            // console.log(element)
            // let sousConfig=config.slice(Parties.depart,Parties.depart+element)
            let depart=Parties.depart;
            let faisable=true
            let placePrise=[]
            Parties.sousPart.forEach((partie,index) => { //calcul place prise + réalisabilité
                let somme=-1
                for(let i=0;i<element[index];i++){
                    somme+=(config[depart+i]+1)
                }
                depart+=element[index]
                placePrise.push(somme)
                if (somme>partie.longueur){
                    faisable=false
                }
            });

            if(faisable){
                depart=Parties.depart;
                let proposition=ligne.slice()
                Parties.sousPart.forEach((partie,index)=>{
                    if(faisable){
                        let sousConfig=config.slice(depart,depart+element[index])
                        depart+=element[index]
                        let sousligne=ligne.slice(partie.debut,partie.fin)
                        let souscomparateur = new comparateur(sousConfig,sousligne)
                        souscomparateur.toutesCombinaisons(this.dispatch.get_list(element[index]+1,partie.longueur-placePrise[index]))//utiliser liste ))
                        if (souscomparateur.estRealisable()){
                            let sousSolution=souscomparateur.getSolution()
                            for(let i=0;i<partie.longueur;i++){
                                proposition[partie.debut+i]=sousSolution[i]
                            }
                        }else{
                            faisable=false
                            // console.log("%cCombinaison %c"+element+"%c, pb dans sous partie n%c"+index,"color:red","font-weight:bold;","","font-weight:bold;")
                            // console.log(sousligne)
                            // console.log(sousConfig)
                            // console.log(this.dispatch.get_list(element[index]+1,partie.longueur-placePrise[index]))

                        }
                    }
                })
                if(faisable){
                    lignefinale.nouvellePosibilitee(proposition)
                    
                    // console.log("%cCombinaison %c"+element+"%c, Ok","color:green","font-weight:bold","")
                    // console.log(proposition)
                }
            }else{
                // console.log("%cCombinaison %c"+element+"%c, ne rentre pas dans les sous parties","color:blue","font-weight:bold","")
            }
            
        })
        return lignefinale.getSolution()
    }

    sousParties(ligne,length_config){ //trouve les sous parties de la ligne // Testé

        let depart=this.gestionExtremites(ligne,0,0,1)
        let fin=this.gestionExtremites(ligne,ligne.length-1,length_config,-1)

        fin.ligne+=1

        let sousPart=[]
        let longueur_partie=0
        let debut=depart.ligne;

        for(let i=depart.ligne; i<fin.ligne; i++){
            if (ligne[i]==1){
                if(longueur_partie>0){
                    sousPart.push({longueur:longueur_partie,debut:debut,fin:i})// forme d'une sous partie
                    longueur_partie=0
                }
            }else{
                if(longueur_partie===0){
                    debut=i
                }
                longueur_partie+=1
            }
        }
        if(longueur_partie>0){
            sousPart.push({longueur:longueur_partie,debut:debut,fin:fin.ligne})// forme d'une sous partie
        }
        return {sousPart,depart:depart.config,fin:fin.config}
    }

    gestionExtremites(ligne,depart_ligne,depart_config,increment){ //exclu les extremités des sous parties
        let i=depart_ligne;
        let ancienne_case=ligne[i]
        while (ancienne_case!=0){
            i+=increment
            if(ancienne_case===1){
                ancienne_case=ligne[i]
                if(ancienne_case===1){
                    depart_ligne=i
                }
            }else{
                ancienne_case=ligne[i]
                if(ancienne_case===1){
                    depart_ligne=i
                    depart_config+=increment
                }
            }
        }

        return {ligne:depart_ligne,config:depart_config}
    }

    ligneDejaComplete(ligne){ //verifie si la ligne n'est pas deja resolue
        for(let i=0; i<ligne.length; i++){
            if (ligne[i]===0){
                return false
            }
        }
        return true
    }
}

//solveur.nouvelleLigne([1,1,2],[0,0,0,1,0,1,0,0,0])