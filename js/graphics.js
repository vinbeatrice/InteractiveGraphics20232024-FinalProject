import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

export let scene, camera, renderer, clock, controls;;

export function setupGraphics(){

    //create clock for timing
    clock = new THREE.Clock();

    //create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );

    //create camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.2, 5000 );
    camera.position.set( 0.043410593509671094, 61.23520142013793, 63.007309217169365);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    var cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    //Add hemisphere light
    let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.5 );
    hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
    hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    //Add directional light
    let dirLight = new THREE.DirectionalLight( 0xffffff , 1);
    
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.copy(camera.position);
    let target = new THREE.Vector3(0, 0, 0);
    dirLight.target.position.copy(target);
    scene.add(dirLight.target);
    scene.add( dirLight );

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048*2;
    dirLight.shadow.mapSize.height = 2048;

    let d = 200;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.bias=-0.004;
    dirLight.shadow.camera.far = 500;

    //Setup the renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xbfd1e5 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth - 300, window.innerHeight ); //to make space to the sidebar
    document.getElementById('scene-container').appendChild(renderer.domElement);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.enabled = true;

    //Controls
    controls = new OrbitControls(camera, renderer.domElement);




}
