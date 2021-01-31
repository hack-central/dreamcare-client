import { Card, Row, Col } from 'antd';
import HappinessChart from '../components/HappinessChart';
import MoodCard from '../components/MoodCard';
import MoodRadarChart from '../components/MoodRadarChart';
import DiaryChart from '../components/DiaryChart';
import { useState, useEffect } from 'react';
import Product from '../components/Product';

export default function Report() {
  const [query, setQuery] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    let res = localStorage.getItem('mindPalace');
    if (res) {
      res = JSON.parse(res);
      console.log(res);
      setQuery(res.query);
      setData(res.response);
    }
  }, []);

  return (
    <div>
      <div className="daily-stats">
        <div className="daily-stats-card">{query}</div>
        <div className="daily-stats-card">
          <MoodCard data={data} />
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
            <Products data={data} />
          </Row>
        </div>
      </div>
    </div>
  );
}

const Products = ({ data }) => {
  if (data) {
    console.log(data);
    const { recommendedProducts } = data;
    if (recommendedProducts.length > 4) {
      const prods = [0, 1, 2, 3];
      return prods.map((e, i) => {
        return <Product data={recommendedProducts[e]} />;
      });
    } else {
      return recommendedProducts.map((product, i) => {
        return <Product data={product} />;
      });
    }
  }
  return null;
};
