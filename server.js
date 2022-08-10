const mongoose = require('mongoose')

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app')

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//   );

const DB = "mongodb+srv://shashank17:prhead2020@cluster0.y4g0b.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(con=>{
    console.log('DB Connection Successfull!');
})

const port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
});

