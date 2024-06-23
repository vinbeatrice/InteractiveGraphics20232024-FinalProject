import * as THREE from 'three';
import {loader, shapeD4, shapeD8, shapeD12, shapeD20, createConvexHullShape, changeShape} from './loadDice.js';
import {physicsWorld, masses, friction} from './physics.js';
import{scene} from './graphics.js';
import {diceArray} from './rollDice.js';


export let rigidBodies = []; //collection for all three.js mesh that has an associated physics object and that should be updated at each render loop




export function createD6() {
    return new Promise((resolve, reject) => { //necessary to wait the model to be loaded before throwing the die
        let pos = {x: 0, y: 20, z: 0};
        let scale = {x: 2.0, y: 2.0, z: 2.0};
        let quat = {x: 0, y: 0, z: 0, w: 1};

        //Loaf GLTF model of the die
        loader.load('../obj/d6.glb', function (gltf) {
            console.log("Loading model d6...");
            var dice = gltf.scene;
            dice.scale.set(scale.x, scale.y, scale.z);
            dice.position.set(pos.x, pos.y, pos.z);
            dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);


            //Remove metalness of model (too dark otherwise)
            dice.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material.isMeshStandardMaterial) {
                        child.material.metalness = 0;
                    } else if (child.material.isMeshPhysicalMaterial) {
                        child.material.metalness = 0;
                    }
                }
            });

            scene.add(dice);

            // Ammo.js Section
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            let motionState = new Ammo.btDefaultMotionState(transform);

            let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x, scale.y, scale.z)); //Assign box collision shape
            colShape.setMargin(0.05);

            let localInertia = new Ammo.btVector3(0, 0, 0);
            colShape.calculateLocalInertia(masses.mass_d6, localInertia);

            let rbInfo = new Ammo.btRigidBodyConstructionInfo(masses.mass_d6, motionState, colShape, localInertia);
            let body = new Ammo.btRigidBody(rbInfo);

            body.setFriction(friction.static_friction);
            body.setRollingFriction(friction.rolling_friction);

            physicsWorld.addRigidBody(body);

            dice.userData.physicsBody = body;
            rigidBodies.push(dice);
            diceArray.push({ mesh: dice, body: body });//used for function clear

            resolve(dice);
        }, undefined, function (error) {
            console.error(error);
            reject(error); //Reject promise in case of error
        });
    });
}

export function createD4(){
    return new Promise((resolve, reject) => { //necessary to wait the model to be loaded before throwing the die
        let pos = {x: 0, y: 20, z: 0};
        let scale = {x: 3.0, y: 3.0, z: 3.0};
        let quat = {x: 0, y: 0, z: 0, w: 1};

        //Loaf GLTF model of the die
        loader.load('../obj/d4.glb', function (gltf) {
            console.log("Loading model d4...");
            var dice = gltf.scene;
            dice.scale.set(scale.x, scale.y, scale.z);
            dice.position.set(pos.x, pos.y, pos.z);
            dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);


            //Remove metalness of model (too dark otherwise)
            dice.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material.isMeshStandardMaterial) {
                        child.material.metalness = 0;
                    } else if (child.material.isMeshPhysicalMaterial) {
                        child.material.metalness = 0;
                    }
                }
            });

            scene.add(dice);

            // Ammo.js Section
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            let motionState = new Ammo.btDefaultMotionState(transform);

            let colShape;
            if(shapeD4 == null){
                colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z);
                changeShape(4, colShape);
            }
            else{
                colShape = shapeD4;
            }
            
            colShape.setMargin(0.04);

            let localInertia = new Ammo.btVector3(0, 0, 0);
            colShape.calculateLocalInertia(masses.mass_d4, localInertia);

            let rbInfo = new Ammo.btRigidBodyConstructionInfo(masses.mass_d4, motionState, colShape, localInertia);
            let body = new Ammo.btRigidBody(rbInfo);

            body.setFriction(friction.static_friction);
            body.setRollingFriction(friction.rolling_friction);

            physicsWorld.addRigidBody(body);

            dice.userData.physicsBody = body;
            rigidBodies.push(dice);
            diceArray.push({ mesh: dice, body: body });//used for function clear

            resolve(dice);
        }, undefined, function (error) {
            console.error(error);
            reject(error); //Reject promise in case of error
        });
    });
}


export function createD8() {
    return new Promise((resolve, reject) => {
        let pos = { x: 0, y: 20, z: 0 };
        let scale = { x: 4, y: 4, z: 4 };
        let quat = { x: 0, y: 0, z: 0, w: 1 };

        // Load GLTF model of the die
        loader.load('../obj/d8.glb', function (gltf) {
            console.log("Loading model d8...");

            var dice = gltf.scene;
            dice.scale.set(scale.x, scale.y, scale.z);
            dice.position.set(pos.x, pos.y, pos.z);
            dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);


            dice.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.isMesh) {
                    if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                        child.material.metalness = 0;
                    }
                }
            });

            scene.add(dice);

            // Ammo.js Section
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            let motionState = new Ammo.btDefaultMotionState(transform);

            let colShape;

            if(shapeD8 == null){
                colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z);
                changeShape(8, colShape);
            }
            else{
                colShape = shapeD8;
            }

            colShape.setMargin(0.03);

            let localInertia = new Ammo.btVector3(0, 0, 0);
            colShape.calculateLocalInertia(masses.mass_d8, localInertia);

            let rbInfo = new Ammo.btRigidBodyConstructionInfo(masses.mass_d8, motionState, colShape, localInertia);
            let body = new Ammo.btRigidBody(rbInfo);

            body.setFriction(friction.static_friction);
            body.setRollingFriction(friction.rolling_friction);

            physicsWorld.addRigidBody(body);

            dice.userData.physicsBody = body;
            rigidBodies.push(dice);
            diceArray.push({ mesh: dice, body: body });

            resolve(dice);
        }, undefined, function (error) {
            console.error(error);
            reject(error);
        });
    });
}


export function createD12() {
    return new Promise((resolve, reject) => {
        let pos = { x: 0, y: 20, z: 0 };
        let scale = { x: 4.5, y: 4.5, z: 4.5 };
        let quat = { x: 0, y: 0, z: 0, w: 1 };

        // Load GLTF model of the die
        loader.load('../obj/d12.glb', function (gltf) {
            console.log("Loading model d12...");

            var dice = gltf.scene;
            dice.scale.set(scale.x, scale.y, scale.z);
            dice.position.set(pos.x, pos.y, pos.z);
            dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);


            dice.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                        child.material.metalness = 0;
                    }
                }
            });

            scene.add(dice);

            // Ammo.js Section
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            let motionState = new Ammo.btDefaultMotionState(transform);

            let colShape;
            if(shapeD12 == null){
                colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z);
                changeShape(12, colShape);
            }
            else{
                colShape = shapeD12;
            }

            colShape.setMargin(0.06);

            let localInertia = new Ammo.btVector3(0, 0, 0);
            colShape.calculateLocalInertia(masses.mass_d12, localInertia);

            let rbInfo = new Ammo.btRigidBodyConstructionInfo(masses.mass_d12, motionState, colShape, localInertia);
            let body = new Ammo.btRigidBody(rbInfo);

            body.setFriction(friction.static_friction);
            body.setRollingFriction(friction.rolling_friction);

            physicsWorld.addRigidBody(body);

            dice.userData.physicsBody = body;
            rigidBodies.push(dice);
            diceArray.push({ mesh: dice, body: body });

            resolve(dice);
        }, undefined, function (error) {
            console.error(error);
            reject(error);
        });
    });
}


export function createD20(){
    return new Promise((resolve, reject) => {
        let pos = { x: 0, y: 20, z: 0 };
        let scale = { x: 4, y: 4, z: 4 };
        let quat = { x: 0, y: 0, z: 0, w: 1 };

        // Load GLTF model of the die
        loader.load('../obj/d20.glb', function (gltf) {
            console.log("Loading model d20...");

            var dice = gltf.scene;
            dice.scale.set(scale.x, scale.y, scale.z);
            dice.position.set(pos.x, pos.y, pos.z);
            dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);

            dice.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                        child.material.metalness = 0;
                    }
                }
            });

            scene.add(dice);

            // Ammo.js Section
            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            let motionState = new Ammo.btDefaultMotionState(transform);

            let colShape;
            if(shapeD20 == null){
                colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z);
                changeShape(20, colShape);
            }
            else{
                colShape = shapeD20;
            }

            colShape.setMargin(0.03);

            let localInertia = new Ammo.btVector3(0, 0, 0);
            colShape.calculateLocalInertia(masses.mass_d20, localInertia);

            let rbInfo = new Ammo.btRigidBodyConstructionInfo(masses.mass_d20, motionState, colShape, localInertia);
            let body = new Ammo.btRigidBody(rbInfo);

            body.setFriction(friction.static_friction);
            body.setRollingFriction(friction.rolling_friction);

            physicsWorld.addRigidBody(body);

            dice.userData.physicsBody = body;
            rigidBodies.push(dice);
            diceArray.push({ mesh: dice, body: body });

            resolve(dice);
        }, undefined, function (error) {
            console.error(error);
            reject(error);
        });
    });
}


//Creation of cube
function createCube(){
    
    let pos = {x: 0, y: 20, z: 0};
    let scale = {x: 4, y: 4, z: 4};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 1.5;

    //Threejs Section
    let g = new THREE.BoxGeometry(scale.x, scale.y, scale.z);
    let colors = [];
    let c = new THREE.Vector3();
    let uv = [];
    for(let i = 0; i < 20;i++){
        c.random().multiplyScalar(0.5).addScalar(0.5);
        colors.push(c.x, c.y, c.z, c.x, c.y, c.z, c.x, c.y, c.z);
    uv.push(
        (0 + i) / 20, 1,
        (1 + i) / 20, 1,
        (0 + i) / 20, 0,
        (1 + i) / 20, 0
    );
    }
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

    let m = new THREE.MeshPhongMaterial({shininess: 1000, vertexColors: false, map: makeNumbers()});
    let cube = cubeObject = new THREE.Mesh(g, m);
    cube.position.set(pos.x, pos.y, pos.z);
    cube.rotation.set(Math.PI/4, Math.PI/2, Math.PI/3);

    cube.castShadow = true;
    cube.receiveShadow = true;

    scene.add(cube);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z*0.5) ); //Assign box collision shape
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    body.setFriction(friction.static_friction);
    body.setRollingFriction(friction.rolling_friction);

    physicsWorld.addRigidBody( body );
    
    cube.userData.physicsBody = body;
    rigidBodies.push(cube);
    dice.push({ mesh: cube, body: body }); //used for function clear
}

//D6 texture
function makeNumbers(){
    let c = document.createElement("canvas");
    c.width = 1024;
    c.height = 64;
    let ctx = c.getContext("2d");
    ctx.fillStyle = "#00b300";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalAlpha = 0.8;
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.font = 'bold 40px Arial';
    let step = 1024 / 20;
    let start = step * 0.5;
  
  for (let i = 0; i < 6; i++){
  	ctx.fillText(i + 1, start + step * i, 32);
  }
  
  return new THREE.CanvasTexture(c);
}