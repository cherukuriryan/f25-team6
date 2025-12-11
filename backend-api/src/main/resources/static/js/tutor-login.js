document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tutor-login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("t-login-email").value.trim();
        const password = document.getElementById("t-login-password").value.trim();

        try {
            const res = await fetch("http://localhost:8080/providers/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                alert("Invalid email or password.");
                return;
            }

            const provider = await res.json();

            localStorage.setItem("provider", JSON.stringify(provider));
            window.location.href = "tutor-dashboard.html";

        } catch (err) {
            console.error(err);
            alert("Login failed.");
        }
    });
});
