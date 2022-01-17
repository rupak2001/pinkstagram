import React from 'react'

var Profile = (props) => {
    return (
        <div className='w-screen h-48  flex flex-row justify-center items-center border bg-white'>
            <div id="propinfoppd" className='rounded-full'>
                <img src={props.dp} alt="pp" id="profpgpp" className='w-24 md:w-36 h-24 md:h-36 rounded-full' />
            </div>

            <div id="profpgud1" className='flex flex-col   justify-evenly justify-center items-center w-80 h-48' >
                <div id="propinfod1" className='flex flex-row border-b-2 pb-2 border-b-gray-300 justify-evenly justify-center items-center w-64'>
                    <h2 className='text-xl'>{props.name}</h2>
                    <button className='text-sm w-20 border-2 hover:bg-gray-100 rounded-md border-gray-300 bg-white text-indigo-700' id="prof_editor" onClick={props.edprof}>Edit Profile</button>
                </div>
                <div id="propinfod2" className='flex flex-row justify-center items-center w-64'>
                    <h4 className='mr-6 border-r-2 border-r-gray-200 pr-2'>{props.postno}<p>posts</p></h4>
                    <h4 className='cursor-pointer mr-6 border-r-2 border-r-gray-200 pr-2' onClick={props.showfollowerlist}>{props.followerno}<p>followers</p></h4>
                    <h4 className='cursor-pointer border-r-2 border-r-gray-200 pr-2' onClick={props.showfollowinglist}>{props.followingno}<p>following</p></h4>
                </div>
            </div>

        </div>
    )
}

export default Profile;