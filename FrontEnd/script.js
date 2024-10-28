import * as fonction from './fonctions.js'

//verification si token
   const token=localStorage.getItem('token')
   console.log(token)

// Envoi d'un fetch pour récup. des travaux sur l'API
const respProjects=await fetch('http://localhost:5678/api/works')
const projects=await respProjects.json()

// Envoi d'un fetch pour récup. des catégories
const respCategories=await fetch ('http://localhost:5678/api/categories')
const categories= await respCategories.json()

const editionMode=document.getElementById("edition-mode")
const header=document.getElementById("header")
const log=document.getElementById("log")
const modifier=document.getElementById("modifier")
const filters=document.getElementById("filters")
const modale=document.getElementById("modale")
 
const gallery=document.querySelector(".gallery") //Récup. du conteneur gallery pour affichage projets
fonction.effacerContenuBalise(gallery)
fonction.afficherProjets(projects,gallery)

if (!token){
   editionMode.classList.add("hidden")
   modifier.classList.add("hidden")
   //Récupération du conteneur "filters" dans la page HTML (c'est là que sont affichés les filtres)

   //Création du bouton Tous (toutes catégories) avec de base la classe filter-btn-clicked (bouton clické) et le data-id="Tous"
   fonction.createBtnFilterTous(filters)

   // Pour chaque élément de categories: Création d'un bouton (avec id et class "filter-btn" (non cliqué))
   categories.forEach(categorie=>{
      fonction.createBtnFilter(filters,categorie)
   })

   //On rajoute un gestionnaire d'évenements sur les boutons, au click
   fonction.addEventListenerButtonFilter(filters,projects,gallery)
}
else{
   editionMode.classList.remove("hidden") // apparition "Mode edition"

   header.classList.add("marge-top-110")// Marge-top header

   modifier.classList.remove("hidden") // apparition "modifier"
   modifier.addEventListener("click",()=>{
      console.log("coucou")
      fonction.modaleCreation(modale,projects)
   })

   filters.classList.add("hidden")

   log.innerText="logout" // changement login en logout
   log.setAttribute("href","index.html")
   log.addEventListener("click",()=>{
      localStorage.removeItem("token")
   })   
}


