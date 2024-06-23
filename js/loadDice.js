import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export let shapeD4, shapeD8, shapeD12, shapeD20;
export const loader = new GLTFLoader();


export function createConvexHullShape(mesh, scale_x, scale_y, scale_z) {
    let shape = new Ammo.btConvexHullShape();
    mesh.traverse(function (child) { //consider all the meshes of the model
        if (child.isMesh) {
            let geometry = child.geometry;
            if (!geometry.attributes.position) return; // Skip if no position attribute

            let vertices = geometry.attributes.position.array;
            let numVertices = geometry.attributes.position.count;
            //console.log(numVertices);
            
            let vertex = new Ammo.btVector3();
            for (let i = 0; i < numVertices; i++) {

                vertex.setValue(
                    vertices[i * 3] * scale_x,
                    vertices[i * 3 + 1] * scale_y,
                    vertices[i * 3 + 2] * scale_z
                );
                shape.addPoint(vertex);
            }
        }
    });
    return shape;
}

export function changeShape(sides, colshape){
    switch (sides) {
        case 4:
            shapeD4 = colshape;
            break;
        case 6:
            shapeD6 = colshape;
            break;
        case 8:
            shapeD8 = colshape;
            break;
        case 12:
            shapeD12 = colshape;
            break;
        case 20:
            shapeD20 = colshape;
            break;
        default:
            console.log(`No function to change shape of d${sides}`);
    }
    
}


export function loadD4(){
    //D4
    let pos = {x: 0, y: 20, z: 0};
    let scale = {x: 3.0, y: 3.0, z: 3.0};

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
                if (child.material.isMeshStandardMaterial) {
                    child.material.metalness = 0;
                } else if (child.material.isMeshPhysicalMaterial) {
                    child.material.metalness = 0;
                }
            }
        });

        let colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z); //Assign box ConvexHull shape
        shapeD4 = colShape;
        console.log("Done!");

    });
}


export function loadD8(){
    let pos = {x: 0, y: 20, z: 0};
    let scale = {x: 4, y: 4, z: 4.};
    //D8

    //Loaf GLTF model of the die
    loader.load('../obj/d8.glb', function (gltf) {
        console.log("Loading model d8...");
        var dice = gltf.scene;
        dice.scale.set(scale.x, scale.y, scale.z);
        dice.position.set(pos.x, pos.y, pos.z);
        dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);

        //Remove metalness of model (too dark otherwise)
        dice.traverse(function (child) {
            if (child.isMesh) {
                if (child.material.isMeshStandardMaterial) {
                    child.material.metalness = 0;
                } else if (child.material.isMeshPhysicalMaterial) {
                    child.material.metalness = 0;
                }
            }
        });

        let colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z); //Assign box ConvexHull shape
        shapeD8 = colShape;
        console.log("Done!");

    });
}


export function loadD12(){
    let pos = {x: 0, y: 20, z: 0};
    let scale = {x: 4.5, y: 4.5, z: 4.5};
    //D12

    //Loaf GLTF model of the die
    loader.load('../obj/d12.glb', function (gltf) {
        console.log("Loading model d12...");
        var dice = gltf.scene;
        dice.scale.set(scale.x, scale.y, scale.z);
        dice.position.set(pos.x, pos.y, pos.z);
        dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);

        //Remove metalness of model (too dark otherwise)
        dice.traverse(function (child) {
            if (child.isMesh) {
                if (child.material.isMeshStandardMaterial) {
                    child.material.metalness = 0;
                } else if (child.material.isMeshPhysicalMaterial) {
                    child.material.metalness = 0;
                }
            }
        });

        let colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z); //Assign box ConvexHull shape
        shapeD12 = colShape;
        console.log("Done!");

    });
}


export function loadD20(){
    let pos = {x: 0, y: 20, z: 0};
    let scale = {x: 4, y: 4, z: 4};

    //D20

    //Loaf GLTF model of the die
    loader.load('../obj/d20.glb', function (gltf) {
        console.log("Loading model d20...");
        var dice = gltf.scene;
        dice.scale.set(scale.x, scale.y, scale.z);
        dice.position.set(pos.x, pos.y, pos.z);
        dice.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 3);


        //Remove metalness of model (too dark otherwise)
        dice.traverse(function (child) {
            if (child.isMesh) {
                if (child.material.isMeshStandardMaterial) {
                    child.material.metalness = 0;
                } else if (child.material.isMeshPhysicalMaterial) {
                    child.material.metalness = 0;
                }
            }
        });


        let colShape = createConvexHullShape(dice, scale.x, scale.y, scale.z); //Assign box ConvexHull shape
        shapeD20 = colShape;
        console.log("Done!");

    });

}


export function loadShapes(){
    loadD4();

    loadD8();

    loadD12();

    loadD20();

}