let spots = [];
let counter = 0;
let running = false;
for (let i = 0; i < 5; i++) {
    let hole = document.createElement('div');
    hole.className = "hole";
    spots.push(hole);
    getById(i).append(hole)
    hole.addEventListener('click', hit, false)
}

getById(10).addEventListener("click", toggle);


function hit(event) {
    if (!running) {
        return;
    }
    let id = event.target.parentElement.id;

    console.log('id is: ' + id);
    let mole = getById(id);
    if (mole.classList.contains('mole')) {
        addToCounter();
        removeTarget();
    }
}

function addToCounter() {
    counter++
    document.getElementsByClassName("score")[0].innerText = 'score: ' + counter;
}

function toggle() {
    if (!running) {
        running = true;
        getById(10).innerText = "stop";
        document.getElementsByClassName('gameover')[0].innerText = "Good luck!";
        document.getElementsByClassName("score")[0].innerText = 'score: ' + counter;
        whack();
    }
    else {
        running = false;
        getById(10).innerText = "start";
        document.getElementsByClassName('gameover')[0].innerText = "Game over!";
    }
}

function whack() {
    if (running) {
        if(removeTarget()){
            toggle();
            return;
        }
        pickTarget();
        setTimeout(whack, Math.random() * 3000 + 500);
    }
}


function removeTarget() {
    let old = document.getElementsByClassName("mole")[0];
    if (old != null) {
        old.classList.remove('mole');
        return true;
    }
    return false;
}

function pickTarget() {
    let id = Math.floor(Math.random() * spots.length);

    let target = getById(id);
    if (target == null) {
        console.log("error. chosen field is null! Id:" + id);
        return;
    }
    target.classList.add('mole')
}

function getById(id) {
    return document.getElementById(id);
}