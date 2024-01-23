// alert('main javascript aa');
let standingPosition = document.querySelector('.standingperson');
let animal = document.querySelector('.enemy');
let cloud1 = document.querySelector('.cloud1')
let cloud2 = document.querySelector('.cloud2')
let gameover = document.querySelector('.gameover');
let scorecount = document.querySelector('.scorecount')




cloud1.classList.add('cloud1animation')
cloud2.classList.add('cloud2animation')

function jump(e) {
    if (e.code == "Space") {
        console.log('jump')
        standingPosition.classList.add('jumpMario');
        setTimeout(() => {
            standingPosition.classList.remove('jumpMario');

        }, 1000);

    }
}


document.addEventListener('keydown', jump) // jump


score = 0;
let game = true

function generate_random() {
    let num = 100* (Math.floor(Math.random() * (50 - 1) + 1));
    console.log(num);
    return num;
}

let delay = generate_random();

let min = 1;
let max = 5;

function create_animal() {
    if (game) {
        let rndm = (Math.floor(Math.random() * (max - min) + min));
        animal.classList.add('animation');
        animal.src = `images/enemy${rndm}.png`;
        // console.log(animal.src)
        setTimeout(remove_animal, 1200);
    }
}

function remove_animal() {
    animal.classList.remove('animation');
    animal.src = '';
    delay = generate_random();
}

setInterval(create_animal, delay);

let crossed = false;

setInterval(() => {
    if (animal.classList.contains('animation')) {

        dy = (window.getComputedStyle(
            standingPosition, null).transform.match(/(-?[0-9\.]+)/g));
        // match change to array value

        ox = -1 * parseInt(window.getComputedStyle(
            animal, null).transform.match(/(-?[0-9\.]+)/g)[4]);


        if ((ox > 700) && (ox < 900) && (dy == null)) {
            // console.log(ox, dy)
            terminate()
//         } else if ((ox > 700) && (ox < 900) && (dy != null) && (crossed == false)) {

//             // console.log("jump")
//             score += 100;
//             setTimeout(() => {
//                 crossed = true;
//             }, );
//             // console.log(score)
//             updateScore(score)

//         }
//     } else {
//         crossed = false;
//     }
// }, 10)
} else if ((ox > 700) && (ox < 900) && (dy != null)) {
    dy = -1 * parseInt(dy[5])
    console.log(dy)
    if (crossed == false) {
        if (dy > 60) {
            updateScore()
        } else {
            terminate()
        }
    }
}
else {
    crossed = false;
}
}
}, 10)



function updateScore() {
    crossed = true;
    score += 100;
    scorecount.innerHTML = "Your score : " + score;
}

function terminate() {
    console.log('Game Over')
    game = false;
    document.removeEventListener('keydown', jump)
    cloud1.classList.remove('cloud1animation')
    cloud2.classList.remove('cloud2animation')
    gameover.style.visibility = 'visible';
    gameover.classList.add('gameoveranimate')
    animal.classList.remove('animation');
    standingPosition.style.display = 'none';
    remove_animal();
    clearInterval(create_animal)
    clearInterval(updateScore)

}