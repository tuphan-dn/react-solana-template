import IonIcon from '@sentre/antd-ionicon'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'

import { Image, Col, Layout, Row, Space, Typography, Button } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import logo from 'static/images/solanaLogo.svg'
import brand from 'static/images/solanaLogoMark.svg'
import './index.less'

function View() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const getMyBalance = useCallback(async () => {
    if (!publicKey) return setBalance(0)
    // Read on-chain balance
    const lamports = await connection.getBalance(publicKey)
    return setBalance(lamports)
  }, [connection, publicKey])

  const airdrop = useCallback(async () => {
    try {
      setLoading(true)
      if (publicKey) {
        // Request SOL airdrop
        await connection.requestAirdrop(publicKey, 10 ** 8)
        // Reload balance
        return getMyBalance()
      }
    } catch (er: any) {
      console.log(er.message)
    } finally {
      return setLoading(false)
    }
  }, [connection, publicKey, getMyBalance])

  const transfer = useCallback(async () => {
    try {
      setLoading(true)
      if (publicKey) {
        // Create a "transfer" instruction
        const instruction = SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports: 10 ** 8,
        })
        // Create a transaction and add the instruction intot it
        const transaction = new Transaction().add(instruction)
        // Wrap on-chain info to the transaction
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext()
        // Send and wait for the transaction confirmed
        const signature = await sendTransaction(transaction, connection, {
          minContextSlot,
        })
        await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        })
        // Reload balance
        return getMyBalance()
      }
    } catch (er: any) {
      console.log(er.message)
    } finally {
      return setLoading(false)
    }
  }, [connection, publicKey, getMyBalance, sendTransaction])

  useEffect(() => {
    getMyBalance()
  }, [getMyBalance])

  return (
    <Layout className="container">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col flex="auto">
              <img alt="logo" src={brand} height={16} />
            </Col>
            <Col>
              <WalletMultiButton />
            </Col>
          </Row>
        </Col>
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
            <Typography.Title>
              My Balance: {balance / 10 ** 9} SOL
            </Typography.Title>
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={airdrop}
                loading={loading}
              >
                Airdrop
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={transfer}
                loading={loading}
              >
                Transfer
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </Layout>
  )
}

export default View
