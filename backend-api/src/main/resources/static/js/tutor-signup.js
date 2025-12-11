document.getElementById("tutor-signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("t-name").value.trim(),
        email: document.getElementById("t-email").value.trim(),
        password: document.getElementById("t-password").value.trim(),
        subjects: document.getElementById("t-subjects").value.trim(),
        bio: document.getElementById("t-bio").value.trim()
    };

    try {
        const provider = await API.createProvider(data);
        alert("Tutor profile created successfully!");

        // store logged-in provider info
        localStorage.setItem("provider", JSON.stringify(provider));

        // redirect tutor to dashboard
        window.location.href = "tutor-dashboard.html";
    } catch (err) {
        alert("Error creating tutor profile.");
        console.error(err);
    }
});