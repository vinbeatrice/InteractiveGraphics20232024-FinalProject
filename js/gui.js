import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import{masses, friction, simulationParams} from './physics.js';

const gui = new GUI();

//Physics Folders
const physicsFolder = gui.addFolder('Physics Parameters');
physicsFolder.add(simulationParams, 'maxSubSteps', 1, 20).name('Max Sub Steps');
physicsFolder.add(friction, 'static_friction', 0.1, 1).name('Dice Static Friction');
physicsFolder.add(friction, 'rolling_friction', 0.01, 0.5).name('Dice Rolling Friction');
physicsFolder.close();

//D4 Folders
const d4Folder = gui.addFolder('D4 Parameters');
d4Folder.add(masses, 'mass_d4', 0, 5).name('Mass');
d4Folder.close();

//D6 Folders
const d6Folder = gui.addFolder('D6 Parameters');
d6Folder.add(masses, 'mass_d6', 0, 5).name('Mass');
d6Folder.close();

//D8 Folders
const d8Folder = gui.addFolder('D8 Parameters');
d8Folder.add(masses, 'mass_d8', 0, 5).name('Mass');
d8Folder.close();

//D12 Folders
const d12Folder = gui.addFolder('D12 Parameters');
d12Folder.add(masses, 'mass_d12', 0, 5).name('Mass');
d12Folder.close();

//D20 Folders
const d20Folder = gui.addFolder('D20 Parameters');
d20Folder.add(masses, 'mass_d20', 0, 5).name('Mass');
d20Folder.close();
