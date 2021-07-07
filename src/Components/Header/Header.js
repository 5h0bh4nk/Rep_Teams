import {React , useState} from 'react';
import './Header.css';
import { Button, Form, FormGroup, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
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
            <Nav className="app-header-bar mr-auto" navbar>
              <NavItem className="h-items">
                <NavLink className="head-links" href="">Chats</NavLink>
              </NavItem>
            </Nav>
            <NavbarText className="head-links" align-items="right">{props.auth.user.username}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default Header
