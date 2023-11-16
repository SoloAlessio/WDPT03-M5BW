import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Container,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./navbar.scss";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setprofiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then(setprofiles);
  }, []);

  function Filter() {
    setFilteredProfiles(
      profiles.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.surname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }

  return (
    <Navbar sticky="top" expand="lg" bg="light">
      <Container>
        {/* NAVBAR Icon */}
        <Navbar.Brand className="me-2">
          <Link to={"/Profile"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Link>
        </Navbar.Brand>
        {/* NAVBAR Search Bar */}
        <Form className="position-relative">
          <InputGroup>
            <InputGroup.Text id="basic-addon1" className="border-end-0">
              <Icon.Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Cerca"
              aria-label="Cerca"
              id="searchBar"
              className="border-start-0"
              onInput={(e) => {
                setSearchQuery(e.target.value);
                Filter();
              }}
              value={searchQuery}
            />
          </InputGroup>
          {searchQuery && filteredProfiles.length > 0 && (
            <div>
              <ul id="profile-search-area">
                {filteredProfiles.slice(0, 5).map((pro) => (
                  <li key={pro._id} className="py-2">
                    <Link
                      to={`/profile/${pro._id}`}
                      className="text-decoration-none d-flex align-items-center"
                      onClick={() => setSearchQuery("")}
                    >
                      <Icon.Search />
                      <span className="profile-link ps-3 fw-semibold">
                        {pro.name + " " + pro.surname}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Form>
        {/* NAVBAR Links */}
        <Navbar.Toggle aria-controls="navbarScroll" /> {/* Toggle Button */}
        <Navbar.Collapse id="navbarScroll">
          {/* Full Width device nav Links */}
          <Nav
            className="ms-auto my-2 my-lg-0 d-none d-lg-flex"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Item>
              <Link
                to={`/`}
                className="d-flex flex-column align-items-center justify-content-between nav-link active"
              >
                <div className="position-relative">
                  <Icon.HouseFill width="1.5rem" height="1.5rem" />
                  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">Notifications</span>
                  </span>
                </div>
                <span className="fs-7">Home</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.PeopleFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Rete</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.BriefcaseFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Lavoro</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.ChatDotsFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Messaggi</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.BellFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Notifiche</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item
              className="d-flex flex-column align-items-center justify-content-between border-end me-2"
              align="start"
            >
              <Icon.PersonCircle width="1.5rem" height="1.5rem" />
              <NavDropdown title="Tu" id="navbarScrollingDropdown">
                <Link to={`/wip`} className="dropdown-item ">
                  Home
                </Link>
                <NavDropdown.Item href="/wip">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/wip">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>

            <Nav.Item className="d-flex flex-column align-items-center justify-content-between">
              <Icon.Grid3x3GapFill width="1.5rem" height="1.5rem" />
              <NavDropdown title="Per le aziende" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/wip">Action</NavDropdown.Item>
                <NavDropdown.Item href="/wip">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/wip">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>
          {/* Mobile device nav Links */}
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex d-lg-none"
            style={{ maxHeight: "100px" }}
            id="mobile-nav"
            navbarScroll
          >
            <Nav.Item>
              <Nav.Link href="/wip">Home</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/wip">Rete</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/wip">Lavoro</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/wip">Messaggi</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/wip">Notifiche</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Link to={"/profile"} className="nav-link">
                Profilo
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/wip">Per le Aziende</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
