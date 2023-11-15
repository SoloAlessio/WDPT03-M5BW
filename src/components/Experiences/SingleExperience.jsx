import { Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Icon from "react-bootstrap-icons";

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

export default function SingleExperience({ profile, userId }) {
  const navigate = useNavigate();
  const dataInizio = new Date(profile.startDate);
  const dataFine =
    profile.endDate === null ? new Date() : new Date(profile.endDate);

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
        navigate("/Profile");
      }
    } catch (error) {
      toast.error("Ops, Qualcosa è andato storto");
    }
  };

  return (
    <Row>
      <Col className="d-flex gap-4">
        <div>
          <img
            src="https://picsum.photos/48/48"
            style={{ width: "48px", height: "48px", backgroundColor: "grey" }}
            className="rounded-circle"
            alt="experience-cover"
          />
        </div>
        <div className="details">
          <h6>{profile.role}</h6>
          <p>
            {profile.company}
            <span> tipo di impiego (a tempo pieno/part time)</span>
          </p>
          <p>{profile.area}</p>
          <p className="text-body-secondary">
            {dataInizio.toLocaleDateString()} - {dataFine.toLocaleDateString()}{" "}
            · {DateDifference(dataFine, dataInizio)}
          </p>
          <p className="text-body-secondary">{profile.area}</p>
          <br />
          <p>{profile.description}</p>
        </div>
      </Col>
      <Col className="text-end">
        <Button
          variant="outline-danger"
          onClick={() => handleDelete(profile._id, userId)}
        >
          <Icon.Trash />
        </Button>
      </Col>
    </Row>
  );
}
