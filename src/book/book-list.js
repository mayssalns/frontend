import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Table } from 'react-bootstrap';
import {api} from '../services/api';

 
export default class BookList extends Component{
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
    this.loadMore();
   }

   componentDidUpdate(){
    //update data
    this.addEventListenerToContainer()
   }

    addEventListenerToContainer() {
        document.getElementById('body-book')
        .onmousedown = () => { this.loadMore() }
    }

    loadMore =  async() => {
        console.log("PAGE NUMBER >>>>>>>>>>>", this.state.pageNumber)
        await api.get(
            `/v1/book/?page=${this.state.pageNumber}`
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
        },
        )
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
                                    <Nav.Link href="/add/book">Insert</Nav.Link>
                                    <Nav.Link href="/author">Authors</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <div>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col  xs={6} md={4}>
                                <h1>Listing Books</h1>
                                </Col>
                            </Row>
                        </Container>

                        <Container id="book-list">
                            <div style={{height:'600px', overflow:'auto'}}>
                                    <Table responsive="sm" id="table-list">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>SUMMARY</th>
                                                <th>AUTHOR</th>
                                                <th>MORE</th>
                                            </tr>
                                        </thead>
                                        <tbody id="body-book">
                                            {this.state.items.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.summary}</td>
                                                    <td>{item.author}</td>
                                                    <td><Button variant={"link"} href={`/book/${item.id}`}>Details</Button></td>
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