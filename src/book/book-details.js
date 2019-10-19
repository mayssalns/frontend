import React from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Navbar,
    Nav,
    NavDropdown
} from 'react-bootstrap';

export default class BookDetails extends React.Component{
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
                        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                            <Navbar.Brand href="/">HOME</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                <NavDropdown title="book" id="nav_book">
                                <NavDropdown.Item href="/add/book">Insert</NavDropdown.Item>
                                <NavDropdown.Item href="/book">Listing</NavDropdown.Item>
                                     </NavDropdown>
                                    <NavDropdown title="book" id="nav_book">
                                        <NavDropdown.Item href="/add/book">Insert</NavDropdown.Item>
                                        <NavDropdown.Item href="/book">Listing</NavDropdown.Item>
                                    </NavDropdown>
                                 
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col  xs={6} md={4}>
                                    <h1>Book Details</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>SUMMARY</th>
                                    <th>AUTHOR</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr key={items.name}>
                                    <td>{items.id}</td>
                                    <td>{items.name}</td>
                                    <td>{items.summary}</td>
                                    <td>{items.author}</td>
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

