import Edison_Speak from '../partials/Speak';

const presence = () => {
    const resp = `For you sir, always.`;
    Edison_Speak.say(resp);
};

export default presence;