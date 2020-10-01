import Edison_Speak from "../partials/Speak";
import axios from 'axios';

const aboutEdison = async () => {
    await axios.get('/api/about')
        .then(res => Edison_Speak.say(res.data))
        .catch(err => {
            Edison_Speak.say("Sorry, but it seems like I am unable to connect to the server");
            console.log(err);
        });
}

export default aboutEdison;