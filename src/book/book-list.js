import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Table } from 'react-bootstrap';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
 

export default class BookList extends React.Component{
   constructor (props) {
    super (props);
    this.state = {
      listItems: [],
      pageNumber: 1,
      items: 5,
      hasMore: true
    }
    this.loadMore = this.loadMore.bind(this);

   }
    
   componentDidMount() {
    //initial request is sent
    this.loadMore();
    setTimeout(() => this.loadMore(), 4000)
    // onscroll (() => this.loadMore, true)
   }

    loadMore = () => {
    axios
        .get(
        `http://localhost:8000/v1/book/?page=${
            this.state.pageNumber}&per_page=${this.state.items}`
        )
        
        //.then(res => res.json())
        .then(response => {

            console.log('RESPONSE:', response.data.results)

            this.setState( prevState => {
                return {
                    ...prevState,
                    pageNumber: prevState.pageNumber + 1,
                    listItems: prevState.listItems.concat(response.data.results)
                }
            })

            console.log("RESPONSE: ", this.state)

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

                        <Container>
                            <div style={{height:'600px', overflow:'auto'}}>
                                <InfiniteScroll
                                    loadMore={this.loadMore.bind(this)}
                                    hasMore={this.state.hasMoreItems}
                                    loader={<div className="loader"> Loading... </div>}
                                    useWindow={false}
                                >
                                    <Table responsive="sm">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>SUMMARY</th>
                                                <th>AUTHOR</th>
                                                <th>MORE</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.listItems.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.summary}</td>
                                                    <td>{item.author}</td>
                                                    <td><Button variant={"link"} href={`/book/${item.id}`} size="lg" block>Details</Button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </InfiniteScroll>
                            </div>
                        </Container>                
                    </div>
                </div>
        );
      }
    }