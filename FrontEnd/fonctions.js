export function effacerContenuBalise(balise){
    balise.innerHTML=''
}

export function afficherProjets(projets,baliseAffichage){
    projets.forEach(item=>{
        let figureBal=document.createElement('figure')
        figureBal.innerHTML=`
            <img src=${item.imageUrl} alt=${item.title}>
            <figcaption>${item.title}</figcaption>
            `
        figureBal.setAttribute("data-figNumber",`${item.id}`)//
        console.log(item.id)//
        baliseAffichage.appendChild(figureBal)
    })
}

export function defineClassFilterBtn(btn,newClass){
    // Effacement de la classe du bouton et ajout de la nouvelle classe
    btn.className="" 
    btn.classList.add(newClass)
}

export function createBtnFilterTous(classe){
    // création du bouton "Tous" dans la classe passée en argument - dejà cliqué (filter-btn-clicked)
    classe.innerHTML=`
    <button data-id="Tous" class="filter-btn-clicked">Tous</button>
    `
}

export function createBtnFilter(parent,categorie){
    // Création d'un bouton filtre catégorie
    const btn=document.createElement("button") 
    btn.setAttribute("data-id",`${categorie.id}`)
    btn.innerText=`${categorie.name}`
    defineClassFilterBtn(btn,"filter-btn")
    parent.appendChild(btn)
}

export function addEventListenerButtonFilter(classeBoutons,projets,classeProjets){
    // Gestionnaire d'évenement pour affichage projets par catégorie
    const filters=classeBoutons.querySelectorAll("button")
    filters.forEach(filterbtn=>
        filterbtn.addEventListener("click",()=>{
            //Passage de cliqué en non cliqué sur ancien bouton
            filters.forEach(filterbtn=>{
                if(filterbtn.classList.contains("filter-btn-clicked")){
                    defineClassFilterBtn(filterbtn,"filter-btn")
                }
            })
            //Passage en cliqué sur bouton actuel
            defineClassFilterBtn(filterbtn,"filter-btn-clicked")
            // Enregistrement de l'Id de la catégorie
            let id=filterbtn.dataset.id
            // Création liste projets filtrés
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
/*****Fonctions Modale - Galerie Photo */
export function showGaleriePhotoModale(modale,projets,token){
    //Modale - Mode Galerie Photo
    const content=modale.querySelector(".content")
    effacerContenuBalise(content)
    projets.forEach(projet=>{
        const figure=document.createElement("figure")
        figure.innerHTML=`
        <img src=${projet.imageUrl} alt=${projet.title} data-id=${projet.id}>
        <button type="button" class="poub" data-id=${projet.id}><i class="fa-solid fa-trash-can"></i></button>
        `
        figure.setAttribute("data-figNumber",`${projet.id}`)
        content.appendChild(figure)
    })
    addEventListenerTrashButton(modale,token)
}

export function addEventListenerTrashButton(modale,token){
    const buttons=modale.querySelectorAll(".poub")
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            trashPhoto(modale,button.dataset.id,token)
        })
    })
}

export async function trashPhoto(modale,buttonDataId,token){
    //Supprime la photo de l'API et de la modale
    const respTrash=await fetch(`http://localhost:5678/api/works/${buttonDataId}`,{
        method:"DELETE",
        headers:{"Authorization":`Bearer ${token}`},
    })
    if (respTrash.ok){
        const figure=modale.querySelector(`[data-figNumber="${buttonDataId}"]`)
        figure.remove()
        trashPhotoProjets(buttonDataId)
    }
}

export function trashPhotoProjets(buttonDataId){
    // supprime la photo du Portfolio, sur la page du site 
    const mesProjets=document.querySelector(".gallery")
    console.log(mesProjets)
    const figure=mesProjets.querySelector(`[data-figNumber="${buttonDataId}"]`)
    figure.remove() 
}