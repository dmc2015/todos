const mongoose = require("../db/connection")

ItemsSchema = new mongoose.Schema({
    title: String,
    complete: Boolean,
    description: String
})

const Items = mongoose.model("Items", ItemsSchema)

module.exports = Items;