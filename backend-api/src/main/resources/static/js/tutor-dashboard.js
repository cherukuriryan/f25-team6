
let provider = JSON.parse(localStorage.getItem("provider"));

if (!provider || !provider.id) {
    window.location.href = "tutor-login.html";
}


document.addEventListener("DOMContentLoaded", () => {
    console.log("Tutor dashboard loaded for provider id:", provider.id);

    loadProfile();
    loadSlots();
    loadServices();
    loadReviews();
    loadBookings();
    setupProfilePicUpload();

    // Buttons
    const saveProfileBtn = document.getElementById("save-profile-btn");
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", saveProfile);
    }

    const addServiceBtn = document.getElementById("add-service-btn");
    if (addServiceBtn) {
        addServiceBtn.addEventListener("click", addService);
    }

    const addSlotBtn = document.getElementById("add-slot-btn");
    if (addSlotBtn) {
        addSlotBtn.addEventListener("click", addSlot);
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Reply modal buttons
    const sendReplyBtn = document.getElementById("sendReplyBtn");
    if (sendReplyBtn) {
        sendReplyBtn.addEventListener("click", submitReply);
    }

    const cancelReplyBtn = document.getElementById("cancelReplyBtn");
    if (cancelReplyBtn) {
        cancelReplyBtn.addEventListener("click", closeReplyModal);
    }
});

/* =========================
   LOAD PROFILE
========================= */
function loadProfile() {
    document.getElementById("p-name").value = provider.name || "";
    document.getElementById("p-email").value = provider.email || "";
    document.getElementById("p-bio").value = provider.bio || "";
    document.getElementById("p-subjects").value = provider.subjects || "";

    const pic = document.getElementById("tutorPic");
    if (provider.profilePic) {
        pic.style.backgroundImage = `url(${provider.profilePic})`;
        pic.style.backgroundPosition = "center";
        pic.style.backgroundSize = "cover";
    }
}

/* =========================
   SAVE PROFILE
========================= */
async function saveProfile() {
    const updated = {
        name: document.getElementById("p-name").value.trim(),
        email: provider.email,
        bio: document.getElementById("p-bio").value.trim(),
        subjects: document.getElementById("p-subjects").value.trim(),
        password: provider.password,
        profilePic: provider.profilePic || null
    };

    try {
        const res = await fetch(`http://localhost:8080/providers/${provider.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        if (!res.ok) return alert("Error saving profile.");

        provider = await res.json();
        localStorage.setItem("provider", JSON.stringify(provider));

        alert("Profile updated!");
    } catch (err) {
        console.error(err);
        alert("Network error saving profile.");
    }
}

/* =========================
   PROFILE PIC UPLOAD
========================= */
function setupProfilePicUpload() {
    const picBox = document.getElementById("tutorPic");
    const picInput = document.getElementById("tutorPicInput");
    const picBtn = document.getElementById("changeTutorPicBtn");

    picBtn.addEventListener("click", () => picInput.click());

    picInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const base64 = e.target.result;

            picBox.style.backgroundImage = `url(${base64})`;
            picBox.style.backgroundSize = "cover";
            picBox.style.backgroundPosition = "center";

            provider.profilePic = base64;
            localStorage.setItem("provider", JSON.stringify(provider));
        };

        reader.readAsDataURL(file);
    });
}

/* =========================
   TIME FORMATTER
========================= */
function formatDateTime(dt) {
    const d = new Date(dt);
    return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

/* =========================
   ADD SLOT
========================= */
async function addSlot() {
    const start = document.getElementById("slot-start").value;
    const end = document.getElementById("slot-end").value;

    if (!start || !end) return alert("Select start and end.");

    await fetch(`http://localhost:8080/api/slots/provider/${provider.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startTime: start, endTime: end })
    });

    document.getElementById("slot-start").value = "";
    document.getElementById("slot-end").value = "";

    loadSlots();
}

/* =========================
   LOAD SLOTS
========================= */
async function loadSlots() {
    const res = await fetch(`http://localhost:8080/api/slots/provider/${provider.id}`);
    const slots = await res.json();

    const box = document.getElementById("slot-list");
    box.innerHTML = "";

    slots.forEach(slot => {
        const div = document.createElement("div");
        div.className = "info-value";
        div.style.display = "flex";
        div.style.justifyContent = "space-between";

        div.innerHTML = `
            <span>${formatDateTime(slot.startTime)} → ${formatDateTime(slot.endTime)}</span>
            <button class="btn small red delete-slot-btn">Delete</button>
        `;

        div.querySelector("button").onclick = async () => {
            await fetch(`http://localhost:8080/api/slots/id/${slot.id}`, { method: "DELETE" });
            loadSlots();
        };

        box.appendChild(div);
    });
}

/* =========================
   LOAD BOOKINGS
========================= */
async function loadBookings() {
    const box = document.getElementById("booking-list");
    if (!box) return;

    box.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(`http://localhost:8080/api/bookings/provider/${provider.id}`);
        const bookings = await res.json();

        box.innerHTML = "";

        if (!bookings.length) {
            box.innerHTML = "<p>No bookings yet.</p>";
            return;
        }

        for (const b of bookings) {
            let sessionLabel = "Unknown";

            if (b.slotId) {
                try {
                    const slotRes = await fetch(`http://localhost:8080/api/slots/id/${b.slotId}`);

                    if (slotRes.ok) {
                        const text = await slotRes.text();

                        if (text && text.trim() !== "") {
                            try {
                                const slot = JSON.parse(text);
                                sessionLabel = `${formatDateTime(slot.startTime)} → ${formatDateTime(slot.endTime)}`;
                            } catch (parseErr) {
                                console.error("Could not parse slot JSON:", parseErr);
                            }
                        } else {
                            console.warn("Empty slot response body for slotId", b.slotId);
                        }
                    } else {
                        console.warn("Slot not found for slotId", b.slotId, "status:", slotRes.status);
                    }
                } catch (err) {
                    console.error("Slot fetch failed:", err);
                }
            }

            const div = document.createElement("div");
            div.className = "info-value";

            div.innerHTML = `
                <p><b>Student ID:</b> ${b.studentId}</p>
                <p><b>Status:</b> ${b.status}</p>
                <p><b>Session Time:</b> ${sessionLabel}</p>
                <hr>
            `;

            box.appendChild(div);
        }

    } catch (err) {
        console.error("Error loading bookings:", err);
        box.innerHTML = "<p>Error loading bookings.</p>";
    }
}

/* =========================
   SERVICES
========================= */
async function loadServices() {
    try {
        const res = await fetch(`http://localhost:8080/providers/${provider.id}/services`);
        const list = await res.json();

        const tbody = document.getElementById("svc-table");
        tbody.innerHTML = "";

        list.forEach(svc => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${svc.title}</td>
                <td>${svc.description}</td>
            `;
            tbody.appendChild(row);
        });

    } catch (err) {
        console.error(err);
    }
}

async function addService() {
    const title = document.getElementById("svc-title").value.trim();
    const desc = document.getElementById("svc-desc").value.trim();

    if (!title || !desc) return alert("Enter title and description.");

    await fetch(`http://localhost:8080/providers/${provider.id}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: desc })
    });

    document.getElementById("svc-title").value = "";
    document.getElementById("svc-desc").value = "";

    loadServices();
    alert("Service added!");
}

/* =========================
   REVIEWS
========================= */
let activeReviewId = null;

function openReplyModal(reviewId) {
    activeReviewId = reviewId;
    const modal = document.getElementById("replyModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeReplyModal() {
    const modal = document.getElementById("replyModal");
    if (modal) {
        modal.style.display = "none";
    }
    const replyInput = document.getElementById("replyText");
    if (replyInput) {
        replyInput.value = "";
    }
}

async function submitReply() {
    const text = document.getElementById("replyText").value.trim();
    if (!text) return alert("Reply cannot be empty.");

    console.log("Submitting reply for review", activeReviewId, "text:", text);

    try {
        const res = await fetch(`http://localhost:8080/api/reviews/${activeReviewId}/reply`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(text)
        });

        if (!res.ok) {
            console.error("Reply request failed with status", res.status);
            return alert("Error posting reply.");
        }

        alert("Reply posted!");
        closeReplyModal();
        loadReviews();

    } catch (err) {
        console.error(err);
        alert("Network error posting reply.");
    }
}

async function loadReviews() {
    try {
        // 🔹 Pull ALL reviews, then filter by provider in JS
        const res = await fetch("http://localhost:8080/api/reviews");
        const allReviews = await res.json();

        console.log("All reviews from API:", allReviews);

        const reviews = allReviews.filter(r => r.provider && r.provider.id === provider.id);
        console.log("Tutor dashboard reviews for provider", provider.id, ":", reviews);

        const box = document.getElementById("reviews");
        box.innerHTML = "";

        if (!reviews.length) {
            box.innerHTML = "<p>No reviews yet.</p>";
            return;
        }

        reviews.forEach(r => {
            const div = document.createElement("div");
            div.classList.add("review-card");

            div.innerHTML = `
                <p><b>Rating:</b> ${r.rating}</p>
                <p><b>Comment:</b> ${r.comment}</p>
                ${
                    r.providerReply
                        ? `
                            <div class="reply-box">
                                <p><b>Your Reply:</b> ${r.providerReply}</p>
                                <small>${r.replyDate || ""}</small>
                            </div>
                        `
                        : `<button class="btn small" onclick="openReplyModal(${r.id})">Reply</button>`
                }
            `;

            box.appendChild(div);
        });

    } catch (err) {
        console.error("Error loading reviews:", err);
        document.getElementById("reviews").innerHTML = "<p>Error loading reviews.</p>";
    }
}

/* =========================
   LOGOUT
========================= */
function logout() {
    localStorage.removeItem("provider");
    window.location.href = "tutor-login.html";
}
