let express = require('express');
let User = require('../models/User');
let PdMood = require('../models/PdMood');
let router = express.Router();

router.get('/', (req, res) => {
    let searchText = req.query.searchText;
    let resData = {
        code: 0,
        user: {},
        moodList: {}
    };
    User.findOne({
        username: searchText
    }).then((userRes) => {
        if (userRes) {
        }
        resData.user = userRes;
        PdMood.find({
            content: {$regex: searchText, $options: '$i'}, //  $options: '$i' 忽略大小写
        }).populate(['writer', 'comments']).then((moodList)=>{
            if (moodList){
                resData.moodList = moodList;
            }
            res.json(resData)
        })
    })
});

module.exports = router;