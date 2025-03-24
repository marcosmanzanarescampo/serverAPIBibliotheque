const nouveauLivre = document.querySelector("#nouveauLivre");


nouveauLivre.addEventListener('click', (event) => {
    const formulaireNouveauLivre = document.querySelector("#formNouveauLivre");
    formulaireNouveauLivre.classList.remove("hidden");
    formulaireNouveauLivre.classList.add("show");
})