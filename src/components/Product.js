import { Card } from 'antd';

const { Meta } = Card;

export default function Product(props) {
  return (
    <div style={{ padding: '0 20px' }}>
      <Card
        hoverable
        title={
          <p
            style={{
              fontSize: '12px',
              textAlign: 'left',
              marginBottom: '-3px',
            }}
          >
            tags: {props.tags.map((tag) => tag + ',')}
          </p>
        }
        style={{ width: 240, borderRadius: '10px' }}
        cover={<img alt="example" src={props.imgUrl} />}
        onClick={(e) => window.open(props.link, '_blank')}
      >
        <Meta title={props.title} description={props.link} />
      </Card>
    </div>
  );
}

Product.defaultProps = {
  title: 'Sample Product Title',
  link: 'https://www.example.com',
  imgUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  tags: ['Happy'],
};
