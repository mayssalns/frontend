import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";

export default class BookList extends React.Component{
   
    state = {
        breweries: [],
        pageNumber: 1,
        items: 5,
        hasMore: true
      };
    
      componentDidMount() {
          //initial request is sent
        this.fetchData();
      }
      
                
      fetchData = () => {
        axios
          .get(
            `http://localhost:8000/v1/book/?page=${
              this.state.pageNumber
            }&per_page=${this.state.items}`
          )
          //.then(res => res.json())
          .then(res =>
            this.setState({
              //updating data
              breweries: [...this.state.breweries, ...res.data],
              //updating page numbers
              pageNumber: this.state.pageNumber + 1
            })
          );
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
                            <InfiniteScroll
                                dataLength={this.state.breweries.length} //This is important field to render the next data
                                next={this.fetchData}
                                hasMore={this.state.hasMore}
                                loader={<h4>Loading...</h4>}
                            >
                            {this.state.breweries.map(brewery => (
                            <ul className="user" key={brewery.id}>
                                <li>Name: {brewery.name}</li>
                            </ul>
                             ))}
                      </InfiniteScroll>
                        </Container>
                    </div>
                </div>
        );
      }
    }