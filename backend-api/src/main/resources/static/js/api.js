const API_BASE = "http://localhost:8080";



async function apiGet(url) {
    const res = await fetch(API_BASE + url);
    if (!res.ok) throw new Error("GET failed: " + url);
    return await res.json();
}

async function apiPost(url, body) {
    const res = await fetch(API_BASE + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("POST failed: " + url);
    return await res.json();
}

async function apiPut(url, body) {
    const res = await fetch(API_BASE + url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("PUT failed: " + url);
    return await res.json();
}

<<<<<<< HEAD
=======
/* ---------- API ENDPOINTS ---------- */
>>>>>>> ddb89de0683d5573afc5f9b588f492919a9e2b9a

const API = {

  

    getStudents: () => apiGet("/api/students"),
    getStudent: (id) => apiGet(`/api/students/${id}`),
    createStudent: (data) => apiPost("/api/students", data),
    updateStudent: (id, data) => apiPut(`/api/students/${id}`, data),


  

    getProviders: () => apiGet("/providers"),
    getProvider: (id) => apiGet(`/providers/${id}`),
    createProvider: (data) => apiPost("/providers", data),
    updateProvider: (id, data) => apiPut(`/providers/${id}`, data),


    

    createService: (providerId, data) =>
        apiPost(`/providers/${providerId}/services`, data),

    getServicesForProvider: (providerId) =>
        apiGet(`/providers/${providerId}/services`),

    getProviderStats: (providerId) =>
        fetch(`${API_BASE}/providers/${providerId}/stats`)
            .then(r => r.text()),


 

    getReviewsForProvider: (providerId) =>
        apiGet(`/providers/${providerId}/reviews`),

    
    createReview: (data) =>
        apiPost("/api/reviews", data),


    

    createBooking: (data) =>
        apiPost("/api/bookings", data),

    getBookings: () => apiGet("/api/bookings"),

    getBookingsForStudent: (studentId) =>
        apiGet(`/api/bookings?studentId=${studentId}`),

    getBookingsForProvider: (providerId) =>
        apiGet(`/api/bookings?providerId=${providerId}`),

    updateBookingStatus: (id, status) =>
        apiPut(`/api/bookings/${id}/status?status=${status}`)
};


<<<<<<< HEAD

=======
/* ---------- SESSION STORAGE ---------- */
>>>>>>> ddb89de0683d5573afc5f9b588f492919a9e2b9a

const Session = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        const raw = localStorage.getItem(key);
        try { return JSON.parse(raw); }
        catch { return raw; }
    },

    clear() {
        localStorage.clear();
    }
};