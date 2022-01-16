import React from 'react'

var Signup = (props) => {
    return (
        <div id = "contdiv" className='flex justify-center items-center h-screen w-screen'>
            <div id="login_div" className='flex flex-col  border-2 border-rose-300/100 h-128 p-2 w-96 bg-white justify-start items-center justify-evenly'>
                <h1 id="logh1" className='font-lobster2 text-3xl'>PINKSTAGRAM</h1>
                <div id="login_div2" className='flex flex-col items-center  h-64 w-full justify-evenly rounded-2 border-t-2 border-b-2 border-green-500'>
                    <input type="text" className='h-8 w-80 rounded-2 w-full pl-2 border-2 border-pink-400 outline-none' placeholder="enter email" id="logip1"></input>
                    <input type="text" className='h-8 w-80 rounded-2 w-full pl-2 border-2 border-pink-400 outline-none' placeholder="name" id="logip2"></input>
                    <input type="password" className='h-8 w-80 rounded-2 w-full pl-2 border-2 border-pink-400 outline-none' placeholder="password" id="logip3"></input>
                    <button id="signbut" className='h-8 w-80 rounded-2 pl-2 bg-indigo-700 hover:bg-indigo-600  text-gray-100' onClick={props.logf}>Sign-up</button>
                    <p style={{ color: 'red', fontWeight: "700" }}>{props.errmsg}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p id="logp2">Have an account? </p>
                    <p className='cursor-pointer text-indigo-700 font-bold hover:underline' onClick={props.change_to_log}>Log in</p>
                </div>
            </div>
        </div>
    )
}

export default Signup