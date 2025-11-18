let dashboardId = null;

async function loadDashboard() 
{
    const providers = await apiGet("/providers");
    if (providers.length === 0) return;

    const p = providers[0];
    dashboardId = p.id;

    const stats = await apiGet(`/providers/${dashboardId}/stats`);
    document.getElementById("statsBox").textContent = stats;
}

document.getElementById("addServiceBtn").addEventListener("click", async () =>
     {
    const title = document.getElementById("svcTitle").value;
    const desc = document.getElementById("svcDesc").value;

    await apiPost(`/providers/${dashboardId}/services`,
         {
        title, description: desc
    });

    alert("Service added.");
});
