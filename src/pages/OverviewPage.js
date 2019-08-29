import Page from 'components/Page';
import React from 'react';
import {
  CardGroup,
  Row,
  Col,
} from 'reactstrap';
import ProjectStepCard from '../components/Card/ProjectStepCard';


class OverviewPage extends React.Component {
  state = {
    projects: [],
  };

  componentWillMount() {
    let component = this;
    fetch('https://visian-api.sghir.me/entities/1')
      .then((response) => response.json())
      .then((tasks) => {
        let projects = {};
        tasks.forEach((task) => {
          if (projects[task.projectid] == null) {
            projects[task.projectid] = []
          }
          projects[task.projectid].push(task);
        });
        component.setState({projects: projects});
      })
      .catch((error) => {console.error(error);});

  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="OverviewPage"
        title="Accueil"
      >
        { Object.keys(this.state.projects).map((key) => {
          let tasks = this.state.projects[key];
          console.log(tasks);
          let progress1 = Math.round((100 * tasks.filter(task => (task.done === 1 && task.taskstep === 1)).length)/(tasks.filter(task => (task.taskstep === 1)).length));
          let progress2 = Math.round((100 * tasks.filter(task => (task.done === 1 && task.taskstep === 2)).length)/(tasks.filter(task => (task.taskstep === 2)).length));
          let progress3 = Math.round((100 * tasks.filter(task => (task.done === 1 && task.taskstep === 3)).length)/(tasks.filter(task => (task.taskstep === 3)).length));
          let progress4 = Math.round((100 * tasks.filter(task => (task.done === 1 && task.taskstep === 4)).length)/(tasks.filter(task => (task.taskstep === 4)).length));
          return (
            <Row key={key}>
              <Col>
                <CardGroup style={{ marginBottom: '1rem' }}>
                  <ProjectStepCard
                    title="1. Pré-Expérimentation"
                    progress={progress1}
                    overview={true}
                  />
                  <ProjectStepCard
                    title="2. Expérimentation"
                    progress={progress2}
                    overview={true}
                  />

                  <ProjectStepCard
                    title="3. Pré-Industrialisation"
                    progress={progress3}
                    overview={true}
                  />
                  <ProjectStepCard
                    title="4. Industrialisation"
                    progress={progress4}
                    overview={true}
                  />
                </CardGroup>
              </Col>
            </Row>
          )})}
      </Page>
    );
  }
}

export default OverviewPage;
