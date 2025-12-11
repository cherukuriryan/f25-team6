const tutorLoginForm = document.getElementById("tutor-login-form");

tutorLoginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("tutor-login-email").value.trim();
    const password = document.getElementById("tutor-login-password").value.trim();

    try {
        const res = await fetch("http://localhost:8080/providers/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const msg = await res.text();
            alert("Login failed: " + msg);
            return;
        }

        const provider = await res.json();

      
        localStorage.setItem("provider", JSON.stringify(provider));

       
        window.location.href = "tutor-dashboard.html";
    } catch (err) {
        console.error(err);
        alert("Error logging in as tutor.");
    }
});