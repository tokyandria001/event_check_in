const infoModal = document.getElementById("modal-info");
const participerModal = document.getElementById("modal-participer");

document.getElementById("btn-info").onclick = () => infoModal.style.display = "flex";
document.getElementById("btn-participer").onclick = () => participerModal.style.display = "flex";

document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.onclick = () => {
    document.getElementById(`modal-${closeBtn.dataset.close}`).style.display = "none";
  };
});

window.onclick = (e) => {
  if (e.target.classList.contains("modal")) e.target.style.display = "none";
};

// 🔐 TOKEN SECRET (pour sécurité entre front et Make)
const SECRET_TOKEN = "mon_token_secret_123";

document.getElementById("inscription-form").onsubmit = async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const telephone = document.getElementById("telephone").value.trim();

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
      document.getElementById("confirmation").style.display = "block";
      document.getElementById("inscription-form").reset();
    } else {
      console.error("Erreur HTTP :", response.status, response.statusText);
      alert("Erreur lors de l'envoi. Réessayez plus tard.");
    }
  } catch (error) {
    console.error("Erreur Make :", error);
    alert("Problème de connexion à Make.");
  }
};
