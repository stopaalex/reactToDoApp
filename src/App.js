import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import './lib/normalize.css';

// --- import TodoList
// import TodoList from './TodoList';
import TodoInput from './TodoInput/TodoInput';
import TodoList from './TodoList/TodoList';

class App extends Component {

  constructor() {
    super();
    let items = [];
    if (window.localStorage.getItem('reactTodo')) {
      // console.log('test');
      items = JSON.parse(window.localStorage.getItem('reactTodo'));
    }
    this.state = {
      items: items,
      currentItem: {text: '', complete: false, key: ''}
    }
  }

  handleInput = e => {
    const itemText = e.target.value

    let keyid = '', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 32; i++ ) {
      keyid += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const currentItem = { text: itemText, complete: false, key: keyid}
    this.setState({
      currentItem,
    })
  }

  addItem = e => {
    e.preventDefault()
    const newItem = this.state.currentItem
    if (newItem.text !== '') {
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', complete: false, key: '' },
      });
    }
    let saveList = this.state.items;
    saveList.push(this.state.currentItem);
    window.localStorage.setItem('reactTodo', JSON.stringify(saveList));
  }

  toggleItem = e => {
    console.log(e);
    let updateItems = this.state.items.map(i => {
      if (i.key === e) {
        i.complete = !i.complete;
        return i;
      }
      return i;
    });
    this.setState({
      items: updateItems
    });
    window.localStorage.setItem('reactTodo', JSON.stringify(updateItems));
  }

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key
    });
    this.setState({
      items: filteredItems
    });
    window.localStorage.setItem('reactTodo', JSON.stringify(filteredItems));
  }

  render () {
    return (
      <div className="App">

        <div className="input">
          <TodoInput
            addItem={this.addItem}
            inputElement={this.inputElement}
            handleInput={this.handleInput}
            currentItem={this.state.currentItem}
          />
        </div>
        <div className="list">
          <TodoList
            entries={this.state.items}
            deleteItem={this.deleteItem}
            toggleItem={this.toggleItem}
          />
        </div>

      </div>
    );
  }
}

export default App;
