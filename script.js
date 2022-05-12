function resolution(){
    let date1= Date.now()
    // --- Initialisation des objets ---

    // let mon_plateau = new plateau([[4],[1,1],[1,1],[5],[3]],[[3],[1,2],[5],[1,2],[1,1]])
    let mon_plateau = new plateau([[7],[2,3],[7,1],[9],[9],[1,3],[1,3],[2,3],[1,3],[9]],[[1,1],[10],[1,3,1],[1,3,1],[1,3,1],[1,3,1],[1,3,1],[10],[1,7],[9]])
    let mon_tas = new TasMax(20)
    let mon_solveur= new solveurLigne(5,5)

    // --- Récupération des meilleurs rangées ---

    for(let i=0 ; i<mon_plateau.hauteur ; i++){
        let poids=mon_plateau.configuration_rangee(i,true).poids
        if(poids>mon_plateau.largeur){
            mon_tas.ajout({poids,position:i,horizontal:true})
            mon_plateau.rangee_en_traitement(i,true,true)
        }else if(poids==0){
            mon_tas.ajout({poids:2*mon_plateau.largeur,position:i,horizontal:true})
            mon_plateau.rangee_en_traitement(i,true,true)
        }
    }
    for(let i=0 ; i<mon_plateau.largeur ; i++){
        let poids=mon_plateau.configuration_rangee(i,false).poids
        if(poids>mon_plateau.hauteur){
            mon_tas.ajout({poids,position:i,horizontal:false})
            mon_plateau.rangee_en_traitement(i,false,true)
        }else if(poids==0){
            mon_tas.ajout({poids:2*mon_plateau.hauteur,position:i,horizontal:false})
            mon_plateau.rangee_en_traitement(i,false,true)
        }
    }

    // --- Résolution du plateau ---

    while(!(mon_tas.estVide())){

        // console.log("%ccalcul de ligne","color:red")

        let ligne=mon_tas.supprimer() // ligne : {poids,position,horizontal}
        mon_plateau.rangee_en_traitement(ligne.position,ligne.horizontal,false)
        let configurationLigne=mon_plateau.configuration_rangee(ligne.position,ligne.horizontal)
        let plateauLigne=mon_plateau.rangee(ligne.position,ligne.horizontal)

        // console.log("%cConfiguration : %c"+configurationLigne.configuration,"font-weight:bold","")
        // console.log("%cPlateau : %c"+plateauLigne,"font-weight:bold","")

        let resultatLigne = mon_solveur.nouvelleLigne(configurationLigne.configuration,plateauLigne)

        if(!(resultatLigne[0]===3)){
            for(let i=0;i<resultatLigne.length;i++){
                if(plateauLigne[i]===0 && resultatLigne[i]!=0){
                    let lignePerpendiculaire=mon_plateau.ajouter_point(ligne.position,ligne.horizontal,i,resultatLigne[i])
                    if(!(lignePerpendiculaire.en_cours_traitement)){
                        mon_tas.ajout({poids:lignePerpendiculaire.poids,position:i,horizontal:lignePerpendiculaire.horizontal})
                        mon_plateau.rangee_en_traitement(i,lignePerpendiculaire.horizontal,true)
                    }
                }
            }
        }
    }
    let date2 = Date.now()
    mon_plateau.afficher()
    console.log("Temps de resolution : "+(date2-date1)+" ms")
}

document.getElementById("bouton").addEventListener("click",resolution)

//voir style https://orb-h.github.io/nonogram-solver/