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
    <button data-id="0" class="filter-btn">Tous</button>`

 // Pour chaque élément de categories:
 categories.forEach(categorie=>{
    let btn=document.createElement("button")
    btn.setAttribute("data-id",`${categorie.id}`)
    btn.innerText=`${categorie.name}`
    btn.classList.add("filter-btn")
    filtersClass.appendChild(btn)
 })