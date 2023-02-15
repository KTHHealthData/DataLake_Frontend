import React, {useState, useRef, useEffect} from "react";
import "../Styles/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "../Components/SidebarMenu";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import AdminTable from "../Components/AdminTable";


const AdminPage = () => {


  if (!Cookies.get('user')) {
    return <Navigate to="/"/>;
  }
  if (JSON.parse(Cookies.get('user')).role == "ROLE_USER") {
    return <Navigate to="/Homepage"/>;
  }

  return (
    <div>

      <Sidebar/>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col m-5">
            <h1 className="text-white mb-5 animatedLine">Admin page</h1>
            <AdminTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;