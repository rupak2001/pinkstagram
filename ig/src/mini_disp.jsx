import React from "react";
import "./css/min_disp.css"


var MinDisp = (props)=>{
    return(
        <div id = "mindisp1">
            <img id = "minimg" src = {props.minactpic}/>
            <div id = "mindisp2">
                <div id = "minnmdiv">
                    <img id = "mpp" src = {props.minpp}/>
                    <p id = "mpn">{props.minname}</p>
                    <input type = "image" id = "exitmin"  src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Saint_Andrew%27s_cross_black.svg/1200px-Saint_Andrew%27s_cross_black.svg.png" onClick = {props.exitmin}/>
                </div>
                <div id = "commentsmin">
                    
                </div>
                <div id = "mindisp3">
                    <input id = "mindispcominp" type = "text" placeholder = "Add a Comment"/>
                    <button id = "mindispcombut" onClick = {props.minsendbut}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default MinDisp;