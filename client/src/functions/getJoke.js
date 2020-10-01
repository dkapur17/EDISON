import Edison_Speak from '../partials/Speak';
import axios from 'axios';

const getJoke = (transcript) => {
    transcript = transcript.split(' ');
    let type = transcript.length === 5 ? transcript[3] : `Any`;
    let flags = "";
    if (type === "CLEAN") {
        type = "Any";
        flags = "blacklistFlags=nsfw,religious,political,racist,sexist&";
    }
    axios.get(`https://sv443.net/jokeapi/v2/joke/${type}?${flags}`)
        .then(res => {
            if (res.data.type === "single")
                Edison_Speak.say(res.data.joke);
            else {
                Edison_Speak.say(res.data.setup);
                Edison_Speak.say(res.data.delivery);
            }
        })
        .catch(err => console.log(err));
}

export default getJoke;