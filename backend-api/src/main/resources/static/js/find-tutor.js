const subjectSelect = document.getElementById("subjectSelect");
const tutorContainer = document.getElementById("tutorResults");

const SUBJECTS = [
    "Mathematics",
    "Computer Science",
    "Sciences",
    "English & Writing",
    "Foreign Languages",
    "History & Social Sciences",
    "Business & Economics"
];


if (subjectSelect) 
    {
    SUBJECTS.forEach(sub => {
        const opt = document.createElement("option");
        opt.value = sub;
        opt.textContent = sub;
        subjectSelect.appendChild(opt);
    });
}


subjectSelect?.addEventListener("change", async () => 
    {
    const subject = subjectSelect.value;
    tutorContainer.innerHTML = "";

    if (!subject) return;

    const providers = await apiGet("/providers");

    const filtered = providers.filter(p =>
        p.subjects?.toLowerCase().includes(subject.toLowerCase())
    );

    if (filtered.length === 0) 
        {
        tutorContainer.innerHTML = "<p>No tutors available for this subject.</p>";
        return;
    }

    filtered.forEach(t =>
         {
        tutorContainer.innerHTML += `
            <div class="tutor-card">
                <h3>${t.name}</h3>
                <p>${t.bio}</p>
                <p><b>Subjects:</b> ${t.subjects}</p>
            </div>
        `;
    });
});
