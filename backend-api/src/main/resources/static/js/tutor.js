let currentProvider = null;

// ---------- LOAD DASHBOARD ----------
async function initTutorDashboard() {
    const stored = localStorage.getItem("provider");
    if (!stored) {
        
        window.location.href = "tutor-login.html";
        return;
    }

    currentProvider = JSON.parse(stored);

    
    document.getElementById("p-name").value = currentProvider.name || "";
    document.getElementById("p-email").value = currentProvider.email || "";
    document.getElementById("p-bio").value = currentProvider.bio || "";
    document.getElementById("p-subj").value = currentProvider.subjects || "";

    
    await loadStats();
    await loadServices();
    await loadReviews();
}


document.getElementById("createProviderBtn").addEventListener("click", async () => {
    const body = {
        name: document.getElementById("p-name").value.trim(),
        email: document.getElementById("p-email").value.trim(),
        bio: document.getElementById("p-bio").value.trim(),
        subjects: document.getElementById("p-subj").value.trim()
    };

    try {
        let updated;
        if (currentProvider && currentProvider.id) {
            
            updated = await API.updateProvider(currentProvider.id, body);
        } else {
           
            updated = await API.createProvider(body);
        }

        currentProvider = updated;
        localStorage.setItem("provider", JSON.stringify(currentProvider));

        alert("Provider profile saved.");
        await loadStats();
        await loadServices();
        await loadReviews();
    } catch (err) {
        console.error(err);
        alert("Error saving provider profile.");
    }
});

// ---------- STATS ----------
async function loadStats() {
    if (!currentProvider || !currentProvider.id) return;

    try {
        const statsText = await API.getProviderStats(currentProvider.id);
        document.getElementById("stats").textContent = statsText;
    } catch (err) {
        console.error(err);
        document.getElementById("stats").textContent = "Error loading stats.";
    }
}

// ---------- SERVICES ----------
async function loadServices() {
    if (!currentProvider || !currentProvider.id) return;

    try {
        const services = await API.getServicesForProvider(currentProvider.id);
        const tbody = document.querySelector("#svc-table tbody");
        tbody.innerHTML = "";

        services.forEach(svc => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${svc.title}</td>
                <td>${svc.description}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error(err);
    }
}

document.getElementById("addServiceBtn").addEventListener("click", async () => {
    if (!currentProvider || !currentProvider.id) {
        alert("Please save your provider profile first.");
        return;
    }

    const title = document.getElementById("svc-title").value.trim();
    const desc = document.getElementById("svc-desc").value.trim();

    if (!title || !desc) {
        alert("Please enter a title and description.");
        return;
    }

    try {
        await API.createService(currentProvider.id, { title, description: desc });
        document.getElementById("svc-title").value = "";
        document.getElementById("svc-desc").value = "";
        await loadServices();
        alert("Service added.");
    } catch (err) {
        console.error(err);
        alert("Error adding service.");
    }
});

// ---------- REVIEWS ----------
async function loadReviews() {
    if (!currentProvider || !currentProvider.id) return;

    try {
        const reviews = await API.getReviewsForProvider(currentProvider.id);
        const box = document.getElementById("reviews");
        box.innerHTML = "";

        if (!reviews || reviews.length === 0) {
            box.innerHTML = "<p>No reviews yet.</p>";
            return;
        }

        reviews.forEach(r => {
            const div = document.createElement("div");
            div.className = "review-card";
            div.innerHTML = `
                <p><b>Rating:</b> ${r.rating}</p>
                <p><b>Comment:</b> ${r.comment || ""}</p>
                <p><b>Date:</b> ${r.reviewDate || ""}</p>
                ${r.providerReply ? `<p><b>Your reply:</b> ${r.providerReply}</p>` : ""}
            `;
            box.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}

// ---------- LOGOUT ----------
document.getElementById("tutor-logout").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("provider");
    window.location.href = "login.html";
});


initTutorDashboard();