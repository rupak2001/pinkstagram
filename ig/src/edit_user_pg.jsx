import React from 'react'

var Editpg = (props) => {
    return (
        <div id="editpgd" className='w-screen flex justify-center mt-20 md:mt-32 items-center overflow-y-hidden'>
            <div className=" bg-lime-200 h-96 w-[38rem] flex flex-col rounded-lg border-2 border-pink-400 justify-center items-center justify-evenly">
                <div id="editpgd1" className='flex flex-col justify-center items-center justify-evenly'>
                    <label>
                        <img id="pp" className='w-36 h-36 rounded-full cursor-pointer' src={props.pp} alt="pp" />
                        <input id="ppfile" style={{ display: "none" }} type="file" accept="image/*" name="file" onChange={props.cngpp} />
                    </label>
                    <button className='bg-white hover:bg-gray-100 text-indigo-700 rounded-xl w-48 mt-2' onClick={props.editpp}>Change profile picture</button>
                </div>
                <div id="editpgd2" className='flex flex-col justify-center items-center'>
                    <h4 className='mb-2 underline font-mono'>change name</h4>
                    <div className='flex flex-row w-full justify-center items-center'>
                        <input className='mr-4 pl-2 outline-none' id="nmchange" type="text" placeholder="enter new name" />
                        <button className='bg-white hover:bg-gray-100 text-indigo-700 w-16 rounded-lg' onClick={props.editname}>submit</button>
                    </div>

                </div>
                <div id="editpgd3" className='flex flex-col justify-center items-center'>
                    <h4 className='mb-2 underline font-mono'>change password</h4>
                    <div className='flex flex-col md:flex-row  w-full justify-center items-center'>
                        <input className='mr-2 mb-4 pl-2 outline-none' id="oldpass" type="password" placeholder="enter existng password" />
                        <input className='mr-2 pl-2 mb-4 outline-none' id="newpass" type="password" placeholder="enter new password" />
                        <button className='bg-white hover:bg-gray-100 text-indigo-700 w-16 rounded-lg' onClick={props.editpass}>submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editpg;