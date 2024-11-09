import data from './dodgersPlayers.json' with {type: "json"};

const earnings = document.getElementById('currentEarnings');
const remaining = document.getElementById('remainingContract');
const progressBar = document.getElementById('progress-bar');

const playerName = document.getElementById('player-name');

const dollar = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

var selectedPlayer;
var averageSalary;

document.addEventListener("DOMContentLoaded", onPageLoad());

function onPageLoad() {
    setPlayer();
    setProgressBarWidth();
    setStatEarnings();
    setStats();
}

function setPlayer() {
    selectedPlayer = data.players.filter(player => {
        return player.name === "Shohei Ohtani";
    })

    averageSalary = selectedPlayer[0].earnings['annual-avg'];

    playerName.innerHTML = "Shohei Ohtani";
}

function setProgressBarWidth() {

    let currentEarnings = calcCurrentEarnings(averageSalary, diffYears(selectedPlayer[0].contract['start-year']));

    earnings.innerHTML = dollar.format(currentEarnings);

    let contractTotal = selectedPlayer[0].contract.salary;
    let leftOver = contractTotal - currentEarnings;
    remaining.innerHTML = dollar.format(leftOver);

    let styleWidth = (currentEarnings / contractTotal) * 100;
    progressBar.style.width = styleWidth.toString() + "%";
}

function setStatEarnings() {

    let currentEarnings = calcCurrentEarnings(averageSalary, diffYears(selectedPlayer[0].contract['start-year']));

    document.getElementById('hits').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.hits));
    document.getElementById('at-bats').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats['at-bats']));
    document.getElementById('home-runs').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats['home-runs']));

    document.getElementById('rbi').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.rbis));
    document.getElementById('runs').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.runs));
    document.getElementById('fwar').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.fwar));

    document.getElementById('bwar').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.bwar));
    document.getElementById('games').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.games));
    document.getElementById('so').innerHTML = dollar.format(currentEarnings / (selectedPlayer[0].stats.strikeouts));
}

function setStats() {
    document.getElementById('total-hits').innerHTML = selectedPlayer[0].stats.hits;
    document.getElementById('total-ab').innerHTML = selectedPlayer[0].stats["at-bats"];
    document.getElementById('total-hr').innerHTML = selectedPlayer[0].stats["home-runs"];

    document.getElementById('total-rbi').innerHTML = selectedPlayer[0].stats.rbis;
    document.getElementById('total-runs').innerHTML = selectedPlayer[0].stats.runs;
    document.getElementById('total-fwar').innerHTML = selectedPlayer[0].stats.fwar;

    document.getElementById('total-bwar').innerHTML = selectedPlayer[0].stats.bwar;
    document.getElementById('total-games').innerHTML = selectedPlayer[0].stats.games;
    document.getElementById('total-so').innerHTML = selectedPlayer[0].stats.strikeouts;
}

function calcCurrentEarnings(avg, years) {
    return avg * years;
}

function diffYears(year) {
    let currentYear = new Date().getFullYear();

    return (currentYear - year === 0 ? 1 : currentYear - year);
}
