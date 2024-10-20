import * as fonction from './fonctions.js'

// Envoi d'un fetch pour récup. des travaux sur l'API
const respProjects=await fetch('http://localhost:5678/api/works')
const projects=await respProjects.json() // projets: tableau des travaux au format JSON

 // Envoi d'un fetch pour récup. des différentes catégories
 const respCategories=await fetch ('http://localhost:5678/api/categories')
 const categories= await respCategories.json() //categories: tableau des catégories au format json

// Récupération de la class "gallery" dans la page HTML (C'est là que sont affichés les projets)
let galleryClass=document.querySelector(".gallery")

// Efface le contenu de la div class='gallery' pour effacer les travaux en static via la focntion importée
fonction.effacerContenuBalise(galleryClass)

// Affichage des projets via la fonction importée
fonction.afficherProjets(projects,galleryClass)

 //Récupération de la class div class="filters" dans la page HTML (c'est là que sont affichés les filtres)
 let filtersClass=document.querySelector(".filters")

 // Efface le contenu de la div class='filters' pour effacer les filtres en static
 filtersClass.innerHTML=''

 //Création du bouton Tous (toutes catégories) avec de base la classe filter-btn-clicked et le data-id="0"
 filtersClass.innerHTML=`
    <button data-id="0" class="filter-btn-clicked">Tous</button>
    `

 // Pour chaque élément de categories:
 categories.forEach(categorie=>{
    let btn=document.createElement("button") //On crée un élément button
    btn.setAttribute("data-id",`${categorie.id}`) // on ajoute un attribut: data-id=categorie.id
    btn.innerText=`${categorie.name}` //on ajoute du texte: categorie.name
    btn.classList.add("filter-btn") //on ajoute une classe pour mise en forme du bouton (non cliqué)
    filtersClass.appendChild(btn) // on ajoute le bouton créé à son parent ('filtersClass')
 })

 //On va rajouter un gestionnaire d'évenements sur les boutons, au click
 const filters=filtersClass.querySelectorAll("button") //=>On selectionne tous les boutons
 //On lance une boucle forEach sur chaque boutton:
filters.forEach(filter=>{
    //on prend le bouton et on rajoute le gestionnaire d'évenement au click - On ouvre une fonction flêchée:
    filter.addEventListener("click",()=>{
            /*On va retirer la classe filter-btn-clicked du bouton cliqué antérieurement pour l'ajouter au nouveau bouton cliqué ensuite
            //On vérifie donc chaque bouton pour enlevé la classe cliqué si besoin et tous les remettre comme 'non cliqués'*/
            filters.forEach(button=>{
                if (button.classList.contains("filter-btn-clicked")){ // Si le bouton est cliqué (classe filter-btn-clicked:
                    button.classList.remove("filter-btn-clicked") // On enlève la classe filter-btn-clicked (cliqué)
                    button.classList.add("filter-btn")// On ajoute la classe filter-btn (normal)
                    }
                })

            // On va maintenant s'intéresser au bouton cliqué:
            filter.classList.add("filter-btn-clicked")// Changement de classe du bouton cliqué (passage en filter-btn-clicked)
            filter.classList.remove("filter-btn")

            // On enregistre dans une variable, le data-id du bouton, correspondant à la catégorie.
            let id=Number(filter.dataset.id)

            // On crée la constante filteredProjects:
            const filteredProjects=(()=>{
                console.log("On est sur la construction de la constante filteredProjects")
                if(id!=0){ // Si id != 0 (bouton Tous)
                    console.log(id)
                    return projects.filter((project)=>{
                        return project.category.id===id
                    })
                }
                else{
                    console.log(id)
                    return[...projects] // Si id=0, on a tous les projets
                }
            })()// Les parenthèses de fin lancent la fonction définie à l'instant.

            fonction.effacerContenuBalise(galleryClass)// On efface le contenu du conteneur (class gallery)
            
            fonction.afficherProjets(filteredProjects,galleryClass) // on ajoute le contenu des projets filtrés (ou non)
        })
    })


