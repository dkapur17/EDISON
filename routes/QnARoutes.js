const express = require('express');
const axios = require('axios');
const ddg = require('ddg');

const { parseTime, parseDate } = require('../util_functions');

const router = express.Router();

router.get('/about', (req, res) => {
    return res.send("I am an Extremely Deligent and Intelligent System of Neurons. But you can just call me Edison.");
});

router.post('/time', (req, res) => {
    const transcript = req.body.transcript;
    if (!transcript.match(/ IN \D+/))
        return res.send(parseTime(new Date()));
    else {
        const loc = transcript.split(' IN ')[1];
        const escapedLoc = loc.replace(' ', '+');
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${escapedLoc}&key=f02fce800aab47ce8b059ccbaa2d76b5`)
            .then((apiRes) => {
                const timeZone = apiRes.data.results[0].annotations.timezone.name;
                const localTime = parseTime(new Date(new Date().toLocaleString("en-US", { timeZone })), loc);
                console.log(localTime);
                res.send(localTime);
            })
            .catch(err => res.send(`Sorry, but I am unable to get the time from that location.`));
    }
});

router.post('/date', (req, res) => {
    const type = req.body.type;
    const data = parseDate(new Date());
    let responseString;
    if (type === "DATE")
        responseString = `Today is ${data.day}, the ${data.date} of ${data.month}, ${data.year}`;
    else
        responseString = `Today is ${data.day}`;
    return res.send(responseString)
});

router.get('/presence', (req, res) => {
    return res.send('For you sir, always');
});

router.post('/joke', (req, res) => {
    const transcript = req.body.transcript.split(' ');
    let type = transcript.length === 5 ? transcript[3] : `Any`;
    let flags = "";
    if (type === "CLEAN") {
        type = "Any";
        flags = "blacklistFlags=nsfw,religious,political,racist,sexist&";
    }
    axios.get(`https://sv443.net/jokeapi/v2/joke/${type}?${flags}`)
        .then(apiRes => {
            res.send({
                type: apiRes.data.type,
                joke: apiRes.data.joke,
                setup: apiRes.data.setup,
                delivery: apiRes.data.delivery
            })
        })
        .catch(err => res.send("Sorry, but it seems like I am unable to fetch a joke at the moment."));
});

router.post('/fallthrough', (req, res) => {
    const query = req.body.query;
    ddg.query(query, (err, data) => {
        if (err)
            return res.send("Sorry, I don't know how to respond to that");
        return res.send(data);
    });
})

module.exports = router;