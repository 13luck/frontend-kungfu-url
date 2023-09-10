import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { Badge, Button, Checkbox, Popover, Space } from 'antd'
import { equals } from 'rambda'

import { pokemonTypes } from '../mockAPI'
import { arrayPushPull } from '../utils/arrayPushPull'


const options = pokemonTypes

export const TypeFilter: React.FC<{
  selectedTypes?: string[]
  onSearch: ({ types }: { types: string[] }) => void
  appliedCount: number
}> = ({
  selectedTypes = [],
  onSearch,
  appliedCount,
}) => {
  const [open, setOpen] = React.useState(false)
  const [values, setValues] = React.useState<string[]>([])

  React.useEffect(() => {
    if (!equals(values, selectedTypes)) setValues(selectedTypes)
  }, [selectedTypes])

  const handleChange = (types: string[]) => () => {
    onSearch({ types })
    setOpen(false)
  }

  const content = (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <Space direction="vertical" size={[0, 16]}>
        <Space direction="vertical">
          {options.map((value) => (
            <Checkbox
              checked={values.includes(value)}
              onChange={(e) => setValues(arrayPushPull(values, value, e.target.checked))}
              key={value}
            >
              <span style={{ textTransform: 'capitalize' }}>{value}</span>
            </Checkbox>
          ))}
        </Space>
        <Space>
          <Button onClick={handleChange([])} disabled={!appliedCount}>Reset</Button>
          <Button onClick={handleChange(values)} type="primary">Apply</Button>
        </Space>
      </Space>
    </OutsideClickHandler>
  )

  return (
    <Popover content={content} placement="bottomLeft" open={open}>
      <Button onClick={() => setOpen(true)}>
        <Space>
          <span>Types</span>
          {!!appliedCount && <Badge count={appliedCount} />}
        </Space>
      </Button>
    </Popover>
  )
}
