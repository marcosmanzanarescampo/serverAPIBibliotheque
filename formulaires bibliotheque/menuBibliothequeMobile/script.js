const initPage = () => {
    const dropDownElements = document.querySelectorAll(".dropdown");

    dropDownElements.forEach(elem => {
        elem.children[0].addEventListener('click', (event) => {    
            event.target.parentElement.children[1].classList.toggle("show");
            event.target.classList.toggle("selected")
        })
    })
}

initPage();