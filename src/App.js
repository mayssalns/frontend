import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  Container,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton
} from 'react-bootstrap'


export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    const { name } = this.state;

    const enabled = name.length > 0;
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
                 <h1>HOME</h1>
              </Row>
            </Container>
          </div>

          <div>
            <Container>
              <InputGroup>
                <FormControl
                    placeholder="Search"
                    aria-describedby="basic-addon2"
                    size={"lg"}
                    value={this.state.name}
                    onChange={this.handleChange}
                    id = "name"
                    name = "name"
                />

                <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-primary"
                    title="Go"
                    id="igd"
                >
                  <Dropdown.Item href={`/author/?name=${this.state.name}`} disabled={!enabled}>Author</Dropdown.Item>
                  <Dropdown.Item href={`/book/?name=${this.state.name}`} disabled={!enabled}>Book</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Container>

          </div>
        </div> 
    );
  }
}



