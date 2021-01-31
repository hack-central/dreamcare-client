import { Row, Col } from 'antd';
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
        <div
          className="daily-stats-card"
          style={{ padding: '20px', overflowY: 'scroll' }}
        >
          <h1>Today's Journal</h1>
          {query}
        </div>
        <div className="daily-stats-card">
          <MoodCard data={data} />
        </div>
      </div>
      <div className="daily-stats">
        <div className="weekly-stats-card">
          <Row>
            <h1>Your Weekly DreamCare Statistics</h1>
            <h6>
              <i>Placeholder data for the purpose of the hack</i>
            </h6>
          </Row>
          <Row justify="center">
            <Col justify="center">
              <MoodRadarChart />
              <p
                style={{
                  textAlign: 'left',
                  paddingLeft: '55px',
                  fontWeight: 800,
                }}
              >
                Overall Mood Radar Chart
              </p>
            </Col>
            <Col justify="center">
              <HappinessChart />
              <p style={{ textAlign: 'center', fontWeight: 800 }}>
                Weekly Happiness Chart
              </p>
            </Col>
            <Col justify="center">
              <DiaryChart />
              <p style={{ textAlign: 'center', fontWeight: 800 }}>
                Dream Journaling Frequency
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="daily-stats">
        <div className="weekly-stats-card">
          <Row>
            <h1>Based on your dream analysis, we recommend...</h1>
          </Row>
          <Row justify="center">
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
      const prods = [0, 1, 2, 3, 4];
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
