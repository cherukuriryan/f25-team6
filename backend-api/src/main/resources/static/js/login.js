console.log("login.js loaded");


document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Login form submitted.");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    console.log("Email entered:", email);
    console.log("Password entered:", password);

    try {
        const students = await API.getStudents();
        console.log("Students fetched from API:", students);

        const match = students.find(s =>
            s.email === email && s.password === password
        );

        console.log("Matched student:", match);

        if (!match) {
            alert("Invalid email or password.");
            return;
        }

        // Save session
        localStorage.setItem("student", JSON.stringify(match));
        console.log("Saved student to localStorage.");

        window.location.href = "student-profile.html";

    } catch (err) {
        console.error("Login error:", err);
        alert("Login failed.");
    }
});


document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Signup submitted.");

    const name = document.getElementById("signName").value.trim();
    const email = document.getElementById("signEmail").value.trim();
    const password = document.getElementById("signPassword").value.trim();

    try {
        const created = await API.createStudent({ name, email, password });
        console.log("Student created:", created);

        alert("Account created! You can now log in.");
        window.location.href = "login.html";

    } catch (err) {
        console.error("Signup failed:", err);
        alert("Signup failed.");
    }
});
