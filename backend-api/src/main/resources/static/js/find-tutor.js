async function loadTutorPage() {

    // 1. Check login using localStorage (NOT server)
    const student = Session.get("student");

    if (!student) {
        // Show "no subjects" instead of redirecting
        document.getElementById("noSubjects").style.display = "block";
        return;
    }

    // 2. Check selected subjects
    const selectedSubjects = student.subjects || "";

    if (selectedSubjects.trim() === "") {
        document.getElementById("noSubjects").style.display = "block";
        return;
    }

    const subList = selectedSubjects
        .split(",")
        .map(s => s.trim().toLowerCase());

    // 3. Get all tutors
    let providers = [];
    try {
        providers = await API.getProviders();
    } catch (err) {
        document.getElementById("results").innerHTML =
            "<p>Error loading tutors.</p>";
        return;
    }

    const resultsBox = document.getElementById("results");
    resultsBox.innerHTML = "";

    // 4. Filter matches
    const matching = providers.filter(p =>
        p.subjects &&
        subList.some(s => p.subjects.toLowerCase().includes(s))
    );

    // 5. No tutor matches
    if (matching.length === 0) {
        resultsBox.innerHTML =
            "<p>No tutors available for your selected subjects.</p>";
        return;
    }

    // 6. Render cards
    matching.forEach(t => {

        const card = document.createElement("div");
        card.className = "tutor-result-card";

        card.innerHTML = `
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
        `;

        resultsBox.appendChild(card);
    });
}

loadTutorPage();
