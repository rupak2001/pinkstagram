import React from 'react'
import './css/login.css'

var Signup = (props) => {
    return (
        <div id = "contdiv">
            <div id="login_div">
                <h1 id="logh1">PINKSTAGRAM</h1>
                <div id="login_div2">
                    <input type="text" placeholder="enter email" id="logip1"></input>
                    <input type="text" placeholder="name" id="logip2"></input>
                    <input type="password" placeholder="password" id="logip3"></input>
                    <button id="signbut" onClick={props.logf}>Sign-up</button>
                    <p style={{ color: 'red', fontWeight: "700" }}>{props.errmsg}</p>
                </div>
                <div>
                    <p id="logp2">Have an account? <p style={{ color: 'blue', cursor: 'pointer' }} onClick={props.change_to_log}>Log in</p></p>
                </div>
            </div>
        </div>
    )
}

export default Signup