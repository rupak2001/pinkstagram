import React from 'react'



var Login = (props) => {
    return (
        <div id = "contdiv" className='flex justify-center items-center h-screen w-screen'>
            <div id="login_div" className='flex flex-col  border-2 border-rose-300/100 h-128 p-2 w-96 bg-white justify-start items-center justify-evenly'>
                <h1 id="logh1" className='font-lobster2 text-3xl'>PINKSTAGRAM</h1>
                <div id="login_div2" className='flex flex-col items-center  h-64 w-full justify-evenly rounded-2 border-t-2 border-b-2 border-green-500'>
                    <input type="text" placeholder="enter email" className='h-8 w-80 rounded-2 w-full pl-2 border-2 border-pink-400 outline-none'  id="logip1"></input>
                    <input type="password" placeholder="password" className='h-8 w-80 rounded-2 w-full pl-2 border-2 border-pink-400 outline-none' id="logip2"></input>
                    <button id="logbut" className='h-8 w-80 rounded-2 pl-2 bg-indigo-700 hover:bg-indigo-600  text-gray-100' onClick={props.login_func}>Log-in</button>
                    <div id="errdiv">
                        <p id="errmsg" className='text-center font-bold text-sm text-red-600'>{props.errmsg}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p id="logp2">dont have an account?</p>
                    <p className='cursor-pointer text-indigo-700 font-bold hover:underline' onClick={props.change_to_sign}>Sign-up</p>
                </div>
            </div>
        </div>
    )
}

export default Login