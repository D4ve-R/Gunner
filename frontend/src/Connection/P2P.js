import Gun from 'gun';
import 'gun/sea';
//import 'gun/axe';

const gun = Gun({
	peers: ['http://localhost:8765/gun']
});

export default gun;