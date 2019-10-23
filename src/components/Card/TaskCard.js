import React from 'react'
import Draggable from '../Dnd/Draggable';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import {MdNote} from 'react-icons/md';

export default class TaskCard extends React.Component {
  state = {
    modalOpened: false,
    noteModalOpened: false,
    piformOpened: false,
  };

  toggle = () => {
    this.setState({modalOpened: !this.state.modalOpened});
  };

  toggleNote = () => {
    this.setState({noteModalOpened: !this.state.noteModalOpened});
  };

  togglePiform = () => {
    this.setState({piformOpened: !this.state.piformOpened});
  };

  setNote() {
    let note = document.getElementById('note').value;
    let component = this;
    fetch('https://visian-api.sghir.me/tasks/' + this.props.task.id + '/setNote',{
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note: note})
    }).then((response) => {component.props.refreshTasks(); component.toggleNote()});
  }

  onPiButtonClick() {
    let container = document.getElementById("piform");
    let inputs = container.getElementsByTagName('input');
    let score = 0;
    for (let index = 0; index < inputs.length; ++index) {
      if (inputs[index].checked) {
        score = score + parseInt(inputs[index].value);
      }
    }

    if (score < 6){
      alert("Pas besoin du tout de brevet");
    }
    else if (score < 9){
      alert("Besoin modéré pour un brevet");
    }
    else if (score < 14) {
      alert("Besoion d'un brevet");
    }
    else{
      alert("Obligation d'un brevet");
    }
  }

  render() {
    return (
      <div>
        <Draggable id={this.props.task.id} style={{marginBottom: '10px', cursor: 'grab'}}>
          <Card>
            <CardHeader style={{display: "flex", flexDirection: 'row', 'justify-content': 'space-between'}}>
              <div style={{display: "flex", flexDirection: "column"}}>
                <h5>{this.props.task.tasktitle}</h5>
                <div>
                  { this.props.task.labels.map((label) => {
                    return <Badge color={label.color} pill className="mr-1">
                      {label.name}
                    </Badge>
                  })}
                </div>
              </div>
              <div style={{display: "flex", flexDirection: "row"}}>
                <Button
                  block
                  outline
                  color="info"
                  onClick={this.toggle}
                  style={{width: '40px', height: '40px'}}
                >?
                </Button>
                <Button
                  block
                  outline
                  color="warning"
                  onClick={this.toggleNote}
                  style={{width: '48px', height: '40px', marginTop: '0px', marginLeft: '10px'}}
                ><MdNote color="warning" size="24px"/>
                </Button>
              </div>
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
            {this.props.task.documents.length > 0 && <h3>Documents :</h3> }
            {this.props.task.documents.map(({name, source}, index) => (
              <div><Button onClick={() => window.open(source)} color="link">
                - {name}
              </Button>
                <br />
              </div>
            ))}

            { this.props.task.tasktypeid === 7 &&
            <div>
              <br/>
              <h3>Aide :</h3>
              <h6>Assurez vous que les 3 points suivants sont vérifiés, sinon la solution n'est pas brevetable</h6>
              <ul>Votre solution est :
                <li>Nouvelle : C’est-à-dire pas connu du grand public</li>
                <li>Inventive : C’est-à-dire non-évidente pour l’homme du métier</li>
                <li>À application industrielle : C’est-à-dire si l’objet de la solution peut être fabriqué ou utilisé dans tout genre d’industrie.</li>
              </ul>
              <Button onClick={this.togglePiform} color="info">Evaluer le besoin de brevet</Button>
            </div>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.noteModalOpened}
          toggle={this.toggleNote}
          backdrop>
          <ModalHeader toggle={this.toggleNote}>
            {this.props.task.tasktitle}
          </ModalHeader>
          <ModalBody>
            <textarea style={{width: '100%', marginBottom: '15px'}} id="note" type="text" rows="5">{this.props.task.note}</textarea>
            <Button onClick={this.setNote.bind(this)} color="primary">Enregistrer</Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleNote}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.piformOpened}
          toggle={this.togglePiform}
          backdrop>
          <ModalHeader toggle={this.togglePiform}>
            Evaluation du besoin de brevet.
          </ModalHeader>
          <ModalBody>
            <div id="piform">
              <FormGroup tag="fieldset">
                <h6>Pouvez-vous facilement vous faire copier ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" value={2}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" value={-2}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Est-ce que votre marge prévisionnelle permettra de financer facilement les frais liés aux brevets ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio2" value={2}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio2" value={-2}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Pouvez-vous vous permettre d’assurer le cout d’une défense ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio3" value={1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio3" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Voulez-vous dissuader la concurrence sur ce type de solution ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio4" value={1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio4" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Avez-vous peur d’être figé sur une solution technique ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio5" value={-1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio5" value={1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Pensez-vous que votre brevet sera de faible valeur ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio6" value={-2}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio6" value={1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Pensez-vous que votre brevet puisse intéresser qqn pour une licence ou un achat ? (Avez-vous déjà des pistes ?)</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio7" value={2}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio7" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Avez-vous besoin de valoriser commercialement votre produit par un brevet ? </h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio8" value={1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio8" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Allez -vous devoir présenter votre produit à des prestataires externes avant sa commercialisation ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio9" value={2}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio9" value={-2}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Pensez-vous avoir besoin d’un levier dans vos futures négociations avec vos partenaires</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio10" value={1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio10" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Voulez-vous reconnaître et encourager le statut d’inventeur ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio11" value={1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio11" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Pensez-vous que la technologie que vous utilisez sera dépassée d’ici 2/3 ans ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio12" value={-1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio12" value={1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Privilégiez-vous le positionnement sur l’usage ou l’usage sur le positionnement ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio13" value={1}/>{' '}
                    Positionnement à l’usage
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio13" value={-1}/>{' '}
                    Usage au positionnement
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h6>Pensez-vous que votre concept soit assez avancé ?</h6>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio14" value={1}/>{' '}
                    Oui
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio14" value={-1}/>{' '}
                    Non
                  </Label>
                </FormGroup>
              </FormGroup>
              <Button onClick={this.onPiButtonClick} color="primary">Evaluer</Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.togglePiform}>
              Fermer
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}