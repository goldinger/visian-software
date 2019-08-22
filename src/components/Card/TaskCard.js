import React from 'react'
import Draggable from '../Dnd/Draggable';
import { Button, Card, CardBody, CardHeader, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class TaskCard extends React.Component {
  state = {
    modalOpened: false,
  };

  toggle = () => {
    this.setState({modalOpened: !this.state.modalOpened});
  };

  render() {
    return (
      <div>
        <Draggable id={this.props.task.id} style={{marginBottom: '10px', cursor: 'grab'}}>
          <Card>
            <CardHeader style={{display: "flex", flexDirection: 'row', 'justify-content': 'space-between'}}>
              <h5>{this.props.task.tasktitle}</h5>
              <Button
                block
                outline
                color="info"
                onClick={this.toggle}
                style={{width: '120px'}}
              >Documents</Button>
            </CardHeader>
            <CardBody>{this.props.task.taskdescription}</CardBody>
          </Card>

        </Draggable>
        <Modal
          isOpen={this.state.modalOpened}
          toggle={this.toggle}
          backdrop>
          <ModalHeader toggle={this.toggle}>
            {this.props.task.tasktitle}
          </ModalHeader>
          <ModalBody>
            {this.props.task.documents.map(({name, source}, index) => (
              <div><Button onClick={() => window.open(source)} color="secondary">
                {name}
              </Button>
                <br />
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
      </div>

    )
  }
}