import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Spin, Statistic } from 'antd';
import styles from './ModalResult.module.css';
import { useGetUserTestResultsByIdQuery } from '../../app/services/UserApi';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type UserResultStatsT = {
  testId: string;
}
type ChartDataT = {
  series: any,
  options: ApexOptions,
}

export const UserResultStats: React.FC<UserResultStatsT> = ({ testId }) => {
  const { data, isLoading } = useGetUserTestResultsByIdQuery(testId)


  const resultChartData: ChartDataT[] | undefined = data?.criterias.map((item) => {
    let chartData: ChartDataT = {
      series: [item.result * 10],
      options: {
        chart: {
          height: 350,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            }
          },
        },
        labels: [item.criteria.name],
      },
    }
    return chartData
  })


  return (
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap'}}>
        {
          resultChartData?.length && 
          resultChartData.map((chart, index) => {
            return (
              <div key={index}>
                <ReactApexChart options={chart.options} series={chart.series} type='radialBar' />
              </div>
            )
          })
        }
        {
          isLoading && 
          <Spin size="large" style={{ width: "100%", height: "100%" }} />
        }
      </div>
  )
}


