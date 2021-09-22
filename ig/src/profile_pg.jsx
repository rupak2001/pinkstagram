import React from 'react'
import "./css/profpg.css"

var Profile = (props) => {
    return (
        <div>
            <div id="propinfo">
                <div id="propinfoppd">
                    <img src= {props.dp} alt="pp" id="profpgpp" />
                </div>

                <div id="profpgud1" >
                    <div id="propinfod1">
                        <h2>{props.name}</h2>
                        <button id="prof_editor" onClick = {props.edprof}>edit profile</button>
                    </div>
                    <div id="propinfod2">
                        <h4>{props.postno}<p>posts</p></h4>
                        <h4 style = {{cursor:"pointer"}} onClick = {props.showfollowerlist}>{props.followerno}<p>followers</p></h4>
                        <h4 style = {{cursor:"pointer"}} onClick = {props.showfollowinglist}>{props.followingno}<p>following</p></h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;