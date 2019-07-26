import React from 'react'
import TaskCard from './Card/TaskCard';
import Droppable from './Dnd/Droppable';
export default class Column extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.column.title}</h3>
        <Droppable id={this.props.column.id} style={{backgroundColor: '#555', width: '250px', height: '400px', margin: '32px'}}>
          <div>
              {this.props.tasks.map((task, index) => <TaskCard task={task} key={task.id} index={index}/>)}
            </div>
        </Droppable>
      </div>
    );
  }
}