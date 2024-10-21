export function effacerContenuBalise(balise){
    balise.innerHTML=''
}

export function afficherProjets(projets,baliseAffichage){
    //Pour chaque element du tableau:
    projets.forEach(item=>{
        // On crée une balise <figure>:
        let figureBal=document.createElement('figure')
        // On crée le code HTML de la balise:
        figureBal.innerHTML=`
            <img src=${item.imageUrl} alt=${item.title}>
            <figcaption>${item.title}</figcaption>
            `
        // On ajoute cette balise au contenu de la classe parente galleryClass
        baliseAffichage.appendChild(figureBal)
    })
}

export function defineClassFilterBtn(btn,newClass){
    btn.className="" // On efface les classes présentes sur le bouton
    btn.classList.add(newClass) // On lui rajoute la classe passée en argument de la fonction
}

export function createBtnFilterTous(classe){
    // On crée le bouton dejà cliqué (filter-btn-clicked) - attribut data-id="Tous"
    classe.innerHTML=`
    <button data-id="Tous" class="filter-btn-clicked">Tous</button>
    `
}

export function createBtnFilter(parent,categorie){
    const btn=document.createElement("button") //On crée un élément button
    btn.setAttribute("data-id",`${categorie.id}`) // on ajoute un attribut: data-id=categorie.id
    btn.innerText=`${categorie.name}` //on ajoute du texte: categorie.name
    defineClassFilterBtn(btn,"filter-btn") // on définit une classe au bouton
    parent.appendChild(btn) // on ajoute le bouton créé à son parent ('filtersClass')
}

export function addEventListenerButtonFilter(classeBoutons,projets,classeProjets){
    const filters=classeBoutons.querySelectorAll("button") //On sélectionne tous les boutons de la classe
    //On lance une boucle forEach pour chaque bouton auxquels on va ajouter un gestionnaire d'évènements
    filters.forEach(filterbtn=>
        filterbtn.addEventListener("click",()=>{
            //On repasse tous le bouton anciennement clicqué (filter-btn-clicked) en non cliqué (classe filter-btn):
            filters.forEach(filterbtn=>{
                // Si le bouton est cliqué
                if(filterbtn.classList.contains("filter-btn-clicked")){
                    //On le passe en non cliqué
                    defineClassFilterBtn(filterbtn,"filter-btn")
                }
            })
            //On passe la classe du bouton cliqué en "filter-btn-clicked"
            defineClassFilterBtn(filterbtn,"filter-btn-clicked")
            // On enregistre la catégorie correspondant au bouton dans la variable id
            let id=filterbtn.dataset.id
            // On crée la liste des projets filtrés:
            const filteredProjects=(()=>{
                if(id!="Tous"){
                    return projets.filter((projet)=>{
                        return projet.category.id===Number(id)
                    })
                }
                else{
                    return[...projets] //si l'id="Tous", on renvoie une copie du tableau projets
                }
            })() // Les parenthèses de fin lancent la fonction
            // On efface le contenu du conteneur des projets:
            effacerContenuBalise(classeProjets)
            // On affiche les projets filtrés:
            afficherProjets(filteredProjects,classeProjets)
        })
    )
}