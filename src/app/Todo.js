import React, { Component } from 'react';
import { doesNotReject } from 'assert';


class TodoItem extends Component {
  render(){
    const { done, title, handleCompleted, idx } = this.props;
    return(
      <li onClick={() => handleCompleted(idx)} className={done ? "checked":""}>
        {title}
      </li>
    );
  }
}

export class Todo extends Component {
  constructor(){
    super();
    this.state = {
      items: [
        {
          title: "Create Trello",
          done: false
        },
        {
          title: "Create Slack",
          done: false
        }
      ],
      value: ''
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const newState = {items: [...this.state.items, {title: this.state.value, done: false}], value: ""};
    this.setState(newState);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleCompleted(idx){
    let items = this.state.items, updates = this.state.items[idx]; 
    updates.done = !updates.done;
    items[idx] = updates;
    this.setState({items});
  }

  render() {
    const doneCt = this.state.items.reduce((acc, cur)=>{cur.done && ++acc;return acc},0);
    return (
      <div style={{boxSizing: 'border-box'}}>
        <div id="myDIV" className="header">
          <h2>My To Do List</h2>
          <span><p>Completed: {doneCt}/{this.state.items.length} {(doneCt == this.state.items.length) && (<strong>YAAAYY!!!</strong>)}</p></span>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input id="myInput" type="text" name="name" value={this.state.value} onChange={this.handleChange.bind(this)} placeholder={"ToDo..."} />
            <input type="submit" className="addBtn" value="Add" />
          </form>
          
        </div>
        <ul id="myUL">
          {
            this.state.items.map((item, idx) => <TodoItem key={idx}  {...item} idx={idx} handleCompleted={this.handleCompleted.bind(this)}/>)
          }
        </ul>
      </div>
    );
  }
}
