import React from 'react';
import {
    Form,
    Button,
    InputGroup,
    FormControl,
    Container,
    Row,
    Col,
    Nav,
    Navbar
} from 'react-bootstrap';


class AuthorNew extends React.Component{
    constructor() {
        super();
        AuthorNew.handleSubmit = AuthorNew.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('http://localhost:8000/v1/author/', {
            method: 'POST',
            body: data,
        }).then(r => r.json());
        document.getElementById("Author-form").reset();

    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/author">Author</Nav.Link>
                            <Nav.Link href="/book">Book</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div >
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col  xs={6} md={4}>
                                <h1>Book Add</h1>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Form id={"Author-form"} onSubmit={AuthorNew.handleSubmit}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text >Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name={"name"}
                                    id={"name"}
                                    placeholder="Author Name"
                                    aria-label="name"
                                    aria-describedby="name"
                                />
                            </InputGroup>
                            <Button variant={"primary"} type="submit" size="lg" block>Enviar</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}
export default AuthorNew;
