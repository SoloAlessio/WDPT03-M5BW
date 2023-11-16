import { useState } from "react";
import { Modal } from "react-bootstrap";
import { CameraFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { ring } from "ldrs";

function ModifyImg({ myProfile, getMyProfile, show, setShow }) {
  ring.register();
  const handleClose = () => setShow(false);
  const [fd, setFd] = useState(new FormData());
  const [loading, setLoading] = useState(false)

  const handleFile = (ev) => {
    setFd((prev) => {
      prev.delete("profile");
      prev.append("profile", ev.target.files[0]);
      return prev;
    });
    ev.preventDefault();
    setLoading(true);
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${myProfile["_id"]}/picture`,
      {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        getMyProfile();
        toast.success("Immagine cambiata con successo!");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("oh oh riprova!");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="Modal-imgProfile">
        <Modal.Header closeButton>
          <Modal.Title>Foto Profilo</Modal.Title>
        </Modal.Header>

        <Modal.Body className="m-auto">
          <img
            src={myProfile["image"]}
            className="rounded-circle object-fit-cover"
            alt="ProPic"
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <label className="custom-file-upload">
            <input type="file" onChange={handleFile} />
            <div className="d-flex flex-column align-items-center">
              {loading ? (
                <l-ring
                  size="40"
                  stroke="5"
                  bg-opacity="0"
                  speed="2"
                  color="#0a66c2"
                ></l-ring>
              ) : (
                <>
                  <CameraFill size={20} />
                  <p className="fw-medium m-0">Cambia Foto</p>
                </>
              )}
            </div>
          </label>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModifyImg;
