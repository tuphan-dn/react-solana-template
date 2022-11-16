import { Image, Col, Layout, Row, Space, Typography } from 'antd'

import logo from 'static/images/solanaLogo.svg'
import './index.less'

function View() {
  return (
    <Layout className="container">
      <Row gutter={[24, 24]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Space direction="vertical">
            <Image src={logo} preview={false} width={256} />
            <Typography.Title level={1}>React + Solana = DApp</Typography.Title>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default View
