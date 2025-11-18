let providerId = null;

async function loadProvider()
 {
    const providers = await apiGet("/providers");

    if (providers.length === 0) return;

    const p = providers[0]; 
    providerId = p.id;

    document.getElementById("provName").value = p.name;
    document.getElementById("provEmail").value = p.email;
    document.getElementById("provBio").value = p.bio;
    document.getElementById("provSubjects").value = p.subjects;
}

document.getElementById("saveProvider").addEventListener("click", async () =>
     {
    const name = document.getElementById("provName").value;
    const email = document.getElementById("provEmail").value;
    const bio = document.getElementById("provBio").value;
    const subjects = document.getElementById("provSubjects").value;

    if (providerId == null) 
        {
        await apiPost("/providers", 
            {
            name, email, bio, subjects
        });
    } else {
        await apiPut(`/providers/${providerId}`,
             {
            name, email, bio, subjects
        });
    }

    alert("Provider saved.");
});
