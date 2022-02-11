import * as React from 'react'; 
import ItemList from './Components/ItemList';
import Gun from 'gun';

import gun from '../Connection/P2P';
import _ from 'lodash';

const newNote = {id: '', title: '', text:''};

class Test extends React.Component {
  constructor() {
    super()
    this.gun = gun;
    this.notesRef = gun.get('testdave');
    
    this.state = { notes: [], currentId: ''};
  }

  componentWillMount() {
    let notes = this.state.notes;
    const self = this;
    this.gun.get('testdave').on((n) => {
      var idList = _.reduce(n['_']['>'], function(result, value, key) {
        if(self.state.currentId === '') {
          self.setState({currentId: key});
        }

        let data = { id: key, date: value};
        self.gun.get(key).on((note, key) => {
          const merged = _.merge(data, _.pick(note, ['title', 'text']));
          const index = _.findIndex(notes, (o)=>{ return o.id === key});
          if(index >= 0) {
            notes[index] = merged;
          }else{
            notes.push(merged);
          }
          self.setState({notes});
        })  
      }, []);
    })
  }

  newNoteBtnClick () {
    this.setState({currentId: ''});
  }

  itemClick (event) {
    this.setState({currentId: event.target.id});
  }

  getCurrentNote() {
    const index = _.findIndex(this.state.notes, (o) => { return o.id === this.state.currentId});
    const note = this.state.notes[index] || newNote;
    return note;
  }

  getNoteItem(note) {
    return (<li key={note.id} id={note.id} onClick={this.itemClick.bind(this)}>
      {note.title}
    </li>)
  }

  onSaveClick(data) {
    const note = _.pick(data, ['title', 'text']);
    if(data.id !== '') {
      this.gun.get(data.id).put(note);  
    }else{
      this.notesRef.set(this.gun.put(note))
    }
  }

  render() {
    this.getCurrentNote = this.getCurrentNote.bind(this);
    return (
      <div>
		  <ul>
		  {this.state.notes.map(this.getNoteItem.bind(this))}
		  </ul>
	  </div>
	);
	}
}

export default Test;