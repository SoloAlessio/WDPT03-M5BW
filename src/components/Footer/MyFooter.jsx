/* NOTE: 
- colore del testo (grey)
- effetti dei link (decoration-none) (visited: #8443ce)
- background-color (tranne che sulla navbar) #f4f2ee

 possiamo farli su tutta l'app) */

import { Col, Container, Dropdown, DropdownMenu, Row } from "react-bootstrap";
import { linkGroups, languages } from "../../data/LinksAndLanguages";
import {
  QuestionCircleFill,
  GearFill,
  ShieldShaded,
} from "react-bootstrap-icons";
import "./footer.scss";

const FooterLink = ({
  href,
  label,
  isDropdown = false,
  dropdownItems = [],
}) => (
  <Col className="mb-2">
    {isDropdown ? (
      <Dropdown>
        <Dropdown.Toggle
          variant="transparent"
          style={{
            padding: 0,
            fontSize: 12,
            textDecoration: "none",
          }}
          className="text-wrap text-start"
        >
          {label}
        </Dropdown.Toggle>
        <DropdownMenu style={{ padding: 0, fontSize: 12 }}>
          {dropdownItems.map((item, index) => (
            <Dropdown.Item key={index} href={item.href}>
              {item.label}
            </Dropdown.Item>
          ))}
        </DropdownMenu>
      </Dropdown>
    ) : (
      <a
        href={href}
        style={{
          textDecoration: "none",
          opacity: 0.7,
          fontWeight: 600,
          color: "grey",
        }}
        onMouseOver={(e) => {
          e.target.style.textDecoration = "underline";
          e.target.style.opacity = 1;
        }}
        onMouseOut={(e) => {
          e.target.style.textDecoration = "none";
          e.target.style.opacity = 0.7;
        }}
      >
        {label}
      </a>
    )}
  </Col>
);

export default function MyFooter() {
  return (
    <Container
      className="fixed-bottom"
      fluid
      style={{
        fontSize: 12,
      }}
    >
      <Container>
        <Row>
          <Col sm="6">
            {linkGroups.map((group, index) => (
              <Row key={index}>
                {group.map((link, linkIndex) => (
                  <FooterLink key={linkIndex} {...link} />
                ))}
              </Row>
            ))}
          </Col>

          <Col sm="3">
            <Col xs={12} className="d-flex gap-2">
              <p>
                <QuestionCircleFill
                  size={20}
                  color="#3d3d3c"
                ></QuestionCircleFill>
              </p>

              <span>
                <a
                  href="https://www.linkedin.com/help/linkedin?trk=d_flagship3_profile_view_base"
                  id="questions-help-center"
                  style={{
                    textDecoration: "none",
                    color: "rgb(0 0 0/.6)",
                    opacity: 0.7,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.textDecoration = "underline";
                    e.target.style.opacity = 1;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.textDecoration = "none";
                    e.target.style.opacity = 0.5;
                  }}
                >
                  Domande?
                </a>
                <p className="fw-lighter">
                  Visita il nostro Centro assistenza.
                </p>
              </span>
            </Col>
            <Col xs={12} className="d-flex gap-2">
              <p>
                <GearFill size={20} color="#3d3d3c"></GearFill>
              </p>

              <span>
                <a
                  style={{
                    textDecoration: "none",
                    color: "rgb(0 0 0/.6)",
                    opacity: 0.7,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.textDecoration = "underline";
                    e.target.style.opacity = 1;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.textDecoration = "none";
                    e.target.style.opacity = 0.7;
                  }}
                  href="https://www.linkedin.com/help/linkedin?trk=d_flagship3_profile_view_base"
                  id="questions-help-center"
                  style={{
                    textDecoration: "none",
                    color: "rgb(0 0 0/.6)",
                    opacity: 0.7,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.textDecoration = "underline";
                    e.target.style.opacity = 1;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.textDecoration = "none";
                    e.target.style.opacity = 0.5;
                  }}
                >
                  Gestisci il tuo account e la tua privacy{" "}
                </a>
                <p className="fw-lighter">Vai alle impostazioni</p>
              </span>
            </Col>
            <Col xs={12} className="d-flex gap-2">
              <p>
                <ShieldShaded size={20} color="#3d3d3c"></ShieldShaded>
              </p>

              <span>
                <a
                  style={{
                    textDecoration: "none",
                    color: "rgb(0 0 0/.6)",
                    opacity: 0.7,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  onMouseOver={(e) => {
                    e.target.style.textDecoration = "underline";
                    e.target.style.opacity = 1;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.textDecoration = "none";
                    e.target.style.opacity = 0.5;
                  }}
                  href="https://www.linkedin.com/help/linkedin?trk=d_flagship3_profile_view_base"
                  id="questions-help-center"
                >
                  Trasparenza sui contenuti consigliati.
                </a>
                <p className="fw-lighter">
                  Scopri di più sui contenuti consigliati.
                </p>
              </span>
            </Col>
          </Col>

          <Col sm="3">
            <p className="mt-1 mb-0">Seleziona lingua</p>
            <select className="p-2 rounded" style={{ minWidth: "50px" }}>
              {languages.map((language, index) => (
                <option key={index}>{language}</option>
              ))}
            </select>
          </Col>
        </Row>
      </Container>
      <Container className="p-3">Linkedin Corporation © 2023</Container>
    </Container>
  );
}
