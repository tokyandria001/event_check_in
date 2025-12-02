// --- RÉFÉRENCES DES MODALES ---
const modalInfo = document.getElementById("modal-info");
const modalInscription = document.getElementById("modal-inscription");

// --- OUVERTURE DES MODALES ---
document.getElementById("open-info").onclick = () => {
  modalInfo.style.display = "flex";
};

document.getElementById("open-inscription").onclick = () => {
  modalInscription.style.display = "flex";
};

// --- FERMETURE PAR BOUTON ---
document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    const target = btn.dataset.modal;
    document.getElementById(`modal-${target}`).style.display = "none";
  };
});

// --- FERMETURE EN CLIQUANT HORS MODALE ---
window.onclick = (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

// --- TOKEN FRONT (si besoin Make.com) ---
const SECRET_TOKEN = "mon_token_secret_123";

// --- FORMULAIRE D’INSCRIPTION ---
document.getElementById("form-inscription").onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const nom = form.nom.value.trim();
  const prenom = form.prenom.value.trim();
  const email = form.email.value.trim();
  const telephone = form.telephone.value.trim();


  if (!nom || !prenom || !email) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  const webhookURL = "https://hook.eu2.make.com/b1zx1siz2tludohhefm14m68bwcbpcqm";

  const formData = new URLSearchParams();
  formData.append("nom", nom);
  formData.append("prenom", prenom);
  formData.append("email", email);
  formData.append("telephone", telephone);
  formData.append("event_name", "Innovation & Technologie 2025");
  formData.append("event_date", "12 novembre 2025");
  formData.append("event_location", "Paris Expo Porte de Versailles");
  formData.append("token", SECRET_TOKEN);

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData
    });

    if (response.ok) {
      alert("Votre inscription a bien été envoyée !");
      form.reset();
      modalInscription.style.display = "none";
    } else {
      alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur Make :", error);
    alert("Impossible de contacter Make pour l’instant.");
  }
};
