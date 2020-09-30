import React, { useMemo } from 'react';

export default function useOutputTableColumns(): any{
  const columns = useMemo(
    ()=>([
      {
        title: 'Product Name',
        dataIndex: 'name'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        align: 'right'
      }
    ]), []
  );
  return columns;
}