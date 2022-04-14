class plateau{
    constructor(lignes,colonnes){
        this.hauteur=lignes.length
        this.largeur=colonnes.length
        this.lignes = Array(this.hauteur)
        this.colonnes = Array(this.largeur)

        for(let i=0 ; i<this.hauteur ; i++){
            this.lignes[i]=this.creer_rangee(i,true,lignes[i])
        }
        for(let i=0 ; i<this.largeur ; i++){
            this.colonnes[i]=this.creer_rangee(i,false,colonnes[i])
        }

        this.grid = [...Array(this.hauteur)].map(e => Array(this.largeur).fill(0));
    }

    poids(liste){
        let n = liste.length
        let max = 0
        let somme = 0
        for(let i=0 ; i<n ; i++){
            somme+=liste[i]
            if(liste[i]>max){
                max=liste[i]
            }
        }

        let place_prise = somme + n - 1
        let poids_initial = place_prise + max
        return [poids_initial,place_prise]
    }

    creer_rangee(position,horizontal,liste){
        let [poids_initial,place_prise] = this.poids(liste)
        let rangee = {
            position,
            horizontal,
            configuration:liste,
            poids:poids_initial,
            nb_cases_complete:0,
            en_cours_traitement:false,
            place_prise
        }
        return rangee
    }

    afficher_config(){
        console.log('%cLignes','color:blue;font-weight:bold')
        console.log(this.lignes)
        console.log('%cColonnes','color:blue;font-weight:bold')
        console.log(this.colonnes)
    }

    afficher(){
        for(let i=0;i<this.hauteur;i++){
            console.log(this.grid[i])
        }
    }

    configuration_rangee(position,horizontal){
        if(horizontal){
            return (this.lignes[position])
        }else{
            return (this.colonnes[position])
        }
    }

    rangee_en_traitement(position,horizontal,etat){
        if(horizontal){
            this.lignes[position].en_cours_traitement=etat
        }else{
            this.colonnes[position].en_cours_traitement=etat
        }
    }

    rangee(position,horizontal){
        if(horizontal){
            return(this.grid[position].slice())
        }else{
            let col=Array(this.hauteur)
            for(let i=0 ; i<this.hauteur ; i++){
                col[i]=this.grid[i][position]
            }
            return col
        }
    }

    ajouter_point(position_rangee,horizontal_rangee,position_2,etat){
        if((horizontal_rangee && this.grid[position_rangee][position_2]===0) || (!horizontal_rangee && this.grid[position_2][position_rangee]===0)){
            if(horizontal_rangee){
                this.lignes[position_rangee].poids+=1
                this.colonnes[position_2].poids+=1

                this.grid[position_rangee][position_2]=etat

                return this.colonnes[position_2]
            }else{
                this.colonnes[position_rangee].poids+=1
                this.lignes[position_2].poids+=1

                this.grid[position_2][position_rangee]=etat

                return this.lignes[position_2]
            }
        }
    }
}