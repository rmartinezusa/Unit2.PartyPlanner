const COHORT = "2408-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

// ===== State =====
//let events = [];
const state = {
    events: [],
  };

// GET 
// render
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
// render

// DELETE



// ===== Render =====

function renderEvents() {

    /*if (!events.length) {
        events.innerHTML = `
          <td>No parties near you :(</td>
        `;
        return;
      }*/

    const events = state.events.map((event) => {
        const td = document.createElement("tr");
        td.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td><button>Delete</button></td>
        `;
        return td;
    });
    const tr = document.querySelector("tr");
    tr.replaceChildren(...events);
}



// ===== Script =====


async function render() {
    await getEvents();
    renderEvents();
}
//render()


