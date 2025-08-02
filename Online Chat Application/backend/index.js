const app = require('./app')
const dotenv  = require("dotenv")
const db = require('./lib/db')
const {server} = require('./lib/socketio')

dotenv.config()
const PORT = process.env.PORT

server.listen(PORT,()=>{
    console.log(`The app running on http://localhost:${PORT}`)
    db.connectDB()
})