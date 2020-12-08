import React, { Component } from 'react';
import Edison_Wake from '../partials/Wake';
import Edison_Listen from '../partials/Listen';
import SpeechParse from '../partials/SpeechParse';
import Edison_Speak from '../partials/Speak';
import swal from 'sweetalert';

const wakeSound = new Audio("Awake_Sound.mp3");

class Edison extends Component {
    state = {
        transcript: "",
        active: false,
        isFinal: true
    }

    componentDidMount() {
        Edison_Wake.on('hotword', () => {
            this.recognizeHotword();
        });
        Edison_Wake.start();
    }

    recognizeHotword = () => {
        this.setState({ active: true });
        this.activated();
    }

    activated = () => {
        try {
            this.handleListen();
        }
        catch (e) {
            window.location.reload();
        }
    }

    handleListen = () => {
        if (Edison_Speak.isSpeaking())
            Edison_Speak.shutUp();
        if (swal.getState().isOpen)
            swal.close();
        Edison_Listen.start();
        Edison_Listen.onstart = () => {
            wakeSound.play();
            this.setState({ transcript: "", isFinal: false });
        }
        Edison_Listen.onresult = event => {
            const transcript = event.results[0][0].transcript.toUpperCase();
            this.setState({ transcript, isFinal: event.results[0].isFinal });
            this.setState({ active: false });
            if (this.state.isFinal)
                SpeechParse(transcript);
        }

    }

    render() {
        const status = this.state.active ? (<div className="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="sr-only">Listening...</span>
        </div>) : <div className="waiting">
                <span className="dot"></span>
            </div>
        return (
            <div className="Edison d-flex-column align-items-center text-center">
                <h1 className="display-1">Hello There! I'm EDISON.</h1>
                <p className="lead">Say "Hey Edison" to get started</p>
                {status}
                <div className="lead d-block" style={{ color: (this.state.isFinal ? "#61DAFB" : "gray"), height: "30px" }} >{this.state.transcript}</div>
            </div >
        );
    }

}

export default Edison;
