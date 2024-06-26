import{rigidBodies} from './createDice.js';
import{controls} from './graphics.js';
import{tmpTrans} from './main.js'

export let physicsWorld;

export let masses = {
    mass_d4: 2.0,
    mass_d6: 1.5,
    mass_d8: 2.0,
    mass_d12: 2.5,
    mass_d20: 2.0
};

export let simulationParams = {
    maxSubSteps: 10
};

export let friction = {
    static_friction: 0.6,
    rolling_friction: 0.03
}

export function setupPhysicsWorld(){

    let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(), //Broadphase algorithm to use

        /*
        The broadphase algorithm uses bounding boxes of objects in the world to quickly compute an
        approximate list of colliding pairs. The list will include every pair of objects that are
        colliding, but it may also include pairs of objects whose bounding boxes intersect but are still not
        close enough to collide.
        */

        dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration), // allows to fine tune the algorithms used for the full collision detection
        
        overlappingPairCache = new Ammo.btDbvtBroadphase(),

        /*
        You can use the collision dispatcher to register a callback that filters overlapping broadphase
        proxies so that the collisions are not processed by the rest of the system.
        */

        solver = new Ammo.btSequentialImpulseConstraintSolver(); //causes the objects to interact properly, taking into account gravity, game logic supplied forces, collisions, and hinge constraints.

    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration); //This is the dynamic world

    physicsWorld.setGravity(new Ammo.btVector3(0, -9.81, 0)); //set the gravity

}


export function updatePhysics( deltaTime ){

    // Step world
    physicsWorld.stepSimulation( deltaTime, simulationParams.maxSubSteps );

    controls.update(deltaTime); //Required by OrbitControls

    // Update rigid bodies
    for ( let i = 0; i < rigidBodies.length; i++ ) {
        let objThree = rigidBodies[ i ];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if ( ms ) {

            ms.getWorldTransform( tmpTrans );
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set( p.x(), p.y(), p.z() );
            objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

        }
    }

}
