import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination, Select, Space, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { SorterResult } from 'antd/es/table/interface'
import { useUnit } from 'effector-react'
import { sum } from 'rambda'

import { Preview } from './components/Preview'
import { ResetFilters } from './components/ResetFilters'
import { TextFilter } from './components/TextFilter'
import { TypeFilter } from './components/TypeFilter'
import { Types } from './components/Types'
import { Pokemon } from './mockAPI'
import { $appliedFilters, $dataSource, $pagination, $query, $total, fetchList, sync } from './model'
import style from './style.module.css'
import { updateSearchParams } from './utils/updateSearchParams'


const columns: ColumnsType<Pokemon> = [
  { title: '', dataIndex: 'image', width: 64, render: Preview },
  { title: 'Name', dataIndex: 'name', width: 300, sorter: true },
  { title: 'Types', dataIndex: 'types', render: Types },
]

export function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const nextSearchParams = updateSearchParams(searchParams)
  const dataSource = useUnit($dataSource)
  const pagination = useUnit($pagination)
  const query = useUnit($query)
  const total = useUnit($total)
  const appliedFilters = useUnit($appliedFilters)

  React.useEffect(() => {
    sync(searchParams)
    fetchList()
  }, [searchParams])

  return (
    <div className={style.wrapper}>
      <Typography.Title level={2}>Pokedex</Typography.Title>
      <div className={style.header}>
        <Space>
          <TextFilter
            text={query.text}
            onSearch={({ text }) => {
              setSearchParams(
                nextSearchParams({
                  pageIndex: undefined,
                  text,
                }),
              )
            }}
          />
          <TypeFilter
            selectedTypes={query.types}
            appliedCount={appliedFilters.types}
            onSearch={({ types }) => {
              setSearchParams(
                nextSearchParams({
                  pageIndex: undefined,
                  types,
                }),
              )
            }}
          />
          <ResetFilters
            onReset={() => setSearchParams(new URLSearchParams())}
            appliedFiltersCount={sum(Object.values(appliedFilters))}
          />
        </Space>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        onChange={(_, __, s) => {
          const sorter = s as SorterResult<Pokemon>
          const direction = sorter.order
          const sortBy = direction ? sorter.field?.toString() : undefined

          setSearchParams(
            nextSearchParams({
              sortBy,
              direction,
            }),
          )
        }}
      />
      <div className={style.footer}>
        <Pagination
          current={pagination.pageIndex}
          pageSize={pagination.pageSize}
          total={total}
          showSizeChanger={false}
          onChange={(pageIndex) => {
            setSearchParams(
              nextSearchParams({
                pageIndex,
              }),
            )
          }}
        />
        <Typography.Text>Total {total}</Typography.Text>
        <Select
          value={pagination.pageSize}
          options={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
          ]}
          onChange={(pageSize) => {
            setSearchParams(
              nextSearchParams({
                pageIndex: undefined,
                pageSize,
              }),
            )
          }}
        />
      </div>
    </div>
  )
}

