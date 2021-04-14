import express from 'express'
import dbconnect from './config/dbconnect.js';
import userRoutes from './routes/users.js'
import cors from 'cors'
const app = express();

dbconnect();
app.use(cors());
app.use(express.json({extended:true}));
app.use(
    '/api/users',
    userRoutes
)

let PORT=5000;

app.listen(PORT,()=>console.log("server running"));