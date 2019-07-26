import React from 'react';
import PropTypes from 'utils/propTypes';
import { Card, CardTitle, CardText, CardBody, Button, Progress } from 'reactstrap';


const ProjectStepCard = (
  {
    title,
    progress,
    onClick,
    ...restProps
  }) => {
  return (
    <Card {...restProps}>
      <CardBody>
        <CardTitle><h5>{title}</h5></CardTitle>
        <CardText>
          <Progress
            striped
            animated
            color="secondary"
            value={progress}
            className="mb-3">
            {progress > 0 && progress}{progress > 0 && "%"}
          </Progress>
          <Button
            block
            outline
            color="primary"
            onClick={onClick}
          >
            Voir les Tâches
          </Button>
        </CardText>
      </CardBody>
    </Card>
  );
};

ProjectStepCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  progress: PropTypes.number,
  onClick: PropTypes.func
};

ProjectStepCard.defaultProps = {
  progress: 0,
  onClick: () => {}
};

export default ProjectStepCard;
