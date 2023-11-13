import { Navbar, NavDropdown, Nav, Form, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            data-supported-dps="24x24"
            fill="currentColor"
            className="mercado-match"
            width="24"
            height="24"
            focusable="false"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="#action1"
              className="d-flex flex-column align-items-center justify-content-between g-3"
            >
              <Icon.HouseFill />
              <span className="fs-7">Home</span>
            </Nav.Link>

            <Nav.Link
              href="#action1"
              className="d-flex flex-column align-items-center justify-content-between g-3"
            >
              <Icon.PeopleFill />
              <span className="fs-7">Rete</span>
            </Nav.Link>

            <Nav.Link
              href="#action1"
              className="d-flex flex-column align-items-center justify-content-between g-3"
            >
              <Icon.BriefcaseFill />
              <span className="fs-7">Lavoro</span>
            </Nav.Link>

            <Nav.Link
              href="#action1"
              className="d-flex flex-column align-items-center justify-content-between g-3"
            >
              <Icon.ChatLeftDots />
              <span className="fs-7">Messaggi</span>
            </Nav.Link>

            <Nav.Link
              href="#action1"
              className="d-flex flex-column align-items-center justify-content-between g-3"
            >
              <Icon.BellFill />
              <span className="fs-7">Notifiche</span>
            </Nav.Link>

            <Nav.Item className="d-flex flex-column align-items-center justify-content-between g-3">
              <Icon.PersonCircle />
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
