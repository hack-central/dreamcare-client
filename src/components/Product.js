import { Card } from 'antd';

const { Meta } = Card;

export default function Product({ data: { tags, image, link, title } }) {
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
            tags: {tags.map((tag) => tag.slice(0, -10) + ',')}
          </p>
        }
        style={{ width: 240, borderRadius: '10px' }}
        cover={<img alt="example" src={image} />}
        onClick={(e) => window.open(link, '_blank')}
      >
        <Meta title={title} description={link} />
      </Card>
    </div>
  );
}

Product.defaultProps = {
  title: 'Sample Product Title',
  link: 'https://www.example.com',
  image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
  tags: ['Happy'],
};
