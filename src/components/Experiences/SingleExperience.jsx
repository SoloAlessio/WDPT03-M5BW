import { Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";
import AddExperience from "../AddExperience/Index";
import imgDefault from "./default_exp_img.png"

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

export default function SingleExperience({
  getExperiences,
  Experience,
  userId,
  myId,
}) {
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
        getExperiences();
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
      <Col className="d-flex mb-4" md={9}>
        <div>
          <img
            src={Experience.image ? Experience.image : imgDefault }
            className="rounded-circle"
            alt="experience-cover"
            width={48} height={48}
          />
        </div>
        <div className="details ps-3">
          <h6>{Experience.role}</h6>
          <p>
            {Experience.company}
            <span> · a tempo pieno</span>
          </p>
          <p className="text-body-secondary">
            {dataInizio.toLocaleDateString()} - {dataFine.toLocaleDateString()}{" "}
            · {DateDifference(dataFine, dataInizio)}
          </p>
          <p className="text-body-secondary mb-2">{Experience.area}</p>
          <p>{Experience.description}</p>
        </div>
      </Col>
      {userId === myId && (
        <Col className="text-end" md={3}>
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
      )}
    </Row>
  );
}
