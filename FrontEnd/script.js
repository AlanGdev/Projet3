// Envoi d'un fetch pour récup. des travaux sur l'API
const repProjets=await fetch('http://localhost:5678/api/works')
const projets=await repProjets.json() // projets: tableau des travaux au format JSON
console.log(projets)

// Récupération de la class "gallery" dans la page HTML
let galleryClass=document.querySelector(".gallery")

// Efface le contenu de la div class='gallery' pour effacer les travaux en static
galleryClass.innerHTML=''
// vérification
console.log(galleryClass.innerHTML)

// Pour chaque élément de projets:
projets.forEach(projet=>{
    // Création de la balise <figure>
    let figureBal=document.createElement("figure")
    // Insertion du contenu de la balise <figure>
    figureBal.innerHTML=`
        <img src=${projet.imageUrl} alt=${projet.title}>
        <figcaption>${projet.title}</figcaption>
        `
    // rajout de l'enfant à la classe "gallery"
    galleryClass.appendChild(figureBal)
    console.log(figureBal)
})

 // Envoi d'un fetch pour récup. des différentes catégories
 const repCategories=await fetch ('http://localhost:5678/api/categories')
 const categories= await repCategories.json() //categories: tableau des catégories au format json
 console.log(categories)

 //Récupération de la class "filters" dans la page HTML
 let filtersClass=document.querySelector(".filters")

 // Efface le contenu de la div class='filters' pour effacer les filtres en static
 filtersClass.innerHTML=''
 //vérification
 console.log(filtersClass)

 //Création du bouton Tous (toutes catégories)
 filtersClass.innerHTML=`
    <button data-id="0" class="filter-btn-clicked">Tous</button>`

 // Pour chaque élément de categories:
 categories.forEach(categorie=>{
    let btn=document.createElement("button")
    btn.setAttribute("data-id",`${categorie.id}`)
    btn.innerText=`${categorie.name}`
    btn.classList.add("filter-btn")
    filtersClass.appendChild(btn)
 })

 //On va rajouter un gestionnaire d'évenements sur les boutons, au click
 //On selectionne tous les boutons
 const filters=filtersClass.querySelectorAll("button")
 console.log(filters)
 //On lance une boucle forEach button
filters.forEach(filter=>{
    //on prend le bouton et on rajoute un gestionnaire d'évenement au click - On ouvre une fonction flêchée
    filter.addEventListener("click",()=>{
            //On va retirer la classe filter-btn-clicked du bouton cliqué antérieurement pour l'ajouter au nouveau bouton cliqué ensuite
            //On vérifie donc (sur chaque bouton)si le bouton a la class "filter-btn-clicked" (pour pouvoir la retirer)
            filters.forEach(button=>{
                if (button.classList.contains("filter-btn-clicked")){
                    console.log (`Le bouton ${button.dataset.id}est l'ancien bouton cliqué`)
                    button.classList.remove("filter-btn-clicked")
                    button.classList.add("filter-btn")
                    console.log(`le bouton a desormais les classes: ${button.classList}`)
                    }
                })
            console.log(`bouton ${filter.dataset.id} cliqué`)
            filter.classList.add("filter-btn-clicked")
            filter.classList.remove("filter-btn")
        })

    // On change la classe DU bouton en filter-btn-clicked

    })


