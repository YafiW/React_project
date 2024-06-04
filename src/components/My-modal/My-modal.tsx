import React, { FC, useEffect, useState } from 'react';
import './My-modal.scss';
import { Button, Modal } from 'react-bootstrap';
import usersModel from '../../models/userModel';

interface MyModalProps {
  children: React.ReactNode;
  currentFunction: () => void;
  funcSetIsDisplay: () => void;
  title: string;
}

const MyModal: FC<MyModalProps> = (props: MyModalProps) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnYes = () => { handleClose(); props.currentFunction() };


  return (
    <>
      {show ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton onClick={props.funcSetIsDisplay}>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.children}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.funcSetIsDisplay}>
              Close
            </Button>
            <Button variant="primary"  onClick={() => {
              props.funcSetIsDisplay(); 
              handleOnYes(); 
            }}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export default MyModal;
