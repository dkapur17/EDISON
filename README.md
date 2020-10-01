# Extremely Deligent and Intelligent System of Neurons

# Idea
EDISON is a voice assistant written in React and JavaScript. It uses the Bumblebee Hot Word Detection system, the Artyom Speech Synthesis Library and the webkitSpeechRecognition system of the Chromium Browser. The brains of the operation is a simple API backend that parses incoming commands using regex, determines the response and tells the React app what to say. The API is written in Express.