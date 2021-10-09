import mongoose from "mongoose";

const MongoURI = process.env.MongoURI || 'mongodb://localhost:27017/test-MERN';


mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology:true
}).then (()=>console.log('Connected successfully to MongoDB ' + MongoURI))




