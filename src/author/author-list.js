import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Table } from 'react-bootstrap';
import {api} from '../services/api';

export default class AuthorList extends Component{
    constructor (props) {
       super (props);
       this.state = {
           items: [],
           pageNumber: 1,
           hasMore: true
        }
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        //initial request is sent
        this.loadMore();
    }

    componentDidUpdate(){
        //update data
        this.addEventListenerToContainer()
    }

    addEventListenerToContainer() {
        document.getElementById('author-list')
        .onmousedown = () => { this.loadMore() }
    }

    loadMore =  async() => {
        await api.get(
            `/v1/author/?page=${this.state.pageNumber}`
        )
        .then(response => {

            console.log('RESPONSE:', response.data.results)
            this.setState( prevState => {
                return {
                    ...prevState,
                    pageNumber: prevState.pageNumber + 1,
                    items: prevState.items.concat(response.data.results)
                }
            })
            console.log("RESPONSE: ", this.state)
        },)
        .catch(() => { console.log('Error')});
    };


    render() {
        return (
            <div>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                        <Navbar.Brand href="/">Home</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/add/author">Insert</Nav.Link>
                                <Nav.Link href="/book">Books</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col  xs={6} md={4}>
                                <h1>Listing Authors</h1>
                            </Col>
                        </Row>
                    </Container>
                    <Container id="author-list">
                        <div style={{height:'600px', overflow:'auto'}}>
                            <Table responsive="sm" id="table-list">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>MORE</th>
                                    </tr>
                                </thead>

                                <tbody id="body-author">
                                    {this.state.items.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><Button variant={"link"} href={`/author/${item.id}`}>Details</Button></td>
                                        </tr>
                                    ))}
                                            
                                </tbody>
                            </Table>
                        </div>
                    </Container>                
                </div>
            </div>
        );
      }
    }