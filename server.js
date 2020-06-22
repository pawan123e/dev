const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app')
const compression = require('compression');
app.use(compression())
dotenv.config({
    path: './config.env'
});

const DB = process.env.MONGOURI;
const PORT = process.env.PORT;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
})
.then(() => console.log('Database connected successfully..'))
.catch(error => {
    process.exit(1);
});


app.listen(PORT, () => console.log('Server connected to the port ', PORT));