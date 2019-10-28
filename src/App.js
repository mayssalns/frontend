import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Navbar, Nav, NavDropdown, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap'


export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({name: event.target.value});
  }


  handleSubmit = event => {
    event.preventDefault();
  };


  render() {

    return (
        <div>
          <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <Navbar.Brand href="/">HOME</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <NavDropdown title="BOOK" id="nav_book">
                    <NavDropdown.Item href="/add/book">Insert</NavDropdown.Item>
                    <NavDropdown.Item href="/book">List</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="AUTHOR" id="nav_author">
                    <NavDropdown.Item href="/add/author">Insert</NavDropdown.Item>
                    <NavDropdown.Item href="/author">List</NavDropdown.Item>
                </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>

          <div>
            <Container>
              <Row className={"justify-content-center"}>
                 <h1>SEARCH</h1>
              </Row>
            </Container>
          </div>

          <div>
            <Container>
              <InputGroup >
              <FormControl
                    autoFocus
                    aria-describedby="basic-addon2"
                    size={"lg"}
                    value={this.state.name}
                    onChange={this.handleChange}
                    id = "name"
                    name = "name"
                />

                <DropdownButton
                    as={InputGroup.Append}
                    variant="primary"
                    title="Go"
                    id="igd"
                >
                  <Dropdown.Item href={`/author/search/${this.state.name}`} >Author</Dropdown.Item>
                  <Dropdown.Item href={`/book/search/${this.state.name}`}>Book</Dropdown.Item>

                </DropdownButton>
              </InputGroup>
            </Container>

          </div>
        </div> 
    );
  }
}



