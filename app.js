const express = require('express')
const app = express()
const loggingtool = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongo = require('mongoose')
const dot = require('dotenv')
const fs = require('fs')
const track = require('./track')
dot.config()
app.set('trust proxy', true)
app.use(loggingtool('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT}/*`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
mongo.connect(`mongodb://${process.env.DB}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => console.log('Successful MongoDB Connection'))
app.use('/static', express.static('./public'))
const scrape = require('./scrape')
app.use('/scrape', scrape)
app.use('/', track, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('./index.html', function(error, data) {
        if (error) {
            res.write('404 error: page failed')
        } else {
            res.write(data)
        }
        res.end()
    })
});
app.use((req, res, next) => {
    const error = new Error('page not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app