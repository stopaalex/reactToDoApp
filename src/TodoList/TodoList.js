import React, { Component } from 'react';

class TodoList extends Component {
    
    createTask = item => {

        if (!item.complete) {
        return  <div className="item"
                     key={item}>
                    <div className="toggle complete"
                         onClick={() => this.props.toggleItem(item.key)}></div>
                    {item.text}
                    <div className="delete"
                         onClick={() => this.props.deleteItem(item.key)}>
                        x
                    </div>
                </div>
        } else {
        return  <div className="item complete"
                     key={item}>
                    <div className="toggle incomplete"
                         onClick={() => this.props.toggleItem(item.key)}></div>
                    {item.text}
                    <div className="delete"
                         onClick={() => this.props.deleteItem(item.key)}>
                        x
                    </div>
                </div>
        }

    }

    checkCompletion = item => {

    }

    render () {
        const todoEntries = this.props.entries;
        const listItems = todoEntries.map(this.createTask);

        return <div className="the-list">{listItems}</div>
    }

}

export default TodoList