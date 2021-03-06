import React, { Component } from 'react';

import './TodoList.css'

class TodoList extends Component {

    createTask = item => {

        if (!item.complete) {
        return  <div className="item"
                     key={item}>
                    <div className="toggle complete"
                         onClick={() => this.props.toggleItem(item.key)}></div>
                    <div className="priority-wrapper">
                        <div onClick={() => this.props.changePriority(item.key,'up')} className="priority up">^</div>
                        {item.priority}
                        <div onClick={() => this.props.changePriority(item.key,'down')} className="priority down">^</div>
                    </div>
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
                    <div className="priority-wrapper">
                        <div onClick={() => this.props.changePriority(item.key,'up')} className="priority up">^</div>
                        {item.priority}
                        <div onClick={() => this.props.changePriority(item.key,'down')} className="priority down">^</div>
                    </div>
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
        let listItems = <div></div>;

        if (todoEntries.length > 0) {
            listItems = todoEntries.map(this.createTask);
        } else {
            listItems = <div className="no-tasks">No tasks found, create one!</div>
        }

        return <div className="the-list">
                {listItems}
               </div>
    }

}

export default TodoList