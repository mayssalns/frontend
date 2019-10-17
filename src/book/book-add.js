import React from 'react';
import {Form, Button, Container,  Row, Col, Nav, Navbar} from 'react-bootstrap'



export default class BookAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        BookAdd.handleSubmit = BookAdd.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('http://localhost:8000/v1/book/', {
            method: 'POST',
            body: data,
        }).then(r => r.json());
        document.getElementById("book-form").reset();

    }

    componentDidMount() {
        fetch("http://localhost:8000/v1/author/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
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
                                   <h1>Book Insertion</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>

                        <Form id={"book-form"} onSubmit={BookAdd.handleSubmit}>
                        <Form.Group controlId="Form.ControlInput1">
                          <Form.Label>Name</Form.Label>
                          <Form.Control 
                          name={"name"}
                          id={"name"}
                          placeholder="Book Name"
                          aria-label="name"
                          aria-describedby="name"
                          />

                          <Form.Label>Summary</Form.Label>
                          <Form.Control 
                          name={"summary"}
                          id={"summary"}
                          placeholder="Book Summary"
                          aria-label="name"
                          aria-describedby="name"
                          />
                          <Form.Label>Author</Form.Label>
                          <select multiple className="form-control" id="author" name="author">
                          {items.map(item => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                          </select>
                          
                        </Form.Group>
                     
                        <Button variant={"primary"} type="submit" size="lg" block>Submit</Button>
                      </Form>
                        
                        </Container>
                    </div>
                </div>
            );
        }
    }
}

