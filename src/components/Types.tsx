import React from 'react'
import { Space, Tag } from 'antd'


export const Types = (types: string[] = []) => (
  <Space size={[0, 8]} wrap>
    {types.map((type) => <Tag key={type}>{type}</Tag>)}
  </Space>
)
