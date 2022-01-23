import React, { useState } from 'react'
import P_dummy from "./postdummy"
import Pic_up from "./photo_uploader"
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Profile from './profile_pg';
import Editpg from './edit_user_pg'
import MinDisp from './mini_disp';
import { useCookies } from 'react-cookie'


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

var Home = () => {
    var [show_bar, up_bar] = useState();
    var [picini, picshow] = useState();
    var [searchini, searchup] = useState();
    var [profpicsini, profpicsup] = useState();
    var [errmsg, errup] = useState();
    var [minini, minup] = useState();
    var [flistini, flistup] = useState();
    var [cookies, setCookie] = useCookies(['user_inf'])
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

        hpp = "data:image/jpeg;base64," + new Buffer(hostData.profimg).toString('base64')
        huname = hostData.name;


        if (imageData.length === 0) {
            picshow()
        }
        else {


            var feedpics = imageData.map((datas) => {
                p_c += 1;

                var imgdata = new Buffer(datas.img_store.data).toString("base64")
                var uname = userData[p_c - 1].name;
                var pp = "data:image/jpeg;base64," + new Buffer(userData[p_c - 1].profimg).toString('base64')

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
                    likebutsrc = "https://www.seekpng.com/png/full/511-5113166_heart-instagram-like-icon-png.png"
                }
                else {
                    likebutsrc = "data:image/png;base64,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"

                }
                return (
                    <P_dummy likebpic={likebutsrc} commentbutid={"commentno" + p_c} compg={(fid) => { op_minpg(fid) }} txtuname={othuname} txtcmnt={othcomm} totcomms={"totcomms" + p_c} countcomms={datas.comment_count} totlikes={"totlikes" + p_c} countlikes={datas.like_count} likeid={"likeid" + p_c} countcm={p_c} commid={"commid" + p_c} commnt_val={fetch_comment} post_cmnt={() => { post_cmnt(datas._id) }} like={(nid) => { like(datas._id, nid) }} dp={pp} desc_uname={uname} uname={uname} act_img={"data:image/jpeg;base64," + imgdata} desc={datas.description} />
                )
            })

            picshow(feedpics)
        }

    }


    var op_minpg = async (fid) => {
        var picid = fid.target.id;
        var picno = picid.substr(9, picid.length - 1)
        var extpicdata = imageData[picno - 1];
        var shpic = extpicdata.img_store;
        var b64pic = new Buffer(shpic.data).toString('base64');
        var piclink = "data:image/jpeg;base64," + b64pic;

        await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + extpicdata.email)
            .then(res => res.json())
            .then(data => {
                b64pic = new Buffer(data[0].profimg).toString('base64')
                minup(<MinDisp minsendbut={() => { sendcommin(extpicdata._id, picno) }} minpp={"data:image/jpeg;base64," + b64pic} minactpic={piclink} minname={data[0].name} exitmin={() => { exitmin() }} />)

            })

        for (var j = 0; j < extpicdata.comments.length; j++) {
            var comdata = extpicdata.comments[j];
            await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + comdata.email)
                .then(nres => nres.json())
                .then(ndata => {
                    mincomspp = new Buffer(ndata[0].profimg).toString('base64')
                    mincomspp = "data:image/jpeg;base64," + mincomspp
                })

            var mincomdiv = document.createElement('div');
            mincomdiv.setAttribute('id', 'mincomdiv')
            var mincomimg = document.createElement('img')
            mincomimg.setAttribute('id', 'mincomimg')
            mincomimg.setAttribute('src', mincomspp)

            var mincomp1 = document.createElement('p')
            mincomp1.setAttribute('id', 'mincomp1')
            var mincomp1txt = document.createTextNode(comdata.username)
            mincomp1.append(mincomp1txt)


            var mincomp2 = document.createElement('p')
            mincomp2.setAttribute('id', 'mincomp2')
            var mincomp2txt = document.createTextNode(comdata.comment)
            mincomp2.append(mincomp2txt)

            mincomdiv.append(mincomimg)
            mincomdiv.append(mincomp1)
            mincomdiv.append(mincomp2)

            document.getElementById("commentsmin").append(mincomdiv)
        }

    }

    var exitmin = () => {
        minup();
    }

    var setSearchbarMargin = () => {

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
                    document.getElementById(likebut.target.id).src = "data:image/png;base64,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"
                    document.getElementById("totlikes" + cnt).innerHTML = act_no - 1
                }
                else {
                    document.getElementById(likebut.target.id).src = "https://www.seekpng.com/png/full/511-5113166_heart-instagram-like-icon-png.png"
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
        await fetch("https://pinkstagram-server.herokuapp.com/feed_pics/" + usermail)
            .then(res => res.json())
            .then(data => {
                if (data.length < 1) {
                    profpicsup(<h1 style={{ textAlign: 'center' }}>NO IMAGES UPOADED</h1>)
                }
                else {
                    var pic_files = data.map((datas) => {
                        var exdata = new Buffer(datas.img_store.data).toString('base64');
                        var picsrc = "data:image/jpeg;base64," + exdata;
                        return (
                            <img src={picsrc} id="accimgs" className='w-64 h-64 mt-4' />
                        )
                    })
                    profpicsup(<div id="profidcont" className=' w-[95%] mt-4 flex-wrap flex flex-row justify-center items-start justify-evenly'>{pic_files}</div>)
                }

            })
    }




    //show feed page
    var homesw = () => {
        profpicsup()
        feed_feeder()
    }

    var editname = () => {
        var newname = document.getElementById("nmchange").value;
        if (newname.length === 0) {
            errup(<p id="errmsg">plz fill the slot/s</p>)
            setTimeout(() => { errup() }, 2000)
        }
        var nameobj = { name: newname };
        fetch("https://pinkstagram-server.herokuapp.com/editname/" + cookies.email, {
            method: "POST",
            body: JSON.stringify(nameobj),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(document.getElementById("nmchange").value = null)
        errup(<p id="errmsg">Username Updated</p>)
        setTimeout(() => {
            errup()
        }, 1000);
    }

    var editpass = async () => {
        var oldpass = document.getElementById("oldpass").value;
        var newpass = document.getElementById("newpass").value;

        if (oldpass.length === 0 || newpass.length === 0) {
            errup(<p id="errmsg">plz fill the solt/s first</p>)
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
                        errup(<p id="errmsg">existing password Wrong!</p>)
                        document.getElementById("oldpass").value = null;
                        document.getElementById("newpass").value = null;
                        setTimeout(() => { errup() }, 2000)

                    }
                    else {
                        errup(<p id="errmsg">Password Updated!!</p>)
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
            var filereader = new FileReader();
            filereader.readAsDataURL(events.target.files[0])

            filereader.onloadend = () => {
                picshow(<Editpg editpp={() => { editpp() }} editname={() => { editname() }} editpass={() => { editpass() }} cngpp={cngpp} pp={filereader.result} />)
            }

        }
    }

    var editpp = async () => {
        var formdat = new FormData();
        if (!dp) {
            alert("NO image/s selected");
        }
        else {
            formdat.append('file', dp);
            await fetch("https://pinkstagram-server.herokuapp.com/editpp/" + cookies.email, {
                method: "POST",
                body: formdat,
            })
            dp = null
            errup(<p id="errmsg">Profile Picture Updated!!</p>)
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
                var actimg = new Buffer(data[0].profimg).toString('base64')
                var linkimg = "data:image/jpeg;base64," + actimg;
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
                    var pimg = new Buffer(datas.profimg).toString('base64')
                    return (
                        <div id="foll_list">
                            <img src={"data:image/jpeg;base64," + pimg} />
                            <p>{datas.name}</p>
                        </div>
                    )
                })

                flistup(<div id="foll_box">
                    <div id="infoll_box">
                        <p>Followers</p>
                        <input type="image" src="https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png" onClick={() => { flistup() }} />
                    </div>
                    <div id="ifoll_box_msgs">
                        {info}
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
                    var pimg = new Buffer(datas.profimg).toString('base64')
                    return (
                        <div id="foll_list" >
                            <img className="w-4 h-4 rounded-lg" src={"data:image/jpeg;base64," + pimg} />
                            <p>{datas.name}</p>
                        </div>
                    )
                })

                flistup(<div id="foll_box">
                    <div id="infoll_box" className='bg-green-400'>
                        <p>Following</p>
                        <input type="image" src="https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png" onClick={() => { flistup() }} />
                    </div>
                    <div id="ifoll_box_msgs">
                        {info}
                    </div>
                </div>)
            })
    }






    //show profile with proper data
    var profsw = async () => {
        await fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + cookies.email)
            .then(res => res.json())
            .then(data => {
                var actimg = new Buffer(data[0].profimg).toString('base64')
                var linkimg = "data:image/jpeg;base64," + actimg;
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
                                        <img className='w-8 h-8 rounded-2xl' onClick={(umail) => { show_oth_prof(umail) }} id={users.email} src={"data:image/jpeg;base64," + new Buffer(users.profimg).toString('base64')} alt="userpp" />
                                        <p className='text-gray-900' onClick={(umail) => { show_oth_prof(umail) }} id={users.email}>{users.name}</p>
                                        <button className="w-16 bg-teal-200 text-gray-800 h-6 rounded-lg text-sm" id={"follow_btn" + j} onClick={(event) => { followmech(event) }}>follow</button>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <div id={users.email} className="w-full h-12 mt-2 border-2 rounded-md border-lime-500 flex flex-row justify-center items-center justify-evenly">
                                        <img className='w-8 h-8 rounded-2xl' onClick={(umail) => { show_oth_prof(umail) }} id={users.email} src={"data:image/jpeg;base64," + new Buffer(users.profimg).toString('base64')} alt="userpp" />
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

    var show_oth_prof = (umail) => {
        searchup()
        fetch("https://pinkstagram-server.herokuapp.com/exprofdata/" + umail.target.id)
            .then(res => res.json())
            .then(data => {
                var actimg = new Buffer(data[0].profimg).toString('base64')
                var linkimg = "data:image/jpeg;base64," + actimg;
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
        >

        </Box>
    );

    return (
        <div className="homepg">
            <React.Fragment key={'left'}>
                <nav id="topnav" className="w-full h-16 md:h-12 border-b-2 border-b-gray-200 flex flex-row fixed z-10 justify-around items-center bg-white">
                    <button className='block xl bg-yellow-400 md:hidden w-16 h-8 rounded-md' onClick={toggleDrawer('left', true)}>OPEN</button>
                    <input className='hidden md:block border-2 h-6 border-pink-500 text-center border-solid rounded-none outline-none' id="searchbar" type="text" placeholder="SEARCH HERE" onChange={() => { search_peps() }} />
                    <h2 id="tnh2" className=' text-2xl font-lobster2'>PINKSTAGRAM</h2>
                    <div className="flex lg:w-1/6 h-16 flex flex-row justify-around items-center md:w-1/4">
                        <img id="tna1" className='hidden md:block h-8 w-8 cursor-pointer' src="https://static.thenounproject.com/png/77002-200.png" onClick={() => { homesw() }} />
                        <img id="tna2" className='hidden md:block h-8 w-8 cursor-pointer' src="https://t3.ftcdn.net/jpg/02/43/54/26/360_F_243542639_ACGtPCq2ueqTSTkqEJ3PHRekC96uVoUW.jpg" onClick={() => { profsw() }} />
                        <Button variant="outlined" color="primary" className="h-8 w-24" id="post_show" onClick={() => { show_pstbar() }}>
                            UPLOAD
                        </Button>
                    </div>
                </nav>

                <br />
                <br />
                <div className='h-full w-screen flex flex-col justify-center items-center'>
                    {picini}
                    {minini}
                    {show_bar}
                    {searchini}
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
