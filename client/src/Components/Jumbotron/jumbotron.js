/** @format */

import React from 'react'
import './jumbotron.css'
import SignButtons from '../SignButtons/SignButtons'
import demo from '../../shared/images/demo.webp'
import { Grid, Row, Col } from 'react-flexbox-grid'

function jumbotron(props) {
	return (
		<div className="jumbotron-container">
			<Grid fluid className="container-fluid">
				<Row className='flexbox row'>
					<Col md={6} className="flex-item">
						<div className='content'>
							<h1 className='c-heading-1'>Meet, chat, collaborate</h1>
							<p className='c-heading-2'>
								Connect with your team anywhere, anytime. Experience seamless video calling, instant messaging, and real-time collaboration - all in one modern platform.
							</p>

							{/* Rendering signin and signup */}
							<SignButtons
								auth={props.auth}
								loginUser={props.loginUser}
								logoutUser={props.logoutUser}
							/>
						</div>
					</Col>
					<Col md={6} className="flex-item">
						<img
							width='100%'
							height='100%'
							src={demo}
							alt='Modern video conferencing interface showing participants in a virtual meeting'
							className="hero-image"
						/>
					</Col>
				</Row>
			</Grid>
		</div>
	)
}

export default jumbotron
