import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Evil() {

    const [username, setUsername] = useState("");
    const [csrfOn, setCsrfOn] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
        setCsrfOn(localStorage.getItem("csrfVulnerableOn"));
    },[])

    return (
        <>
            <div className="evil-div">
                { csrfOn === "on" ? "Prevareni ste, HE HE" : "Napad je sprječen, idući put pripazite na sumnjive poveznice" }
            </div>
            <div className="back-div"><button onClick={() => {navigate("/profile")}}>Povratak</button></div>
            <img src={csrfOn === "on" ? `http://localhost:3000/changePassword/${username}/hackedPassword` : `http://localhost:3000/secureChangePassword/${username}/hackedPassword/tokenTry` } alt="trick"></img>
        </>
    )

}

export default Evil;