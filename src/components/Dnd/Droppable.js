import React from 'react';
import PropTypes from 'prop-types';

export default class Droppable extends React.Component {

  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    let component = this;
    // e.target.appendChild(document.getElementById(data))
    fetch('https://visian-api.sghir.me/tasks/' + data + '/setDone', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({done: component.props.done})
    }).then((response) => {component.props.onDrop()});
  };

  allowDrop = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

Droppable.propTypes = {
  id: PropTypes.string,
  done: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node,
};
