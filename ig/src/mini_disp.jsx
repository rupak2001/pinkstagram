import React from "react";
import "./css/min_disp.css"

var MinDisp = (props) => {
    return (
        <div id="mindisp1" className="w-screen h-screen top-0 fixed pt-0 md:pt-16 md:pt-18 backdrop-blur-lg flex flex-row justify-center items-start">
            <div className="w-screen md:w-146 h-full md:h-128  mt-14 md:mt-8 absolute  flex flex-row justify-center items-center border-2 border-pink-400 bg-white" >
                <div className="w-1/2 h-full hidden md:block " >
                    <img id="minimg" style = {{width:"100%",height:"100%",objectFit:"cover"}} src={props.minactpic} />
                </div>
                <div id="mindisp2" className="w-full md:w-1/2 h-full">
                    <div id="minnmdiv" className="h-12 w-full border-b-2 flex flex-row justify-center items-center">
                        <img id="mpp" className = "w-8 h-8 mr-4 ml-20 rounded-2xl" src={props.minpp} />
                        <p id="mpn">{props.minname}</p>
                        <input type="image" className = "w-6 h-6 ml-24 rounded-xl" id="exitmin" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Saint_Andrew%27s_cross_black.svg/1200px-Saint_Andrew%27s_cross_black.svg.png" onClick={props.exitmin} />
                    </div>
                    <div id="commentsmin" className="w-full">
                        {props.comments}
                    </div>
                    <div id="mindisp3" className=" w-full h-10 flex flex-row border-t-2">
                        <input className="outline-none w-full h-10 rounded-none pl-2" id="mindispcominp" type="text" placeholder="Add a Comment" />
                        <button id="mindispcombut" className = " w-10 h-10 border-l-2 rounded-none bg-white text-blue-700" onClick={props.minsendbut}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MinDisp;