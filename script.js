// Effet Intro
document.addEventListener("DOMContentLoaded", function () {
    const pageIntro = document.getElementById("page-intro");
    const mainContent = document.getElementById("main-content");

    function hideIntro() {
        pageIntro.classList.add("hidden");
        setTimeout(() => {
            pageIntro.style.display = "none";
            mainContent.style.display = "block";
            mainContent.style.opacity = 1;
        }, 1000);
    }

    setTimeout(hideIntro, 2000);
});



// Refresh la page au clic
function refreshPage() {
    location.replace(location.pathname + location.search);
}



// Titre Machine à Ecrire
document.addEventListener("DOMContentLoaded", function () {
    const words = [ "Bienvenue sur mon Portfolio !", "Je m'appelle Timothé !", "Étudiant aujourd'hui, Ingénieur demain", "Développement Web","Optimiser le présent, créer l'avenir"];
    let wordIndex = 0;
    let letterIndex = 0;
    const speed = 120; 
    const delay = 1000; 
    const element = document.getElementById("welcome-text");

    function typeWriter() {
        if (letterIndex < words[wordIndex].length) {
            element.innerHTML += words[wordIndex].charAt(letterIndex);
            letterIndex++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(eraseText, delay); 
        }
    }

    function eraseText() {
        if (letterIndex > 0) {
            element.innerHTML = element.innerHTML.slice(0, -1); // efface la derniere lettre
            letterIndex--;
            setTimeout(eraseText, speed / 3);
        } else {
            wordIndex = (wordIndex + 1) % words.length; // mot suivant
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});

// Barre de Compétences 

const levels = document.querySelectorAll('.level-example');
levels.forEach(level => {
    level.addEventListener('mouseover', () => {
        const description = level.getAttribute('data-description');
        level.setAttribute('title', description);
    });

    level.addEventListener('mouseout', () => {
        level.removeAttribute('title');
    });
});


// Compétences Barre de défilement
document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.getElementById("skills-logo");
    const marqueeContent = marquee.querySelector(".skills-logo-content");
    const clone = marqueeContent.cloneNode(true);
    marquee.appendChild(clone);

    let speed = 0.4;
    let scrollPosition = 0;
    let animationActive = true; // controle l'animation

    function scrollMarquee() {
        if (animationActive) {
            scrollPosition -= speed;
            if (Math.abs(scrollPosition) >= marqueeContent.offsetWidth) {
                scrollPosition = 0;
            }
            marqueeContent.style.transform = `translateX(${scrollPosition}px)`;
            clone.style.transform = `translateX(${scrollPosition}px)`;
        }
        requestAnimationFrame(scrollMarquee);
    }
    scrollMarquee();

    // arrêt de l'animation au survol
    marquee.addEventListener("mouseenter", () => {
        animationActive = false;
    });
    marquee.addEventListener("mouseleave", () => {
        animationActive = true;
    });
});



// Cartes de projet animation
const projectCards = document.querySelectorAll('.project-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });
projectCards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    observer.observe(card);
});

// Cartes de projet animation
const projectCardsUpcoming = document.querySelectorAll('.project-card-upcoming');

const observerupcoming = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });
projectCardsUpcoming.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    observerupcoming.observe(card);
});



// Envoie mail avec Formulaire
function sendMail() {

    var name = document.getElementById("name").value.trim();
    var mail = document.getElementById("mail").value.trim();
    var message = document.getElementById("message").value.trim();

    // Vérifier que les champs ne sont pas vides
    if (name === "" || mail === "" || message === "") {
        // pop-up d'erreur
        var errorPopup = document.createElement("div");
        errorPopup.style.position = "fixed";
        errorPopup.style.top = "20px";  
        errorPopup.style.right = "20px"; 
        errorPopup.style.padding = "20px";
        errorPopup.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
        errorPopup.style.color = "white";
        errorPopup.style.borderRadius = "5px";
        errorPopup.innerText = "Tous les champs doivent être remplis.";
        document.body.appendChild(errorPopup);

        // Supprimer pop-up d'erreur
        setTimeout(function() {
            document.body.removeChild(errorPopup);
        }, 3000);
        return;
    }

    // Vérifier la validité de l'email
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(mail)) {
        // pop-up d'erreur
        var errorPopup = document.createElement("div");
        errorPopup.style.position = "fixed";
        errorPopup.style.top = "20px";  
        errorPopup.style.right = "20px"; 
        errorPopup.style.padding = "20px";
        errorPopup.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
        errorPopup.style.color = "white";
        errorPopup.style.borderRadius = "5px";
        errorPopup.innerText = "L'adresse email saisie n'est pas valide.";
        document.body.appendChild(errorPopup);

        // Supprimer pop-up d'erreur
        setTimeout(function() {
            document.body.removeChild(errorPopup);
        }, 3000);
        return;
    }

    var parms = {
        name: name,
        mail: mail,
        message: message,
    };

    // pop-up de chargement
    var loadingPopup = document.createElement("div");
    loadingPopup.style.position = "fixed";
    loadingPopup.style.top = "20px";  
    loadingPopup.style.right = "20px"; 
    loadingPopup.style.padding = "20px";
    loadingPopup.style.backgroundColor = "rgba(200, 200, 200, 0.9)";
    loadingPopup.style.color = "white";
    loadingPopup.style.borderRadius = "5px";
    loadingPopup.innerText = "Envoi en cours, veuillez patienter...";
    document.body.appendChild(loadingPopup);

    emailjs.send("service_wo1zwti", "template_16lknf9", parms)
    .then(function() {
        // Supprimer pop-up de chargement
        document.body.removeChild(loadingPopup);
        
        // pop-up de confirmation
        var successPopup = document.createElement("div");
        successPopup.style.position = "fixed";
        successPopup.style.top = "20px";  
        successPopup.style.right = "20px"; 
        successPopup.style.padding = "20px";
        successPopup.style.backgroundColor = "rgba(0, 128, 0, 0.9)";
        successPopup.style.color = "white";
        successPopup.style.borderRadius = "5px";
        successPopup.innerText = "Votre message a été envoyé !\nVous recevrez une copie du mail envoyé (vérifié dans vos spams).";
        document.body.appendChild(successPopup);

        // Supprimer pop-up de succès
        setTimeout(function() {
            document.body.removeChild(successPopup);
        }, 5000);

        document.getElementById("name").value = "";
        document.getElementById("mail").value = "";
        document.getElementById("message").value = "";
    }, function(error) {
        document.body.removeChild(loadingPopup);
        
        // pop-up d'erreur
        var errorPopup = document.createElement("div");
        errorPopup.style.position = "fixed";
        errorPopup.style.top = "20px";  
        errorPopup.style.right = "20px"; 
        errorPopup.style.padding = "20px";
        errorPopup.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
        errorPopup.style.color = "white";
        errorPopup.style.borderRadius = "5px";
        errorPopup.innerText = "Une erreur est survenue, veuillez réessayer plus tard.";
        document.body.appendChild(errorPopup);

        // Supprimer pop-up d'erreur
        setTimeout(function() {
            document.body.removeChild(errorPopup);
        }, 3000);
    });
}
// afficher la popup (mail)
function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 5000);
}



// Fleche remonte en haut 1
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Fleche apparrait quand scroll 
window.addEventListener('scroll', () => {
    const button = document.querySelector('.back-to-top');
    if (window.scrollY > 50) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
});