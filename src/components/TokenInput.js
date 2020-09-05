import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
function TokenInput() {
    const [show, setShow] = useState(true);
    const [token, setName] = useState("");

    const handleClose = () => setShow(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        localStorage.setItem('token', token);
        window.location.reload();
    }
    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please insert your token to continue.</Modal.Title>
          </Modal.Header>
          <Modal.Body>     
          <form onSubmit={handleSubmit} className="row col-11">  
        <input
        className="form-control col-7"
          type="text"
          value={token}
          onChange={e => setName(e.target.value)}
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