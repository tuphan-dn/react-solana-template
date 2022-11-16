import IonIcon from '@sentre/antd-ionicon'

import { Image, Col, Layout, Row, Space, Typography, Button } from 'antd'

import logo from 'static/images/solanaLogo.svg'
import './index.less'

function View() {
  return (
    <Layout className="container">
      <Row gutter={[24, 24]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space direction="vertical" size={24}>
            <Image src={logo} preview={false} width={256} />
            <Typography.Title level={1}>React + Solana = DApp</Typography.Title>
            <Typography.Text type="secondary">
              <Space>
                <IonIcon name="logo-react" />
                +
                <IonIcon name="logo-solana" />
                =
                <IonIcon name="rocket" />
              </Space>
            </Typography.Text>
            <Button type="primary" size="large">
              Let's go
            </Button>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default View
