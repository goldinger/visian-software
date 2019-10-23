import React from 'react';
import TaskColumn from './TaskColumn';
import PropTypes from 'prop-types';
import { Badge, Col, Row } from 'reactstrap';

export default class TasksManagerComponent extends React.Component {
  state = {
    columns: {
      column1: {
        id: 'column1',
        title: 'To do',
        taskIds: ['task1', 'task2', 'task3']
      },
      column2: {
        id: 'column2',
        title: 'Done',
        taskIds: []
      }
    },
    columnOrder: ['column1', 'column2']
  };

  componentWillMount() {
    this.props.refreshTasks()
  }

  render() {
    let step = this.props.step;
    let todo = {
      id: "todo",
      done: 0,
      title: "To-Do",
      tasks: this.props.tasks.filter((task) => (task.done === 0 && task.taskstep === step))
    };
    let done = {
      id: "done",
      done: 1,
      title: "Done",
      tasks: this.props.tasks.filter(task => (task.done === 1 && task.taskstep === step))
    };
    let labels = [];
    this.props.tasks.filter(task => task.taskstep === step).forEach((task) => {
      task.labels.forEach((label) => {
        if (labels.indexOf(label) < 0) {
          labels.push(label)
        }
      })
    });
    return (
      <Col>
        <Row style={{padding: "32px", textAlign: "center"}}>{labels.map((label) => <Badge pill style={{margin: 3}} color={label.color}>{label.name}</Badge>)}</Row>
        <Row style={{width: '100%', padding: "32px", display: "flex", "justify-content": "center"}}>
          <TaskColumn column={todo} tasks={todo.tasks} refreshTasks={this.props.refreshTasks}/>
          <TaskColumn column={done} tasks={done.tasks} refreshTasks={this.props.refreshTasks}/>
          {/*{this.state.columnOrder.map(columnId => {*/}
          {/*  const column = this.state.columns[columnId];*/}
          {/*  const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);*/}
          {/*  return <TaskColumn key={column.id} column={column} tasks={tasks}/>*/}
          {/*})}*/}
        </Row>
      </Col>
    )
  }
}

TasksManagerComponent.propTypes = {
  step: PropTypes.number
};
