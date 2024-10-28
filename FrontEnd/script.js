import * as fonction from './fonctions.js'
async function buildIndexPage(){
   // Envoi d'un fetch pour récup. des différentes catégories
   const respCategories=await fetch ('http://localhost:5678/api/categories')
   const categories= await respCategories.json() //categories: tableau des catégories au format json
   //Récupération du conteneur div class="filters" dans la page HTML (c'est là que sont affichés les filtres)
   const filtersClass=document.querySelector(".filters")

   //Création du bouton Tous (toutes catégories) avec de base la classe filter-btn-clicked (bouton clické) et le data-id="Tous"
   fonction.createBtnFilterTous(filtersClass)

   // Pour chaque élément de categories: Création d'un bouton (avec id et class "filter-btn" (non cliqué))
   categories.forEach(categorie=>{
      fonction.createBtnFilter(filtersClass,categorie)
   })
   /******** Par défaut, tous les projets sont affichés et le filtre "Tous" est cliqué ******/

   //On rajoute un gestionnaire d'évenements sur les boutons, au click
   fonction.addEventListenerButtonFilter(filtersClass,projects,gallery)



}

function buildEditionPage(){
   //Construction de la page d'édition
}

/***Pour construction de la page, vérification si token existant et valide */
//Désignation d'une variable editionPage (pour savoir si on est sur page d'édition) - Par défaut=false
let editionPage=false
//verification si token
   const token=localStorage.getItem('token')
   console.log(token)
//vérification si token valide
   const response=await fetch('http://localhost:5678/api/works',{
      method:"POST",
      headers:{
         "Authorization":`Bearer ${token}`,
         "Content-Type":"application/json"
      }
   })
   if(response.status===401){
      console.log("Erreur d'authentification / Token absent ou invalide")
      editionPage=false
   }
   else{
      editionPage=true
   }

// Envoi d'un fetch pour récup. des travaux sur l'API
const respProjects=await fetch('http://localhost:5678/api/works')
const projects=await respProjects.json()

// Envoi d'un fetch pour récup. des différentes catégories
const respCategories=await fetch ('http://localhost:5678/api/categories')
const categories= await respCategories.json()
 
const gallery=document.querySelector(".gallery") //Récup. du conteneur gallery pour affichage projets
fonction.effacerContenuBalise(gallery)
fonction.afficherProjets(projects,gallery)

if (!editionPage){
   //Récupération du conteneur div class="filters" dans la page HTML (c'est là que sont affichés les filtres)
   const filtersClass=document.querySelector(".filters")

   //Création du bouton Tous (toutes catégories) avec de base la classe filter-btn-clicked (bouton clické) et le data-id="Tous"
   fonction.createBtnFilterTous(filtersClass)

   // Pour chaque élément de categories: Création d'un bouton (avec id et class "filter-btn" (non cliqué))
   categories.forEach(categorie=>{
      fonction.createBtnFilter(filtersClass,categorie)
   })
   /******** Par défaut, tous les projets sont affichés et le filtre "Tous" est cliqué ******/

   //On rajoute un gestionnaire d'évenements sur les boutons, au click
   fonction.addEventListenerButtonFilter(filtersClass,projects,gallery)
}
else{
   const hautPage=document.getElementById("edition-mode")
   hautPage.classList.remove("hidden")
}


