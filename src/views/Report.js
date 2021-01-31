import { Card, Row, Col } from 'antd';

import HappinessChart from '../components/HappinessChart';
import MoodCard from '../components/MoodCard';
import MoodRadarChart from '../components/MoodRadarChart';
import DiaryChart from '../components/DiaryChart';
import Product from '../components/Product';

export default function Report({ query, response }) {
  return (
    <div>
      <div className="daily-stats">
        <div className="daily-stats-card">{query}</div>
        <div className="daily-stats-card">
          <MoodCard data={response} />
        </div>
      </div>
      <div className="daily-stats">
        <div className="weekly-stats-card">
          <Row>
            <h1>Your Weekly DreamCare Statistics</h1>
            <h6>(Placeholder data for the purpose of the hack)</h6>
          </Row>
          <Row justify="center">
            <Col justify="center">
              <MoodRadarChart />
              <p style={{ textAlign: 'left', paddingLeft: '55px' }}>
                Overall Mood Radar Chart
              </p>
            </Col>
            <Col justify="center">
              <HappinessChart />
              Weekly Happiness Chart
            </Col>
            <Col justify="center">
              <DiaryChart />
              Dream Journaling Frequency
            </Col>
          </Row>
        </div>
      </div>
      <div className="daily-stats">
        <div className="weekly-stats-card">
          <Row>
            <Product />
            <Product />
            <Product />
            <Product />
          </Row>
        </div>
      </div>
    </div>
  );
}
