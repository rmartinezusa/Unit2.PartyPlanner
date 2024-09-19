const COHORT = "2408-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

// ===== State =====
//let events = [];
const state = {
    events: [],
  };

// GET 
async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;

    } catch(err) {
        console.error(err);
    }
}

// POST 
async function postEvent(event) {
    console.log(JSON.stringify(event));
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event),
        });

        if(!response.ok){
            const responseObj = await response.json();
            throw new Error(responseObj.error.message);
        }
        
    } catch (err) {
        console.error(err);
    }
}

// DELETE
async function deleteEvent(id) {
    try {
        const response = await fetch(API_URL + id, {
            method: "DELETE",
        });
        if (!response.ok) {
            const responseObj = await response.json();
            throw new Error(responseObj.error.message);
        }
    } catch (err) {
        console.error(err);
    }
}

// ===== Render =====
function renderEvents() {
    const events = state.events.map((event) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td><button>Delete</button></td>
        `;

        const button = tr.querySelector("button");
        button.addEventListener("click", async () => {
            await deleteEvent(event.id);
            await getEvents();
            renderEvents();
        });

        return tr;
    });
    const table = document.querySelector("tbody");
    table.replaceChildren(...events);
}

// ===== Script =====
async function render() {
    await getEvents();
    renderEvents();
}
render()

const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const eventObj = {
        name: form.name.value,
        description: form.description.value,
        date: new Date(form.date.value).toISOString(),
        location: form.location.value
    };

    await postEvent(eventObj);
    await getEvents();
    renderEvents();
});
