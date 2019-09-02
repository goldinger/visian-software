import Page from 'components/Page';
import React from 'react';
import {
  CardGroup,
  Row,
  Col,
} from 'reactstrap';
import ProjectStepCard from '../components/Card/ProjectStepCard';
import TasksManagerComponent from '../components/TasksManagerComponent';


class ProjectsPage extends React.Component {
  state = {
    modalOpened: false,
    modalDocuments: [],
    tasks: [],
  };

  componentWillMount() {
    this.refreshTasks();

  }


  refreshTasks() {
    let component = this;
    fetch('https://visian-api.sghir.me/projects/' + component.props.match.params.projectId)
      .then((response) => response.json())
      .then((responseJson) => {
        component.setState({tasks: responseJson});
      })
      .catch((error) => {console.error(error);});
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  onPreExpClick() {
    this.setState({step: 1})
  }
  onExpClick() {
    this.setState({step: 2})
  }
  onPreIndClick() {
    this.setState({step: 3})
  }
  onIndClick() {
    this.setState({step: 4})
  }

  toggle = () => {
    this.setState({modalOpened: !this.state.modalOpened});
  };

  render() {
    let projectTitle = "Projet";
    if (this.state.tasks.length > 0) {
      projectTitle = this.state.tasks[0].projecttitle
    }
    let progress1 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 1)).length)/(this.state.tasks.filter(task => (task.taskstep === 1)).length));
    let progress2 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 2)).length)/(this.state.tasks.filter(task => (task.taskstep === 2)).length));
    let progress3 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 3)).length)/(this.state.tasks.filter(task => (task.taskstep === 3)).length));
    let progress4 = Math.round((100 * this.state.tasks.filter(task => (task.done === 1 && task.taskstep === 4)).length)/(this.state.tasks.filter(task => (task.taskstep === 4)).length));
    return (
      <Page
        className="ProjectsPage"
        title={projectTitle}
      >
        <Row>
          <Col>
            <CardGroup style={{ marginBottom: '1rem' }}>
              <ProjectStepCard
                selected={this.state.step === 1}
                title={"1. Pré-Expérimentation"}
                progress={progress1}
                onClick={this.onPreExpClick.bind(this)}
              />
              <ProjectStepCard
                selected={this.state.step === 2}
                title={"2. Expérimentation"}
                progress={progress2}
                onClick={this.onExpClick.bind(this)}
              />
              <ProjectStepCard
                selected={this.state.step === 3}
                title={"3. Pré-Industrialisation"}
                progress={progress3}
                onClick={this.onPreIndClick.bind(this)}
              />
              <ProjectStepCard
                selected={this.state.step === 4}
                title={"4. Industrialisation"}
                progress={progress4}
                onClick={this.onIndClick.bind(this)}
              />
            </CardGroup>
          </Col>
        </Row>

        { this.state.step && <TasksManagerComponent step={this.state.step} tasks={this.state.tasks} refreshTasks={this.refreshTasks.bind(this)}/>}

      </Page>
    );
  }
}

export default ProjectsPage;
