
import React, { ReactNode } from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  onSort?: (accessor: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  emptyMessage = 'No data available',
  onSort,
  sortColumn,
  sortDirection,
}) => {
  const handleSort = (accessor: string) => {
    if (onSort && columns.find(col => col.accessor === accessor)?.sortable) {
      onSort(accessor);
    }
  };
  
  const renderSortIcon = (column: Column) => {
    if (!column.sortable) return null;
    
    if (sortColumn === column.accessor) {
      return (
        <span className="ml-1">
          {sortDirection === 'asc' ? '▲' : '▼'}
        </span>
      );
    }
    
    return <span className="ml-1 text-gray-300">▼</span>;
  };
  
  if (data.length === 0) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-4 text-gray-500 text-center">
          {emptyMessage}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => handleSort(column.accessor)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.cell 
                      ? column.cell(row[column.accessor], row)
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
