import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
function TokenInput() {
    const [show, setShow] = useState(false);
    const [token, setName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (evt) => {
        evt.preventDefault();
        localStorage.setItem('token', token);
        window.location.reload();
    }
    return (
      <>
        <Button variant="light" onClick={handleShow}>
          Token
        </Button>
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Please insert your token to continue.</Modal.Title>
          </Modal.Header>
          <Modal.Body>     
          <form onSubmit={handleSubmit} className="row col-11 mx-auto ">  
        <input
        className="form-control col-7 text-truncate"
          type="text"
          value={token}
          onChange={e => setName(e.target.value)}
          required
          placeholder="ex. de3e35c0fb6c1a21263g5bc28125bbgp9c21182z"
        />
         
            <Button className="offset-1 col-4" type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
            </form>
            </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default TokenInput;