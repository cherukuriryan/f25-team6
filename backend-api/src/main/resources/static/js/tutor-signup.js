document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tutor-signup-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("t-name").value.trim();
        const email = document.getElementById("t-email").value.trim();
        const password = document.getElementById("t-password").value.trim();
        const confirm = document.getElementById("t-confirm").value.trim();
        const subjects = document.getElementById("t-subjects").value.trim();
        const bio = document.getElementById("t-bio").value.trim();

        if (password !== confirm) {
            alert("Passwords do not match.");
            return;
        }

        const tutorData = { name, email, password, subjects, bio };

        try {
            const res = await fetch("http://localhost:8080/providers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tutorData)
            });

            if (!res.ok) {
                alert("Error creating tutor account.");
                return;
            }

            alert("Tutor account created successfully!");
            window.location.href = "tutor-login.html";

        } catch (err) {
            console.error(err);
            alert("Network error.");
        }
    });
});
