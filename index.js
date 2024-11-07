const progressBar = document.getElementById('progress-bar');

document.addEventListener("DOMContentLoaded", fetchJSONData());
document.addEventListener("DOMContentLoaded", setProgressBarWidth());

var jsonObj = [];

function fetchJSONData() {
    fetch('dodgersPlayers.json')
        .then((res) => {
            if (!res.ok) {
                throw new Error ('Error!');
            }
            return res.json();
        })
        .then((data) => {
            jsonObj = data;
            console.log(jsonObj)
        })
        .catch(err => {
            console.error('Error ' + err);
        })
}

function setProgressBarWidth() {

    let currentEarnings = 2000000;
    let contractTotal = 70000000;

    let styleWidth = (currentEarnings / contractTotal) * 100;
    progressBar.style.width = styleWidth.toString() + "%";
}
