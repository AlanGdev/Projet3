export function effacerContenuBalise(balise){
    balise.innerHTML='' //Effacement de la balise passée en argument
}

export function afficherProjets(projets,baliseAffichage){
    // Affichage des projets passés en argument dans la balise passée en argument:
    projets.forEach(item=>{
        let figureBal=document.createElement('figure')
        figureBal.innerHTML=`
            <img src=${item.imageUrl} alt=${item.title}>
            <figcaption>${item.title}</figcaption>
            `
        baliseAffichage.appendChild(figureBal)
    })
}

export function defineClassFilterBtn(btn,newClass){
    // Effacement de la classe du bouton passé en argument et ajout de la classe passée en argument:
    btn.className="" 
    btn.classList.add(newClass)
}

export function createBtnFilterTous(classe){
    // création du bouton "Tous" dans la classe passée en argument - dejà cliqué (filter-btn-clicked) - attribut data-id="Tous":
    classe.innerHTML=`
    <button data-id="Tous" class="filter-btn-clicked">Tous</button>
    `
}

export function createBtnFilter(parent,categorie){
    // Création d'un bouton filtre dans le parent passé en argument, avec la catégorie passée en argument:
    const btn=document.createElement("button") 
    btn.setAttribute("data-id",`${categorie.id}`)
    btn.innerText=`${categorie.name}`
    defineClassFilterBtn(btn,"filter-btn")
    parent.appendChild(btn)
}

export function addEventListenerButtonFilter(classeBoutons,projets,classeProjets){
    // Ajout d'un gestionnaire d'évenements sur les boutons de la classe passée en argument (classeBoutons) pour trier les projets passés en argument (projets) et les afficher dans la classe passée en argument (classeProjets)
    const filters=classeBoutons.querySelectorAll("button")
    filters.forEach(filterbtn=>
        filterbtn.addEventListener("click",()=>{
            //On repasse le bouton anciennement clicqué (filter-btn-clicked) en non cliqué (classe filter-btn):
            filters.forEach(filterbtn=>{
                if(filterbtn.classList.contains("filter-btn-clicked")){
                    defineClassFilterBtn(filterbtn,"filter-btn")
                }
            })
            //On passe la classe du bouton cliqué en "filter-btn-clicked"
            defineClassFilterBtn(filterbtn,"filter-btn-clicked")
            // On enregistre la catégorie correspondant au bouton dans la variable id
            let id=filterbtn.dataset.id
            // On crée la liste des projets filtrés:
            const filteredProjects=(()=>{
                if(id!=="Tous"){
                    return projets.filter((projet)=>{
                        return projet.category.id===Number(id)
                    })
                }
                else{
                    return[...projets]
                }
            })()
            effacerContenuBalise(classeProjets)
            afficherProjets(filteredProjects,classeProjets)
        })
    )
}

export function modaleCreation(modale,projets){
    //Création de la modale (Galerie Photo)
    modale.classList.remove("hidden")
    const content=modale.querySelector(".content")
    effacerContenuBalise(content)
    projets.forEach(projet=>{
        console.log(projet)
        const figure=document.createElement("figure")
        figure.innerHTML=`
        <img src=${projet.imageUrl} alt=${projet.title} data-id=${projet.id}>
        <button type="button" class="poub" data-id=${projet.id}><i class="fa-solid fa-trash-can"></i></button>
        `
        content.appendChild(figure)

    })
}
export function addEventListenerButtonPhoto(classeBoutons, projets){

}