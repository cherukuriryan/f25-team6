console.log("student.js loaded");


let student = JSON.parse(localStorage.getItem("student"));
if (!student) {
    window.location.href = "login.html";
}

document.getElementById("emailDisplay").textContent = student.email;
document.getElementById("nameDisplay").textContent = student.name;



document.getElementById("changeEmailBtn").addEventListener("click", async () => {
    const newEmail = prompt("Enter your new email:");
    if (!newEmail) return;

    try {
        const updated = await API.updateStudent(student.id, { email: newEmail });

        student = updated;
        localStorage.setItem("student", JSON.stringify(updated));

        document.getElementById("emailDisplay").textContent = updated.email;
        alert("Email updated successfully!");

    } catch (err) {
        alert("Error updating email.");
    }
});



document.getElementById("changePasswordBtn").addEventListener("click", async () => {
    const newPass = prompt("Enter your new password:");
    if (!newPass) return;

    try {
        const updated = await API.updateStudent(student.id, { password: newPass });

        student = updated;
        localStorage.setItem("student", JSON.stringify(updated));

        alert("Password updated successfully!");

    } catch (err) {
        alert("Error updating password.");
    }
});



const picBox = document.getElementById("profilePic");
const picInput = document.getElementById("picInput");

// Load saved pic if exists
if (student.profilePic) {
    picBox.style.backgroundImage = `url(${student.profilePic})`;
}

// Open file selector
document.getElementById("changePicBtn").addEventListener("click", () => {
    picInput.click();
});

// When picture selected
picInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64 = e.target.result;

        picBox.style.backgroundImage = `url(${base64})`;
        picBox.style.backgroundSize = "cover";

        
        student.profilePic = base64;
        localStorage.setItem("student", JSON.stringify(student));

        alert("Profile picture updated!");
    };

    reader.readAsDataURL(file);
});



const checkboxes = document.querySelectorAll(".subjects-grid input[type='checkbox']");


if (student.subjects) {
    const saved = student.subjects.split(",").map(s => s.trim().toLowerCase());
    checkboxes.forEach(cb => {
        const label = cb.parentElement.textContent.trim().toLowerCase();
        if (saved.includes(label)) cb.checked = true;
    });
}


window.saveSubjects = async function () {
    const selected = [];

    checkboxes.forEach(cb => {
        if (cb.checked) {
            selected.push(cb.parentElement.textContent.trim());
        }
    });

    try {
        const updated = await API.updateStudent(student.id, {
            subjects: selected.join(", ")
        });

        student = updated;
        localStorage.setItem("student", JSON.stringify(updated));

        alert("Subjects saved!");

    } catch (err) {
        alert("Error saving subjects.");
    }
};



const picDisplay = document.getElementById("profilePic");
const picInput = document.getElementById("picInput");
const picBtn = document.getElementById("changePicBtn");

// Load profile picture from DB
if (student.profilePic) {
    picDisplay.style.backgroundImage = `url(${student.profilePic})`;
}

// When clicking Add Profile Picture
picBtn.addEventListener("click", () => picInput.click());

// When user selects a file
picInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function (e) {
        const imgData = e.target.result; 

        try {
            // Save to backend
            const updated = await API.updateStudent(student.id, {
                profilePic: imgData
            });

            // Update local session
            localStorage.setItem("student", JSON.stringify(updated));

            // Display the image
            picDisplay.style.backgroundImage = `url(${imgData})`;

            alert("Profile picture updated!");
        } catch (err) {
            console.error(err);
            alert("Error saving profile picture.");
        }
    };

    reader.readAsDataURL(file);
});



window.logout = function () {
    localStorage.clear();
    window.location.href = "login.html";
};
