/** @format */

import React, { useState } from 'react'
import './Navbar.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import mslogo from '../../shared/images/mslogo.svg'
import NavItems from '../../shared/storage/data.js'

function NavbarMain(props) {
	const [isOpen, setIsOpen] = useState(false)
	const [cname, setCname] = useState('animated-icon1')
	const toggle = () => {
		setIsOpen(!isOpen)
		var css = cname === 'animated-icon1' ? 'animated-icon1 open' : 'animated-icon1'
		setCname(css)
	}

	return (
		<div>
			<section className='mb-3'>
				<Navbar color='light' light expand='md'>
					<div className='container-fluid'>
						<NavbarBrand href='/home'>
							{/* <img src={mslogo} alt='MS logo' /> */}
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
							<NavItem>
								<NavLink href='/components/'>Components</NavLink>
							</NavItem>
							{NavItems.map((item) => (
								<NavItem>
									<NavLink href={item.link}>{item.product}</NavLink>
								</NavItem>
							))}
						</Nav>
					</Collapse>
				</Navbar>
			</section>
			<div className='info'>
				<p>
					Now use Shubh Teams with family and friends to call, chat, and make plans.
					&nbsp;
					<a href='/home'>Learn more {'>'}</a>
				</p>
			</div>
		</div>
	)
}

export default NavbarMain
