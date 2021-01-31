import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import speak from '../assets/speak.svg';

export default function Home() {
  const MAX_TIME = 120;
  const HINTS_TIME = 30;
  const { transcript, listening } = useSpeechRecognition();
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [query, setQuery] = useState('');
  const [textQuery, setTextQuery] = useState('');
  const [audioBuffer, setAudioBuffer] = useState(undefined);
  const [bars, setBars] = useState([]);
  const [response, setResponse] = useState('Lets get started detective!');

  const countdown = () => {
    let timerDuration = MAX_TIME;
    const timer = setInterval(() => {
      if (timerDuration >= 0) {
        timerDuration = timerDuration - 1;
        setTimeLeft(timerDuration);
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setQuery(transcript);
    }, 1500);

    return () => clearInterval(timer);
  }, [transcript]);

  useEffect(() => {
    countdown();

    const timer = setTimeout(() => {
      //   history.push('/result');
    }, MAX_TIME * 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        if (stream) {
          const context = new (window.AudioContext ||
            window.webkitAudioContext)();
          const source = context.createMediaStreamSource(stream);
          const analyser = context.createAnalyser();
          source.connect(analyser);

          function renderFrame() {
            requestAnimationFrame(renderFrame);
            const frequencyData = new Float32Array(256);
            analyser.getFloatTimeDomainData(frequencyData);
            // console.log(frequencyData);
            const bars = [];
            for (let i = 0; i < 54; i++) {
              const val = Math.abs(frequencyData[i]);
              bars.push(`${val * 1000}%`);
            }
            setBars(bars);
          }
          renderFrame();
        }
      });
  }, []);

  useEffect(() => {
    if (audioBuffer) {
      const context = new AudioContext() || new window.webkitAudioContext();
      context.decodeAudioData(audioBuffer, (buffer) => {
        const bufferSource = context.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.connect(context.destination);
        bufferSource.start();
      });

      return () => context.close();
    }
  }, [audioBuffer]);

  useEffect(() => {
    (async () => {
      if (query) {
        const data = JSON.stringify({ queries: [query] });
        const config = {
          method: 'post',
          url: 'https://o2fast2curious-kkpo.uc.r.appspot.com/intent/text',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        const res = await axios(config);
        if (res && res.data.success) {
          const {
            fulfillmentText,
            outputAudio: { data },
          } = res.data.data[0];
          const arrBuffer = new Uint8Array(data).buffer;
          setAudioBuffer(arrBuffer);
          setResponse(fulfillmentText);
        }
      }
    })();
  }, [query]);
  return (
    <div className="journal-container">
      <div className="journal-column">
        <h3 className="speech-input">{transcript}</h3>
        <h1 className="speech-output">"{response}"</h1>

        <div className="voice-button">
          <button
            className="voice-button-icon"
            onClick={() =>
              SpeechRecognition.startListening({ language: 'en-IN' })
            }
          >
            <img style={{ maxWidth: '40px' }} src={speak} alt="speak icon" />
          </button>
        </div>
        {listening && (
          <div className="voice-coder">
            <Visualizer bars={bars} />
          </div>
        )}

        <div className="btn">
        <Link to="" class="play">
            Save!
        </Link>
        </div>
      </div>

      <div className="journal-column">...</div>
    </div>
  );
}

const Visualizer = ({ bars }) => {
  return bars.map((bar, i) => <span id={`${i + 1}`} style={{ height: bar }} />);
};
