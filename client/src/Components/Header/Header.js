/** @format */

import { React, useState } from 'react'
import './Header.css'
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap'
import mslogo from '../../shared/images/mslogo.svg'

function Header(props) {
	const [isOpen, setIsOpen] = useState(false)
	const [cname, setCname] = useState('animated-icon2')
	const [itemClass, setItemClass] = useState('h-items')
	const toggle = () => {
		setIsOpen(!isOpen)
		var Togglercss = cname === 'animated-icon2' ? 'animated-icon2 open' : 'animated-icon2'
		var navlinkClass = !isOpen ? 'h-items-2' : 'h-items'
		setCname(Togglercss)
		setItemClass(navlinkClass)
	}
	return (
		<div className='app-header-bar mb-3'>
			<Navbar light expand='md'>
				<div className='container-fluid'>
					<NavbarBrand href='/home' className='brand-container'>
						<img src={mslogo} alt='Shubh Meet Logo' className='brand-logo' />
						<span className='brand-text'>Shubh Meet</span>
					</NavbarBrand>
					<NavbarToggler className='first-Button' onClick={toggle}>
						<div className={cname}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</NavbarToggler>
				</div>
				<Collapse isOpen={isOpen} navbar>
					<Nav className='mr-auto' navbar>
						<NavItem className={itemClass}>
							<NavLink exact to='/home' className='head-links'>
								Home
							</NavLink>
						</NavItem>
						<div className={itemClass}>{' | '}</div>
						<NavItem className={itemClass}>
							<NavLink exact to='/conversations' className='head-links'>
								Conversations
							</NavLink>
						</NavItem>
						<div className={itemClass}>{' | '}</div>
						<NavItem className={itemClass}>
							<NavLink exact to='/dashboard' className='head-links'>
								Dashboard
							</NavLink>
						</NavItem>
						<div className={itemClass}>{' | '}</div>
						<NavItem className=''>
							<Button
								outline
								color='warning'
								onClick={props.logoutUser}
								className='head-links'
								href=''>
								<span
									class='iconify'
									data-icon='mdi-logout'
									data-inline='false'></span>
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
