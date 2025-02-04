import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { api } from '../services/api';


export default class AuthorAdd extends Component{
    constructor() {
        super();
        AuthorAdd.handleSubmit = AuthorAdd.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        api.post('/v1/author/', data)
       .then((ret) => {
           return ret
       } );
        document.getElementById("author-form").reset();

    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/author">AUTHOR</Nav.Link>
                            <Nav.Link href="/book">BOOK</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div >
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col  xs={6} md={4}>
                                <h1>Author Add</h1>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Form id={"author-form"} onSubmit={AuthorAdd.handleSubmit}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text >Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    autoFocus
                                    name={"name"}
                                    id={"name"}
                                    aria-label="name"
                                    aria-describedby="name"
                                />
                            </InputGroup>
                            <Button variant={"primary"} type="submit">Submit</Button>
                        </Form>
                    </Container>
                </div>
              
            </div>
        );
    }
}

