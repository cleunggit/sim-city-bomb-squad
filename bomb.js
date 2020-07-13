console.log('loaded!');

// create a variable to store timer and interval
let time, interval

// create a function to initialize the game
const initGame = () => {    
    // clear any previous timers
    clearInterval(interval)
    // initialize the timer for 30 seconds
    time = 30
    interval = setInterval(tick, 1000) // tick every second
    // add click wire event handlers
    // TODO: function to handle clicks
    addWireClicks()

    document.getElementById('start').textContent = 'restart'
    document.getElementsByTagName('body')[0].classList.remove('exploded')
    document.getElementsByTagName('body')[0].classList.add('unexploded')
    document.getElementById('message').textContent = ""

}

// create a timer function
const tick = () => {
    console.log('tick', time)
    time -=1
    document.getElementById('timer').textContent = time
    // if time is less than or equal to 0, lose game
    if (time === 10) {
        document.getElementById('timer').style.color = 'crimson'
    } else if (time <=0) {
        loseGame()
    }
}

// create a function to handle wire clicks
const addWireClicks = () => {
    // get all the wire images
    let wireImages = document.querySelectorAll('.box img')
    // loop through each wire
    for (let i = 0; i < wireImages.length; i++) {
        // for each image, add the event listener when clicked and envoke the cutWire function
        wireImages[i].addEventListener('click', cutWire)
        // TODO: create cutWire function

        // decide whether wire should be cut
        let shouldBeCut = (Math.random() > 0.5).toString() // true or false
        wireImages[i].setAttribute('data-cut', shouldBeCut)
        console.log(wireImages[i])
        // ensure the uncut images
        wireImages[i].src = `/img/uncut-${wireImages[i].id}-wire.png`
    }
    
}   

// create a function to remove wire clicks
const removeWireClicks = () => {
    let wireImages = document.querySelectorAll('.box img')

    for (let i = 0; i < wireImages.length; i++) {
        wireImages[i].removeEventListener('click', cutWire)
    }
}
// create a function to cut the wire
const cutWire = (e) => {
    // change the image to cut
    e.target.src = `/img/cut-${e.target.id}-wire.png`
    // remove the event listener
    e.target.removeEventListener('click', cutWire)
    // determine if the wire is good
    if (e.target.getAttribute('data-cut') === 'true') {
        e.target.setAttribute('data-cut', 'false')

        if (checkWin()) {
            winGame()
        }
    }
    else {
        loseGame()
    }
}


const checkWin = () => {
    let wireImages = document.querySelectorAll('.box img')

    for (let i = 0; i < wireImages.length; i++) {
        if (wireImages[i].getAttribute('data-cut') === 'true') {
            return false
        }
    }
    return true
}

const endGame = (message) => {
    clearInterval(interval)

    document.getElementById('start').textContent = "play again"
    document.getElementById('message').textContent = message

    removeWireClicks()
}

const winGame = () => {
    endGame('BOMB DEFUSED')
}

const loseGame = () => {
    endGame("YOU FAILED")

    document.getElementsByTagName('body')[0].classList.remove('unexploded')
    document.getElementsByTagName('body')[0].classList.add('exploded')

}

document.getElementById('start').addEventListener('click', initGame)
