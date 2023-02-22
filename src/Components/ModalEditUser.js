import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Button, Modal, NavLink} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {getAllUsers, updateUser} from "../Redux/Actions/AllActions/AdminAction";
import {MDBIcon} from "mdb-react-ui-kit";
import Select from "react-select/base";
import { MultiSelect } from "react-multi-select-component";

const ModalEditUser = (user) => {

  const [show, setShow] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.user.role);
  const[databases, setDatabases] = useState([]);
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

  useEffect(() => {
    const items = user.user.availableDatabases;
    const convertedItems = items.map(item => ({
      label: item.charAt(0).toUpperCase() + item.slice(1),
      value: item
    }));
    setDatabases(convertedItems)
  }, [])

  const options = [
    { label: "Database_KTH", value: "database_kth" },
    { label: "Database_KAROLINSKA", value: "database_karolinska" },
    { label: "Database_BOLLMORA_VÅRDCENTRAL", value: "database_bollmora_vårdcentral" },
  ];
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
    const DatabaseList = databases.map(value => value.value);

    if (password) {
      const theEditUser = {
        identity: user.user.identity,
        username: user.user.username,
        password: password,
        firstname: user.user.firstName,
        lastname: user.user.lastName,
        role: role,
        availableDatabases: DatabaseList
      }
      dispatch(updateUser(theEditUser)).then((response) => {
        console.log(response)
        setResponseMsg(response)
      })
        .catch((err) => {
          console.log("ERROR" + err.body)
        })
    } else {
      const theEditUser = {
        identity: user.user.identity,
        username: user.user.username,
        firstname: user.user.firstName,
        lastname: user.user.lastName,
        role: role,
        availableDatabases: DatabaseList
      }
      dispatch(updateUser(theEditUser)).then((response) => {
        console.log(response)
        setResponseMsg(response)
      })
        .catch((err) => {
          console.log("ERROR" + err.body)
        })

    }

  }

  function getMessage() {
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
        <MDBIcon fas icon="user-edit" />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="animatedLine">{user.user.username}</h3>
          <h5>Databases</h5>

          <MultiSelect
            options={options}
            value={databases}
            onChange={setDatabases}
            labelledBy="Select"
          />


          <h5 className="mt-3">Role</h5>
          <select
            placeholder={user.user.role}
            className="form-select"
            value={role}
            onChange={event => setRole(event.target.value)}>
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_USER">ROLE_USER</option>
          </select>

          <div className="form-check form-check-inline mt-3" onChange={event => {
            setshowPassword(showPassword => !showPassword) || setPassword("")
          }}>
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
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
          <Button variant="primary" className="btn btn-danger" onClick={event => {
            handleClose()
          }}>
            Close
          </Button>
          <Button variant="primary" className="btn btn-success"
                  onClick={event => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default ModalEditUser;
