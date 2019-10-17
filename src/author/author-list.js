import React from 'react';
import { Button, Container, Row, Col,Table, Navbar, Nav } from 'react-bootstrap'

export default class AuthorList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
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
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                            <Navbar.Brand href="/">Home</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/add/author">Novo</Nav.Link>
                                    <Nav.Link href="/Book">Book</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col  xs={6} md={4}>
                                <h1>Listing Author</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
               
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.name}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><Button variant={"primary"} href={`/del/author/${item.id}`} size="lg" block>DELETE</Button></td>
                                            <td><Button variant={"primary"} href={`/author/${item.id}`} size="lg" block>DETAILS</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                </div>
            );
        }
    }
}

