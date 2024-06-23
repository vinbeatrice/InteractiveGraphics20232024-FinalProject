
import {loadShapes} from './loadDice.js';
import { setupPhysicsWorld, updatePhysics} from './physics.js';
import{scene, camera, renderer, clock, setupGraphics} from './graphics.js';
import{createEnvironment} from './environment.js';
import {parseAndRollDice, rolld4, rolld6, rolld8, rolld12, rolld20, clear} from './rollDice.js';
import './gui.js';

//variable declaration
export let tmpTrans; //for temporary ammo.js transform object


//Ammojs Initialization
Ammo().then( start )
            
function start(){

    tmpTrans = new Ammo.btTransform();

    setupPhysicsWorld();
    setupGraphics();
    createEnvironment();
    renderFrame();

}


//Loop function
function renderFrame(){

    let deltaTime = clock.getDelta();

    updatePhysics( deltaTime );

    renderer.render( scene, camera );

    requestAnimationFrame( renderFrame );

}



//Event Listeners
document.addEventListener("DOMContentLoaded", loadShapes);

document.getElementById("d4_btn").addEventListener("click", rolld4);
document.getElementById("d6_btn").addEventListener("click", rolld6);
document.getElementById("d8_btn").addEventListener("click", rolld8);
document.getElementById("d12_btn").addEventListener("click", rolld12);
document.getElementById("d20_btn").addEventListener("click", rolld20);

document.getElementById("clear_btn").addEventListener("click", clear);

document.getElementById("roll_btn").addEventListener("click", parseAndRollDice);




