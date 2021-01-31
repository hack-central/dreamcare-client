import { useState, useEffect } from 'react';
import confident from '../assets/moodImages/confident.png';
import creative from '../assets/moodImages/creative.png';
import irritated from '../assets/moodImages/irritated.png';
import loving from '../assets/moodImages/loving.png';
import sad from '../assets/moodImages/sad.png';

import './MoodCard.css';

export default function MoodCard({ data }) {
  const [emotionHigh, setEmotionHigh] = useState('');
  const [emotionMed, setEmotionMed] = useState('');
  const [emotionLow, setEmotionLow] = useState('');
  const [moodImage, setMoodImage] = useState(confident);

  useEffect(() => {
    if (data) {
      const tags = data.tags;
      const moods = tags.map((e) => e.slice(0, -10));
      setEmotionHigh(moods[0]);
      setEmotionMed(moods[1]);
      setEmotionLow(moods[2] || 'ecstacy');
      const imgs = [confident, creative, irritated, loving, sad];
      const randomNum = Math.floor(Math.random() * (4 - 0 + 1) + 0);
      setMoodImage(imgs[randomNum]);
    }
  }, [data]);

  return (
    <div id="container">
      <div class="product-details">
        <h1>Your Feelings Today</h1>

        <p class="information">
          You're mainly feeling <strong>{emotionHigh}</strong> today. You're
          also experiencing <strong>{emotionMed}</strong> emotions with a slight{' '}
          <strong>{emotionLow}</strong> feeling.
        </p>
      </div>

      <div class="product-image">
        <img src={moodImage} alt="Feeling illustration" />

        <div class="info">
          <h2>Feelings today</h2>
          <ul>
            <li>Happy</li>
            <li>Confident</li>
            <li>Loving</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
