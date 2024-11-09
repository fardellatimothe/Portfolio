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



// Effet barre de Compétences %
document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.querySelector(".skills-section");
    const progressBars = document.querySelectorAll(".skill-progress");

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const finalWidth = bar.getAttribute("data-progress"); 
            bar.style.width = finalWidth + "%";
            bar.textContent = finalWidth + "%";
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.4 }); // lance l'animation quand 40% de la section compétence est visible

    observer.observe(skillsSection);
});



// Compétences Barre de défilement
document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.getElementById("skills-logo");
    const marqueeContent = marquee.querySelector(".skills-logo-content");
    const clone = marqueeContent.cloneNode(true);
    marquee.appendChild(clone);

    let speed = 1.3;
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



// Envoie mail avec Formulaire
function sendMail() {
    var parms = {
        name: document.getElementById("name").value,
        mail: document.getElementById("mail").value,
        message: document.getElementById("message").value,
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
        successPopup.innerText = "Votre message a été envoyé avec succès!";
        document.body.appendChild(successPopup);

        // Supprimer pop-up de succès
        setTimeout(function() {
            document.body.removeChild(successPopup);
        }, 3000);

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
    }, 3000);
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