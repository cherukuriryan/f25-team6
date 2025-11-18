const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// LOGIN
loginForm?.addEventListener("submit", async (e) => 
    {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
        const student = await apiPost("/api/auth/login", { email, password });

        localStorage.setItem("student", JSON.stringify(student));
        window.location.href = "student-profile.html";
    } catch (err) {
        alert("Invalid email or password.");
    }
});

// SIGN UP  
signupForm?.addEventListener("submit", async (e) => 
    {
    e.preventDefault();

    const name = document.getElementById("signName").value.trim();
    const email = document.getElementById("signEmail").value.trim();
    const password = document.getElementById("signPassword").value.trim();

    try {
        await apiPost("/api/students", { name, email, password });
        alert("Account created. You can now log in.");
        window.location.href = "login.html";
    } catch (err) {
        alert("Signup failed.");
    }
});
