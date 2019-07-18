import React from 'react';
import PropTypes from 'utils/propTypes';
import { Card, CardTitle, CardText, CardBody, CardImg, Button, CardFooter, Progress } from 'reactstrap';


const ProjectStepCard = (
  {
    img,
    title,
    progress,
    ...restProps
  }) => {
  return (
    <Card {...restProps}>
      <CardImg top src={img} />
      <CardBody>
        <CardTitle><h5>{title}</h5></CardTitle>
        <CardText>
          <Button block color="primary">Poursuivre</Button>
        </CardText>
        <CardFooter>
          <Progress
            striped
            animated
            color="secondary"
            value={progress}
            className="mb-3">
            {progress > 0 && progress}{progress > 0 && "%"}
          </Progress>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

ProjectStepCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  progress: PropTypes.number,
};

ProjectStepCard.defaultProps = {
  progress: 0,
};

export default ProjectStepCard;
