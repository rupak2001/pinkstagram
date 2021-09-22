import React from 'react'
import './css/im_up_test.css'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useState } from 'react'

var email = "";

var Pic_up = (props) => {
    var [file, setFile] = useState();
    var onChange = (event) => {
        setFile(event.target.files[0])

        /*if (event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0])
            reader.onloadend = () => {
                setpic(<img id="uploaded_pic" src={reader.result} />);
            }
        }*/

    }

    var pic_upload = async () => {
        email = document.getElementById('email_extractor').innerHTML;
        var fromdat = new FormData();
        if (file) {
            fromdat.append('file', file);


            /*for(var i = 0;i<file.length;i++){
                fromdat.append('file',file[i]);
    
            }*/
            var desc = document.getElementById("descbox").value
            console.log(desc)

            if (!desc) {
                desc = "hello"
            }
            console.log(desc)

            await fetch("http://localhost:8000/picup_test/" + email + "/" + desc, {
                method: "POST",
                body: fromdat
                //headers : {"content-type" :"multipart/form-data"}
            })
                .catch(err => { console.log(err) })
                .then(alert("photo uploaded successfully"))
        }
        else {
            alert('NO IMAGE/s SELECTED')
        }


    }
    return (
        <div id="control_box1">
            <input id="descbox" type="text" placeholder="description"></input>
            <div id="updiv">
                <input type="file" accept="image/*" name="file" onChange={onChange} />
                <p id="email_extractor" style={{ display: "none" }}>{props.finname}</p>
                <Button
                    variant="contained"
                    size="small"
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