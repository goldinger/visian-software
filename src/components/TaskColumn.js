import React from 'react'
import TaskCard from './Card/TaskCard';
import Droppable from './Dnd/Droppable';
import { Card, Col, CardHeader, CardBody} from 'reactstrap';

export default class Column extends React.Component {
  render() {
    return (
      <Col>
        <Card style={{height: '100%'}}>
          <CardHeader><h3 style={{'text-align': 'center'}}>{this.props.column.title}</h3></CardHeader>
          <CardBody style={{backgroundColor: '#E0E0E0', padding: '0px'}}>
            <Droppable id={this.props.column.id} onDrop={this.props.refreshTasks} done={this.props.column.done} style={{ padding: '10px', paddingBottom: '100px', width: '100%', height: '100%'}}>
              <div>
                {this.props.tasks.map((task) => <TaskCard task={task} key={task.id}/>)}
              </div>
            </Droppable>
          </CardBody>
        </Card>
      </Col>
    );
  }
}