import React from 'react'
import comment_icon from './icons/comment_icon.svg'
import heart_outlined from './icons/heart_outlined.svg'
import heart_red from './icons/heart_red.svg'
var P_dummy = (props) => {
    return (
        <div id="p_dummywh" className='w-screen sm:w-128  mt-4 md:mt-4 bg-white'>
            <div id="pdummytitle" className = "h-14 flex flex-row justify-start items-center border-2 border-solid border-pink-300">
                <img className = "h-8 w-8 ml-4 rounded-2xl" src={props.dp} alt="dp" id="profpic" />
                <h4 id="profname" className = "ml-4 text-sm">{props.uname}</h4>
            </div>
            <img src={props.act_img} alt="postimg" id="postimg" style = {{height:"580px", width:"100%", objectFit:"cover"}} ></img>
            <div id="inpbox1" className='h-10 flex flex-row items-center border-l-2 border-r-2 '>
                <input className="ml-2 mr-2 h-7 w-7 cursor-pointer" type="image" onClick={props.like} alt="like" id={props.likeid} src={props.likebpic}></input>
                <input className=" h-8 w-8 cursor-pointer" type="image" onClick={props.compg} alt="comment" id = {props.commentbutid} class="w-6 h-6" src={comment_icon}></input>
            </div>
            <div className='border-l-2 border-r-2 pl-2 h-4' style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                <p id={props.totlikes} className='font-bold mr-2'>{props.countlikes}</p>
                <p>likes</p>
            </div>
            <div className='border-l-2 border-r-2 pl-2 h-4' style={{ display: "flex", flexDirection: "row", height: "40px" }}>
                <p id={props.totcomms} className='font-bold mr-2'>{props.countcomms}</p>
                <p>comments</p>
            </div>
            <div id="nddiv" className='border-l-2 border-r-2 border-b-2 pl-2 pb-2 flex flex-row'>
                <p className='font-bold mr-2' >{props.desc_uname}</p>
                <p className='mr-2' >{props.desc}</p>
            </div>
            <div id="othcmm" className='border-l-2 border-r-2 pl-2 h-6  flex flex-row'>
                <h4 className='font-bold mr-2'>{props.txtuname}</h4>
                <p className='mr-2'>{props.txtcmnt}</p>
            </div>
            <div id={props.commid} className="commid">
            </div>
            <div id="comment_inp" className="flex flex-row h-10 border-2 mb-2 outline-none">
                <input name={props.countcm} type="text" placeholder="Add a comment" style={{width:"90%"}} className="h-full outline-none pl-2" onChange={props.commnt_val}></input>
                <button id="comnt_pst_btn" className = "text-blue-600 bg-white" style={{width:"10%"}} onClick={props.post_cmnt}>post</button>
            </div>

        </div>
    )
}

export default P_dummy;