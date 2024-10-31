function refreshPage() {
    location.replace(location.pathname + location.search);
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
        mail: document.getElementById("mail").value,
        message: document.getElementById("message").value,
    };

    // Afficher la pop-up de chargement
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
        // Supprimer la pop-up de chargement
        document.body.removeChild(loadingPopup);
        
        // Pop-up de confirmation
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

        // Supprimer la pop-up de succès après 3 secondes
        setTimeout(function() {
            document.body.removeChild(successPopup);
        }, 3000);

        // Réinitialiser les champs
        document.getElementById("name").value = "";
        document.getElementById("mail").value = "";
        document.getElementById("message").value = "";
    }, function(error) {
        // Supprimer la pop-up de chargement
        document.body.removeChild(loadingPopup);
        
        // Pop-up d'erreur
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

        // Supprimer la pop-up d'erreur après 3 secondes
        setTimeout(function() {
            document.body.removeChild(errorPopup);
        }, 3000);

        console.error("Erreur d'envoi:", error);
    });
}

// Fonction pour afficher une popup
function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerText = message;

    // Ajoute la popup au corps du document
    document.body.appendChild(popup);

    // Retire la popup après 3 secondes
    setTimeout(() => {
        popup.remove();
    }, 3000);
}


document.addEventListener("DOMContentLoaded", function () {
    const words = [ "Bienvenue sur mon Portfolio !", "Je m'appelle Timothé !", "Étudiant aujourd'hui, Ingénieur demain", "Développement Web","Optimiser le présent, créer l'avenir"];
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


document.addEventListener("DOMContentLoaded", function () {
    const introPage = document.getElementById("intro-page");
    const mainContent = document.getElementById("main-content");

    function hideIntro() {
        introPage.classList.add("hidden");
        setTimeout(() => {
            introPage.style.display = "none";
            mainContent.style.display = "block";
            mainContent.style.opacity = 1;
        }, 1000); // Assurez-vous que cela correspond au délai de la transition CSS
    }

    // Cacher l'introduction après 2 secondes
    setTimeout(hideIntro, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
    const skillsSection = document.querySelector(".skills-section");
    const progressBars = document.querySelectorAll(".progress");

    // Fonction pour lancer l'animation des barres de progression
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const finalWidth = bar.getAttribute("data-progress"); // Récupère la valeur sans le % pour éviter 'null'
            bar.style.width = finalWidth + "%"; // Définit la largeur cible pour l'animation
            
            // Affiche progressivement le pourcentage en attendant que l'animation soit terminée
            bar.textContent = finalWidth + "%";
        });
    }

    // Création d'un observateur pour la section des compétences
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(skillsSection); // Stoppe l'observation après l'animation
            }
        });
    }, { threshold: 0.5 }); // Lance l'animation quand 50% de la section est visible

    observer.observe(skillsSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.getElementById("marquee");
    const marqueeContent = marquee.querySelector(".marquee-content");
    const clone = marqueeContent.cloneNode(true);
    marquee.appendChild(clone);

    let speed = 1.5; // Ajustez la vitesse ici
    let scrollPosition = 0;
    let animationActive = true; // Variable pour contrôler l'animation

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

    // Démarrer l'animation
    scrollMarquee();

    // Arrêter l'animation lors du survol d'un logo
    marquee.addEventListener("mouseenter", () => {
        animationActive = false;
    });

    marquee.addEventListener("mouseleave", () => {
        animationActive = true;
    });
});


