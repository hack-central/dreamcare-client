import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import speak from '../assets/speak.svg';

export default function Home() {
  const { transcript, listening } = useSpeechRecognition();
  const [query, setQuery] = useState('');
  const [bars, setBars] = useState([]);
  const [response, setResponse] = useState(undefined);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuery(transcript);
    }, 100);

    return () => clearInterval(timer);
  }, [transcript]);

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

  // useEffect(() => {
  //   (async () => {
  //     if (query) {
  //       const url =
  //         'https://mind-palace-api-dot-eastern-surface-293816.el.r.appspot.com/api/nlp';
  //       var bodyFormData = new FormData();
  //       bodyFormData.append('data', query);
  //       const config = {
  //         method: 'post',
  //         url: 'http://localhost:8080/api/nlp',
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         data: bodyFormData,
  //       };

  //       const res = await axios(config);
  //       if (res && res.data.success) {
  //         const analyticsResponse = res.data;
  //         setResponse(analyticsResponse);
  //       }
  //     }
  //   })();
  // }, [query]);

  if (response) {
    <Redirect to={{ pathname: '/report', state: response }} />;
  }

  const sendData = async () => {
    if (query) {
      const url =
        'https://mind-palace-api-dot-eastern-surface-293816.el.r.appspot.com/api/nlp';
      var bodyFormData = new FormData();
      bodyFormData.append('data', query);
      const config = {
        method: 'post',
        url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: bodyFormData,
      };

      const res = await axios(config);
      if (res && res.data.success) {
        const analyticsResponse = res.data;
        setResponse(analyticsResponse);
      }
    }
  };

  return (
    <div className="journal-container">
      <div className="journal-column">
        <h3 className="speech-input">{transcript}</h3>
        <h1 className="speech-output">Talk about your dream</h1>
        <div className="voice-button">
          <button
            className={
              listening
                ? 'voice-button-icon voice-button-icon-active'
                : 'voice-button-icon'
            }
            onClick={() => {
              if (!listening) {
                SpeechRecognition.startListening({
                  language: 'en-IN',
                  continuous: true,
                });
              } else {
                SpeechRecognition.stopListening();
              }
            }}
          >
            <img style={{ maxWidth: '40px' }} src={speak} alt="speak icon" />
          </button>
        </div>
        {listening && (
          <div className="voice-coder">
            <Visualizer bars={bars} />
          </div>
        )}
        <div className="btn" onClick={sendData}>
          <Link class="play">Save!</Link>
        </div>
      </div>
      <div
        className="journal-column"
        contentEditable
        onChange={(e) => setQuery(e.target.value)}
        suppressContentEditableWarning
      >
        {query}
      </div>
    </div>
  );
}

const Visualizer = ({ bars }) => {
  return bars.map((bar, i) => <span id={`${i + 1}`} style={{ height: bar }} />);
};
