import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Container,
  InputGroup,
  Button,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import "./navbar.scss";
import { useCallback, useEffect, useState } from "react";

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

  const [myProfile, setMyProfile] = useState("");

  const getMyProfile = useCallback(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setMyProfile(data);
      });
  }, []);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

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
            {/* Notifications */}
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

            {/* Rete */}
            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.PeopleFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Rete</span>
              </Nav.Link>
            </Nav.Item>

            {/* Lavoro */}
            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.BriefcaseFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Lavoro</span>
              </Nav.Link>
            </Nav.Item>

            {/* Messaggi */}
            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.ChatDotsFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Messaggi</span>
              </Nav.Link>
            </Nav.Item>

            {/* Notifiche */}
            <Nav.Item>
              <Nav.Link
                href="/wip"
                className="d-flex flex-column align-items-center justify-content-between"
              >
                <Icon.BellFill width="1.5rem" height="1.5rem" />
                <span className="fs-7">Notifiche</span>
              </Nav.Link>
            </Nav.Item>

            {/* Account Dropdown */}
            <Nav.Item
              className="d-flex flex-column align-items-center justify-content-between border-end me-2"
              align="start"
            >
              <Icon.PersonCircle width="1.5rem" height="1.5rem" />
              <NavDropdown
                align={{ sm: "end" }}
                title="Tu"
                id="dropdown-menu-align-responsive-1"
                className="nav-dropdown-no-decoration"
              >
                <Container fluid>
                  <Link to={`/`} className="text-decoration-none dropdown-item">
                    <Row className="align-items-center mb-2">
                      <Col xs="auto" className="ps-0">
                        <img
                          width="50rem"
                          height="50rem"
                          src={myProfile.image}
                          className="rounded-circle object-fit-cover"
                          alt="experience-cover"
                        />
                      </Col>
                      <Col className="mb-2 px-0">
                        <h5 className="mb-1 fw-semibold">
                          {myProfile.name} {myProfile.surname}
                        </h5>
                        <p className="mb-0 text-secondary fs-6">
                          {myProfile.title}
                        </p>
                      </Col>
                    </Row>
                  </Link>
                  <Row>
                    <Col>
                      <Button className="rounded-pill fw-semibold btn-white w-100">
                        Visualizza profilo
                      </Button>
                    </Col>
                  </Row>
                </Container>

                <NavDropdown.Divider />

                <Container className="px-4">
                  <h6 className="py-2">Account</h6>
                  <div className="d-flex mb-2 align-items-center">
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        backgroundImage:
                          "conic-gradient(from -45deg, #f8c77e 180deg, #e7a33e 0)",
                      }}
                      className="rounded-1"
                    />
                    <Dropdown.Item href="/wip" className="fs-7">
                      Riattiva Premium
                    </Dropdown.Item>
                  </div>
                  <div className="d-flex flex-column">
                    <Dropdown.Item href="/wip" className="px-0 fs-7">
                      Impostazioni e privacy
                    </Dropdown.Item>
                    <Dropdown.Item href="/wip" className="px-0 fs-7">
                      Guida
                    </Dropdown.Item>
                    <Dropdown.Item href="/wip" className="px-0 fs-7">
                      Lingua
                    </Dropdown.Item>
                  </div>
                </Container>

                <NavDropdown.Divider />

                <Container className="px-4">
                  <h6 className="py-2">Gestisci</h6>
                  <Dropdown.Item href="/wip" className="px-0 fs-7">
                    Post e attività
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/wip"
                    className="text-truncate px-0 fs-7"
                  >
                    Account per la pubblicazione di off...
                  </Dropdown.Item>
                  <Dropdown.Item href="/wip" className="px-0 fs-7">
                    Lingua
                  </Dropdown.Item>
                </Container>

                <NavDropdown.Divider />

                <Container className="px-4">
                  <Dropdown.Item href="/wip" className="px-0"> {/*<!--inserire il logout--> */}
                    Esci
                  </Dropdown.Item>
                </Container>
              </NavDropdown>
            </Nav.Item>

            <Nav.Item className="d-flex flex-column align-items-center justify-content-between">
              <Icon.Grid3x3GapFill width="1.5rem" height="1.5rem" />
              <NavDropdown
                title="Per le aziende"
                id="navbarScrollingDropdown"
                align={{ sm: "end" }}
              >
                <NavDropdown.Item href="/wip">
                  Passa a Linkedin Enterprise
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
