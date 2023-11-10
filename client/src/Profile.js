import { useEffect, useState} from "react";
import { useNavigate } from "react-router";

function Profile() {

    const navigate = useNavigate();

    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
    },[])

    const handleNewPassword = async (e) => {
        if (pass === confPass) {
            if (localStorage.getItem("csrfVulnerableOn")) {
                let response = await fetch(`https://web2-security-server.vercel.app/changePassword/${username}/${pass}`);
                let jsonData = await response.json();
            } else {
                let tokenResponse = await fetch(`https://web2-security-server.vercel.app/getToken/${username}/${pass}`);
                let tokenJsonData = await tokenResponse.json();
                let token = tokenJsonData[0].token;
                let response = await fetch(`https://web2-security-server.vercel.app/secureChangePassword/${username}/${pass}/${token}`);
                let jsonData = await response.json();
            }
            alert("Lozinka uspješno izmjenjena.");
        } else {
            alert("Passwords do not match.");
        }
    }

    const handleLogout = (e) => {
        sessionStorage.removeItem("username");
        localStorage.removeItem("csrfVulnerableOn");
        navigate("/");
    }

    return (
        <div className="main-div">
            <div className="logout-div"><button onClick={handleLogout}>Odjava</button></div>
            <div className="change-password-div">
                <div>
                    <b>Change your password:</b>
                </div>
                <div>New password: <input type="password" onChange={(e) => {setPass(e.target.value)}}></input></div>
                <div>Confirm password: <input type="password" onChange={(e) => {setConfPass(e.target.value)}}></input></div>
                <div><button onClick={handleNewPassword}>Potvrdi</button></div>
            </div>
            <div><button onClick={() => {navigate("/evil")}}>Zaradi 100€ u pola sata</button></div>
        </div>
    );
}

export default Profile;