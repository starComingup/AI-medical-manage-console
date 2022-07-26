import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';


const { Statistic } = StatisticCard;

export default () => {
    const [responsive, setResponsive] = useState(false);

    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 572);
            }}
        >
            <ProCard
                title="数据概览"
                extra="2022年7月24日 星期日"
                split={responsive ? 'horizontal' : 'vertical'}
                headerBordered
                bordered
            >
                <ProCard split="horizontal">
                    <ProCard split="horizontal">
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: '昨日新增记录',
                                    value: 6,
                                    description: <Statistic title="较本月记录" value="3.2%" trend="down" />,
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: '本月累计记录',
                                    value: 234,
                                    description: <Statistic title="增长" value="170条" trend="up" />,
                                }}
                            />
                        </ProCard>
                        <ProCard split="vertical">
                            <StatisticCard
                                statistic={{
                                    title: '运行中预测',
                                    value: '12/30',
                                    suffix: '个',
                                }}
                            />
                            <StatisticCard
                                statistic={{
                                    title: '历史记录总数',
                                    value: '390',
                                    suffix: '个',
                                }}
                            />
                        </ProCard>
                    </ProCard>
                    <StatisticCard
                        title="训练服务器负载"
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                                width="100%"
                            />
                        }
                    />
                </ProCard>
                <StatisticCard
                    title="病理组织切片"
                    chart={
                        <img
                            src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                            alt="大盘"
                            width="100%"
                        />
                    }
                />
            </ProCard>
        </RcResizeObserver>
    );
};
