import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardGroup, CardImg, CardText, CardTitle, Col } from 'reactstrap';
import bg1Image from "../assets/img/products/product_640-1.jpg";
import bg2Image from "../assets/img/products/product_640-2.jpg";
import bg3Image from "../assets/img/products/product_640-3.jpg";
import bg4Image from "../assets/img/products/product_640-4.jpg";

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
          <Card>
            <CardImg top src={bg1Image} />
            <CardBody>
              <CardTitle>Pré-Expérimentation</CardTitle>
              <CardText>
                ...
              </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardImg top src={bg2Image} />
            <CardBody>
              <CardTitle>Expérimentation</CardTitle>
              <CardText>
                ...
              </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardImg top src={bg3Image} />
            <CardBody>
              <CardTitle>Pré-Industrialisation</CardTitle>
              <CardText>
                ...
              </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardImg top src={bg4Image} />
            <CardBody>
              <CardTitle>Industrialisation</CardTitle>
              <CardText>
                ...
              </CardText>
            </CardBody>
          </Card>
        </CardGroup>
      </Page>
    );
  }
}

export default ProjectsPage;
