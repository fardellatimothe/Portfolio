// Fonction pour rafraîchir la page
function refreshPage() {
    location.replace();
}


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

function sendMail() {
    var parms = {
        name: document.getElementById("name").value,
        mail : document.getElementById("mail").value,
        message : document.getElementById("message").value,
    }

    emailjs.send("service_wo1zwti", "template_16lknf9", parms)
        .then(function() {
            alert("Merci de m'avoir contacté !!");
            document.getElementById("name").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("message").value = "";
        })
}

document.addEventListener("DOMContentLoaded", function () {
    const words = [ "Bienvenue sur mon Portfolio !", "Je m'appelle Timothé !", "Étudiant aujourd'hui, Ingénieur demain.", "Développement Web",];
    let wordIndex = 0;
    let letterIndex = 0;
    const speed = 120; // Vitesse de chaque lettre
    const delay = 1000; // Pause entre les mots
    const element = document.getElementById("welcome-text");

    function typeWriter() {
        if (letterIndex < words[wordIndex].length) {
            element.innerHTML += words[wordIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(eraseText, delay); // Commence à effacer après un délai
        }
    }

    function eraseText() {
        if (letterIndex > 0) {
            element.innerHTML = element.innerHTML.slice(0, -1); // supprime la derniere lettre
            letterIndex--;
            setTimeout(eraseText, speed / 3); // efface plus rapidement
        } else {
            wordIndex = (wordIndex + 1) % words.length; // mot suivant
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
});
