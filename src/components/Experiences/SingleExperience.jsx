import { Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";
import AddExperience from "../AddExperience/Index";

const DateDifference = (a, b) => {
  if (a === null) {
    a = new Date();
  }

  const diffInMilliseconds = Math.abs(a - b);
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  const years = Math.floor(diffInMilliseconds / (365.25 * millisecondsInDay));
  const months = Math.floor(
    (diffInMilliseconds % (365.25 * millisecondsInDay)) /
      (30.44 * millisecondsInDay)
  );
  const days = Math.floor(
    (diffInMilliseconds % (30.44 * millisecondsInDay)) / millisecondsInDay
  );

  let result = "";

  if (years > 0) {
    result += `${years} ${years === 1 ? "anno" : "anni"}`;
  }

  if (months > 0) {
    if (result.length > 0) {
      result += ", ";
    }
    result += `${months} ${months === 1 ? "mese" : "mesi"}`;
  }

  if (days > 0) {
    if (result.length > 0) {
      result += ", ";
    }
    result += `${days} ${days === 1 ? "giorno" : "giorni"}`;
  }

  return result.length > 0 ? result : "Le date sono uguali";
};

export default function SingleExperience({ Experience, userId }) {
  const [show, setShow] = useState(false);
  const dataInizio = new Date(Experience.startDate);
  const dataFine =
    Experience.endDate === null ? new Date() : new Date(Experience.endDate);

  const handleDelete = async (experienceId, userId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${experienceId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
          },
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Esperienza eliminata con successo!");
      } else {
        toast.error("Errore: " + response.statusText);
      }
    } catch (error) {
      toast.error("Ops, Qualcosa è andato storto");
      console.log(error);
    }
  };

  return (
    <Row>
      <Col className="d-flex gap-4 mb-4 mb-md-0" md={8}>
        <div>
          <img
            src="https://picsum.photos/48/48"
            style={{ width: "48px", height: "48px", backgroundColor: "grey" }}
            className="rounded-circle"
            alt="experience-cover"
          />
        </div>
        <div className="details">
          <h6>{Experience.role}</h6>
          <p>
            {Experience.company}
            <span> tipo di impiego (a tempo pieno/part time)</span>
          </p>
          <p>{Experience.area}</p>
          <p className="text-body-secondary">
            {dataInizio.toLocaleDateString()} - {dataFine.toLocaleDateString()}{" "}
            · {DateDifference(dataFine, dataInizio)}
          </p>
          <p className="text-body-secondary">{Experience.area}</p>
          <br />
          <p>{Experience.description}</p>
        </div>
      </Col>
      <Col className="text-end" md={4}>
        <Button
          variant="light"
          className="me-2"
          onClick={() => handleDelete(Experience._id, userId)}
        >
          <Icon.Trash />
        </Button>
        <AddExperience
          userId={userId}
          show={show}
          setShow={setShow}
          expId={Experience._id}
        />
        <Button variant="light" onClick={() => setShow(true)}>
          <Icon.PencilFill />
        </Button>
      </Col>
    </Row>
  );
}
