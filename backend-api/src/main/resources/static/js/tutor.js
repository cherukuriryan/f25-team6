async function loadTutorPage() {

    const student = JSON.parse(localStorage.getItem("student"));

    // If not logged in → stop BUT DO NOT redirect
    if (!student) {
        document.getElementById("noSubjects").style.display = "block";
        document.getElementById("results").innerHTML =
            "<p>Please log in to find tutors.</p>";
        return;
    }

    const selectedSubjects = student.subjects || "";

    if (selectedSubjects.trim() === "") {
        document.getElementById("noSubjects").style.display = "block";
        return;
    }

    const subList = selectedSubjects
        .split(",")
        .map(s => s.trim().toLowerCase());

    let providers = [];
    try {
        providers = await apiGet("/providers");
    } catch (e) {
        document.getElementById("results").innerHTML =
            "<p>Error loading tutors.</p>";
        return;
    }

    const resultsBox = document.getElementById("results");
    resultsBox.innerHTML = "";

    const matching = providers.filter(p =>
        p.subjects &&
        subList.some(s => p.subjects.toLowerCase().includes(s))
    );

    if (matching.length === 0) {
        resultsBox.innerHTML =
            "<p>No tutors available for your selected subjects.</p>";
        return;
    }

    matching.forEach(t => {
        resultsBox.innerHTML += `
            <div class="tutor-result-card">
                <div class="result-left">
                    <img src="assets/img/tutor1.jpg" class="tutor-photo">
                </div>

                <div class="result-mid">
                    <h3 class="tutor-name">${t.name}</h3>
                    <p><b>Bio:</b> ${t.bio || "No bio available"}</p>
                    <p><b>Subjects:</b> ${t.subjects}</p>
                </div>

                <div class="result-right">
                    <button class="btn primary book-btn">Book With Me</button>
                </div>
            </div>
        `;
    });
}

loadTutorPage();
