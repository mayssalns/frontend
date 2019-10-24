import React from 'react'
import {Spinner, Container, Navbar, Nav, Row, Col} from 'react-bootstrap'



export default class BookDelete extends React.Component{
       render() {
        let book_id = this.props.match.params.id;


        fetch(`http://localhost:8000/v1/book/${book_id}`
            , {
                method: 'DELETE'
            }).then(r => '');
           return (
               <div>
                   <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                       <Navbar.Brand href="/">HOME</Navbar.Brand>
                       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                       <Navbar.Collapse id="responsive-navbar-nav">
                           <Nav className="mr-auto">
                               <Nav.Link href="/add/author">Insert</Nav.Link>
                               <Nav.Link href="#pricing">Book</Nav.Link>
                           </Nav>
                       </Navbar.Collapse>
                   </Navbar>


                   <div>
                       <Container>
                           <Row className={"justify-content-center"}>
                               <Col  xs={6} md={4}>
                                   <h1>Book Delete</h1>
                               </Col>
                           </Row>
                       </Container>
                       <Container>
                           <Row className={"justify-content-center"}>
                                <Spinner animation="border" variant="primary" size="lg" block/>
                           </Row>
                       </Container>
                   </div>


                   <script>
                       {setTimeout(function() {
                          
                           window.location.href = "/book";
                           console.log("Success!")
                       }, 3000)}
                   </script>
                   
               </div>

        );

    }

}

