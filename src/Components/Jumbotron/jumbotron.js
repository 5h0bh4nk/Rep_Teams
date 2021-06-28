import React from 'react';
import './jumbotron.css';
import SignButtons from '../SignButtons/SignButtons';
import demo from '../../shared/images/demo.webp';
import { Grid, Row, Col } from 'react-flexbox-grid';

function jumbotron() {
    return (
        <Grid fluid className="col-12">
            <Row className="flexbox row">
                <Col sm={12} md={6} className="flex-item col-12 col-md-6">
                    <div className="content">
                        <h1 className="c-heading-1">
                            Microsoft Teams
                        </h1>
                        <p className="c-heading-2">
                            Meet, chat, call, and collaborate in just one place.
                        </p>
                        <SignButtons />
                    </div>
                </Col>
                <Col sm={12} md={6} className="flex-item col-12 col-md-6">
                    <img width="100%" height="100%" src = {demo} alt="A family video call on Teams and the chat screen in Teams showing many conversations." />
                </Col>
            </Row>
        </Grid>
    )
}

export default jumbotron
