import React from 'react';
import PropTypes from 'utils/propTypes';
import { Card, CardTitle, CardText, CardBody, Button, Progress } from 'reactstrap';


const ProjectStepCard = (
  {
    selected,
    title,
    progress,
    onClick,
    overview,
    ...restProps
  }) => {
  if (overview) {
    selected = false
  }
  return (
    <Card
      style={selected ? {backgroundColor: '#BDBDBD'} : {}}
      {...restProps}>
      <CardBody>
        <CardTitle>
          <h5 className={selected ? 'text-white': 'text-primary'}>{title}</h5>
        </CardTitle>
        <CardText>
          <Progress
            striped
            animated
            color="secondary"
            value={progress}
            className="mb-3">
            {progress > 0 && progress}{progress > 0 && "%"}
          </Progress>
          {!overview &&
          <Button
            block
            outline
            color={selected ? 'white' : 'primary'}
            onClick={onClick}
            disabled={selected}
          >
            {selected ? 'Sélectionné' : 'Voir les Tâches'}
          </Button>
          }
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
