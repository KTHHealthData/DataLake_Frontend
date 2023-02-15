import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {updateUser} from "../Redux/Actions/UserActions/UserAction";


const AdminPage = (props) => {
  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(props.user.role);
  const [showPassword, setshowPassword] = useState(false);
  const checkBtn = useRef();


  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeRole = (e) => {
    const role = e.target.value;
    setRole(role);
  };

  const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
  ]
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const handleClose = () => {
    setResponseMsg("")
    setShow(false);
  }

  const handleSubmit = (e) => {
    //Kalla på axios funktionen

    const theEditUser = {
      identity: props.user.identity,
      username: props.user.username,
      password: password,
      firstname: props.user.firstName,
      lastname: props.user.lastName,
      role: role,
      availableDatabases: props.user.availableDatabases
    }
    dispatch(updateUser(theEditUser)).then((response) => {
      console.log(response)
      setResponseMsg(response)
    })
      .catch((err) => {
        console.log("ERROR" + err.body)
      })

  }

  function getMessage() {
    console.log("apa" + responseMsg.status)
    if (responseMsg.status === 200)
      return <div className="form-group-sm mt-2">
        <div className="alert alert-success" role="alert">
          {responseMsg.data}
        </div>
      </div>
    return <div className="form-group-sm mt-2" hidden={!responseMsg}>
      <div className="alert alert-danger" role="alert">
        {responseMsg.data}
      </div>
    </div>
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        Edit
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="animatedLine">{props.user.firstName} {props.user.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Databases</h5>
          <select
            className="form-select"
          >
            <option value="ROLE_ADMIN">KTH</option>
            <option value="ROLE_USER">ICA MAXI</option>
          </select>
          <h5 className="mt-3">Role</h5>
          <select
            placeholder={props.user.role}
            className="form-select"
            value={role}
            onChange={event => setRole(event.target.value)}>
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_USER">ROLE_USER</option>
          </select>

          <div className="form-check form-check-inline mt-3" onChange={event =>{ setshowPassword(showPassword=>!showPassword) }}>
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"  />
            <h6>Check this if you want to create a new password</h6>
          </div>
          <div className="form-group mb-5" hidden={!showPassword}>
            <input
              type="text"
              className="form-control"
              name="password"
              value={password}
              placeholder="New password"
              id="floatingPassword"
              onChange={onChangePassword}
              required
            />
          </div>
          {getMessage()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="btn btn-success"
                  onClick={event => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default AdminPage;
