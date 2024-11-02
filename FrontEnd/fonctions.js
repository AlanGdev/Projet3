/*****Fontions générales */
export function effacerContenuBalise(balise){
    balise.innerHTML=''
}

export function getToken(){
    const token=localStorage.getItem("token")
    return token
}

/*****Fonctions page principale */
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
        gallery.appendChild(figureBal)
    })
}

function defineClassFilterBtn(btn,newClass){
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
    hideModalAddMode()
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

function addEventListenerTrashButton(modale){
    // Modale: Ajout d'un gestionnaire d'evt sur chaque photo de la galerie
    const buttons=modale.querySelectorAll(".poub")
    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            trashPhoto(button.dataset.id)
        })
    })
}

async function trashPhoto(buttonDataId){
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

function trashPhotoProjets(projectId){
    // supprime la photo du Portfolio, sur la page du site 
    const mesProjets=document.querySelector(".gallery")
    console.log(mesProjets)
    const figure=mesProjets.querySelector(`[data-figNumber="${projectId}"]`)
    figure.remove() 
}

function addEventListenerModalAddButton(modale){
    const button=modale.querySelector(".add-button")
    button.addEventListener("click",showAddPhotoModale)
}

export function hideModalAddMode(){
    //Modale: classe "ajout-photo" en hidden / Retrait de hidden sur classe "galerie-photo"
    const modale=document.getElementById("modale")
    modale.querySelector(".ajout-photo").classList.add("hidden")
    modale.querySelector(".galerie-photo").classList.remove("hidden")

}

export function showAddPhotoModale(){
    //Modale: ouverture du mode Ajout Photo
    console.log("Mode ajout photo")
    const modale=document.getElementById("modale")
    const ajoutPhoto=document.getElementById("input-photo")
    const arrowReturn=modale.querySelector(".ajout-photo .modal-btn-arrow")
    const form=modale.querySelector("form")
    console.log(arrowReturn)
    modale.querySelector(".galerie-photo").classList.add("hidden")
    modale.querySelector(".ajout-photo").classList.remove("hidden")
    ajoutPhoto.addEventListener("change",addEventListenerUploadPicture)
    console.log("gestionnaire evt upload preview ajouté")
    arrowReturn.addEventListener("click",returnShowGaleriePhotoModale)
    form.addEventListener("input",fieldsVerification)    
    form.addEventListener("change",fieldsVerification) 
    form.addEventListener("submit",submitPictureForm)   
}

export function addEventListenerUploadPicture(event){
    console.log(" test chargement preview")
    const file=event.target.files[0]
    if(file){
        const fileName=file.name
        const fileExtension=fileName.split(".").pop().toLowerCase()
        const fileSize=(file.size/1000)
        console.log("fichier: "+ fileSize +"ko" + " extension:"+ fileExtension)
        if (fileSize>4000 || ((fileExtension!="jpg")&&(fileExtension!="jpeg")&&(fileExtension!="png" ))){
            document.getElementById("picture-error").classList.remove("hidden")
            console.log("format de fichier non correct ou taille supérieure à 4mo")
        }
        else{
            document.getElementById("picture-error").classList.add("hidden")
            const modale=document.getElementById("modale")
            const inputPhoto=modale.querySelector(".ajouter-photo")
            console.log(inputPhoto)
            const fileURL=URL.createObjectURL(file)
            const baliseImagePreview=document.getElementById("photo-preview")
            inputPhoto.classList.add("hidden")
            baliseImagePreview.classList.add("image-for-upload")
            console.log("image for upload ajouté")
            baliseImagePreview.src=fileURL
            console.log(fileURL)
        }
    }
}

export function trashPhotoPreview(){
    //On vide la balise img
    const photoPreview=document.getElementById("photo-preview")
    photoPreview.setAttribute("src","")
    photoPreview.classList.remove("image-for-upload")
    const modale=document.getElementById("modale")
    modale.querySelector(".ajouter-photo").classList.remove("hidden")
}

export function trashAllFields(){
    // On vide tous les champs
    const modale=document.getElementById("modale")
    const fields=modale.querySelectorAll("input,select")
    fields.forEach(field=>{
        field.value=""})
}

function returnShowGaleriePhotoModale(){
    const inputPhotoBtn=document.getElementById("input-photo")
    inputPhotoBtn.removeEventListener("change",addEventListenerUploadPicture)
    trashPhotoPreview()
    trashAllFields()
    document.getElementById("picture-error").classList.add("hidden")
    showGaleriePhotoModale()
    const modale=document.getElementById("modale")
    const submitButton=modale.querySelector(".validate-button")
    const form=modale.querySelector("form")
    submitButton.classList.remove("green")
    form.removeEventListener("input",fieldsVerification)    
    form.removeEventListener("change",fieldsVerification)    
}

export function fillCategoryForm(categories){
    const categoryForm=document.getElementById("category-selector")
    categories.forEach(categorie=>{
        const option=document.createElement("option")
        option.setAttribute("value",`${categorie.id}`)
        option.innerText=`${categorie.name}`
        categoryForm.appendChild(option)
    })
}

export function clearCategoryForm(){
    const categoryForm=document.getElementById("category-selector")
    categoryForm.innerHTML='<option value="" selected></option>'

}

function fieldsVerification(){
    //Vérif. des champs pour passage du bouton valider en vert
    const modale=document.getElementById("modale")
    const submitButton=modale.querySelector(".validate-button")
    const inputFile=document.getElementById("input-photo")
    const inputTitle=document.getElementById("title-form")
    const inputCategory=document.getElementById("category-selector")
    console.log(`${inputFile.files.length} ${inputTitle.value} ${inputCategory.value}`)
    if (inputFile.files.length && inputTitle.value && inputCategory.value){
    submitButton.classList.add("green")
    console.log("nouvelle classe")
    }
    else {
        submitButton.classList.remove("green")
            console.log("Pas de nouvelle classe")
    }
    
}
async function submitPictureForm(e){
    e.preventDefault()
    const inputFile=document.getElementById("input-photo").files[0]
    const inputTitle=document.getElementById("title-form").value
    const categorySelector=document.getElementById("category-selector").value
    const submitInfos=new FormData()
    /*submitInfos.title=inputTitle
    submitInfos.image=inputFile
    submitInfos.category=categorySelector*/
    submitInfos.append("image",inputFile)
    submitInfos.append("title",inputTitle)
    submitInfos.append("category",categorySelector)
    console.log(submitInfos)
    console.log(JSON.stringify(submitInfos))
    const token=getToken()
    const response=await fetch("http://localhost:5678/api/works",{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`,
            },
        body:submitInfos
    })
    console.log(response.status)
}