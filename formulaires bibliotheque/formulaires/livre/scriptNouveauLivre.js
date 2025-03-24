    const form = document.getElementById('book-form');
    const isbnInput = document.getElementById('isbn');
    const yearField = document.getElementById('annee');

    const port = 3000;
    const route = "/api/livres";
    const url = `http://localhost:${port}${route}`;
    const method = "POST";

    isbnInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Supprime tout sauf chiffres

        // On insère les tirets après chaque bloc de chiffres
        if (value.length > 4) value = value.slice(0, 4) + '-' + value.slice(4);
        if (value.length > 9) value = value.slice(0, 9) + '-' + value.slice(9);
        if (value.length > 14) value = value.slice(0, 14) + '-' + value.slice(14);
        if (value.length > 17) value = value.slice(0, 17); // limite à 17 caractères max
   
        e.target.value = value;
    });

    // Fonction pour charger les éditeurs depuis l'API
    function loadEditors() {
        try {
            const route = "/api/editeurs";
            const url = `http://localhost:${port}${route}`;
            const method = "GET";
            // Requête fetch pour récupérer les éditeurs
            
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
             })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'envoi du formulaire');
                }
               return response.json();
            })

            .then(data => {
                const editeurs = document.getElementById('editeur');
                
                // On vide les options existantes (si jamais il y en a)
                editeurs.innerHTML = '';   
                
                data.data.forEach(editor => {
                    // Ajouter une option vide comme choix par défaut
                    const defaultOption = document.createElement('option');
                    defaultOption.value = editor.id;
                    defaultOption.textContent = `${editor.editeur}`;
                    editeurs.appendChild(defaultOption);    
                });
            })
            .catch(error => {
                // Gestion de l'erreur si le fetch échoue
                console.error('Erreur lors du chargement des éditeurs:', error);
                alert('Impossible de charger les éditeurs.');
            });
        } catch (error) {
            // Gestion des erreurs qui pourraient survenir avant ou pendant le fetch
            console.error('Erreur dans la requête fetch:', error);
            alert('Une erreur s\'est produite lors de l\'exécution.');
        }
        
    }
    // ********************

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Empêche la soumission classique du formulaire

        // Verification de l'année de publication
        // Récupérer la valeur de l'année
        const yearValue = parseInt(yearField.value, 10);

        // Obtenir l'année actuelle
        const currentYear = new Date().getFullYear();

        // Vérifier si l'année est dans la plage [0, currentYear]
        if (yearValue < 0 || yearValue > currentYear) {
         alert(`L'année de publication doit être entre 0 et ${currentYear}.`);
         yearField.style.backgroundColor = "orange";
         yearField.style.color = "white";
         yearField.focus();
         return; // Empêche l'envoi du formulaire
        }
        // ***************************************

        // Récupération des données du formulaire
        const data = {
            titre: document.getElementById('titre').value,
            ISBN: document.getElementById('isbn').value,
            annee_Publication: parseInt(document.getElementById('annee').value, 10),
            nb_Pages: parseInt(document.getElementById('pages').value, 10),
            editeur: parseInt(document.getElementById('editeur').value, 10)
        };        

     try{

        console.log("Rêquete: " + url + method);
        

         fetch(url, {
             method: method,
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         })
         .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du formulaire');
            }
            return response.json();})  // Convertit la réponse en JSON
         .then(data => {
            console.log('Succès:', data);
            alert('Livre enregistré avec succès !');
            form.reset(); // Réinitialiser le formulaire après succès
         });    
        }catch(error){
            console.error('Erreur:', error);
            alert('Erreur lors de l\'enregistrement');
        };
    });


    // Charger les éditeurs quand le DOM est prêt
    document.addEventListener('DOMContentLoaded', loadEditors);

