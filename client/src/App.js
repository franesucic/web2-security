import "../src/App.css"
import { useState } from "react";

function App() {

const [sqlInj, setSqlInj] = useState(false);
const [csrf, setCsrf] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSqlButton = (e) => {
  setSqlInj(!sqlInj)
}

const handleCsrfButton = (e) => {
  setCsrf(!csrf)
}

/*const handleSubmit = async (e) => {
  if (!sqlInj) {
    const regex = /^[a-zA-Z0-9]+$/;   // username i password mogu biti samo kombinacija slova i brojki
    if (regex.test(username) && regex.test(password)) {
      let response = await fetch(`http://localhost:3000/sqlon/${username}/${password}`);
      let jsonData = await response.json();
      console.log(jsonData)
      alert(JSON.stringify(jsonData))
    } else {
      alert("Neispravan unos.");
    }
  } else {
    let response = await fetch(`http://localhost:3000/sqloff/${username}/${password}`);
    let jsonData = await response.json();
    console.log(jsonData)
    alert(JSON.stringify(jsonData))
  }
}*/

const handleSubmit = async (e) => {
  if (sqlInj) {
    let response = await fetch(`http://localhost:3000/sqlon/${username}/${password}`);
    let jsonData = await response.json();
    console.log(jsonData)
    alert(JSON.stringify(jsonData))
  } else {
    let response = await fetch(`http://localhost:3000/sqloff/${username}/${password}`);
    let jsonData = await response.json();
    if (jsonData.length === 0) {
      alert("Pogrešan unos");
    } else {
      console.log(jsonData)
    alert(JSON.stringify(jsonData))
    }    
  }
}

const handleUsernameChange = (e) => {
  setUsername(e.target.value);
}

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
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
          <div><b>Dohvati svoje podatke:</b> (Za testiranje ranjivosti unjeti navedeni tekst u neko od polja: a' or '1'='1)</div>
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
          <span>Nesto</span>
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
