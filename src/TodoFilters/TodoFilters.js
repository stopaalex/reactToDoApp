import React, { Component } from 'react';

import './TodoFilters.css';

class TodoFilters extends Component {

    render() {

        return <div>
                   <div className="label">Sort By:</div>
                   <select ref={this.props.inputElement} onChange={this.props.sortItems} value={this.props.filter}>
                       <option value="new" defaultValue>Recently Created</option>
                       <option value="old">Oldest First</option>
                       <option value="priority">Priority</option>
                       <option value="inc">Incompleted</option>
                   </select>
                   <button className="update" onClick={this.props.updateSort}>Update</button>
               </div>
    }
}

export default TodoFilters;