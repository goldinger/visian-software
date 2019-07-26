import React from 'react';
import TaskColumn from './TaskColumn';

export default class TasksManagerComponent extends React.Component {
  state = {
    tasks: {
      task1: { id: 'task1', content: 'hello1' },
      task3: { id: 'task3', content: 'hello3' },
      task2: { id: 'task2', content: 'hello2' }
    },
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

  render() {
    return (
      <div style={{width: '100%', padding: "32px", display: "flex", "justify-content": "center"}}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
          return <TaskColumn key={column.id} column={column} tasks={tasks}/>
        })}
      </div>
    )
  }
}