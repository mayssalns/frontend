import React from 'react';
import {Form, Button, Container,  Row, Col, Nav, Navbar, InputGroup, FormControl, FormGroup} from 'react-bootstrap'
import { api } from '../services/api';



export default class BookAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            pageNumber: 1,
        };
        BookAdd.handleSubmit = BookAdd.handleSubmit.bind(this);
    }

    static handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const response = api.post('/v1/book/', data)
       .then((ret) => {
           return ret
     } );
        document.getElementById("book-form").reset();

    }

   componentDidUpdate(){
    //update data
    this.addEventListenerToContainer()
   }

    addEventListenerToContainer() {
        document.getElementById('select-author')
        .onclick = () => { this.loadMore() }
    }

    loadMore =  async() => {
        const response = await api.get(
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
        },
        )
        .catch(() => { console.log('Error')});
    };

    componentDidMount = () => {
        this.bookAdd()
    }

    bookAdd = async() => {
        const response = await api.get('/v1/author/')
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result.data.results
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
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
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
                                   <h1>Book Insertion</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                        <Form id={"book-form"} onSubmit={BookAdd.handleSubmit}>
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
                                        {items.map(item => (
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
}

