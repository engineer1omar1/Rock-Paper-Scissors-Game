const resultDiv = document.querySelector(".result");
const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const buttons = document.querySelectorAll(".buttons button")
const matchHistoryElement = document.querySelector(".match-history");

const choice = ["rock", "paper", "scissors"];
const images = {
    rock: "images/rock_hand.svg",
    paper: "images/paper_hand.svg",
    scissors: "images/scissors_hand.svg"
}

function playGame(selectChoice) {
    // Update Images Player Choice
    playerChoice.src = images[selectChoice];

    // Button Is Not Disabled
    toggleButton(false);

    // Suffle SetInerval
    let setIntervalShuffle = setInterval(() => {
        let randomChoice = choice[Math.floor(Math.random() * choice.length)];
        computerChoice.src = images[randomChoice];
    }, 100);

    // Suffle SetTimeout
    setTimeout(() => {
        let selectComputer = choice[Math.floor(Math.random() * choice.length)];
        computerChoice.src = images[selectComputer];

        let result = getResult(selectChoice, selectComputer);
        resultDiv.innerHTML = result;

        clearInterval(setIntervalShuffle)
        saveResult(selectChoice, selectComputer, result);
        displayHistoryMathes();
    }, 2000);

    // Suffle SetTimeout
    setTimeout(() => {
        playerChoice.src = "images/player_choose.svg"
        computerChoice.src = "images/computer_random.svg";
        resultDiv.innerHTML = ""

        // Button Is Disabled
        toggleButton(true);
    }, 4000);
}

function getResult(player, computer) {
    if (player === computer) return "Lose";

    if (
        player === "rock" && computer === "scissors" ||
        player === "paper" && computer === "rock" ||
        player === "scissors" && computer === "paper" 
    ) {
        return "Win"
    } else {
        return "Lose"
    }
}

function saveResult(player, computer, result) {
    const matchHistory = JSON.parse(localStorage.getItem("mathes")) || [];

    matchHistory.push({player, computer, result});
    
    if (matchHistory.length > 10) {
        matchHistory.shift();
    }

    localStorage.setItem("mathes", JSON.stringify(matchHistory))
}

function toggleButton(state) {
    buttons.forEach((button) => {
        button.disabled = !state;
        button.style.opacity = state ? "1" : "0.5";
    })
}

function displayHistoryMathes() {
    const matchHistory = JSON.parse(localStorage.getItem("mathes")) || [];
    const historyContainer = document.querySelector(".match-history");
    const resetContainer = document.querySelector(".reset-container");

    if (matchHistory.length === 0) return;

    const winCount = matchHistory.filter((match) => match.result === "Win").length;
    const loseCount = matchHistory.filter((match) => match.result === "Lose").length;
    const drawCount = matchHistory.filter((match) => match.result === "Draw").length;

    console.log(winCount)
    console.log(loseCount)
    console.log(drawCount)

    let table = `
            <table>
            <caption>Match History</caption>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Your Choice</th>
                        <th>Computers Choice</th>
                        <th>Result</th>
                    </tr>
                </thead>
            <tbody>
        `
        
    matchHistory.forEach((match, index) => {
        table += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${match.player}</td>
                    <td>${match.computer}</td>
                    <td>${match.result}</td>
                </tr>
        `
    })
    table += `
            </tbody>
        </table>
    `
    historyContainer.innerHTML = table;
    historyContainer.innerHTML += `
        <div class="state">
            <div class="win">Win <span>${winCount}</span></div>
            <div class="lose">Lose <span>${loseCount}</span></div>
            <div class="draw">Draw <span>${drawCount}</span></div>
        </div>
    `
    resetContainer.innerHTML = `<button class="reset-btn" id="reset-btn">Reset Score</button>`;
    document.getElementById("reset-btn").addEventListener("click", () => {
        localStorage.clear();
        location.reload()
    })
}   

document.addEventListener("DOMContentLoaded", displayHistoryMathes);