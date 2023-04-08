import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import styles from './ModalResult.module.css';

export const ModalResult = () => {
  return (
    <div>
      <Card className={styles.mainCard}  >
        <p className={styles.nameMan} >Имя человека который прошел тест</p>
        <p className={styles.direction}>
          <Button>IOS разработчик</Button>
          <Button>Подразделение: IOS</Button>
        </p>
        <p className={styles.caption}>Тест пройден</p>
     <p> <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Правильных ответов"
              value={67}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Неправильных ответов"
              value={33}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      </p>
      <p className={styles.button}>
        <Button>Посмотреть ответы</Button>
        <Button>Анкета</Button>
      </p>
      </Card>
    </div>
  )
}


