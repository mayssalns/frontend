import React from 'react';
import {
    Button,
    Container,
    Row,
    Col,
    Table,
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap';

class Book extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        let book_id = this.props.match.params.id;
        let string_name = this.props.match.params.name;
        let string = '';
        if (book_id === null){
            string = `http://localhost:8000/v1/book/?name=${string_name}`;
        }
        else {
            string = `http://localhost:8000/v1/book/${book_id}`;
        }
        fetch(string)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="/">Home</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavDropdown title="Author" id="nav_author">
                                        <NavDropdown.Item href="/new/author">New</NavDropdown.Item>
                                        <NavDropdown.Item href="/author">List</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Book" id="nav_book">
                                        <NavDropdown.Item href="/new/book">New</NavDropdown.Item>
                                        <NavDropdown.Item href="/book">List</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col  xs={6} md={4}>
                                    <h1>Book</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Summary</th>
                                    <th colSpan={3}>Opções</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={items.name}>
                                    <td>{items.id}</td>
                                    <td>{items.name}</td>
                                    <td>{items.summary}</td>
                                    <td><Button variant={"secondary"} size="lg" block>Alterar</Button></td>
                                    <td><Button variant={"secondary"} href={`/del/book/${items.id}`} size="lg" block>Excluir</Button></td>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                </div>
            );
        }
    }
}
export default Book;
