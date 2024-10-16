// Envoi d'un fetch pour récup. des travaux sur l'API
const reponse=await fetch('http://localhost:5678/api/works')
const projets=await reponse.json() // projets: tableau des travaux au format JSON

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
