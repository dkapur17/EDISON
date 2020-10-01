import Commands from './Commands';

const SpeechParse = (transcript) => {
    const regexList = Commands;
    let matched = false;
    regexList.forEach(pair => {
        if (!matched)
            if (pair.req.test(transcript)) {
                matched = true;
                pair.res(transcript);
            }
    })
};

export default SpeechParse;