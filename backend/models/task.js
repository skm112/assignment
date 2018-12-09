var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Task = new Schema({
    task_no: {
        type: Number,
        unique: true
    },
    task_name: {
        type: String
    },
    task_time: {
        type: Number
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    created: {
        type: Date
    }
}, { versionKey: false });

module.exports = mongoose.model('Task', Task);