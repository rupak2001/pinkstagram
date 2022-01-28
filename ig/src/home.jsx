import React, { useState } from 'react'
import P_dummy from "./postdummy"
import Pic_up from "./photo_uploader"
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Profile from './profile_pg';
import Editpg from './edit_user_pg'
import MinDisp from './mini_disp';
import HashLoader from "react-spinners/HashLoader";
import { useCookies } from 'react-cookie'
import { Typography } from '@material-ui/core';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonIcon from '@mui/icons-material/Person';
import home_icon from './icons/home_icon.svg'
import user_icon from './icons/user_icon.svg'
import heart_outlined from './icons/heart_outlined.svg'
import heart_red from './icons/heart_red.svg'
import './css/min_disp.css'
import Search_box from './searchbox_mob';

var count = 0;
var i = 0;
var peplist;
var dp;
var comment;
var cmntbx;
var postcount;
var picdata;
var mincomspp;
var hostData;
var com_map_key = 0;
var Home = () => {
    var [show_bar, up_bar] = useState();
    var [picini, picshow] = useState();
    var [searchini, searchup] = useState();
    var [profpicsini, profpicsup] = useState();
    var [errmsg, errup] = useState();
    var [minini, minup] = useState();
    var [flistini, flistup] = useState();
    var [search_mob_ini, search_mob_up] = useState();
    var [cookies, setCookie, removeCookie] = useCookies(['user_inf'])
    var imageData = [];
    var userData = [];
    var p_c = 0;
    var hpp;
    var huname;


    //pic upload bar show/hide
    var show_pstbar = () => {
        ++count;
        if (count % 2 !== 0) {
            up_bar(<Pic_up finname={cookies.email} />)
        }
        else {
            up_bar();
        }
    }




    //image extractor for feed

    var feed_feeder = async () => {
        var imgdata = []
        search_mob_up()
        await fetch("https://pinkstagram-server.herokuapp.com/feed_feeder/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                imgdata = data;
            })


        for (var i = 0; i < imgdata.length; i++) {
            imageData.push(imgdata[i]);
        }

        for (var i = 0; i < imageData.length; i++) {
            await fetch('https://pinkstagram-server.herokuapp.com/exprofdata/' + imageData[i].email)
                .then(res => res.json())
                .then(data => {
                    userData.push(data[0])
                })
        }

        await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                hostData = data[0]
            })

        hpp = hostData.profimg
        huname = hostData.name;


        if (imageData.length === 0) {
            picshow()
        }
        else {


            var feedpics = imageData.map((datas) => {
                p_c += 1;

                var imgdata = datas.img_store
                var uname = userData[p_c - 1].name;
                var pp = userData[p_c - 1].profimg;

                var comdiv = datas.comments
                var othuname;
                var othcomm;

                if (comdiv[0]) {
                    comdiv = comdiv[0]
                    othuname = comdiv.username;
                    othcomm = comdiv.comment;
                }

                var iscom = 0;
                var likebutsrc;
                var likebutpic = datas.likes;

                for (var k = 0; k < likebutpic.length; k++) {
                    if (likebutpic[k].email === cookies.email) {
                        iscom = 1;
                        break;
                    }
                }


                if (iscom === 1) {
                    likebutsrc = heart_red
                }
                else {
                    likebutsrc = heart_outlined

                }
                return (
                    <P_dummy likebpic={likebutsrc} commentbutid={"commentno" + p_c} compg={(fid) => { op_minpg(fid) }} txtuname={othuname} txtcmnt={othcomm} totcomms={"totcomms" + p_c} countcomms={datas.comment_count} totlikes={"totlikes" + p_c} countlikes={datas.like_count} likeid={"likeid" + p_c} countcm={p_c} commid={"commid" + p_c} commnt_val={fetch_comment} post_cmnt={() => { post_cmnt(datas._id) }} like={(nid) => { like(datas._id, nid) }} dp={pp} desc_uname={uname} uname={uname} act_img={imgdata} desc={datas.description} />
                )
            })

            picshow(feedpics)
        }
        minup()
    }


    var op_minpg = async (fid) => {
        minup(<div className='w-screen h-screen fixed pb-64 flex justify-center items-center'>
            <HashLoader color='#FF1493' loading='true' size="100px" />
        </div>)
        var picid = fid.target.id;
        var picno = picid.substr(9, picid.length - 1)
        var extpicdata = imageData[picno - 1];
        var piclink = extpicdata.img_store;
        var b64pic;
        var host_name = "";

        await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + extpicdata.email)
            .then(res => res.json())
            .then(data => {
                b64pic = data[0].profimg
                host_name = data[0].name
            })


        var comments = await Promise.all(extpicdata.comments.map(async (eachcom) => {

            await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + eachcom.email)
                .then(nres => nres.json())
                .then(ndata => {
                    mincomspp = ndata[0].profimg
                })
            return (
                <div id="mincomdiv" key={com_map_key++}>
                    <img id="mincomimg" src={mincomspp} key={com_map_key++} />
                    <p id="mincomp1" key={com_map_key++}>{eachcom.username}</p>
                    <p id="mincomp2" key={com_map_key++}>{eachcom.comment}</p>
                </div>
            )
        }))
        minup(<MinDisp minsendbut={() => { sendcommin(extpicdata._id, picno) }} comments={comments} minpp={b64pic} minactpic={piclink} minname={host_name} exitmin={() => { exitmin() }} />)


    }

    var exitmin = () => {
        minup();
    }

    var sendcommin = async (sid, picno) => {
        var inp = document.getElementById("mindispcominp").value;

        if (inp) {
            var body = { email: cookies.email, comment: inp, id: sid, username: huname }
            fetch("https://pinkstagram-server.herokuapp.com/send_cmnt", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(document.getElementById("mindispcominp").value = null)



            var mincomdiv = document.createElement('div');
            mincomdiv.setAttribute('id', 'mincomdiv')

            var mincomimg = document.createElement('img')
            mincomimg.setAttribute('id', 'mincomimg')
            mincomimg.setAttribute('src', hpp)

            var mincomp1 = document.createElement('p')
            mincomp1.setAttribute('id', 'mincomp1')
            var mincomp1txt = document.createTextNode(huname)
            mincomp1.append(mincomp1txt)


            var mincomp2 = document.createElement('p')
            mincomp2.setAttribute('id', 'mincomp2')
            var mincomp2txt = document.createTextNode(inp)
            mincomp2.append(mincomp2txt)

            mincomdiv.append(mincomimg)
            mincomdiv.append(mincomp1)
            mincomdiv.append(mincomp2)

            document.getElementById("commentsmin").append(mincomdiv)

            imageData[picno - 1].comments.push(body)
            document.getElementById("totcomms" + picno).innerHTML = Number(document.getElementById("totcomms" + picno).innerHTML) + 1;
        }
    }

    var fetch_comment = (event) => {
        comment = event.target.value
        cmntbx = event.target
        postcount = event.target.name
    }



    var like = (id, likebut) => {
        var body = { name: huname, email: cookies.email, id: id }
        var cntid = likebut.target.id
        var cnt = cntid.substr(6, cntid.length - 1)
        var act_no = Number(document.getElementById("totlikes" + cnt).innerHTML)


        fetch("https://pinkstagram-server.herokuapp.com/like", {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                if (data.is_liked === 0) {
                    document.getElementById(likebut.target.id).src = heart_outlined
                    document.getElementById("totlikes" + cnt).innerHTML = act_no - 1
                }
                else {
                    document.getElementById(likebut.target.id).src = heart_red
                    document.getElementById("totlikes" + cnt).innerHTML = act_no + 1
                }

            })
    }

    var post_cmnt = (id) => {
        var message = comment
        if (message) {
            var body = { email: cookies.email, comment: message, id: id, username: huname }
            fetch("https://pinkstagram-server.herokuapp.com/send_cmnt", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
                .then(cmntbx.value = null)

            var msgp = document.createElement('p');
            var sender_nm = document.createElement('h4')
            var msg = document.createTextNode(comment)
            var snm = document.createTextNode(huname)
            var divc = document.createElement('div')
            divc.setAttribute('id', 'incomm')
            msgp.append(msg)
            sender_nm.append(snm);
            divc.append(sender_nm);
            divc.append(msgp);
            document.getElementById("commid" + postcount).append(divc)

            imageData[postcount - 1].comments.push(body)
            document.getElementById("totcomms" + postcount).innerHTML = Number(document.getElementById("totcomms" + postcount).innerHTML) + 1;
        }

    }


    var accpicextractor = async (usermail) => {
        profpicsup(<div className='w-[95%] mt-8 flex-wrap flex flex-row justify-center items-center justify-evenly'>
            <HashLoader color='#FF1493' loading='true' size="100px" />
        </div>)
        await fetch("https://pinkstagram-server.herokuapp.com/feed_pics/" + usermail)
            .then(res => res.json())
            .then(data => {
                if (data.length < 1) {
                    profpicsup(<h1 style={{ textAlign: 'center' }}>NO IMAGES UPOADED</h1>)
                }
                else {
                    var pic_files = data.map((datas) => {
                        var picsrc = datas.img_store
                        return (
                            <img src={picsrc} id="accimgs" className=' w-32 h-32 md:w-64 md:h-64 mt-4' />
                        )
                    })
                    profpicsup(<div id="profidcont" className=' w-[95%] mt-4 flex-wrap flex flex-row justify-center items-start justify-evenly'>{pic_files}</div>)
                }

            })
    }




    //show feed page
    var homesw = () => {
        picshow()
        profpicsup()
        feed_feeder()
    }

    var editname = () => {
        var newname = document.getElementById("nmchange").value;

        if (newname.length !== 0) {
            var nameobj = { name: newname };
            fetch("https://pinkstagram-server.herokuapp.com/editname/" + cookies.email, {
                method: "POST",
                body: JSON.stringify(nameobj),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(document.getElementById("nmchange").value = null)
            errup(<p id="errmsg" style={{ color: "blue", fontSize: "16px", marginTop: "10px" }}>Username Updated</p>)
            setTimeout(() => {
                errup()
            }, 1000);
        }
        else {
            errup(<p id="errmsg" style={{ color: "red", fontSize: "16px", marginTop: "10px" }}>plz fill the slot/s</p>)
            setTimeout(() => { errup() }, 2000)
        }

    }

    var editpass = async () => {
        var oldpass = document.getElementById("oldpass").value;
        var newpass = document.getElementById("newpass").value;

        if (oldpass.length === 0 || newpass.length === 0) {
            errup(<p id="errmsg" style={{ color: "red", fontSize: "16px", marginTop: "10px" }}>plz fill the solt/s first</p>)
            setTimeout(() => { errup() }, 2000)
        }
        else {
            await fetch("https://pinkstagram-server.herokuapp.com/editpass/" + cookies.email, {
                method: "POST",
                body: JSON.stringify({ oldpass: oldpass, newpass: newpass }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.is_changed === 0) {
                        errup(<p id="errmsg" style={{ color: "red", fontSize: "16px", marginTop: "10px" }}>existing password Wrong!</p>)
                        document.getElementById("oldpass").value = null;
                        document.getElementById("newpass").value = null;
                        setTimeout(() => { errup() }, 2000)

                    }
                    else {
                        errup(<p id="errmsg" style={{ color: "blue", fontSize: "16px", marginTop: "10px" }}>Password Updated!!</p>)
                        document.getElementById("oldpass").value = null;
                        document.getElementById("newpass").value = null;
                        setTimeout(() => { errup() }, 2000)
                    }
                })
        }
    }
    var cngpp = (events) => {
        if (events) {
            dp = events.target.files[0];
            let base64String = ""
            if (dp) {
                const reader = new FileReader();
                reader.readAsDataURL(dp)
                reader.onloadend = () => {
                    base64String = reader.result.replace("data:", "")
                        .replace(/^.+,/, "");

                    base64String = "data:image/jpeg;base64," + base64String
                    picshow(<Editpg editpp={() => { editpp() }} editname={() => { editname() }} editpass={() => { editpass() }} cngpp={cngpp} pp={base64String} />)
                    dp = base64String
                }
            }



        }

    }

    var editpp = async () => {
        if (!dp) {
            alert("NO image/s selected");
        }
        else {
            console.log(dp)
            await fetch("https://pinkstagram-server.herokuapp.com/editpp/" + cookies.email, {
                method: "POST",
                body: JSON.stringify({ profimg: dp }),
                headers: { 'Content-Type': 'application/json' }
            })
            dp = null
            errup(<p id="errmsg" style={{ color: "blue", fontSize: "16px", marginTop: "10px" }}>Profile Picture Updated!!</p>)
            setTimeout(() => {
                errup()
            }, 1000);
        }
    }


    //show editor page
    var showeditor = async () => {
        profpicsup()
        await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                var linkimg = data[0].profimg
                picshow(<Editpg editpp={() => { editpp() }} editname={() => { editname() }} editpass={() => { editpass() }} pp={linkimg} cngpp={cngpp} />)

            })
    }

    var showfollowerlist = () => {
        var folle_list = hostData.followerList;
        var folle_userlist = [];

        for (var k = 0; k < folle_list.length; k++) {
            folle_userlist.push(folle_list[k].email)
        }

        fetch("https://pinkstagram-server.herokuapp.com/fetchfollowdata", {
            method: "POST",
            body: JSON.stringify({ email: folle_userlist }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                var info = data.map((datas) => {
                    var pimg = datas.profimg
                    return (
                        <div id="foll_list" className='flex flex-row mt-2 border-t-2 border-b-2 border-green-300 justify-center items-center' >
                            <img className="w-8 h-8 rounded-full" src={pimg} />
                            <p>{datas.name}</p>
                        </div>
                    )
                })

                flistup(<div id="foll_box" className='w-screen h-screen fixed flex flex-row justify-center items-center'>
                <div className='border-2 border-pink-400 w-full md:w-96 h-128 mt-[12rem] md:mt-16 bg-white flex flex-col'>
                    <div id="infoll_box" className='w-full h-12 border-b-2 border-gray-300/80  flex flex-row justify-end items-center'>
                        <p className = "text-lg underline">Followers</p>
                        <input type="image" className='w-10 h-10 ml-[6.5rem]' src="https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png" onClick={() => { flistup() }} />
                    </div>
                    <div id="ifoll_box_msgs" className='w-full h-full overflow-y-auto'>
                        {info}
                    </div>
                </div>

            </div>)
            })

    }

    var showfollowinglist = () => {
        var folle_list = hostData.followingList;
        var folle_userlist = [];

        for (var k = 0; k < folle_list.length; k++) {
            folle_userlist.push(folle_list[k].email)
        }

        fetch("https://pinkstagram-server.herokuapp.com/fetchfollowdata", {
            method: "POST",
            body: JSON.stringify({ email: folle_userlist }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                var info = data.map((datas) => {
                    var pimg = datas.profimg
                    return (
                        <div id="foll_list" className='flex flex-row mt-2 border-t-2 border-b-2 border-green-300 justify-center items-center' >
                            <img className="w-8 h-8 rounded-full" src={pimg} />
                            <p>{datas.name}</p>
                        </div>
                    )
                })

                flistup(<div id="foll_box" className='w-screen h-screen fixed flex flex-row justify-center items-center'>
                    <div className='border-2 border-pink-400 w-full md:w-96 h-128 mt-[12rem] md:mt-16 bg-white flex flex-col'>
                        <div id="infoll_box" className='w-full h-12 border-b-2 border-gray-300/80  flex flex-row justify-end items-center'>
                            <p className = "text-lg underline">Following</p>
                            <input type="image" className='w-10 h-10 ml-[6.5rem]' src="https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png" onClick={() => { flistup() }} />
                        </div>
                        <div id="ifoll_box_msgs" className='w-full h-full overflow-y-auto'>
                            {info}
                        </div>
                    </div>

                </div>)
            })
    }






    //show profile with proper data 
    var profsw = async () => {
        minup()
        search_mob_up()
        await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                var linkimg = data[0].profimg
                picshow(<Profile showfollowinglist={() => { showfollowinglist() }} showfollowerlist={() => { showfollowerlist() }} expics={profpicsini} edprof={() => { showeditor() }} name={data[0].name} postno={data[0].postCount} followerno={data[0].followerCount} followingno={data[0].followingCount} dp={linkimg} />)
                accpicextractor(cookies.email);


            })
    }





    //logic for rendering feeds after page load
    if (i === 0) {
        i += 1;
        feed_feeder();
    }



    //show people in the search bar
    async function search_peps() {
        await fetch('https://pinkstagram-server.herokuapp.com/search_people/' + document.getElementById('searchbar').value.toLowerCase() + "/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    searchup(
                        <div id="searchlstbx" className='w-80 h-80 mx-[5.5%] bg-white border-2 border-pink-400/70 fixed top-0 left-0 mt-12'>
                            <br />
                            <p style={{ textAlign: "center" }}>no user found</p>
                        </div>)
                }
                else {
                    peplist = data;
                    var j = 0;
                    var userdat = data.map((users) => {
                        j += 1;
                        if (users.email !== cookies.email) {
                            if (users.isFollowed === 0) {
                                return (
                                    <div className="w-full  h-12 mt-2 border-2 rounded-md border-lime-500 flex flex-row justify-center items-center justify-evenly" id={users.email}>
                                        <img className='w-8 h-8 rounded-2xl' onClick={(umail) => { show_oth_prof(umail) }} id={users.email} src={users.profimg} alt="userpp" />
                                        <p className='text-gray-900' onClick={(umail) => { show_oth_prof(umail) }} id={users.email}>{users.name}</p>
                                        <button className="w-16 bg-teal-200 text-gray-800 h-6 rounded-lg text-sm" id={"follow_btn" + j} onClick={(event) => { followmech(event) }}>follow</button>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div id={users.email} className="w-full h-12 mt-2 border-2 rounded-md border-lime-500 flex flex-row justify-center items-center justify-evenly">
                                        <img className='w-8 h-8 rounded-2xl' onClick={(umail) => { show_oth_prof(umail) }} id={users.email} src={users.profimg} alt="userpp" />
                                        <p className='text-gray-900' onClick={(umail) => { show_oth_prof(umail) }} id={users.email}>{users.name}</p>
                                        <button className="w-16 bg-teal-200 text-gray-800 h-6 rounded-lg text-sm" id={"follow_btn" + j} onClick={(event) => { unfollowmech(event) }}>unfollow</button>
                                    </div>
                                )
                            }
                        }

                    })
                    searchup(
                        <div id="searchlstbx" className='w-80 h-80 mx-[5.5%] bg-white border-2 border-pink-400/70 overflow-y-auto fixed top-0 left-0 mt-12'>
                            {userdat}
                        </div>)
                }
            })
            .catch(searchup())


    }

    async function search_peps_mob() {
        await fetch('https://pinkstagram-server.herokuapp.com/search_people/' + document.getElementById('mob_search_bar').value.toLowerCase() + "/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    search_mob_up(
                        <p style={{ textAlign: "center", marginTop: "12px", color: "red", fontSize: "large" }}>no user found</p>
                    )
                }
                else {
                    peplist = data;
                    var j = 0;
                    var userdat = data.map((users) => {
                        j += 1;
                        if (users.email !== cookies.email) {
                            if (users.isFollowed === 0) {
                                return (
                                    <div className="w-full  h-12 mt-2 border-2 rounded-md border-lime-500 flex flex-row justify-center items-center justify-evenly" id={users.email}>
                                        <img className='w-8 h-8 rounded-2xl' onClick={(umail) => { show_oth_prof(umail) }} id={users.email} src={users.profimg} alt="userpp" />
                                        <p className='text-gray-900' onClick={(umail) => { show_oth_prof(umail) }} id={users.email}>{users.name}</p>
                                        <button className="w-16 bg-teal-200 text-gray-800 h-6 rounded-lg text-sm" id={"follow_btn" + j} onClick={(event) => { followmech(event) }}>follow</button>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div id={users.email} className="w-full h-12 mt-2 border-2 rounded-md border-lime-500 flex flex-row justify-center items-center justify-evenly">
                                        <img className='w-8 h-8 rounded-2xl' onClick={(umail) => { show_oth_prof(umail) }} id={users.email} src={users.profimg} alt="userpp" />
                                        <p className='text-gray-900' onClick={(umail) => { show_oth_prof(umail) }} id={users.email}>{users.name}</p>
                                        <button className="w-16 bg-teal-200 text-gray-800 h-6 rounded-lg text-sm" id={"follow_btn" + j} onClick={(event) => { unfollowmech(event) }}>unfollow</button>
                                    </div>
                                )
                            }
                        }

                    })
                    search_mob_up(
                        <div className='w-full h-full overflow-y-auto flex flex-col justify-center items-start mt-2'>
                            {userdat}
                        </div>)
                }
            })
            .catch(search_mob_up())
    }

    var show_mob_searchbar = () => {
        picshow(<Search_box search_mob_inp={search_peps_mob} people={search_mob_ini} />)
    }

    var show_oth_prof = (umail) => {
        searchup()
        search_mob_up()
        fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + umail.target.id)
            .then(res => res.json())
            .then(data => {
                var linkimg = data[0].profimg
                picshow(<Profile expics={profpicsini} name={data[0].name} postno={data[0].postCount} followerno={data[0].followerCount} followingno={data[0].followingCount} dp={linkimg} />)
                accpicextractor(umail.target.id);
                document.getElementById('searchbar').value = null;
                if (document.getElementById("prof_editor")) {
                    document.getElementById("prof_editor").remove();
                }

            })
    }

    async function followmech(event) {
        var sid = event.target.id
        var sid = Number(sid.substr(10, sid.length - 1))
        console.log(peplist[sid - 1])
        await fetch("https://pinkstagram-server.herokuapp.com/followmech/" + peplist[sid - 1].email + "/" + cookies.email)
            .then(searchup())
            .then(document.getElementById("searchbar").value = null)
            .then(alert("FOLLOWED!!"))
    }

    async function unfollowmech(event) {
        var sid = event.target.id
        var sid = Number(sid.substr(10, sid.length - 1))
        await fetch("https://pinkstagram-server.herokuapp.com/unfollowmech/" + peplist[sid - 1].email + "/" + cookies.email)
            .then(searchup())
            .then(document.getElementById("searchbar").value = null)
            .then(alert("UNFOLLOWED!!"))
    }

    var logout = () => {
        removeCookie("email", { path: "/" })
        document.location.reload();
    }




    //side drawer component

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className="w-full h-1/3 flex flex-col items-start justify-center "
        >
            <div className="w-full h-12 border-b-2 border-pink-300 flex flex-row justify-center items-start">
                <Typography variant="h5" color="primary">Menu</Typography>
            </div>
            <Button className="w-full h-12" style={{ color: "#4BB543", marginTop: "1rem" }} color="secondary" variant="outlined" startIcon={<HomeRoundedIcon />} onClick={() => { homesw() }}>Home</Button>
            <Button className="w-full h-12" style={{ marginTop: "1rem" }} color="primary" variant="outlined" startIcon={<PersonSearchRoundedIcon />} onClick={() => { show_mob_searchbar() }} >Search People</Button>
            <Button className="w-full h-12" style={{ marginTop: "1rem" }} color="secondary" variant="outlined" startIcon={<PersonIcon />} onClick={() => { profsw() }}>User</Button>
            <Button className="w-full h-12" style={{ color: "red", marginTop: "1rem" }} color="secondary" variant="outlined" startIcon={<ExitToAppRoundedIcon />} onClick={() => { logout() }} >Logout</Button>

        </Box>
    );


    return (
        <div className="homepg">
            <React.Fragment key={'left'}>
                <nav id="topnav" className="w-full h-16 md:h-12 border-b-2 border-b-gray-200 flex flex-row fixed z-10 justify-around items-center bg-white">
                    <button className='block xl bg-yellow-400 md:hidden w-16 h-8 rounded-md' onClick={toggleDrawer('left', true)}>OPEN</button>
                    <input className='hidden md:block border-2 h-6 border-pink-500 text-center border-solid rounded-none outline-none' id="searchbar" type="text" placeholder="SEARCH HERE" onChange={() => { search_peps() }} />
                    <h2 id="tnh2" className=' text-2xl font-lobster2'>PINKSTAGRAM</h2>
                    <div className="flex lg:w-1/5 h-16 flex flex-row justify-around items-center md:w-1/4 justify-evenly">
                        <img id="tna1" className='hidden md:block h-8 w-8 cursor-pointer' src={home_icon} onClick={() => { homesw() }} />
                        <img id="tna2" className='hidden md:block h-8 w-8 cursor-pointer' src={user_icon} onClick={() => { profsw() }} />
                        <Button variant="outlined" color="primary" style={{ fontSize: "12px", fontWeight: "600" }} className="h-8 w-16 text-sm" id="post_show" onClick={() => { show_pstbar() }}>
                            Upload
                        </Button>
                        {/* <Button variant = "outlined" className = "h-8 w-6 bold " style ={{color:"red" , fontSize:"12px",fontWeight:"800"}} startIcon = {<ExitToAppRoundedIcon/>} onClick = {()=>{logout()}}></Button> */}
                        <ExitToAppRoundedIcon id="exit_log_but" className="h-12 w-12 cursor-pointer" onClick={() => { logout() }} />

                    </div>
                </nav>

                <br />
                <br />
                <div className='h-full w-screen flex flex-col justify-center items-center'>
                    {picini}
                    {minini}
                    {show_bar}
                    {searchini}
                    {search_mob_ini}
                    {profpicsini}
                    {errmsg}
                    {flistini}
                </div>
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>


        </div>

    )
}

export default Home;
