import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String, 
    tagline: String, 
    schedule: String, 
    description: String, 
    moderator: String, 
    category: String, 
    sub_category: String, 
    rigor_rank: String,
    images: [{ type: String }]
})

export default mongoose.model('task1', schema)