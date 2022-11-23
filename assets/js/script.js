const API_KEY = "r9RkzBKKlTCouPW0B-BG5k4ICkU";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();

    if(response.ok) {
        displayStatus(data)
    }else{
        throw new Error(data.error);
    }
}

function displayStatus(data) {

    let modalHeading = "API Key Status";
    let modalBody = `<div>API Key Status</div>`
    modalBody += `<div>${data.expiry}</div>`

    document.getElementById("resultsModalTitle").innerHTML = modalHeading;
    document.getElementById("results-content").innerHTML = modalBody;

    resultsModal.show()
}

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    for (let entry of form.entries()) {
        console.log(entry)
    }
}

