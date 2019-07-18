import React from 'react';
import PropTypes from 'utils/propTypes';
import { Card, CardTitle, CardText, CardBody, CardImg, Button, CardFooter, Progress } from 'reactstrap';


const ProjectStepCard = (
  {
    img,
    title,
    progress,
    onClick,
    ...restProps
  }) => {
  return (
    <Card {...restProps}>
      <CardImg top src={img} />
      <CardBody>
        <CardTitle><h5>{title}</h5></CardTitle>
        <CardText>
          <Button
            block
            color={progress === 0 ? "danger" : "primary"}
            disabled={progress === 0}
            onClick={onClick}
          >
            {progress === 0 ? "Verrouillé" : "Poursuivre"}
          </Button>
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
  onClick: PropTypes.func
};

ProjectStepCard.defaultProps = {
  progress: 0,
  onClick: () => {}
};

export default ProjectStepCard;
