/******Page de connexion******/
// Création de la constante formulaire
const formulaire=document.querySelector("form")
//Ajout du gestionnaire d'évènements
formulaire.addEventListener("submit",async(e)=>{
    //On empêche le rechargement de la page par défaut
    e.preventDefault()
    // Création des constantes email et password
    const email=formulaire.querySelector('[name=email]').value
    const password=formulaire.querySelector('[name=password]').value
    //On lance un try / catch pour fletch:
    try{
        //Création de la constante response (via fetch)
        const response=await fetch("http://localhost:5678/api/users/login",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "accept":"application/json"
            },
            body:JSON.stringify({"email":email,"password":password})
        })
        if(!response.ok){ //Si réponse NOK
            //Lancement d'une exception et redirection vers le bloc catch
            throw new Error(`Erreur de connexion ${response.status}`)
        }
        //On récupère la réponse sous la constante data
        const data=await response.json() //au format json
        //stockage du token(qui est dans l'objet data) dans le local storage
        localStorage.setItem('token',data.token)
        console.log(data.token)
        //redirection vers la page index.html
        window.location.href='./index.html'
    }
    catch (error){
        //Message d'erreur dans le console.log
        console.log(`Une erreur est survenue: ${error.message}`)
        document.getElementById("error-message")
            .classList.remove("hidden")
        localStorage.removeItem("token")
    }
})