# Implementation


## Client
UI-wise, there is not a lot going on here. `App.js` simply renders the `Edison` component, which can be found in [`client/src/components/Edison.js`](./client/src/components/Edison.js).

Have a look at the import statements. There are three distinct parts to EDISON.
1. The wake word detection system called `Edison_Wake`. Implemented in [`client/src/partials/Wake.js`](./client/src/partials/Wake.js)
2. The speech recognizer called `Edison_Listen`. Implemented in [`client/src/partials/Listen.js`](./client/src/partials/Listen.js)
3. The speach synthesizer called `Edison_Speak`. Implemented in [`client/src/partials/Speak.js`](./client/src/partials/Speak.js).

When the wake word is spoken, a function is triggered that activated the speech recognizer. It analyzes the spoken speech and returns a transcript. The transcript is sent to the `speechParse()` method implemented in [`client/src/partials/SpeechParse.js`](./client/src/partials/SpeechParse.js). In here, we import the list of commands from [`client/src/partials/Commands.js`](./client/src/partials/Commands.js). Each command is a JavaScript object with two properties:
1. `req`: This is a regex pattern.
2. `res`: A function that will be run if the corresponding `res` pattern matches the transcript.

Each command is iterated over and its `res` is tested against the trascript. For the first pattern that matches the `transcript`, the corresponding `res` function is run. The `res` functions for every command is defined in corresponding files under the `client/src/functions` directory.

## Server

On the backend, it is a simple Express application, implemented in [`server.js`](./server.js) that uses a different router for each type of query that it can service. As of now, there is just one router, which services **QnA** type queries. Each router has its own file in the `routers` directory. The functions for some of the routes may also require utility functions to help parse the request from the client or a response from a secondary call it had to make to a third-party API. All such utility functions are defined in and exported from [`util_functions.js`](./util_functions.js).


**This is obviously an oversimplification of what is going on in the code. Though hopefully it is enough to understand the flow structure for the data.**