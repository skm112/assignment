var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = require("../models/task");

//@type         GET
//@route        /task/list
//@desc         getting all task
//@access       PUBLIC
router.get("/list", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs));
    });
});

//@type         GET
//@route        /task/task
//@desc         getting single task
//@access       PUBLIC
router.get("/task/:id", (req, res) => {
    db.find({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, docs) => {
        if (err) throw err;
        res.end(JSON.stringify(docs));
    });
});

//@type         POST
//@route        /task/save
//@desc         save task
//@access       PUBLIC
router.post("/save", (req, res) => {
    db.findOne({ task_no: req.body.task_no }, (err, exist) => {
        if (exist) {
            return res.send({ success: false, message: "task no already exists ..." });
        } else {
            var data = {};
            if (req.body.task_no) data.task_no = req.body.task_no;
            if (req.body.task_name) data.task_name = req.body.task_name;
            if (req.body.task_time) data.task_time = req.body.task_time;
            if (req.body.description != undefined) data.description = req.body.description;
            data.created = new Date();
            var newRecord = new db(data);
            newRecord.save((err, docs) => {
                if (err) throw err;
                res.send({ message: "All details saved successfully" });
            });
        }
    })
});

//@type         DELETE
//@route        /task/delete/
//@desc         delete task
//@access       PUBLIC
router.delete("/delete/:id", (req, res) => {
    db.findOneAndDelete(mongoose.Types.ObjectId(req.params.id), err => {
        if (err) res.send(err);
        res.send({ message: "Deleted successfully" });
    });
});

//@type         PUT
//@route        /task/update/
//@desc         update task
//@access       PUBLIC
router.put("/update", (req, res) => {
    db.findById({ _id: mongoose.Types.ObjectId(req.body._id) })
        .then(data => {
            if (data.status !== "completed") {
                var query = { _id: mongoose.Types.ObjectId(data._id) };
                var update = {};
                if (req.body.task_no) update.task_no = req.body.task_no;
                if (req.body.task_name) update.task_name = req.body.task_name;
                if (req.body.task_time) update.task_time = req.body.task_time;
                if (req.body.description == undefined) update.description = req.body.description;
                db.findOneAndUpdate(query, update, (err, doc) => {
                    if (err) throw err;
                    res.json(doc);
                });
            } else {
                res.send({ message: "Already status completed no need to edit or update" })
            }
        })
        .catch(err => console.log(err))


});

//@type         PUT
//@route        /task/status/
//@desc         update status
//@access       PUBLIC
router.put("/status", (req, res) => {
    var id = req.body._id;
    var query = { _id: mongoose.Types.ObjectId(id) };
    db.findOneAndUpdate(query, { status: "completed", action: undefined }, (err, doc) => {
        if (err) throw err;
        res.json(doc);
    });
});

module.exports = router;