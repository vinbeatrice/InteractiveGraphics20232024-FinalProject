import * as THREE from 'three';
import{scene} from './graphics.js';
import {physicsWorld} from './physics.js';



//Creation of rigid static platforms
function createFloor(){
    
    let pos = {x: 0, y: 0, z: 0};
    let scale = {x: 90, y: 2, z: 90};
    let quat = {x: 0, y: 0, z: 0, w: 1};
    let mass = 0; // So that the platform remains static (no effect of gravity)
    

    //Threejs Section
    let blockPlane = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshPhongMaterial({color: 0xc0c0c0}));

    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);

    //blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;

    scene.add(blockPlane);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) ); //Assign box collision shape
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( mass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );


    body.setFriction(2);
    body.setRollingFriction(1);


    physicsWorld.addRigidBody( body );
}

function createWallR(){

    // Crea la "parete"
    let wallPos = {x: 46, y: 2, z: 0};
    let scale = {x: 90, y: 2, z: 90};
    let wallRotation = {x: 0, y: 0, z: Math.PI / 2};

    let wallMass = 0;

    //Threejs Section
    
    let blockWall = new THREE.Mesh(
        new THREE.BoxGeometry(scale.x, scale.y, scale.z),
        new THREE.MeshPhongMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.0,
            shininess: 50,
            refractionRatio: 0.98
        })
    );


    blockWall.position.set(wallPos.x, wallPos.y, wallPos.z);
    blockWall.rotation.set(wallRotation.x, wallRotation.y, wallRotation.z);


    scene.add(blockWall);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( wallPos.x, wallPos.y, wallPos.z ) );

    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(new THREE.Euler(wallRotation.x, wallRotation.y, wallRotation.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));

    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) ); //Assign box collision shape
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( wallMass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( wallMass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );


    body.setFriction(0.5);
    body.setRollingFriction(0.3);


    physicsWorld.addRigidBody( body );

}


function createWallL(){

    let wallPos = {x: -46, y: 2, z: 0};
    let scale = {x: 90, y: 2, z: 90};
    let wallRotation = {x: 0, y: 0, z: Math.PI / 2};

    let wallMass = 0;

    //Threejs Section
    
    let blockWall = new THREE.Mesh(
        new THREE.BoxGeometry(scale.x, scale.y, scale.z),
        new THREE.MeshPhongMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.0,
            shininess: 50,
            refractionRatio: 0.98
        })
    );


    blockWall.position.set(wallPos.x, wallPos.y, wallPos.z);
    blockWall.rotation.set(wallRotation.x, wallRotation.y, wallRotation.z);


    scene.add(blockWall);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( wallPos.x, wallPos.y, wallPos.z ) );

    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(new THREE.Euler(wallRotation.x, wallRotation.y, wallRotation.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));

    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) ); //Assign box collision shape
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( wallMass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( wallMass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );


    body.setFriction(0.5);
    body.setRollingFriction(0.3);


    physicsWorld.addRigidBody( body );


}


function createWallF(){

    let wallPos = {x: 0, y: 2, z: -46};
    let scale = {x: 90, y: 2, z: 90};
    let wallRotation = {x: Math.PI / 2, y: 0, z: 0};
    let wallMass = 0;

    //Threejs Section
    
    let blockWall = new THREE.Mesh(
        new THREE.BoxGeometry(scale.x, scale.y, scale.z),
        new THREE.MeshPhongMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.0,
            shininess: 50,
            refractionRatio: 0.98
        })
    );


    blockWall.position.set(wallPos.x, wallPos.y, wallPos.z);
    blockWall.rotation.set(wallRotation.x, wallRotation.y, wallRotation.z);


    scene.add(blockWall);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( wallPos.x, wallPos.y, wallPos.z ) );

    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(new THREE.Euler(wallRotation.x, wallRotation.y, wallRotation.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));

    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) ); //Assign box collision shape
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( wallMass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( wallMass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );


    body.setFriction(0.5);
    body.setRollingFriction(0.3);


    physicsWorld.addRigidBody( body );


}


function createWallB(){

    let wallPos = {x: 0, y: 2, z: 46};
    let scale = {x: 90, y: 2, z: 90};
    let wallRotation = {x: Math.PI / 2, y: 0, z: 0};
    let wallMass = 0;

    //Threejs Section
    
    let blockWall = new THREE.Mesh(
        new THREE.BoxGeometry(scale.x, scale.y, scale.z),
        new THREE.MeshPhongMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.0,
            shininess: 50,
            refractionRatio: 0.98
        })
    );


    blockWall.position.set(wallPos.x, wallPos.y, wallPos.z);
    blockWall.rotation.set(wallRotation.x, wallRotation.y, wallRotation.z);


    scene.add(blockWall);


    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( wallPos.x, wallPos.y, wallPos.z ) );

    let quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(new THREE.Euler(wallRotation.x, wallRotation.y, wallRotation.z));
    transform.setRotation(new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));

    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) ); //Assign box collision shape
    colShape.setMargin( 0.05 );

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( wallMass, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( wallMass, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );


    body.setFriction(0.5);
    body.setRollingFriction(0.3);


    physicsWorld.addRigidBody( body );


}

export function createEnvironment(){
    createFloor();
    createWallR();
    createWallL();
    createWallF();
    createWallB();
}