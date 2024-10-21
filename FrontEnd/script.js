import * as fonction from './fonctions.js'

// Envoi d'un fetch pour récup. des travaux sur l'API
const respProjects=await fetch('http://localhost:5678/api/works')
const projects=await respProjects.json() // projets: tableau des travaux au format JSON

 // Envoi d'un fetch pour récup. des différentes catégories
 const respCategories=await fetch ('http://localhost:5678/api/categories')
 const categories= await respCategories.json() //categories: tableau des catégories au format json
 
// Récupération de la class "gallery" dans la page HTML (C'est là que sont affichés les projets)
let gallery=document.querySelector(".gallery")

// Efface le contenu de gallery pour effacer les travaux en static via la focntion importée
fonction.effacerContenuBalise(gallery)

// Affichage des projets via la fonction importée
fonction.afficherProjets(projects,gallery)

 //Récupération de la class div class="filters" dans la page HTML (c'est là que sont affichés les filtres)
 let filtersClass=document.querySelector(".filters")

 //Création du bouton Tous (toutes catégories) avec de base la classe filter-btn-clicked (bouton clické) et le data-id="Tous"
fonction.createBtnFilterTous(filtersClass)

 // Pour chaque élément de categories: Création d'un bouton (avec id et class "filter-btn" (non cliqué))
 categories.forEach(categorie=>{
    fonction.createBtnFilter(filtersClass,categorie)
 })

 //On va rajouter un gestionnaire d'évenements sur les boutons, au click
 fonction.addEventListenerButtonFilter(filtersClass,projects,gallery)



