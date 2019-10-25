import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { api } from '../services/api';


export default class BookUpdate extends Component{
    constructor() {
        super();
        BookUpdate.handleSubmit = BookUpdate.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        let book_id = this.props.match.params.id;
        const data = new FormData(event.target);
        
        const response = api.put(`/v1/book/${book_id}`, data)
       .then((ret) => {
           return ret
       } );
        document.getElementById("book-form").reset();

    }


    render() {
            return (
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                        <Navbar.Brand href="/">HOME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/book">BOOKs</Nav.Link>
                                <Nav.Link href="/author">AUTHOR</Nav.Link>
                               
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col xs={6} md={4}>
                                   <h1>Book Update</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                        <Form id={"book-form"} onSubmit={BookUpdate.handleSubmit}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        autoFocus
                                        name={"name"}
                                        id={"name"}
                                        aria-label="name"
                                        aria-describedby="name"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Summary</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        name={"summary"}
                                        id={"summary"}
                                        aria-label="name"
                                        aria-describedby="name"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Author</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        name={"author"}
                                        id={"author"}
                                        aria-label="author"
                                        aria-describedby="author"
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


