import React, { Component } from 'react';

class TodoItems extends Component {
    
    createTask = item => {
        return  <div className="item"
                     key={item}>
                    {item.text}
                    <div className="delete"
                         onClick={() => this.props.deleteItem(item.key)}>
                        x
                    </div>
                </div>
    }

    render () {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTask);

        return <div className="the-list">{listItems}</div>
    }

}

export default TodoItems