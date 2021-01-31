import { useState, useEffect } from 'react';
import confident from '../assets/moodImages/confident.png';

import './MoodCard.css';

export default function MoodCard(props) {
  const [emotionHigh, setEmotionHigh] = useState('');
  const [emotionMed, setEmotionMed] = useState('');
  const [emotionLow, setEmotionLow] = useState('');

  useEffect(() => {
    if (props.tags) {
      const tags = props.tags;
      const moods = tags.map((e) => e.slice(0, -10));
      setEmotionHigh(moods[0]);
      setEmotionMed(moods[1]);
      setEmotionLow(moods[2]);
    }
  }, [props]);

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
        <img src={confident} alt="Feeling illustration" />

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
