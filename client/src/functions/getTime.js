import Edison_Speak from "../partials/Speak";
import axios from "axios";

const parseDate = (date, location = null) => {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let period = hours < 12 ? "AM" : "PM";
    hours %= 12;
    hours = hours ? hours : 12;
    mins = mins < 10 ? `0${mins.toString()}` : mins.toString();
    if (!location)
        return `The time is ${hours}:${mins}${period}`;
    else
        return `The time in ${location} is ${hours}:${mins}${period}`;
}

const Time = (transcript) => {
    if (!transcript.match(/ IN \D+/))
        Edison_Speak.say(parseDate(new Date()));
    else {
        const loc = transcript.split(' IN ')[1];
        const escapedLoc = loc.replace(' ', '+');
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${escapedLoc}&key=f02fce800aab47ce8b059ccbaa2d76b5`)
            .then((res) => {
                const timeZone = res.data.results[0].annotations.timezone.name;
                const localTime = parseDate(new Date(new Date().toLocaleString("en-US", { timeZone })), loc);
                Edison_Speak.say(localTime);
            })
            .catch(err => Edison_Speak.say(`Sorry, but I am unable to get the time from that location.`));

    }
}

export default Time;