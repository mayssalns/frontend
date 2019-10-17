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

export default class AuthorDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        let author_id = this.props.match.params.id;
        let string_name = this.props.match.params.name;
        let string = '';
        if (author_id === null){
            string = `http://localhost:8000/v1/author/?name=${string_name}`;
        }
        else {
            string = `http://localhost:8000/v1/author/${author_id}`;
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
                                        <NavDropdown title="Author" id="nav_author">
                                        <NavDropdown.Item href="/add/author">Insert</NavDropdown.Item>
                                        <NavDropdown.Item href="/author">Listing</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Book" id="nav_book">
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
                                    <h1>Author Details</h1>
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
                                    <tr key={items.name}>
                                        <td>{items.id}</td>
                                        <td>{items.name}</td>
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
