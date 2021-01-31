import { useState } from 'react';
import confident from '../assets/moodImages/confident.png';

import './MoodCard.css';

export default function MoodCard(props) {
  const [emotionHigh, setEmotionHigh] = useState('');
  const [emotionMed, setEmotionMed] = useState('');
  const [emotionLow, setEmotionLow] = useState('');
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
