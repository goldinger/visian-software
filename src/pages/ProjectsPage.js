import Page from 'components/Page';
import React from 'react';
import { CardGroup } from 'reactstrap';
import bg1Image from "../assets/img/products/product_640-1.jpg";
import bg2Image from "../assets/img/products/product_640-2.jpg";
import bg3Image from "../assets/img/products/product_640-3.jpg";
import bg4Image from "../assets/img/products/product_640-4.jpg";
import ProjectStepCard from '../components/Card/ProjectStepCard';



class ProjectsPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="ProjectsPage"
        title="Projets"
      >
        <CardGroup style={{ marginBottom: '1rem' }}>
          <ProjectStepCard
            img={bg1Image}
            title="Pré-Expérimentation"
            progress={72}
          />
          <ProjectStepCard
            img={bg2Image}
            title="Expérimentation"
            progress={0}
          />
          <ProjectStepCard
            img={bg3Image}
            title="Pré-Industrialisation"
            progress={0}
          />
          <ProjectStepCard
            img={bg4Image}
            title="Industrialisation"
            progress={0}
          />
        </CardGroup>
      </Page>
    );
  }
}

export default ProjectsPage;
