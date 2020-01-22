import React, { Component } from 'react';

class TodoInput extends Component {

    // componentDidUpdate() {
    //     this.props.inputElement.current.focus()
    //   }

    render () {
        return (
            <div className="todo-input-main">

                <div className="input-content">
                    <form onSubmit={this.props.addItem}>
                        <input
                            id="input"
                            ref={this.props.inputElement}
                            value={this.props.currentItem.text}
                            onChange={this.props.handleInput}
                            required
                        />
                        <label htmlFor="input">New Task</label>
                        <button type="submit">Add Task</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default TodoInput