import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardGroup,
  CardBody,
  CardHeader,
  Row,
  Col,
  Table,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
} from 'reactstrap';
import ProjectStepCard from '../components/Card/ProjectStepCard';
import TasksManagerComponent from '../components/TasksManagerComponent';


class ProjectsPage extends React.Component {
  state = {
    allStepsData: {},
    stepData: null,
    modalOpened: false,
    modalDocuments: [],
    task: '',
    tasks: [],
  };

  componentWillMount() {
    this.setState({
      allStepsData:{
        1: {
          id: 1,
          step: 'Pré-Expérimentation',
          progress: 50,
          tasks: [
            {
              id: 'rgpd',
              title: 'RGPD',
              description: 'Vérifier que votre projet respecte le RGPD',
              done: false,
              documents: [
                {
                  name: "Règlement Européen",
                  source: "https://eur-lex.europa.eu/legal-content/FR/TXT/PDF/?uri=CELEX:32016R0679"
                },
                {
                  name: "Guide",
                  source:"https://www.cnil.fr/sites/default/files/atoms/files/bpi-cnil-rgpd_guide-tpe-pme.pdf"
                }
              ]
            },
            {
              id: 'prop-intelec',
              title: 'Propriété intellectuelle',
              description: 'Vérifier la propriété intellectuelle',
              done: true,
              documents: [
                {
                  name: "Propriété intellectuelle",
                  source:"https://www.cnil.fr/sites/default/files/atoms/files/bpi-cnil-rgpd_guide-tpe-pme.pdf"
                }
              ]
            }
          ]
        },
        2: {
          id: 2,
          step: 'Expérimentation',
          progress: 0,
          tasks: []
        },
        3: {
          id: 3,
          step: 'Pré-Industrialisation',
          progress: 0,
          tasks: []
        },
        4: {
          id: 4,
          step: 'Industrialisation',
          progress: 0,
          tasks: []
        }
      }})
  }


  refreshTasks() {
    let component = this;
    fetch('https://visian-api.sghir.me/projects/1')
      .then((response) => response.json())
      .then((responseJson) => {
        component.setState({tasks: responseJson});
      })
      .catch((error) => {console.error(error);});
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    this.refreshTasks();
    window.scrollTo(0, 0);
  }

  onPreExpClick() {
    let stepData = this.state.allStepsData[1];
    this.setState({step: 1})
  }
  onExpClick() {
    let stepData = this.state.allStepsData[2];
    this.setState({step: 2})
  }
  onPreIndClick() {
    let stepData = this.state.allStepsData[3];
    this.setState({step: 3})
  }
  onIndClick() {
    let stepData = this.state.allStepsData[4];
    this.setState({step: 4})
  }

  toggle = () => {
    this.setState({modalOpened: !this.state.modalOpened});
  };

  showDocuments(task, documents) {
    this.setState({modalOpened: true, modalTask: task, modalDocuments:documents})
  }

  render() {
    let progress1 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 1)).length)/(this.state.tasks.filter(task => (task.taskstep === 1)).length));
    let progress2 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 2)).length)/(this.state.tasks.filter(task => (task.taskstep === 2)).length));
    let progress3 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 3)).length)/(this.state.tasks.filter(task => (task.taskstep === 3)).length));
    let progress4 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 4)).length)/(this.state.tasks.filter(task => (task.taskstep === 4)).length));
    return (
      <Page
        className="ProjectsPage"
        title="Projets"
      >
        <Row>
          <Col>
            <CardGroup style={{ marginBottom: '1rem' }}>
              <ProjectStepCard
                selected={this.state.step === 1}
                title={"1. " + this.state.allStepsData[1].step}
                progress={progress1}
                onClick={this.onPreExpClick.bind(this)}
              />
              <ProjectStepCard
                selected={this.state.step === 2}
                title={"2. " + this.state.allStepsData[2].step}
                progress={progress2}
                onClick={this.onExpClick.bind(this)}
              />
              <ProjectStepCard
                selected={this.state.step === 3}
                title={"3. " + this.state.allStepsData[3].step}
                progress={progress3}
                onClick={this.onPreIndClick.bind(this)}
              />
              <ProjectStepCard
                selected={this.state.step === 4}
                title={"4. " + this.state.allStepsData[4].step}
                progress={progress4}
                onClick={this.onIndClick.bind(this)}
              />
            </CardGroup>
          </Col>
        </Row>

        { this.state.step && <TasksManagerComponent step={this.state.step} tasks={this.state.tasks} refreshTasks={this.refreshTasks.bind(this)}/>}
        {/*{ this.state.stepData &&*/}

        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <Card>*/}
        {/*      <CardHeader>{this.state.stepData.step}</CardHeader>*/}
        {/*      <CardBody>*/}
        {/*        <Table responsive hover>*/}
        {/*          <thead>*/}
        {/*          <tr className="text-capitalize align-middle text-center">*/}
        {/*            <th>Done</th>*/}
        {/*            <th>Task Name</th>*/}
        {/*            <th>Description</th>*/}
        {/*            <th>Documents</th>*/}
        {/*          </tr>*/}
        {/*          </thead>*/}
        {/*          <tbody>*/}
        {/*          {this.state.stepData.tasks.map(({ title, description, done, documents }, index) => (*/}
        {/*            <tr*/}
        {/*              onClick={() => this.showDocuments(title, documents)}*/}
        {/*              key={index}>*/}
        {/*              <td className="align-middle text-center">{done ? "Yes" : "No"}</td>*/}
        {/*              <td className="align-middle text-center">{title}</td>*/}
        {/*              <td className="align-middle text-center">{description}</td>*/}
        {/*              <td className="align-middle text-center">*/}
        {/*                <Button*/}
        {/*                  outline*/}
        {/*                  onClick={() => this.showDocuments(title, documents)}*/}
        {/*                  color="secondary">*/}
        {/*                  Voir la documentation*/}
        {/*                </Button>*/}
        {/*              </td>*/}
        {/*            </tr>*/}
        {/*          ))}*/}
        {/*          </tbody>*/}
        {/*        </Table>*/}
        {/*        <Modal*/}
        {/*          isOpen={this.state.modalOpened}*/}
        {/*          toggle={this.toggle}*/}
        {/*          backdrop>*/}
        {/*          <ModalHeader toggle={this.toggle}>*/}
        {/*            {this.state.modalTask}*/}
        {/*          </ModalHeader>*/}
        {/*          <ModalBody>*/}
        {/*            {this.state.modalDocuments.map(({name, source}, index) => (*/}
        {/*              <div><Button onClick={() => window.open(source)} color="link">*/}
        {/*                {name}*/}
        {/*              </Button>*/}
        {/*                <br />*/}
        {/*              </div>*/}
        {/*            ))}*/}
        {/*          </ModalBody>*/}
        {/*          <ModalFooter>*/}
        {/*            <Button color="danger" onClick={this.toggle}>*/}
        {/*              Fermer*/}
        {/*            </Button>*/}
        {/*          </ModalFooter>*/}
        {/*        </Modal>*/}
        {/*      </CardBody>*/}
        {/*    </Card>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        {/*}*/}
      </Page>
    );
  }
}

export default ProjectsPage;
