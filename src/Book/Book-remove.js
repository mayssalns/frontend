import React from 'react'
import {Spinner, Container, Navbar, Nav, Row, Col} from 'react-bootstrap'



class BookRemove extends React.Component{
       render() {
        let book_id = this.props.match.params.id;


        fetch(`http://localhost:8000/v1/book/${book_id}`
            , {
                method: 'DELETE'
            }).then(r => '');
           return (
               <div>
                   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                       <Navbar.Brand href="/">Home</Navbar.Brand>
                       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                       <Navbar.Collapse id="responsive-navbar-nav">
                           <Nav className="mr-auto">
                               <Nav.Link href="/new/author">Novo</Nav.Link>
                               <Nav.Link href="#pricing">Book</Nav.Link>
                           </Nav>
                       </Navbar.Collapse>
                   </Navbar>


                   <div>
                       <Container>
                           <Row className={"justify-content-center"}>
                               <Col  xs={6} md={4}>
                                   <h1>Book Remove</h1>
                               </Col>
                           </Row>
                       </Container>
                       <Container>
                           <Row className={"justify-content-center"}>
                                <Spinner animation="border" variant="secondary" size="lg" block/>
                           </Row>
                       </Container>
                   </div>


                   <script>
                       {setTimeout(function() {
                           window.location.href = "/book";
                       }, 3000)}
                   </script>
                   
               </div>

        );

    }

}
export default BookRemove;
