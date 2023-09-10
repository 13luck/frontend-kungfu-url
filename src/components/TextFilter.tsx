import React from 'react'
import { Input, Space } from 'antd'


export const TextFilter: React.FC<{
  text?: string
  onSearch: ({ text }: { text: string }) => void
}> = ({
  text = '',
  onSearch,
}) => {
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    if (text !== search) setSearch(text)
  }, [text])

  return (
    <Space wrap>
      <Input.Search
        value={search}
        placeholder="Search by name"
        onSearch={() => search.length >= 1 && onSearch({ text: search })}
        style={{ width: 350 }}
        enterButton
        onChange={(e) => {
          const { value } = e.target
          setSearch(value)
          if (value.length === 0) onSearch({ text: '' })
        }}
      />
    </Space>
  )
}
