import axios from "axios";
import Cookies from 'js-cookie'

const API_URL = "http://localhost:8085/api/auth/"

const getAllUsers = () => {
  const token = JSON.parse(Cookies.get("user")).token;
  return axios.get(API_URL + "getAllUser", {headers: {"Authorization": `Bearer ${token}`}})
}

const updateUser = (theedituser) => {
  const token = JSON.parse(Cookies.get("user")).token;
  console.log("KOMMA HIT:" + JSON.stringify(theedituser))
  return axios.patch(API_URL + "updateUser", theedituser, {headers: {"Authorization": `Bearer ${token}`}})
};

export default {
  getAllUsers,
  updateUser
}
