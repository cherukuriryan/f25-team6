document.getElementById("tutor-signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("t-name").value,
        email: document.getElementById("t-email").value,
        subjects: document.getElementById("t-subjects").value,
        bio: document.getElementById("t-bio").value
    };

    try {
        const res = await API.createProvider(data);
        alert("Tutor profile created successfully!");

        
        window.location.href = "tutor-dashboard.html";
    } catch (err) {
        alert("Error creating tutor profile.");
        console.error(err);
    }
});
