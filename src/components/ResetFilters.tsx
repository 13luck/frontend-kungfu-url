import React from 'react'
import { Button } from 'antd'


export const ResetFilters: React.FC<{
  onReset: () => void
  appliedFiltersCount: number
}> = ({
  onReset,
  appliedFiltersCount,
}) => (appliedFiltersCount
  ? <Button type="text" onClick={onReset}>Reset filters</Button>
  : null)
