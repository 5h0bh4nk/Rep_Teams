import {React , useState} from 'react';
import './Header.css';
import { Button} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
  } from 'reactstrap';
import logo from '../../shared/images/logo-white.png';

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className="app-header-bar">
        <Navbar light expand="md">
          <NavbarBrand href="/"><img src={logo} height="40px" alt="MS_TEAMS" /></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="nav-links mr-auto" navbar>
              <NavItem className="h-items">
                <NavLink exact to="/home" className="head-links" href="">Home</NavLink>
              </NavItem>
              {' | '}
              <NavItem className="h-items">
                <NavLink exact to="/conversations" className="head-links" href="">Conversations</NavLink>
              </NavItem>
              {' | '}
              <NavItem className="h-items">
                <NavLink exact to="/dashboard" className="head-links" href="">Dashboard</NavLink>
              </NavItem>
              {' | '}
              <NavItem className="h-items">
                <Button outline color="warning" onClick={props.logoutUser} className="head-links" href="">
                  <span class="iconify" data-icon="mdi-logout" data-inline="false"></span>
                  Logout
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default Header
