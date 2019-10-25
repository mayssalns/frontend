import React, { Component } from 'react';
import {  Container, Row, Col, Table, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export default class AuthorDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount() {
        this.getAuthorDetails();

    }

    getAuthorDetails = () => {        
        let author_id = this.props.match.params.id;
        let str_name = this.props.match.params.name;
        let str = '';

        if (author_id === undefined){
            str = `http://localhost:8000/v1/author/?name=${str_name}`
        }
        else {
            str = `http://localhost:8000/v1/author/${author_id}`;
            this.isAuthor = true;
        }

        fetch(str)
            .then(response => response.json())
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
            .catch(() => { console.log('Error')});
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
                                        <NavDropdown title="BOOK" id="nav_author">
                                        <NavDropdown.Item href="/add/book">Insert</NavDropdown.Item>
                                        <NavDropdown.Item href="/book">Listing</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="AUTHOR" id="nav_author">
                                        <NavDropdown.Item href="/add/author">Insert</NavDropdown.Item>
                                        <NavDropdown.Item href="/author">Listing</NavDropdown.Item>
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
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th colSpan={3}>MORE</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    this.isAuthor?
                                        <tr key={items.name}>
                                            <td>{items.id}</td>
                                            <td>{items.name}</td>
                                            <td><Button variant={"primary"} href={`/update/author/${items.id}`} >UPDATE</Button></td>
                                            <td><Button variant={"primary"} href={`/delele/author/${items.id}`} >DELETE</Button></td>
                                        </tr>
                                        :
                                        items.results.map(value =>
                                            <tr key={value.name}>
                                                <td>{value.name}</td>
                                                <td>{value.id}</td>
                                                <td><Button variant={"primary"} href={`/update/author/${value.id}`} >UPDATE</Button></td>
                                                <td><Button variant={"primary"} href={`/delele/author/${value.id}`} >DELETE</Button></td>
                                            </tr>
                                        )
                                }

                                </tbody>
                            </Table>
                        </Container>

                 
                    </div>
                </div>
            );
        }
    }
}
