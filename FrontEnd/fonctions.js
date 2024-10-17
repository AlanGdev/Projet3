export function effacerContenuBalise(balise){
    balise.innerHTML=''
}
export function afficherProjets(projets,baliseAffichage){
    //Pour chaque element du tableau:
    projets.forEach(item=>{
        // On crée une balise <figure>:
        let figureBal=document.createElement('figure')
        // On crée le code HTML de la balise:
        figureBal.innerHTML=`
            <img src=${item.imageUrl} alt=${item.title}>
            <figcaption>${item.title}</figcaption>
            `
        // On ajoute cette balise au contenu de la classe parente galleryClass
        baliseAffichage.appendChild(figureBal)
    })
}