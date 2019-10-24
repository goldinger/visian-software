import React from 'react';
import TaskColumn from './TaskColumn';
import PropTypes from 'prop-types';
import {
  Badge,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  Row,
  UncontrolledButtonDropdown,
} from 'reactstrap';

export default class TasksManagerComponent extends React.Component {
  state = {
    labelFilter: null,
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
      tasks: this.props.tasks.filter((task) =>
        (task.done === 0
          && task.taskstep === step
          && (!this.state.labelFilter || task.labels.map((label) => label.id).includes(this.state.labelFilter.id))
        ))
    };
    let done = {
      id: "done",
      done: 1,
      title: "Done",
      tasks: this.props.tasks.filter(task =>
        (task.done === 1
          && task.taskstep === step
          && (!this.state.labelFilter || task.labels.map((label) => label.id).includes(this.state.labelFilter.id))
        ))
    };
    let labels = [];
    this.props.tasks.forEach((task) => {
      task.labels.forEach((label) => {
        if (!labels.map((label) => label.id).includes(label.id)) {
          labels.push(label)
        }
      })
    });
    return (
      <Col style={{padding: 0}}>
        <div style={{marginBottom: 20}}>
          <InputGroup>
            <UncontrolledButtonDropdown>
              <DropdownToggle color="primary" caret>
                Filter Labels
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.setState({labelFilter: 'nolabel'})}>
                  <Badge pill style={{margin: 3}} color="link">No Label</Badge>
                </DropdownItem>
                {labels.map((label) =>

                  <DropdownItem onClick={() => this.setState({labelFilter: label})}>
                    <Badge pill style={{margin: 3, backgroundColor: label.color}}>{label.name}</Badge>
                  </DropdownItem>)}
                <DropdownItem divider />
                <DropdownItem onClick={() => this.setState({labelFilter: null})}>
                  Reset Filters
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
        </InputGroup>
          {this.state.labelFilter &&
          <Badge pill className='mr-1' style={{margin: 3, backgroundColor: this.state.labelFilter.color}}>{this.state.labelFilter.name}</Badge>}
        </div>
        <div style={{width: '100%', display: "flex", justifyContent: 'space-between'}}>
          <TaskColumn column={todo} tasks={todo.tasks} refreshTasks={this.props.refreshTasks}/>
          <div style={{width: 20}}/>
          <TaskColumn column={done} tasks={done.tasks} refreshTasks={this.props.refreshTasks}/>
        </div>
      </Col>
    )
  }
}

TasksManagerComponent.propTypes = {
  step: PropTypes.number
};
