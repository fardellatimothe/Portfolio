// Fonction pour rafraîchir la page
function refreshPage() {
    location.replace();
}

// Validation du formulaire de contact
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Merci pour votre message !");
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const button = document.querySelector('.back-to-top');
    if (window.scrollY > 50) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
});
