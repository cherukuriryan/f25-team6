console.log("find-tutor.js loaded");

// Get logged-in student
const student = JSON.parse(localStorage.getItem("student"));

// Redirect if not logged in
document.addEventListener("DOMContentLoaded", () => {
    if (!student) {
        document.getElementById("results").innerHTML = "<p>Please log in first.</p>";
        return;
    }
    loadTutors();
});

/* =========================
   LOAD TUTORS
========================= */
async function loadTutors() {
    const resultsBox = document.getElementById("results");
    resultsBox.innerHTML = "";

    if (!student.subjects || student.subjects.trim() === "") {
        document.getElementById("noSubjects").style.display = "block";
        return;
    }

    const subjectList = student.subjects
        .split(",")
        .map(s => s.trim().toLowerCase());

    let providers = [];

    try {
        const res = await fetch("http://localhost:8080/providers");
        providers = await res.json();
    } catch (err) {
        console.error(err);
        resultsBox.innerHTML = "<p>Error loading tutors.</p>";
        return;
    }

    const matching = providers.filter(p => {
        if (!p.subjects) return false;
        const tutorSubjects = p.subjects.toLowerCase();
        return subjectList.some(s => tutorSubjects.includes(s));
    });

    matching.forEach(tutor => {
        const card = document.createElement("div");
        card.className = "tutor-result-card";

        // Safe image handling
        let photo = "assets/img/tutor1.jpg";

        if (tutor.profilePic && tutor.profilePic.length > 50) {
            photo = tutor.profilePic.startsWith("data:image")
                ? tutor.profilePic
                : `data:image/png;base64,${tutor.profilePic}`;
        }

        card.innerHTML = `
            <div class="result-left">
                <img src="${photo}" class="tutor-photo">
            </div>

            <div class="result-mid">
                <h3 class="tutor-name">${tutor.name}</h3>
                <p><b>Bio:</b> ${tutor.bio || "No bio available"}</p>
                <p><b>Subjects:</b> ${tutor.subjects || ""}</p>

                <button class="btn small" onclick="loadReviews(${tutor.id})">View Reviews</button>
            </div>

            <div class="result-right" style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn primary" onclick="bookTutor(${tutor.id})">Book With Me</button>
                <button class="btn" onclick="openReviewModal(${tutor.id})">Leave a Review</button>
            </div>
        `;

        resultsBox.appendChild(card);
    });
}

/* =========================
   BOOKING
========================= */
function bookTutor(providerId) {
    const tutor = { id: providerId };
    localStorage.setItem("selectedProvider", JSON.stringify(tutor));
    window.location.href = "booking.html";
}

/* =========================
   REVIEW MODAL
========================= */
let activeProviderId = null;

function openReviewModal(providerId) {
    activeProviderId = providerId;
    document.getElementById("reviewModal").style.display = "flex";
}

function closeReviewModal() {
    document.getElementById("reviewModal").style.display = "none";
    document.getElementById("reviewRating").value = "";
    document.getElementById("reviewComment").value = "";
}


async function submitReview() {
    if (!student) {
        alert("You must be logged in.");
        return;
    }

    const rating = document.getElementById("reviewRating").value.trim();
    const comment = document.getElementById("reviewComment").value.trim();

    if (!rating || !comment) {
        alert("Please enter a rating and comment.");
        return;
    }

    const body = {
        rating: parseInt(rating),
        comment,
        provider: { id: activeProviderId },
        student: { id: student.id }   
    };

    console.log("Submitting review:", body);

    try {
        const res = await fetch("http://localhost:8080/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Server error:", errText);
            alert("Error submitting review.");
            return;
        }

        alert("Review submitted!");
        closeReviewModal();
        loadReviews(activeProviderId);

    } catch (err) {
        console.error(err);
        alert("Error submitting review.");
    }
}

/* =========================
   LOAD REVIEWS
========================= */
async function loadReviews(tutorId) {
    try {
        const res = await fetch(`http://localhost:8080/providers/${tutorId}/reviews`);
        const reviews = await res.json();

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
                            <p><b>Tutor Reply:</b> ${r.providerReply}</p>
                            <small>${r.replyDate || ""}</small>
                        </div>
                        `
                        : ""
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
    localStorage.removeItem("student");
    window.location.href = "login.html";
}
