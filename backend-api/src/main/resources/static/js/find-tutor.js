<<<<<<< HEAD
async function loadTutorPage() 
{

    
    const student = Session.get("student");

    if (!student)
         {
       
=======
async function loadTutorPage() {
    
    const student = Session.get("student");

    if (!student) {
>>>>>>> ddb89de0683d5573afc5f9b588f492919a9e2b9a
        document.getElementById("noSubjects").style.display = "block";
        document.getElementById("results").innerHTML =
            "<p>Please log in to find tutors.</p>";
        return;
    }

<<<<<<< HEAD
   
=======
    
>>>>>>> ddb89de0683d5573afc5f9b588f492919a9e2b9a
    const selectedSubjects = student.subjects || "";

    if (selectedSubjects.trim() === "") 
        {
        document.getElementById("noSubjects").style.display = "block";
        return;
    }

    const subList = selectedSubjects
        .split(",")
        .map(s => s.trim().toLowerCase());

    
    let providers = [];
    try {
        providers = await API.getProviders();
    } catch (err) {
        console.error(err);
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

<<<<<<< HEAD
    
    if (matching.length === 0) 
        {
=======
    if (matching.length === 0) {
>>>>>>> ddb89de0683d5573afc5f9b588f492919a9e2b9a
        resultsBox.innerHTML =
            "<p>No tutors available for your selected subjects.</p>";
        return;
    }

    
<<<<<<< HEAD
    matching.forEach(t => 
        {

=======
    matching.forEach(t => {
>>>>>>> ddb89de0683d5573afc5f9b588f492919a9e2b9a
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