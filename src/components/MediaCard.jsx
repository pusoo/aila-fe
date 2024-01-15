import { Card, Space } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';

const { Meta } = Card;

const MediaCard = () => {
  return (
    <Card
      style={{ width: 300, borderRadius: '20px', overflow: 'hidden' }}
      cover={<img src='https://cff2.earth.com/uploads/2023/06/02100547/Mountain-2-960x640.jpg' style={{ width: '100%', objectFit: 'cover' }} />}
    >
      <div style={{ position: 'relative' }}>
        <PlayCircleFilled style={{
          fontSize: '32px', position: 'absolute', top: '-35px', right: '0', cursor: 'pointer', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', borderRadius: '50%'

        }} />
        <Meta
          title='Sample Title 2'
          description={<Space direction="vertical">
            <span>February 15, 2023
            </span>
            <span>15 mins</span>
          </Space>}
        />
      </div>
    </Card>
  );
};

export default MediaCard;
