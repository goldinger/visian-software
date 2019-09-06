import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdGroupWork,
  MdExtension,
  MdKeyboardArrowDown,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  // UncontrolledTooltip,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  { to: '/', name: 'Accueil', exact: true, Icon: MdDashboard },
];


const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenProjects: true,
    projects: []
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };
  componentWillMount() {
    let component = this;
    fetch('https://visian-api.sghir.me/getProjectsByEntityId/1')
      .then((response) => response.json())
      .then((responseJson) => {
        component.setState({projects: responseJson})
      })
  }

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="180"
                height="80"
                className="pr-2"
                alt=""
              />
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Projects')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">PROJETS</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenProjects
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenProjects}>
              {this.state.projects.map(({ id, entity, title, description }, index) => {
                return (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${title}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={'/' + id}
                      activeClassName="active"
                      exact={false}
                    >
                      <MdGroupWork className={bem.e('nav-item-icon')} />
                      <span className="">{title}</span>
                    </BSNavLink>
                  </NavItem>
                )})
              }
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
