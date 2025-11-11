const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'help.html'));
});

function getData(file) {
    var rawdata = fs.readFileSync('static/data/' + file);
    if (rawdata.length === 0) rawdata = '[]';
    var data = JSON.parse(rawdata);
    fdata = JSON.stringify(data);
    return fdata;
}

app.get('/draw', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'draw.html'));
});

// API endpoint for draw data
app.get('/api/draw-data', (req, res) => {
    var names = [];
    var dataArr = [];
    fs.readdir('static/data', (err, files) =>{
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        var idx = 0;
        files.forEach(function (file) {
            var listname = file.split('.')[0];
            console.log(file + " " + listname);
            names.push(listname);
            var rawdata = getData(file);
            data = JSON.parse(rawdata);
            for (var j = 0; j < data.length; j++) {
                var str = idx+"-"+file+"-"+data[j].type+"-"+data[j].coords+ "-" +data[j].rotation+ "-" +data[j].level+"-"+ data[j].name+ "|";
                dataArr.push(str);
            }
            idx++;
        });
        // Return the data as a string for backwards compatibility
        res.json(dataArr.join(''));
    });    
});

app.get('/retrieve', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'retrieve.html'));
});

// API endpoint for retrieve data
app.get('/api/retrieve-data', (req, res) => {
    var names = [];
    var dataArr = [];
    fs.readdir('static/data', (err, files) =>{
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        var idx = 0;
        files.forEach(function (file) {
            names.push(file);
            var rawdata = getData(file);
            data = JSON.parse(rawdata);
            for (var j = 0; j < data.length; j++) {
                var str = idx+"-"+file+"-"+data[j].type+"-"+data[j].coords+ "-" +data[j].rotation+ "-" +data[j].level+"-"+ data[j].name+ "|";
                dataArr.push(str);
            }
            idx++;
        });
        // Return the data as a string for backwards compatibility
        res.json(dataArr.join(''));
    });    
});

app.post('/add', (req, res) => {
    var filename = req.body.name + ".json";
    var data = req.body.details;
    data = '[' + data + ']';
    fs.writeFileSync("static/data/" + filename, data);
    res.redirect('/draw');
});

const port = 8080;
app.listen(port, () => {
    console.log('server listening on port: ' + port);
});
