import React from 'react'
import Draggable from '../Dnd/Draggable';

export default class TaskCard extends React.Component {
  render() {
    return (
      <Draggable id={this.props.task.id}>
        <h3>{this.props.task.content}</h3>
      </Draggable>
    )
  }
}