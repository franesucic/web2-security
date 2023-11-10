import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

const [sqlInj, setSqlInj] = useState(false);
const [csrf, setCsrf] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [username2, setUsername2] = useState("");
const [password2, setPassword2] = useState("");

const navigate = useNavigate();

useEffect(() => {
  localStorage.setItem("csrfVulnerableOn", "off");
  sessionStorage.removeItem("username");
},[]);

const handleSqlButton = (e) => {
  setSqlInj(!sqlInj)
}

const handleCsrfButton = (e) => {
  setCsrf(!csrf)
}

const handleSubmit = async (e) => {
  if (sqlInj) {
    let response = await fetch(`https://web2-security-server.onrender.com/sqlon/${username}/${password}`);
    let jsonData = await response.json();
    if (jsonData.length < 1) alert("Pogrešan unos")
    else {
      let users = jsonData;
      let string = "";
      for (let i = 0; i < users.length; ++i) {
        string += ("Username: " + users[i].username + ", Password: " + users[i].password + ", Full name: " + users[i].fullname + ", Adress: " + users[i].adress + ", Age: " + users[i].age + "\n");
      }
      alert(string);
    }
  } else {
    let response = await fetch(`https://web2-security-server.onrender.com/sqloff/${username}/${password}`);
    let jsonData = await response.json();
    if (jsonData.length === 0) {
      alert("Pogrešan unos");
    } else {
      const user = jsonData[0];
      alert("Username: " + user.username + ", Password: " + user.password + ", Full name: " + user.fullname + ", Adress: " + user.adress + ", Age: " + user.age);
    }    
  }
}

const handleSubmit2 = async (e) => {
  if (csrf) {
    let response = await fetch(`https://web2-security-server.onrender.com/csrfon/${username2}/${password2}`);
    let jsonData = await response.json();
    if (jsonData.length < 1) alert("User not found.");
    else {
      sessionStorage.setItem("username", username2);
      if (csrf) {
        localStorage.setItem("csrfVulnerableOn", "on");
      } else {
        localStorage.setItem("csrfVulnerableOn", "off");
      }
      navigate("/profile");
    }
    console.log(jsonData)
  } else {
    let response = await fetch(`https://web2-security-server.onrender.com/csrfoff/${username2}/${password2}`);
    let jsonData = await response.json();
    if (jsonData.length < 1) alert("User not found.");
    else {
      sessionStorage.setItem("username", username2);
      if (csrf) {
        localStorage.setItem("csrfVulnerableOn", "on");
      } else {
        localStorage.setItem("csrfVulnerableOn", "off");
      }
      navigate("/profile");
    }
    console.log(jsonData)
  }
}

const handleUsernameChange = (e) => {
  setUsername(e.target.value);
}

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
}

const handleUsernameChange2 = (e) => {
  setUsername2(e.target.value);
}

const handlePasswordChange2 = (e) => {
  setPassword2(e.target.value);
}

  return (
  <>
    <div id="main-title">Drugi projekt - sigurnost</div>
    <div id="first-div">
      <div className="subtitle">
        SQL umetanje (SQL Injection) 
      </div>
      <div className="task-div">
        { sqlInj ? <button onClick={handleSqlButton}>Isključi ranjivost</button> : <button onClick={handleSqlButton}>Uključi ranjivost</button> }
        <div className="action-div">
          <div><b>Dohvati svoje podatke:</b> (Za testiranje ranjivosti unjeti navedeni tekst u polja: <span style={{backgroundColor:"red"}}>a' or '1'='1</span>)</div>
          <span>Korisničko ime: </span><input type="text" onChange={handleUsernameChange}></input><span>Lozinka: </span><input type="password" onChange={handlePasswordChange}></input><button onClick={handleSubmit}>Unesi</button>
        </div>
      </div>
    </div>
    <div id="second-div">
      <div className="subtitle">
        Lažiranje zahtjeva na drugom sjedištu (Cross Site Request Forgery, CSRF)
      </div>
      <div className="task-div">
        { csrf ? <button onClick={handleCsrfButton}>Isključi ranjivost</button> : <button onClick={handleCsrfButton}>Uključi ranjivost</button> }
        <div className="action-div">
          <div><b>Prijava: </b></div>
          <div><span>Korisničko ime: </span><input type="text" onChange={handleUsernameChange2}></input><span>Lozinka: </span><input type="password" onChange={handlePasswordChange2}></input><button onClick={handleSubmit2}>Unesi</button></div>
        </div>
      </div>
    </div>
  </>
  );

}

export default Home;