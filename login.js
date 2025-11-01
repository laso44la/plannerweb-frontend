document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

  const brukernavn = document.getElementById("brukernavn").value;
  const passord = document.getElementById("passord").value;

  try {
    const response = await fetch("https://plannerweb-backend.onrender.com/api/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brukernavn, passord })
    });

    const data = await response.json();

    if (!response.ok) {
      alert("Feil: " + (data.message || "Kunne ikke logge inn"));
      return;
    }

    // 🔑 Rolle-sjekk
    if (data.rolle === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }

  } catch (err) {
    console.error("Innloggingsfeil:", err);
    alert("Nettverksfeil ved innlogging");
  }
});

