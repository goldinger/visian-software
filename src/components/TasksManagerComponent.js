import React from 'react';
import TaskColumn from './TaskColumn';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

export default class TasksManagerComponent extends React.Component {
  state = {
    tasks: [],
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

  refreshTasks() {
    let component = this;
    fetch('https://visian-api.sghir.me/projects/1')
      .then((response) => response.json())
      .then((responseJson) => {
        component.setState({tasks: responseJson});
      })
      .catch((error) => {console.error(error);});
  }

  componentWillMount() {
    this.refreshTasks()
  }

  render() {
    let step = this.props.step;
    let todo = {
      id: "todo",
      done: 0,
      title: "To-Do",
      tasks: this.state.tasks.filter((task) => (task.done === 0 && task.taskstep === step))
    };
    let done = {
      id: "done",
      done: 1,
      title: "Done",
      tasks: this.state.tasks.filter(task => (task.done === 1 && task.taskstep === step))
    };
    return (
      <Row style={{width: '100%', padding: "32px", display: "flex", "justify-content": "center"}}>
        <TaskColumn column={todo} tasks={todo.tasks} refreshTasks={this.refreshTasks.bind(this)}/>
        <TaskColumn column={done} tasks={done.tasks} refreshTasks={this.refreshTasks.bind(this)}/>
        {/*{this.state.columnOrder.map(columnId => {*/}
        {/*  const column = this.state.columns[columnId];*/}
        {/*  const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);*/}
        {/*  return <TaskColumn key={column.id} column={column} tasks={tasks}/>*/}
        {/*})}*/}
      </Row>
    )
  }
}

TasksManagerComponent.propTypes = {
  step: PropTypes.number
};
