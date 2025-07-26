const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors');


app.use(cors());
dotenv.config({path:'./config.env'});

const db = process.env.DATABASE.replace('<db_password>',process.env.DATABASE_PASSWORD)

mongoose.connect(db,{
    useNewUrlParser:true
}).then(()=>console.log('DB connection successful!!!'))

app.listen(process.env.PORT,()=>{
    console.log(`App running on port ${3000}`)
})