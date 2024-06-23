import{createD4, createD6, createD8, createD12, createD20} from './createDice.js';
import {physicsWorld} from './physics.js';
import{scene} from './graphics.js';
import{masses, gravity, friction} from './physics.js';




export let diceArray = [];


//Handle text input
export function parseAndRollDice() {
    const input = document.getElementById("dice_input").value;
    const dicePattern = /(\d*)d(\d+)/g;
    let match;
    while ((match = dicePattern.exec(input)) !== null) {
        const count = parseInt(match[1]) || 1;
        const sides = parseInt(match[2]);
        rollDice(sides, count);
    }
}

export function rollDice(sides, count) {
    for (let i = 0; i < count; i++) {
        switch (sides) {
            case 4:
                rolld4();
                break;
            case 6:
                rolld6();
                break;
            case 8:
                rolld8();
                break;
            case 12:
                rolld12();
                break;
            case 20:
                rolld20();
                break;
            default:
                console.log(`No function to roll d${sides}`);
        }
    }
}


//Functions for event listeners
export function rolld4(){
    createD4().then(dice => {
        throwDice(dice);
    });
}

export function rolld6(){
    createD6().then(dice => {
        throwDice(dice);
    });
}

export function rolld8(){
    createD8().then(dice => {
        throwDice(dice);
    });
}

export function rolld12(){
    createD12().then(dice => {
        throwDice(dice);
    });
}

export function rolld20(){
    createD20().then(dice => {
        throwDice(dice);
    });
}



export async function clear() {
    for (let i = 0; i < diceArray.length; i++) {
        //Remove cube from scene
        scene.remove(diceArray[i].mesh);
        
        //Remove cube from physics world
        physicsWorld.removeRigidBody(diceArray[i].body);
    }
    
    //Empty dice array
    diceArray = [];
}


function throwDice(dice_type){
    let physicsBody;
    
    physicsBody = dice_type.userData.physicsBody;

    let random, force, torque;

    //Apply random central force

    let force_x, force_y, force_z;

    random = Math.random() < 0.5 ? -1 : 1;
    force_x = (Math.floor(Math.random() * (500 - 50 + 1)) + 50) * random;

    random = Math.random() < 0.5 ? -1 : 1;
    force_y = (Math.floor(Math.random() * (-900 + 500 + 1)) - 500); //don't multiply because it must be throw down

    random = Math.random() < 0.5 ? -1 : 1;
    force_z = (Math.floor(Math.random() * (500 - 50 + 1)) + 50) * random;
    
    force = new Ammo.btVector3(force_x, force_y, force_z);
    
    physicsBody.applyCentralForce(force);

    //console.log("force_x: ", force_x, "force_y: ", force_y, "force_z: ", force_z);


    //Apply a rotational force

    let torque_x, torque_y, torque_z;

    random = Math.random() < 0.5 ? -1 : 1;
    torque_x = (Math.floor(Math.random() * (750 - 300 + 1)) + 300) * random;

    random = Math.random() < 0.5 ? -1 : 1;
    torque_y = (Math.floor(Math.random() * (750 - 300 + 1)) + 300) * random;

    random = Math.random() < 0.5 ? -1 : 1;
    torque_z = (Math.floor(Math.random() * (750 - 300 + 1)) + 300) * random;

    //console.log("torque_x: ", torque_x, "torque_y: ", torque_y, "torque_z: ", torque_z);

    torque = new Ammo.btVector3(torque_x, torque_y, torque_z);

    physicsBody.applyTorque(torque);
    
    //console.log('Riepilogo: ' + masses, gravity, friction);
}