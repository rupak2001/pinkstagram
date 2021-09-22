import React from 'react'
import './css/editpg.css'

var Editpg = (props)=>{
    return(
        <div id = "editpgd">
            <div id = "editpgd1">
                <label>
                <img id = "pp" src = {props.pp} alt = "pp"/>
                <input id = "ppfile" style = {{display:"none"}} type = "file" accept = "image/*" name = "file" onChange = {props.cngpp}/>
                </label>
                <button onClick = {props.editpp}>Change profile picture</button>
            </div>
            <div id = "editpgd2">
                <h4>change name</h4>
                <input id = "nmchange" type = "text" placeholder = "enter new name"/>
                <button onClick = {props.editname}>submit</button>
            </div> 
            <div id = "editpgd3">
                <h4>change password</h4>
                <input id = "oldpass" type = "password" placeholder = "enter existng password"/>
                <input id = "newpass" type = "password" placeholder = "enter new password"/>
                <button onClick = {props.editpass}>submit</button>
            </div>
        </div>
    )
}

export default Editpg;