const SpeechRecongnition = window.SpeechRecognition || window.webkitSpeechRecognition;
const Edison_Listen = new SpeechRecongnition();

Edison_Listen.continuous = false;
Edison_Listen.lang = 'en-US';
Edison_Listen.interimResults = true;

export default Edison_Listen;