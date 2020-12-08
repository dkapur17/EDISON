import Edison_Speak from "../partials/Speak";
import axios from "axios";
import swal from 'sweetalert';
const wakeSound = new Audio("Awake_Sound.mp3");

const failResponse = "Sorry, but it seems like I am unable to connect to the server";

const errHandle = err => {
    Edison_Speak.say(failResponse);
    console.log(err);
}

export const aboutEdison = () => {
    axios.get('/qna/about')
        .then(res => Edison_Speak.say(res.data))
        .catch(err => errHandle(err));
}

export const time = (transcript) => {
    axios.post('/qna/time', {
        transcript
    }).then(res => Edison_Speak.say(res.data))
        .catch(err => errHandle(err));
};

export const todayDate = (type) => {
    axios.post('/qna/date', { type })
        .then(res => Edison_Speak.say(res.data))
        .catch(err => errHandle(err))
};

export const presence = () => {
    axios.get('/qna/presence')
        .then(res => Edison_Speak.say(res.data))
        .catch(err => errHandle(err))
};

export const getJoke = (transcript) => {
    axios.post('/qna/joke', { transcript })
        .then(res => {
            if (res.data.type === "single")
                Edison_Speak.say(res.data.joke);
            else {
                Edison_Speak.say(res.data.setup);
                Edison_Speak.say(res.data.delivery);
            }
        })
        .catch(err => errHandle(err))
};

export const nothing = () => {
    Edison_Speak.say("OK.");
}

export const fallThrough = (query) => {
    axios.post('/qna/fallthrough', { query })
        .then(res => {
            let speechString = res.data.Abstract;
            if (!speechString) {
                Edison_Speak.say("Couldn't find an answer. Would you like for me to look up your query on google instead?");
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const tempRecog = new SpeechRecognition();
                tempRecog.continuous = false;
                tempRecog.lang = 'en-US';
                tempRecog.interimResults = false;
                setTimeout(() => {
                    tempRecog.onstart = () => {
                        wakeSound.play();
                    }
                    tempRecog.start();
                    tempRecog.onresult = event => {
                        const reply = event.results[0][0].transcript.toUpperCase();
                        let re = /\D*(YES|SURE)\D*/;
                        if (re.test(reply)) {
                            Edison_Speak.say("Search result coming right up");
                            setTimeout(() => {
                                const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                                const webSearch = window.open(url, '_blank');
                                webSearch.focus();
                            }, 2000);
                        }
                        else
                            Edison_Speak.say("Alright");
                    }
                }, 5500);
            }
            else {
                speechString = speechString.split('.')[0];
                Edison_Speak.say(speechString);
                swal({
                    title: query,
                    text: res.data.Abstract,
                    buttons: {
                        OK: true,
                        source: {
                            text: "View Content Source",
                            value: "source"
                        }
                    },
                }).then((value) => {
                    if (Edison_Speak.isSpeaking())
                        Edison_Speak.shutUp();
                    if (value === "source") {
                        let win = window.open(res.data.AbstractURL, '_blank');
                        win.focus();
                    }
                })
            }
        })
        .catch(err => errHandle(err));
};