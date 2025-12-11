console.log("booking.js loaded");

// --------------------------------------
// Format readable date/time
// --------------------------------------
function formatDateTime(dt) {
    const date = new Date(dt);
    return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

// --------------------------------------
// Load student session
// --------------------------------------
let student = Session.get("student");
if (!student) window.location.href = "login.html";

// Load selected provider
let provider = Session.get("selectedProvider");
console.log("Loaded provider:", provider);

if (!provider || !provider.id) {
    alert("No tutor selected.");
    window.location.href = "find-tutor.html";
}


async function loadSlots() {
    try {
        const url = `http://localhost:8080/api/slots/provider/${provider.id}/open`;
        console.log("Fetching:", url);

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load slots");

        const slots = await res.json();
        console.log("Slots received:", slots);

        const select = document.getElementById("slotSelect");
        select.innerHTML = "";

        if (!slots.length) {
            const opt = document.createElement("option");
            opt.textContent = "No available time slots";
            opt.disabled = true;
            select.appendChild(opt);
            return;
        }

        slots.forEach(slot => {
            const opt = document.createElement("option");
            opt.value = slot.id;
            opt.textContent =
                `${formatDateTime(slot.startTime)} → ${formatDateTime(slot.endTime)}`;
            select.appendChild(opt);
        });

    } catch (err) {
        console.error("Error loading slots:", err);
        alert("Could not load available time slots.");
    }
}

loadSlots();

// --------------------------------------
// BOOKING CONFIRMATION
// --------------------------------------
document.getElementById("bookBtn").addEventListener("click", async () => {
    const slotId = document.getElementById("slotSelect").value;

    if (!slotId) {
        alert("Please select a time slot.");
        return;
    }

    const booking = {
        studentId: student.id,
        providerId: provider.id,
        slotId: Number(slotId),
        status: "pending"
    };

    try {
        console.log("Creating booking:", booking);
        await API.createBooking(booking);

        // Show confirmation box
        document.getElementById("confirmBox").style.display = "block";
        alert("Your session has been booked!");

    } catch (error) {
        console.error("Booking failed:", error);
        alert("Could not create booking.");
    }
});

// --------------------------------------
// LOGOUT
// --------------------------------------
function logout() {
    Session.clear();
    window.location.href = "login.html";
}
