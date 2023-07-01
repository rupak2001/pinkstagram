import React from 'react'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react'
import serverURL from './utils/url';

var email = "";

var Pic_up = (props) => {
    var [file, setFile] = useState();
    var onChange = (event) => {
        let base64String = ""
        if (event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0])
            reader.onloadend = () => {
                base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");

                base64String = "data:image/jpeg;base64,"+base64String
                setFile(base64String)
            }
        }

    }

    var pic_upload = async () => {
        email = document.getElementById('email_extractor').innerHTML;
        // var fromdat = new FormData();
        if (file) {
            // fromdat.append('file', file);


            /*for(var i = 0;i<file.length;i++){
                fromdat.append('file',file[i]);
    
            }*/
            var desc = document.getElementById("descbox").value
            console.log(desc)

            if (!desc) {
                desc = "hello"
            }
            console.log(desc)

            await fetch(`${serverURL }/picup_test/${email}/${desc}`, {
                method: "POST",
                body: JSON.stringify({imgFile:file}),
                headers : {"Content-Type" :"application/json"}
            })
            .then(alert("photo uploaded successfully"))
            .catch(err => { console.log(err) })
            
        }
        else {
            alert('NO IMAGE/s SELECTED')
        }


    }
    return (
        <div id="control_box1" className='w-full h-32 bottom-0 flex flex-col fixed justify-end items-center '>
            <input id="descbox" className='h-10 w-full sm:w-1/3 rounded-none outline-none text-center border-2 border-solid border-pink-500' type="text" placeholder="enter description"></input>
            <div id="updiv" className='bg-white w-full h-16 md:h-12 md:w-1/2  flex flex-row justify-around items-center'>
                <input type="file" className='w-1/2 text-sm h-[55%] outline-none cursor-pointer ' accept="image/*" name="file" onChange={onChange} />
                <p id="email_extractor" style={{ display: "none" }}>{props.finname}</p>
                <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => { pic_upload() }}
                >
                </Button>
            </div>
        </div>
    )
}

export default Pic_up;