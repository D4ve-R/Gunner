import Gun from 'gun';

Gun.chain.getApp = function(key){
    let gun = this;
    if(typeof field === 'string'){
        if(key.length <= 0){
            return gun.chain()._.err = {err: Gun.log('0 length string')}
        }
        return gun.get(key);
    }
    if(Array.isArray(key)){
        let len = key.length;
        if(len === 0) {
            gun = gun.chain()._.err = {err: Gun.log('0 length string')};
        }
        else if(len > 1){
            for(let i = 0; i < len; ++i){
                gun = gun.get(key[i]);
            }
        } 
        else {
            gun = gun.get(key[0]);
        }
        return gun;
    }
    return gun.chain()._.err = {err: Gun.log('get key must be of type string|Array<string>')}
}
