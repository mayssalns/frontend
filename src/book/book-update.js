import React, { Component } from 'react';
import { Form, Button, InputGroup, FormControl, Container, Row, Col, Nav, Navbar,FormGroup  } from 'react-bootstrap';
import { api } from '../services/api';


export default class BookUpdate extends Component{
    constructor() {
        super();
        this.state = {
            items: [],
            page: 1,
        };
        BookUpdate.handleSubmit = BookUpdate.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        let book_id = this.props.match.params.id;
        const data = new FormData(event.target);
        
        const response = api.put(`/v1/book/${book_id}/`, data)
       .then((ret) => {
           return ret
       } );
        document.getElementById("book-form").reset();

    }
    
    reflesh(){
        let name = this.props.match.params.name   
        let summary = this.props.match.params.summary  
        let author = this.props.match.params.author    
    }

    componentDidMount(){
        this.loadMoreAuthors()
    }

    componentDidUpdate(){
     //update data
     this.addEventListenerToContainer()
    }

    addEventListenerToContainer() {
        document.getElementById('select-author')
        .ondblclick = () => { this.loadMoreAuthors() }
    }

    loadMoreAuthors =  async() => {
        const response = await api.get(
            `/v1/author/?page=${this.state.page}`
        )
        .then(response => {
            this.setState( prevState => {
                return {
                    ...prevState,
                    page: prevState.page + 1,
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
                    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                        <Navbar.Brand href="/">HOME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/book">BOOKs</Nav.Link>
                                <Nav.Link href="/author">AUTHOR</Nav.Link>
                               
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div>
                        <Container>
                            <Row className={"justify-content-center"}>
                                <Col xs={6} md={4}>
                                   <h1>Book Update</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                        <Form id={"book-form"} onSubmit={BookUpdate.handleSubmit}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        autoFocus
                                        name={"name"}
                                        id={"name"}
                                        aria-label="name"
                                        aria-describedby="name"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Summary</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        name={"summary"}
                                        id={"summary"}
                                        aria-label="name"
                                        aria-describedby="name"
                                    />
                                </InputGroup>
                                <FormGroup id="book-author">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text style={{flex: 3}}>Authors</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <select multiple className="form-control" id="select-author" name="author">
                                        {this.state.items.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </FormGroup>
                     
                                <Button variant={"primary"} type="submit">Submit</Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            );
        }
    }


