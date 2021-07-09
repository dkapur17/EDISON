![ED](./design_assets/Logo.ico)
# EDISON: An Extremely Deligent and Intelligent SON (of a B****)

EDISON is a voice assistant written in JavaScript using **React** and **NodeJS**. It uses the [Bumblebee Hot Word Detection system](https://github.com/jaxcore/bumblebee-hotword), the [Artyom Speech Synthesis Library](https://sdkcarlos.github.io/sites/artyom.html) and the `webkitSpeechRecognition` API available in Chromium-based browsers. The requests are serviced by a REST-ful backend written in Express.js.



https://user-images.githubusercontent.com/37783178/125089162-c27f6f80-e0eb-11eb-8729-02e6936efc09.mp4



## Running it yourself

To run the project yourself, run
```
git clone https://github.com/dkapur17/EDISON.git
cd EDISON
npm i && npm i --prefix ./client
npm run dev
```

Doing this should run the server using `nodemon` and launch a the UI in a browser window.

You could optionally use `npm run start` instead of `npm run dev` to use `node` instead of `nodemon`. But `nodemon` is prefered during development process as it automatically restarts the server when there is any change in the code.

**Note: The project must be run in a chromium based broweser only. If the script launches the UI in Firefox or any other non-chromium-based browser by default, close it and open `localhost:3000` on a chromium based browser like Google Chrome**

For making use of the World Time API, you need to use your own API KEY that you can get from [here](http://worldtimeapi.org/).

Once you have your own API key, make a file called `.env` in the root directory of the project and write the following in it:
```
WORLD_TIME_API_KEY=api_key
```
Replace `api_key` with your API key. Note that this is not needed to run EDISON, but without it, you won't be able to make use of the time at another location command.

## Implementation

The UI is always listening for the wake-word, which is **"HEY EDISON"**. Once the wake word is detected, it sets EDISON's state to active and it begins listening for a command. Once a command is recieved, it is passed through a speech parser which uses Regex patterns to identify the command type. An array is used to store regex patterns and their respective response functions. Upon identifying the command type, the respective function is called. The function in general is an API call to the backend with required parameters. The backend parses the request data and responds with the appropriate response. The response is sent back to the UI, where the business logic decides what to do with it. Generally, EDISON simply speaks the response string.

For more details, have a look at [IMPLEMENTATION.md](./IMPLEMENTATION.md).

## Commands

Currently there isn't that much EDISON can do, though I'm actively working on adding functionality to it. Here is the stuff it can respond to for now:

1. `about`: Ask EDISON "Who/What are you?" or "Tell me about yourself".
2. `time`: Ask EDISON the time, something like "What time is it?" or "What is the time right now?". You can even ask it the time at some other location, like "What is the time in Tanzania?".
3. `day/date`: Ask EDISON today's day/date.
4. `presence`: Ask EDISON if he is there. Inspired by JARVIS.
5. `joke`: Ask EDISON for a joke. By default the joke may be PG-rated. For family friendly jokes, explicitly ask for a "clean" joke.
6. `nothing`: I'm sure this happens to everyone. You use the wake word and then forget what you were going to ask. Say "Nothing" and EDISON goes back to sleep.
7. `fallthrough`: Any command that is not matched by the patterns above are caught by the fallthrough function. In this case, EDISON uses the [DuckDuckGo Instant Answer API](https://github.com/jawerty/node-ddg) to look up your query. If the call returns an answer, EDISON shows it on a modal and reads the first sentence. You could close the modal by clicking on the "OK" button, or view the source of the information by clicking on the "View Content Source" button. You can also close the modal by using the wake word again. There is a chance that the DuckDuckGo API doesn't have the answer you are looking for. In this case, EDISON alerts you that no answer could be found and asks you if it should Google Search for it instead. If you say yes/sure, a Google Search on your query is opened on in a new tab. If you say no instead, nothing happens. The first time you use this, and look to open a the content in a new tab or perform a google search on the query, you may be asked to allow pop-ups. You'll need to accept this request, otherwise EDISON won't be able to launch a new tab.

If you think you are saying a command and it is not giving the expected response, check out the regex for the expected command from [`client/src/partials/Commands.js`](./client/src/partials/Commands.js).

### Why DDG and not Google?

My first preference would've been Google too, but their search API has been depricated and web scraping Google Search results is apparently in violation of their TOS. Kinda uptight ngl. Though if someone is able to figure out a way to use Google Search instead (in a way that is not illegal obviously), hit me up or open a new Issue.

## Where to from here?

I am looking to keep working on EDISON actively (at least until I get bored). My inital motivation for this was an assistant that was tailor made for my needs and one that I could use in my hostel room (God Damn Corona), probably running on a Raspberry Pi, that could help me keep tabs on academics and other things. Maybe even electronic automation with the GPIO functionaly of the Pi. As of now, the basic framework has been laid and adding functionality should be as simple as adding a regex pattern to match the command and the function to handle the command in the backend. 

Another idea is to put the UI into an Electron Wrapper. But this would require some reconfiguration in both the backend and the client. Seems worth it though.

Lots to do... this should keep me busy for a while.

Feel free to fork the project and try adding your own functionality.... I would love to see what other can come up with.
