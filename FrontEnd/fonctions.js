export function effacerContenuBalise(balise){
    balise.innerHTML=''
}

export function afficherProjets(projets){
    //affichage projets dans la classe .gallery
    const gallery=document.querySelector(".gallery")
    projets.forEach(item=>{
        let figureBal=document.createElement('figure')
        figureBal.innerHTML=`
            <img src=${item.imageUrl} alt=${item.title}>
            <figcaption>${item.title}</figcaption>
            `
        figureBal.setAttribute("data-figNumber",`${item.id}`)//
        console.log(item.id)//
        gallery.appendChild(figureBal)
    })
}

export function defineClassFilterBtn(btn,newClass){
    // Effacement de la classe du bouton et ajout de la nouvelle classe
    btn.className="" 
    btn.classList.add(newClass)
}

export function createBtnFilterTous(){
    // création du bouton filtre "Tous" dejà cliqué (filter-btn-clicked)
    const filters=document.getElementById("filters")
    filters.innerHTML=`
    <button data-id="Tous" class="filter-btn-clicked">Tous</button>
    `
}

export function createBtnFilter(categorie){
    // Création d'un bouton filtre catégorie
    const filters=document.getElementById("filters")
    const btn=document.createElement("button") 
    btn.setAttribute("data-id",`${categorie.id}`)
    btn.innerText=`${categorie.name}`
    defineClassFilterBtn(btn,"filter-btn")
    filters.appendChild(btn)
}

export function addEventListenerButtonFilter(projets){
    // Gestionnaire d'évenement pour affichage projets par catégorie
    const filtersbal=document.getElementById("filters")
    const filters=filtersbal.querySelectorAll("button")
    const gallery=document.querySelector(".gallery")

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
            effacerContenuBalise(gallery)
            afficherProjets(filteredProjects,gallery)
        })
    )
}
/*****Fonctions Modale - Galerie Photo */
export async function showGaleriePhotoModale(){
    //Modale - Mode Galerie Photo
    const modale=document.getElementById("modale")
    const content=modale.querySelector(".content")
    effacerContenuBalise(content)
    const respProjects=await fetch('http://localhost:5678/api/works')
    const projects=await respProjects.json()

    projects.forEach(projet=>{
        const figure=document.createElement("figure")
        figure.innerHTML=`
        <img src=${projet.imageUrl} alt=${projet.title} data-id=${projet.id}>
        <button type="button" class="poub" data-id=${projet.id}><i class="fa-solid fa-trash-can"></i></button>
        `
        figure.setAttribute("data-figNumber",`${projet.id}`)
        content.appendChild(figure)
    })
    addEventListenerTrashButton(modale)
    addEventListenerModalAddButton(modale)
}

export function addEventListenerTrashButton(modale){
    // Modale: Ajout d'un gestionnaire d'evt sur chaque photo de la galerie
    const buttons=modale.querySelectorAll(".poub")
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            trashPhoto(button.dataset.id)
        })
    })
}

export async function trashPhoto(buttonDataId){
    //Supprime la photo de l'API et de la modale
    const modale=document.getElementById("modale")
    const token=getToken()
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

export function trashPhotoProjets(projectId){
    // supprime la photo du Portfolio, sur la page du site 
    const mesProjets=document.querySelector(".gallery")
    console.log(mesProjets)
    const figure=mesProjets.querySelector(`[data-figNumber="${projectId}"]`)
    figure.remove() 
}

export function addEventListenerModalAddButton(modale){
    const button=modale.querySelector(".add-button")
    button.addEventListener("click",()=>{
        modale.querySelector(".galerie-photo").classList.add("hidden")
        modale.querySelector(".ajout-photo").classList.remove("hidden")
    })
}

export function getToken(){
    const token=localStorage.getItem("token")
    return token
}