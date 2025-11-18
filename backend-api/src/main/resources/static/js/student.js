const student = JSON.parse(localStorage.getItem("student"));
if (!student) window.location.href = "login.html";

document.getElementById("profileEmail").value = student.email;
document.getElementById("profileName").value = student.name;


document.getElementById("changeEmail").addEventListener("click", async () => 
    {
    const newEmail = document.getElementById("profileEmail").value.trim();

    const updated = await apiPut(`/api/students/${student.id}`, {
        email: newEmail
    });

    localStorage.setItem("student", JSON.stringify(updated));
    alert("Email updated.");
});


document.getElementById("changePassword").addEventListener("click", async () => 
    {
    const newPw = prompt("Enter new password:");
    if (!newPw) return;

    await apiPut(`/api/students/${student.id}`, {
        password: newPw
    });

    alert("Password updated.");
});
