function checkForWinner() {
    let possibleSolutions = [
        ["00", "01", "02"],
        ["10", "11", "12"],
        ["20", "21", "22"],
        ["00", "10", "20"],
        ["01", "11", "21"],
        ["02", "12", "22"],
        ["00", "11", "22"],
        ["02", "11", "20"]
    ]

    let solutionIndex = possibleSolutions.findIndex(possibleSolution => 
        document.querySelector(`#board [data-position="${possibleSolution[0]}"]`).dataset.value != "0" &&
        document.querySelector(`#board [data-position="${possibleSolution[0]}"]`).dataset.value === document.querySelector(`#board [data-position="${possibleSolution[1]}"]`).dataset.value &&
        document.querySelector(`#board [data-position="${possibleSolution[0]}"]`).dataset.value === document.querySelector(`#board [data-position="${possibleSolution[2]}"]`).dataset.value
    )

    if(solutionIndex < 0 && document.querySelectorAll(`#board td[data-value="0"]`).length < 1) {
        setTimeout( () => {
            alert("Tie.")
        })
        return
    }
    if(solutionIndex < 0) return

    document.querySelectorAll("#board td[data-position]").forEach(elem => {
        elem.removeEventListener("click", addMarker)
    })

    let solution = possibleSolutions[solutionIndex]
    setTimeout( (solution) => {
        solution.forEach( position => {
            document.querySelector(`#board [data-position="${position}"]`).dataset.winningAnimation = true
        })
    }, 200, solution)

    setTimeout( (winnerHtml) => {
        alert(`${winnerHtml} won.`)
    }, 1500, document.querySelector(`#board [data-position="${solution[0]}"]`).innerHTML)
}

function reset() {
    document.querySelectorAll("#board td[data-position]").forEach(elem => {
        elem.innerHTML = ""
        elem.dataset.value = "0"
        delete elem.dataset.winningAnimation
        elem.addEventListener("click", addMarker)
    })
    document.querySelector("#setup").dataset.turn = "A"
    document.querySelector("#player-next").innerHTML = document.querySelector("#player-A").innerHTML
}

function addMarker(e) {
    let value = document.querySelector("#setup").dataset.turn

    e.target.dataset.value                           = value
    e.target.innerHTML                               = value == "A" ? document.querySelector("#player-A").innerHTML : document.querySelector("#player-B").innerHTML
    document.querySelector("#player-next").innerHTML = value == "A" ? document.querySelector("#player-B").innerHTML : document.querySelector("#player-A").innerHTML
    document.querySelector("#setup").dataset.turn    = value == "A" ? "B" : "A"

    checkForWinner()
}

const dialog = document.querySelector("dialog");
document.querySelector("#dialog-close").addEventListener("click", e => {
    dialog.close()
    reset()
})
function alert(html) {
    document.querySelector("#dialog-text").innerHTML = html
    dialog.showModal()
}

reset()
