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

    const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
                                 },
                        body: form,
                        })
    const postData = await response.json();

    if(response.ok) {
        displayErrors(postData)
    }else{
        throw new Error(postData.error);
    }
}

function displayErrors(data) {

    let errorHeading = `JSHint Results for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div class="No-errors">No errors reposrted.</div>`
    }else{
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`

        for (let error of data.error_list) {
            console.log(error)
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `coloumn <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }

        document.getElementById("resultsModalTitle").innerHTML = errorHeading;
        document.getElementById("results-content").innerHTML = results;
        resultsModal.show()
    }
}

