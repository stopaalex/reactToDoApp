import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import './lib/normalize.css';

// --- import TodoList
// import TodoList from './TodoList';
import TodoInput from './TodoInput/TodoInput';
import TodoList from './TodoList/TodoList';
import TodoFilters from './TodoFilters/TodoFilters';

class App extends Component {

  constructor() {
    super();
    let items = [];
    let sort = 'new';
    if (window.localStorage.getItem('reactTodoSort')) {
      sort = JSON.parse(window.localStorage.getItem('reactTodoSort')).sort;
    }
    if (window.localStorage.getItem('reactTodo')) {
      if (window.localStorage.getItem('reactTodoSort')) {
        if (sort === 'priority') {
          items = JSON.parse(window.localStorage.getItem('reactTodo')).sort((a, b) => {
            return b.priority - a.priority;
          });
        } else if (sort === 'new') {
          items = JSON.parse(window.localStorage.getItem('reactTodo')).sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
          });
        } else if (sort === 'old') {
          items = JSON.parse(window.localStorage.getItem('reactTodo')).sort((a, b) => {
            return new Date(a.created) - new Date(b.created);
          });
        } else if (sort === 'inc') {
          items = JSON.parse(window.localStorage.getItem('reactTodo')).sort((a, b) => {
            // return new Date(a.created) - new Date(b.created);
            if (a.complete === b.complete) {
              return 0
            } else if (a.complete) {
              return 1
            } else {
              return -1
            }
          });
        } else {
          console.log('fuck');
        }
      }
    }
    this.state = {
      items: items,
      currentItem: { text: '', complete: false, key: '', crerated: '', priority: 0 },
      currentFilter: sort
    }
  }

  handleInput = e => {
    const itemText = e.target.value

    let keyid = '', characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 32; i++) {
      keyid += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const currentItem = { text: itemText, complete: false, key: keyid, created: new Date(), priority: 0 }
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
        currentItem: { text: '', complete: false, key: '', created: '', priority: 0 },
      });
    }
    let saveList = this.state.items;
    // this.sortItems(this.state.currentFilter);
    saveList.push(this.state.currentItem);
    window.localStorage.setItem('reactTodo', JSON.stringify(saveList));
  }

  toggleItem = e => {
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

  sortItems = e => {
    let filter = '';
    if (typeof e === 'string') {
      filter = e;
    } else {
      filter = e.target.value;
    }

    let sortedItems = this.state.items.sort((a, b) => {
      if (filter === 'new') {
        return new Date(b.created) - new Date(a.created);
      } else if (filter === 'old') {
        return new Date(a.created) - new Date(b.created);
      } else if (filter === 'priority') {
        return b.priority - a.priority;
      } else if (filter === 'inc') {
        if (a.complete === b.complete) {
          return 0
        } else if (a.complete) {
          return 1
        } else {
          return -1
        }
      } else {
        return
      }
    });
    this.setState({
      items: sortedItems,
      currentFilter: filter
    });
    window.localStorage.setItem('reactTodoSort', JSON.stringify({ sort: filter }));
  }

  updateSort = str => {
    this.sortItems(this.state.currentFilter);
  }

  changePriority = (key, dir) => {
    let updatedItems = this.state.items.map(i => {
      if (i.key === key) {
        if (dir === 'up') {
          i.priority += 1
        } else if (dir === 'down') {
          i.priority -= 1
        }
      }
      return i;
    });
    this.setState({
      items: updatedItems
    });
    window.localStorage.setItem('reactTodo', JSON.stringify(updatedItems));
  }

  render() {
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
        <div className="filters">
          <TodoFilters
            updateSort={this.updateSort}
            filter={this.state.currentFilter}
            inputElement={this.inputElement}
            sortItems={this.sortItems}
          />
        </div>
        <div className="list">
          <TodoList
            entries={this.state.items}
            deleteItem={this.deleteItem}
            toggleItem={this.toggleItem}
            changePriority={this.changePriority}
          />
        </div>

      </div>
    );
  }
}

export default App;
