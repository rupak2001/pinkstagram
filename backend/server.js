require('./schema/connection.js');
var db = require('./schema/sch_mod_login.js');
var dbi = require('./schema/sch_mod_imgstr.js');
var profmod = require("./schema/sch_mod_pep.js")
var PORT = process.env.PORT || 8000;
const multer = require('multer');
var fs = require('fs')
var bodyparser = require('body-parser')
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.set("view engine", "ejs")


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

var upload = multer({ storage: storage })


//login mechanism
app.post('/login_post', async (req, res) => {
    var catched_data = req.body;
    usermail = catched_data.email;
    var db_data = await db.find({ email: catched_data.email }).select({ email: 1, password: 1, _id: 0 });
    console.log(db_data)
    if (db_data.length === 0) {
        res.send({ chk_status: 0 });
    }
    else if (catched_data.email === db_data[0].email && catched_data.password === db_data[0].password) {
        res.send({ chk_status: 1 });

    }
    else if (catched_data.email === db_data[0].email && catched_data.password !== db_data[0].password) {
        res.send({ chk_status: 2 });
    }
})

app.post('/new_user_add', async (req, res) => {
    var catched_data = req.body;
    var db_data = await db.find({ email: catched_data.email });
    if (db_data.length !== 0) {
        res.send({ status_add: 0 })
    }
    else {
        var ndb = new db(req.body);
        var profmaker = new profmod({ email: catched_data.email, name: catched_data.name })
        await profmod.insertMany([profmaker])
        await db.insertMany([ndb]);
        res.send({ status_add: 1 });
    }
})

app.post("/picup_test/:email/:description", upload.single('file'), async (req, res) => {
    console.log(req.file)
    res.json(req.file)
    var im_dat = {
        email: req.params.email,
        img_store: { data: fs.readFileSync(__dirname + '/uploads/' + req.file.filename), contentType: 'image/*' },
        description: req.params.description
    }
    var ndbi = new dbi(im_dat);
    await dbi.insertMany([ndbi])
      .then(fs.unlinkSync(__dirname + '/uploads/' + req.file.filename))

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
    console.log("updated")
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
    console.log(req.body)
    await db.updateOne({ email: req.params.email }, { $set: { name: req.body.name } })
    await profmod.updateOne({ email: req.params.email }, { $set: { name: req.body.name } })
})

app.post("/editpass/:email", async (req, res) => {
    var actpass = await db.find({ email: req.params.email }).select({ password: 1, _id: 0 })
    if (req.body.oldpass === actpass[0].password) {
        await db.updateOne({ email: req.params.email }, { $set: { password: req.body.newpass } })
        res.send({ is_changed: 1 })
    }
    else {
        res.send({ is_changed: 0 })
    }
})


app.post("/editpp/:email", upload.single('file'), async (req, res) => {
    res.json(req.file)

    await profmod.updateOne({ email: req.params.email }, { $set: { profimg: fs.readFileSync(__dirname + "/uploads/" + req.file.filename) } })
        .then(fs.unlinkSync(__dirname + "/uploads/" + req.file.filename))
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