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
    step: null,
    tasks: [],
    modalOpened: false,
    modalDocuments: [],
    task: '',
  };

  componentWillMount() {
    this.setState({
      allStepsData:{
        1: {
          step: 'Pré-Expérimentation',
          progress: 50,
          tasks: [
            {
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
          step: 'Expérimentation',
          progress: 0,
          tasks: []
        },
        3: {
          step: 'Pré-Industrialisation',
          progress: 0,
          tasks: []
        },
        4: {
          step: 'Industrialisation',
          progress: 0,
          tasks: []
        }
      }})
  }


  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  onPreExpClick() {
    let stepData = this.state.allStepsData[1];
    this.setState(stepData)
  }
  onExpClick() {
    let stepData = this.state.allStepsData[2];
    this.setState(stepData)
  }
  onPreIndClick() {
    let stepData = this.state.allStepsData[3];
    this.setState(stepData)
  }
  onIndClick() {
    let stepData = this.state.allStepsData[4];
    this.setState(stepData)
  }

  toggle = () => {
    this.setState({modalOpened: !this.state.modalOpened});
  };

  showDocuments(task, documents) {
    this.setState({modalOpened: true, modalTask: task, modalDocuments:documents})
  }

  render() {
    return (
      <Page
        className="ProjectsPage"
        title="Projets"
      >
        <Row>
          <Col>
            <CardGroup style={{ marginBottom: '1rem' }}>
              <ProjectStepCard
                title={"1. " + this.state.allStepsData[1].step}
                progress={this.state.allStepsData[1].progress}
                onClick={this.onPreExpClick.bind(this)}
              />
              <ProjectStepCard
                title={"2. " + this.state.allStepsData[2].step}
                progress={this.state.allStepsData[2].progress}
                onClick={this.onExpClick.bind(this)}
              />
              <ProjectStepCard
                title={"3. " + this.state.allStepsData[3].step}
                progress={this.state.allStepsData[3].progress}
                onClick={this.onPreIndClick.bind(this)}
              />
              <ProjectStepCard
                title={"4. " + this.state.allStepsData[4].step}
                progress={this.state.allStepsData[4].progress}
                onClick={this.onIndClick.bind(this)}
              />
            </CardGroup>
          </Col>
        </Row>

        <TasksManagerComponent />
        { this.state.step &&

        <Row>
          <Col>
            <Card>
              <CardHeader>{this.state.step}</CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr className="text-capitalize align-middle text-center">
                    <th>Done</th>
                    <th>Task Name</th>
                    <th>Description</th>
                    <th>Documents</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.tasks.map(({ title, description, done, documents }, index) => (
                    <tr
                      onClick={() => this.showDocuments(title, documents)}
                      key={index}>
                      <td className="align-middle text-center">{done ? "Yes" : "No"}</td>
                      <td className="align-middle text-center">{title}</td>
                      <td className="align-middle text-center">{description}</td>
                      <td className="align-middle text-center">
                        <Button
                          outline
                          onClick={() => this.showDocuments(title, documents)}
                          color="secondary">
                          Voir la documentation
                        </Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
                <Modal
                  isOpen={this.state.modalOpened}
                  toggle={this.toggle}
                  backdrop>
                  <ModalHeader toggle={this.toggle}>
                    {this.state.modalTask}
                  </ModalHeader>
                  <ModalBody>
                    {this.state.modalDocuments.map(({name, source}, index) => (
                      <div><Button onClick={() => window.open(source)} color="link">
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        }
      </Page>
    );
  }
}

export default ProjectsPage;
