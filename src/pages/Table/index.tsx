import { PlusOutlined } from '@ant-design/icons';
import {ActionType, ProColumns, ProFormUploadButton} from '@ant-design/pro-components';
import {
  ProTable,
  TableDropdown,
  ProForm,
  ProFormGroup,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
    CheckCard,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, message, Modal, DatePicker } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import style from './index.less'


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type SurvivalPredict = {
  case_id: string;
  sex: string;
  slide_id: string;
  slides: string;
  os_months: number;
  labels: {
    stage: string;
    color: string;
  }[]
  status: string;
  pharmaceutical_therapy: string;
  radiation_therapy: string;
  stage_M: string;
  stage_N: string;
  stage_T: string;
  year_of_diagnosis: string;
  age_of_diagnose: string;
  days_of_dead: number;
  years_of_dead: number;
  //抑癌基因表达式
  FGFR3: number;
  E2F3: number;
  FGFR1: number;
  EGFR: number;
  KRT7: number;
  RUNX3: number;
  ARID1A: number;
  CDKN2A: number;
  PTEN: number;
  TP53: number;
  EP300: number;
  KDM6A: number;
  KDM6B: number;
  KMT2D: number;
  KMT2C: number;
  //分型基因表达式
  PPARG: number;
  UPK3A: number;
  KRT5: number;
  KRT14: number;
  cls: string;
};


const caseColumns: ProColumns<SurvivalPredict>[] = [
  {
    title: '病例名称',
    dataIndex: 'case_id',
    editable: false,
    copyable: true,
    fixed: 'left',
    width: 120,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '存活状态',
    width: 120,
    dataIndex: 'status',
    hideInSearch: true,
    fixed: 'left',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: {text: '全部', status: 'Default'},
      Alive: {
        text: '生存',
        status: 'Success',
      },
      Dead: {
        text: '死亡',
        status: 'Default',
        disabled: true,
      },
    },
  },
  {
    title: '总存活周期',
    hideInSearch: true,
    width: 120,
    editable: false,
    dataIndex: 'os_months',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '诊断年份',
    width: 80,
    key: 'showTime',
    dataIndex: 'year_of_diagnosis',
    valueType: 'dateYear',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: 'TNM分期',
    width: 100,
    hideInSearch: true,
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
        <Space>
          {record.labels.map(({ stage, color }) => (
              <Tag color={color} key={stage}>
                {stage}
              </Tag>
          ))}
        </Space>
    ),
  },
  {
    title: 'stage_M',
    hideInSearch: true,
    align: "center",
    width: 80,
    dataIndex: 'stage_M',
  },
  {
    title: 'stage_N',
    hideInSearch: true,
    align: "center",
    width: 80,
    dataIndex: 'stage_N',
  },
  {
    title: 'stage_T',
    hideInSearch: true,
    align: "center",
    width: 80,
    dataIndex: 'stage_T',
  },
  {
    title: '病例性别',
    dataIndex: 'sex',
    width: 80,
    align: "center",
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '是否药物治疗',
    hideInSearch: true,
    width: 120,
    align: "center",
    dataIndex: 'pharmaceutical_therapy',
  },
  {
    title: '是否放射治疗',
    hideInSearch: true,
    align: "center",
    width: 120,
    dataIndex: 'radiation_therapy',
  },
  {
    title: 'FGFR3',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'FGFR3',
  },
  {
    title: 'FGFR1',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'FGFR1',
  },
  {
    title: 'E2F3',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'E2F3',
  },
  {
    title: 'EGFR',
     
    width: 80,
    hideInSearch: true,
    tooltip: "扬癌基因表达量",
    dataIndex: 'EGFR',
  },
  {
    title: 'KRT7',
    hideInSearch: true,
     
    width: 80,
    tooltip: "扬癌基因表达量",
    dataIndex: 'KRT7',
  },
  {
    title: 'RUNX3',
     
    width: 80,
    hideInSearch: true,
    tooltip: "扬癌基因表达量",
    dataIndex: 'RUNX3',
  },
  {
    title: 'ARID1A',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'ARID1A',
  },
  {
    title: 'CDKN2A',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'CDKN2A',
  },
  {
    title: 'PTEN',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'PTEN',
  },
  {
    title: 'TP53',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'TP53',
  },
  {
    title: 'EP300',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'EP300',
  },
  {
    title: 'KDM6A',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'KDM6A',
  },
  {
    title: 'KDM6B',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'KDM6B',
  },
  {
    title: 'KMT2D',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'KMT2D',
  },
  {
    title: 'KMT2C',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'KMT2C',
  },
  {
    title: 'PPARG',
    hideInSearch: true,
    width: 80,
     
    tooltip: "抑癌基因表达量",
    dataIndex: 'PPARG',
  },
  {
    title: 'UPK3A',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'UPK3A',
  },
  {
    title: 'KRT5',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'KRT5',
  },
  {
    title: 'KMT2C',
    hideInSearch: true,
    width: 80,
     
    tooltip: "扬癌基因表达量",
    dataIndex: 'KMT2C',
  },
  {
    title: '备注',
    hideInSearch: true,
    width: 80,

    dataIndex: 'cls',
  },
  {
    title: '预测生存（天）',
    hideInSearch: true,
    width: 120,
    dataIndex: 'days_of_dead',
  },
  {
    title: '预测生存（年）',
    hideInSearch: true,
    width: 120,
    dataIndex: 'years_of_dead',
  },
  {
    title: '操作',
    width: 80,
    valueType: 'option',
    key: 'option',
    align: "center",
    className: 'ant-table-cell ant-table-cell-fix-right ant-table-cell-fix-right-first '+style.custom,
    render: (text, record, _, action) => [
      <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.case_id);
          }}
      >
        编辑
      </a>,
      <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
      />,
    ],
  },
]

export default () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  // @ts-ignore
  return (
      <ProTable<SurvivalPredict>
          columns={caseColumns}
          actionRef={actionRef}
          request={async (params = {}, sort, filter) => {
            return request<{
              data: SurvivalPredict[];
            }>('/api/cases', {
              params,
            });
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="case_id"
          scroll={{ x: '130%' }}
          search={{
            labelWidth: 'auto',
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="病例资料概览"
          toolBarRender={() => [
            <Button key="button" type="primary" onClick={() => setVisible(true)}>
              <PlusOutlined />
              新建记录
            </Button>,
              <>
                <StepsForm
                    onFinish={async (values) => {
                      console.log(values);
                      await waitTime(1000);
                      setVisible(false);
                      message.success('提交成功');
                    }}
                    formProps={{
                      validateMessages: {
                        required: '此项为必填项',
                      },
                    }}
                    stepsFormRender={(dom, submitter) => {
                      return (
                          <Modal
                              title="新建病例"
                              width={800}
                              onCancel={() => setVisible(false)}
                              visible={visible}
                              footer={submitter}
                              destroyOnClose
                          >
                            {dom}
                          </Modal>
                      );
                    }}
                >
                  <StepsForm.StepForm
                      name="base"
                      title="创建病例基本信息"
                      onFinish={async () => {
                        await waitTime(2000);
                        return true;
                      }}
                  >
                    <ProFormText
                        name="name"
                        width="md"
                        label="病例名称"
                        tooltip="最长为 24 位，用于标定的唯一 id"
                        placeholder="请输入名称"
                        rules={[{ required: true }]}
                    />
                    <ProFormUploadButton
                        name="upload"
                        label="上传WSI"
                        max={6}
                        fieldProps={{
                          name: 'file',
                          listType: 'picture-card',
                        }}
                        action="/api/upload"
                    />
                    <ProFormSelect
                        label="选择性别"
                        name="sex"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        width="md"
                        initialValue="1"
                        options={[
                          {
                            value: '1',
                            label: '男',
                          },
                          { value: '2', label: '女' },
                        ]}
                    />
                    <ProFormTextArea name="remark" label="备注" width="lg" placeholder="请输入备注" />
                  </StepsForm.StepForm>
                  <StepsForm.StepForm name="show-area" title="展示识别区域">
                    <CheckCard.Group
                        multiple
                        onChange={(value) => {
                          console.log('value', value);
                        }}
                        defaultValue={['A']}
                    >
                      <CheckCard
                          title="膀胱组织切片"
                          value="A"
                          avatar="/bladder.png"
                      />
                      <CheckCard
                          title="皮肤组织切片"
                          value="B"
                          avatar="/skin.png"
                      />
                    </CheckCard.Group>
                  </StepsForm.StepForm>
                  <StepsForm.StepForm name="label" title="添加病例标签">
                    <ProFormCheckbox.Group
                        name="checkbox"
                        label="治疗史"
                        options={['是否通过药物治疗', '是否通过放射治疗']}
                    />
                    <ProFormSelect
                        label="TNM总分期"
                        name="tnm"
                        width="md"
                        initialValue="0"
                        options={[
                          { value: '0', label: '原位癌0期', },
                          { value: '1', label: 'I期', },
                          { value: '2', label: 'IIA期', },
                          { value: '3', label: 'IIB期', },
                          { value: '4', label: 'IIIA期', },
                          { value: '5', label: 'IIIB期', },
                          { value: '6', label: 'IIIC期', },
                          { value: '7', label: 'IVa期', },
                          { value: '8', label: 'IVb期' },
                        ]}
                    />
                    <ProFormDatePicker name="date" label="诊断年份" picker="year" />
                  </StepsForm.StepForm>
                  <StepsForm.StepForm name="data" title="添加病例数据">
                    <ProFormGroup label="扬癌基因">
                      <ProFormText name="FGFR3" label="FGFR3" width="xs" />
                      <ProFormText name="E2F3" label="E2F3" width="xs" />
                      <ProFormText name="FGFR1" label="FGFR1" width="xs" />
                      <ProFormText name="FGFR" label="FGFR" width="xs" />
                      <ProFormText name="EGFR" label="EGFR" width="xs" />
                      <ProFormText name="KRT7" label="KRT7" width="xs" />
                    </ProFormGroup>
                    <ProFormGroup label="抑癌基因">
                      <ProFormText name="RUNX3" label="RUNX3" width="xs" />
                      <ProFormText name="ARID1A" label="ARID1A" width="xs" />
                      <ProFormText name="CDKN2A" label="CDKN2A" width="xs" />
                      <ProFormText name="PTEN" label="PTEN" width="xs" />
                      <ProFormText name="TP53" label="TP53" width="xs" />
                      <ProFormText name="EP300" label="EP300" width="xs" />
                      <ProFormText name="KDM6A" label="KDM6A" width="xs" />
                      <ProFormText name="KDM6B" label="KDM6B" width="xs" />
                      <ProFormText name="KMT2C" label="KMT2C" width="xs" />
                    </ProFormGroup>
                    <ProFormGroup label="分型指标">
                      <ProFormText name="PPARG" label="PPARG" width="xs" />
                      <ProFormText name="UPK3A" label="UPK3A" width="xs" />
                      <ProFormText name="KRT5" label="KRT5" width="xs" />
                      <ProFormText name="KRT14" label="KRT14" width="xs" />
                    </ProFormGroup>
                  </StepsForm.StepForm>
                </StepsForm>
            </>,

          ]}
      />
  );
};

