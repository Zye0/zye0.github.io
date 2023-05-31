// gets the width and height of the container
const containerX = document.getElementById('background-items').clientWidth;
const containerY = document.getElementById('background-items').clientHeight;
const container = document.getElementById('background-items'); // background  container
let rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // gets the root font size
console.log(rootSize);
// calculate the cable width and height as a percent of the container

const cableWidthPercentX = (rootSize/containerX) * 100; // width of the cable, as a percent.
const cableWidthPercentY = (rootSize/containerY) * 100; // height of the cable, as a percent.

const xPositions = [];
const yPositions = [];

// generates random number between 0 and max
function ranNum(max) {
    return Math.floor(Math.random() * max);
}

// checks if an array contains a value within a certain range
function withinRange(array, value, range) {
    for (let i = 0; i < array.length; i++) {
        if (Math.abs(array[i] - value) <= range) {
            return true;
        }
    }
    return false;
}

function ranAnimation(animationName) {
    let delay = ranNum(1000);
    let duration = ranNum(5) + 10;
    let direction = ranNum(4);

    switch(direction) {
        case 0:
            direction = 'normal';
            break;
        case 1:
            direction = 'reverse';
            break;
        case 2:
            direction = 'alternate';
            break;
        case 3:
            direction = 'alternate-reverse';
            break;
    }
    return `${animationName} ${duration}s ${delay}ms linear infinite ${direction}`
}

// gets random, unique x-value
function ranXPos(xPositions, range, inverse, amount) {
    let x = ranNum(100); // generates random x-value
    if (x < 5) x += 5; // +5 if too close to left
    if (x > 95) x -= 5; // -5 if too close to right

    if (inverse) x = 100 - x; // if right side, reverse x-value

    console.log(`Init value: ${x}`);

    let negX = x; // 

    // gets unique x-value 
    while(true) { 
        // checks if x-value already exists
        if (!withinRange(xPositions, x, range) && !withinRange(xPositions, (x + amount), range)) {
            if (x > 100) x = negX; // fixes bug where if too high or low, may be in same spot
            console.log(`x: ${x} is not in ${xPositions}`)
            break;
        } else if (!withinRange(xPositions, negX, range) && !withinRange(xPositions, (negX + amount), range)) {
            if (x < 0) negX = x;
            console.log(`negX: ${negX} is not in ${xPositions}`)
            x = negX;
            break;
        }
        // if both x-values already exist, increment and decrement
        console.log(`x: ${x}, negX: ${negX} are both in ${xPositions}`);
        x++;
        negX--;
    }

    xPositions.push(x);
    xPositions.push(x + amount);

    console.log(xPositions);

    if (inverse) x = 100 - x; // un-reverse x-value

    return x;
}

// gets random, unique y-value
function ranYPos(yPositions, range, inverse, amount) {
    let y = ranNum(100); // generates random y-value
    if (y < 5) y += 5; // +5 if too close to top
    if (y > 95) y -= 5; // -5 if too close to bottom

    if (inverse) y = 100 - y; // if bottom side, reverse y-value

    console.log(`Init value: ${y}`);


    let negY = y; // 

    // gets unique y-value 
    while(true) { 
        // checks if y-value already exists
        if (!withinRange(yPositions, y, range) && !withinRange(yPositions, (y + amount), range)) {
            if (y > 100) y = negY; // fixes bug where if too high or low, may be in same spot
            console.log(`y: ${y} is not in ${yPositions}`)
            break;
        } else if (!withinRange(yPositions, negY, range) && !withinRange(yPositions, (negY + amount), range)) {
            if (y < 0) negY = y;
            console.log(`negY: ${negY} is not in ${yPositions}`)
            y = negY;
            break;
        }
        // if both y-values already exist, increment and decrement
        console.log(`y: ${y}, negY: ${negY} are both in ${yPositions}`)
        y++;
        negY--;
    }


    yPositions.push(y);
    yPositions.push(y + amount);
    console.log(yPositions);

    if (inverse) y = 100 - y; // un-reverse y-value

    return y;
}



for (let i = 0; i < 10; i++) {
    let num = ranNum(6);

    let div = document.createElement('div');
    div.classList.add('cable');
    div.id = `cable-${i}`;

    let innerDiv = document.createElement('div');
    innerDiv.classList.add('inner')    

    switch(num) {
        case 0: // left, curve up
            console.log('left, curve up' + i);
            
            div.classList.add('cable-curve-top-left');

            div.style.width = `${ranXPos(xPositions, 3, false, -cableWidthPercentX)}%`;
            div.style.height = `${ranYPos(yPositions, 3, false, -cableWidthPercentY)}%`;

            innerDiv.style.animation = `${ranAnimation('traverse-curve-top-left')}`;
            break;
        case 1: // left, curve down
            console.log('left, curve down' + i);

            div.classList.add('cable-curve-bottom-left');

            div.style.width = `${ranXPos(xPositions, 3, false, -cableWidthPercentX)}%`;
            div.style.height = `${ranYPos(yPositions, 3, true, cableWidthPercentY)}%`;

            innerDiv.style.animation = `${ranAnimation('traverse-curve-bottom-left')}`;
            break;
        case 2: // right, curve up
            console.log('right, curve up' + i);

            div.classList.add('cable-curve-top-right');

            div.style.width = `${ranXPos(xPositions, 3, true, cableWidthPercentX)}%`;
            div.style.height = `${ranYPos(yPositions, 3, false, -cableWidthPercentY)}%`;

            innerDiv.style.animation = `${ranAnimation('traverse-curve-top-right')}`;
            break;
        case 3: // right, curve down
            console.log('right, curve down' + i);

            div.classList.add('cable-curve-bottom-right');

            div.style.width = `${ranXPos(xPositions, 3, true, cableWidthPercentX)}%`;
            div.style.height = `${ranYPos(yPositions, 3, true, cableWidthPercentY)}%`;

            innerDiv.style.animation = `${ranAnimation('traverse-curve-bottom-right')}`;
            break;
        case 4: // horizontal
            console.log('horizontal' + i);

            div.classList.add('cable-across');
            div.classList.add('cable-horizontal');

            div.style.width = '100%';
            div.style.height = '1.5rem';

            div.style.top = `${ranYPos(yPositions, 3, false, cableWidthPercentY)}%`;

            innerDiv.style.animation = `${ranAnimation('traverse-horizontal')}`;
            break;
        case 5: // vertical
            console.log('vertical' + i);

            div.classList.add('cable-across');
            div.classList.add('cable-vertical');

            div.style.height = '100%';
            div.style.width = '1.5rem';

            div.style.left = `${ranXPos(xPositions, 3, false, cableWidthPercentX)}%`;

            innerDiv.style.animation = `${ranAnimation('traverse-vertical')}`;
            break;
    }
    container.appendChild(div);
    div.appendChild(innerDiv);
}



   



