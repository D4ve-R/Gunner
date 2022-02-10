import Gun from 'gun';
require('gun/sea');

const gun = Gun({
	peers: ['http://localhost:8765/gun']
});

export default gun;