import React from 'react';
import {  Container,
    Row,
    Col,
    Table,
    Navbar,
    Nav,
    NavDropdown,
    Button
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
        this.getBookDetails();

    }

    getBookDetails = () => {        
        let book_id = this.props.match.params.id;
        let str_name = this.props.match.params.name;
        let str = '';

        if (book_id === undefined){
            str = `http://localhost:8000/v1/book/?name=${str_name}`
        }
        else {
            str = `http://localhost:8000/v1/book/${book_id}`;
            this.isBook = true;
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
                                    <h1>Book Details</h1>
                                </Col>
                            </Row>
                        </Container>

                        <Container>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>SUMMARY</th>
                                        <th>AUTHOR</th>
                                        <th colSpan={3}>Opções</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    this.isBook?
                                        <tr key={items.name}>
                                            <td>{items.id}</td>
                                            <td>{items.name}</td>
                                            <td>{items.summary}</td>
                                            <td>{items.author}</td>
                                      
                                            <td><Button variant={"primary"} href={`/del/book/${items.id}`} >DELETE</Button></td>
                                        </tr>
                                        :
                                        items.results.map(value =>
                                            <tr key={value.name}>
                                                <td>{value.name}</td>
                                                <td>{value.id}</td>
                                                <td>{value.summary}</td>
                                                <td>{value.author}</td>
                                             
                                                <td><Button variant={"primary"} href={`/del/book/${value.id}`} >DELETE</Button></td>
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
