import { Link } from 'react-router-dom';
import SpeechRecognition from 'react-speech-recognition';

import landingImage from '../assets/landingImage.png';

export default function Landing() {
  return (
    <div className="main">
      <img
        src={landingImage}
        style={{ borderRadius: '50%', maxWidth: '250px', marginTop:'20px'}}
      />
      <h1 className="glowing-text">Mind Palace</h1>
      <div className="intro">
        Transforming your dreams to help build a healthy mind for yourself.
        <br />
        {/* TODO: Add brief explanation for app here */}
        {!SpeechRecognition.browserSupportsSpeechRecognition() && (
          <>
            <br />
            <br />
            <i>Currently only supported on Chrome :(</i>
          </>
        )}
      </div>
      <div className="btns">
        {SpeechRecognition.browserSupportsSpeechRecognition() && (
          <Link to="/home" class="play">
            Start your Journey!
          </Link>
        )}
        <a
          className="info"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/hack-central/mind-palace-client"
        >
          Star us on GitHub
        </a>
      </div>
    </div>
  );
}
