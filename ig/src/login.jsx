import React from 'react'
import './css/login.css'



var Login = (props) => {
    return (
        <div id = "contdiv">
            <div id="login_div">
                <h1 id="logh1">PINKSTAGRAM</h1>
                <div id="login_div2">
                    <input type="text" placeholder="enter email" id="logip1"></input>
                    <input type="password" placeholder="password" id="logip2"></input>
                    <button id="logbut" onClick={props.login_func}>Log-in</button>
                    <div id="errdiv">
                        <p id="errmsg">{props.errmsg}</p>
                    </div>
                </div>
                <div>
                    <p id="logp2">dont have an account? <p style={{ color: 'blue', cursor: 'pointer' }} onClick={props.change_to_sign}>Sign-up</p></p>
                </div>
            </div>
        </div>
    )
}

export default Login