const nameInput = document.getElementById("nom");
const surnameInput = document.getElementById("prenom");
const photoInput = document.getElementById("photo");

const namePreview = document.getElementById("name-preview");
const surnamePreview = document.getElementById("surname-preview");
const photoPreview = document.getElementById("photo-preview");

// Mise à jour du badge en temps réel
nameInput.addEventListener("input", () => namePreview.textContent = nameInput.value || "Nom");
surnameInput.addEventListener("input", () => surnamePreview.textContent = surnameInput.value || "Prénom");

photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => photoPreview.src = reader.result;
    reader.readAsDataURL(file);
});

// Génération PDF
document.getElementById("generate-pdf").addEventListener("click", async () => {
    const badge = document.getElementById("badge-preview");
    const canvas = await html2canvas(badge, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [badge.offsetWidth * 2, badge.offsetHeight * 2]
    });

    pdf.addImage(imgData, "PNG", 0, 0, badge.offsetWidth * 2, badge.offsetHeight * 2);
    pdf.save(`badge_${nameInput.value || "Nom"}_${surnameInput.value || "Prénom"}.pdf`);
});
