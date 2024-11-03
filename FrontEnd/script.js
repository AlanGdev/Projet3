import * as fonction from './fonctions.js'

// Création des fonctions pour modale
const openModal=function (e){
   modale.classList.remove("hidden")
   modale.removeAttribute("aria-hidden")
   modale.setAttribute("aria-modal","true")
   modale.addEventListener("click",closeModal)
   modale.querySelector(".js-modale-stop").addEventListener("click",stopPropagation)
   modaleBtnClose.forEach((button)=>{button.addEventListener("click",closeModal)})
   fonction.showGaleriePhotoModale(modale)
   fonction.fillCategoryForm(categories)
   form.addEventListener("submit",submitAjoutPhoto)
}

const closeModal=function (e){
   modale.classList.add("hidden")
   modale.setAttribute("aria-hidden","true")
   modale.removeAttribute("aria-modal")
   modale.removeEventListener("click",closeModal)
   modale.querySelector(".js-modale-stop").removeEventListener("click",stopPropagation)
   modaleBtnClose.forEach((button)=>{removeEventListener("click",closeModal)})
   addButton.removeEventListener("click",fonction.showAddPhotoModale)
   inputPhotoBtn.removeEventListener("change",fonction.addEventListenerUploadPicture)
   document.getElementById("picture-error").classList.add("hidden")
   fonction.trashPhotoPreview()
   fonction.trashAllFields()
   fonction.hideModalAddMode()
   fonction.clearCategoryForm()
   form.removeEventListener("input",fonction.fieldsVerification)    
   form.removeEventListener("change",fonction.fieldsVerification)    
   form.removeEventListener("submit",submitAjoutPhoto)
}

const stopPropagation=function (e){
   e.stopPropagation()
}

const submitAjoutPhoto=(e)=>{
   fonction.submitPictureForm(e,closeModal)
}

//Récupération du token (Null si inexistant)
const token=fonction.getToken()

// Envoi d'un fetch pour récup. des travaux sur l'API
const respProjects=await fetch('http://localhost:5678/api/works')
const projects=await respProjects.json()

// Envoi d'un fetch pour récup. des catégories
const respCategories=await fetch ('http://localhost:5678/api/categories')
const categories= await respCategories.json()

// Déclaration des constantes
const editionMode=document.getElementById("edition-mode")
const header=document.getElementById("header")
const log=document.getElementById("log")
const modifier=document.getElementById("modifier")
const filters=document.getElementById("filters")
const modale=document.getElementById("modale")
const modaleBtnClose=document.querySelectorAll(".modale-btn-close")
const gallery=document.querySelector(".gallery")
const addButton=document.querySelector(".add-button")
const inputPhotoBtn=document.getElementById("input-photo")
const form=modale.querySelector("form")

fonction.afficherProjets(projects)

if (!token){
   // Ouverture de la page en mode consultation
   editionMode.classList.add("hidden")
   modifier.classList.add("hidden")

   // Création des boutons de filtre + gestionnaire d'évènements
   fonction.createBtnFilterTous()
   categories.forEach(categorie=>{
      fonction.createBtnFilter(categorie)
   })
   fonction.addEventListenerButtonFilter(projects)
}

else{
   //Ouverture de la page en mode edition
   editionMode.classList.remove("hidden")
   header.classList.add("marge-top-110")
   modifier.classList.remove("hidden")
   filters.classList.add("hidden")
   log.innerText="logout"
   log.setAttribute("href","index.html")
   log.addEventListener("click",()=>{
      localStorage.removeItem("token")
   }) 
   modifier.addEventListener("click",openModal)
}



