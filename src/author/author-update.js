import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl, Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { api } from '../services/api';


export default class AuthorUpdate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authorName: ''
        };
        AuthorUpdate.handleSubmit = AuthorUpdate.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAuthorDetails = this.getAuthorDetails.bind(this);
    }


    componentDidMount() {
        this.getAuthorDetails();

    }

    static handleSubmit(event) {
        event.preventDefault();
        let author_id = this.props.match.params.id;
        const data = new FormData(event.target);
        
        api.put(`/v1/author/${author_id}/`, data)
        .then((ret) => {
           return ret
        } );
        document.getElementById("author-form").reset();

    }
    

    handleChange(event) {
        this.setState({
            authorName: event.target.value
        });
    }
  

    getAuthorDetails = async() => {        
        let author_id = this.props.match.params.id

        await api.get(`/v1/author/${author_id}`)
        .then(
            response => {
                this.setState({
                    isLoaded: true,
                    authorName: response.data.name
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

        console.log('AUTHOR NAME GET>>>>>>>>>>>', this.state.authorName)
    }


    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/author">AUTHOR</Nav.Link>
                            <Nav.Link href="/book">BOOK</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div >
                    <Container>
                        <Row className={"justify-content-center"}>
                            <Col  xs={6} md={4}>
                                <h1>Author Update</h1>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Form id={"author-form"} onSubmit={AuthorUpdate.handleSubmit } >
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text >Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    autoFocus
                                    name={"name"}
                                    id={"name"}
                                    aria-label="name"
                                    aria-describedby="name"
                                    value= {this.state.authorName}
                                    onChange={this.handleChange.bind(this)}
                                />
                
                            </InputGroup>
                            <Button variant={"primary"} type="submit">Submit</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

