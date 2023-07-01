require('./schema/connection.js');
var db = require('./schema/sch_mod_login.js');
var dbi = require('./schema/sch_mod_imgstr.js');
var profmod = require("./schema/sch_mod_pep.js")
var PORT = process.env.PORT || 8000;
var bodyparser = require('body-parser')
var express = require('express');
var app = express();
var cors = require('cors');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));


//login
app.post('/login_post', async (req, res) => {
    var catched_data = req.body;
    usermail = catched_data.email;
    var db_data = await db.find({ email: catched_data.email }).select({ email: 1, password: 1, _id: 0 });
    if (db_data.length === 0) {
        res.status(404).send()
    }
    else if (catched_data.email === db_data[0].email && await bcrypt.compare(catched_data.password, db_data[0].password)  === true) {
        res.status(200).send()


    }
    else if (catched_data.email === db_data[0].email && await bcrypt.compare(catched_data.password, db_data[0].password)  === false) {
        res.status(401).send()     
    }
})



//signup
app.post('/new_user_add', async (req, res) => {
    var catched_data = req.body;
    var db_data = await db.find({ email: catched_data.email });
    if (db_data.length !== 0) {
        res.status(403).send()
    }
    else {
        catched_data.password = await bcrypt.hash(catched_data.password, 10);
        var ndb = new db(catched_data);
        var profmaker = new profmod({ email: catched_data.email, name: catched_data.name })
        await profmod.insertMany([profmaker])
        await db.insertMany([ndb]);
        res.status(200).send();
    }
})

app.post("/picup_test/:email/:description", async (req, res) => {
    var im_dat = {
        email: req.params.email,
        img_store: req.body.imgFile,
        description: req.params.description
    }
    var ndbi = new dbi(im_dat);
    await dbi.insertMany([ndbi])
    var incdata = await profmod.find({ email: req.params.email }).select({ postCount: 1, _id: 0 })
    incdata = incdata[0].postCount + 1;
    await profmod.updateOne({ email: req.params.email }, { $set: { postCount: incdata } })
})

app.get('/feed_pics/:email', async (req, res) => {
    var pics = await dbi.find({ email: req.params.email }).select({ email: 1, img_store: 1, comments: 1, like_count: 1, comment_count: 1, description: 1, _id: 1 }).sort({ "timestamp": -1 })
    res.send(pics)
})

app.get('/feed_feeder/:email', async (req, res) => {
    var followinglist = await profmod.find({ email: req.params.email }).select({ followingList: 1, _id: 0 })

    if (followinglist.length < 0) {
        res.send({ peoples: 0 })
    }
    else {
        followinglist = followinglist[0].followingList;
        var foll_list = []
        for (var j = 0; j < followinglist.length; j++) {
            foll_list.push(followinglist[j].email);
        }

        var followerspics = await dbi.find({ email: foll_list }).sort({ timestamp: -1 })
        res.send(followerspics)

    }
})



app.get('/search_people/:result/:uemail', async (req, res) => {
    var userList = await profmod.find({ name: { '$regex': req.params.result, '$options': 'i' } }).select({ name: 1, email: 1, _id: 0, followerList: 1, profimg: 1 })
    var moduserlist = [];
    for (var i = 0; i < userList.length; i++) {

        if (userList[i].email !== req.params.uemail) {
            var userPts = { email: userList[i].email, name: userList[i].name, isFollowed: 0, profimg: userList[i].profimg }
            var extractSingle = userList[i].followerList;

            for (var j = 0; j < extractSingle.length; j++) {
                if (extractSingle[j].email === req.params.uemail) {
                    userPts.isFollowed = 1
                    break;
                }
            }
            moduserlist.push(userPts);
        }

    }
    res.send(moduserlist)
})

app.get('/exprofdata/:email', async (req, res) => {
    var userdat = await profmod.find({ email: req.params.email }).select({_id: 0 })
    res.send(userdat)
})

app.post('/fetchfollowdata',async(req,res)=>{
    var userdat = await profmod.find({email:req.body.email}).select({name:1,profimg:1,_id:0})
    res.send(userdat)
})


app.get('/followmech/:clemail/:hostemail', async (req, res) => {
    var followingData = await profmod.find({ email: req.params.hostemail }).select({ followerList: 1, followingList: 1, followerCount: 1, followingCount: 1, _id: 0 })
    var followerData = await profmod.find({ email: req.params.clemail }).select({ followerList: 1, followingList: 1, followerCount: 1, followingCount: 1, _id: 0 })

    var following = followingData[0].followingList;
    var follower = followerData[0].followerList;

    var fing_count = followingData[0].followingCount;
    var fwr_count = followerData[0].followerCount;

    follower.push({ email: req.params.hostemail })
    following.push({ email: req.params.clemail })

    fing_count += 1;
    fwr_count += 1;

    await profmod.updateOne({ email: req.params.clemail }, { $set: { followerList: follower } })
    await profmod.updateOne({ email: req.params.hostemail }, { $set: { followingList: following } })
    await profmod.updateOne({ email: req.params.clemail }, { $set: { followerCount: fwr_count } })
    await profmod.updateOne({ email: req.params.hostemail }, { $set: { followingCount: fing_count } })
})


app.get("/unfollowmech/:clemail/:hostemail", async (req, res) => {
    var followerData = await profmod.find({ email: req.params.clemail }).select({ followerCount: 1, followerList: 1 })
    var followingData = await profmod.find({ email: req.params.hostemail }).select({ followingCount: 1, followingList: 1 })

    var follower = followerData[0].followerList;
    var following = followingData[0].followingList;

    for (var i = 0; i < follower.length; i++) {
        if (follower[i].email === req.params.hostemail) {
            follower.splice(i, 1);
        }
    }

    for (var i = 0; i < following.length; i++) {
        if (following[i].email === req.params.clemail) {
            following.splice(i, 1);
        }
    }

    var followerCount = followerData[0].followerCount - 1;
    var followingCount = followingData[0].followingCount - 1;


    await profmod.updateOne({ email: req.params.clemail }, { $set: { followerList: follower } })
    await profmod.updateOne({ email: req.params.hostemail }, { $set: { followingList: following } })
    await profmod.updateOne({ email: req.params.clemail }, { $set: { followerCount: followerCount } })
    await profmod.updateOne({ email: req.params.hostemail }, { $set: { followingCount: followingCount } })


})

app.post("/editname/:email", async (req, res) => {
    await db.updateOne({ email: req.params.email }, { $set: { name: req.body.name } })
    await profmod.updateOne({ email: req.params.email }, { $set: { name: req.body.name } })
})

app.post("/editpass", async (req, res) => {
    var actpass = await db.find({ email: req.body.email }).select({ password: 1, _id: 0 })
    if (await bcrypt.compare(req.body.oldpass , actpass[0].password) == true) {
        await db.updateOne({ email: req.body.email }, { $set: { password: await bcrypt.hash(req.body.newpass,10)} })
        res.status(200).send()
    }
    else {
        res.status(403).send()
    }
})


app.post("/editpp/:email", async (req, res) => {
    await profmod.updateOne({ email: req.params.email }, { $set: { profimg:req.body.profimg} })
        .catch(err => console.log(err))

})

app.post("/like", async (req, res) => {
    var likearr = await dbi.find({ _id: req.body.id }).select({ likes: 1, like_count: 1, _id: 0 })
    var likes = likearr[0].likes;
    var likeCount = likearr[0].like_count;
    var swit = 0;

    for (var i = 0; i < likes.length; i++) {
        if (likes[i].email === req.body.email) {
            likes.splice(i, 1);
            swit = 1;
            break;
        }
    }

    if (swit === 0) {
        likes.push({ name: req.body.name, email: req.body.email })
        await dbi.updateOne({ _id: req.body.id }, { $set: { likes: likes } })
        await dbi.updateOne({ _id: req.body.id }, { $set: { like_count: likeCount + 1 } })
        res.send({ is_liked: 1 })
    }
    else {
        await dbi.updateOne({ _id: req.body.id }, { $set: { likes: likes } })
        await dbi.updateOne({ _id: req.body.id }, { $set: { like_count: likeCount - 1 } })
        res.send({ is_liked: 0 })
    }


})

app.post("/send_cmnt", async (req, res) => {
    var comment = { email: req.body.email, comment: req.body.comment, username: req.body.username }
    var arr = await dbi.find({ _id: req.body.id }).select({ comments: 1, _id: 0, comment_count: 1 })
    await dbi.updateOne({ _id: req.body.id }, { $set: { comment_count: arr[0].comment_count + 1 } })
    arr = arr[0].comments;
    arr.push(comment);
    await dbi.updateOne({ _id: req.body.id }, { $set: { comments: arr } })
})



app.listen(PORT, () => {
    console.log("backend running");
})