function convertToAntdTable(data, displayColumns = [], columnConfigs = {}, customColumns = [], columnOrder = []) {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      dataSource: [],
      columns: []
    };
  }

  // Generate dataSource with unique keys

  const dataSource = data.map((item, index) => ({
    key: (index + 1).toString(),
    ...item
  }));

  let maxKeysRow = data.reduce((max, current) => 
    Object.keys(current).length > Object.keys(max).length ? current : max
  , data[0]);

  // Generate columns from the first object's keys
  let columns = Object.keys(maxKeysRow)
    .filter(key => key !== 'key') // Exclude the key field
    .map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
      ...(columnConfigs[key] || {}) // Merge custom config for this column if provided
    }));

  // Filter columns if displayColumns array is provided
  if (displayColumns.length > 0) {
    columns = columns.filter(col => displayColumns.includes(col.key));
  }

  // Add custom columns
  if (Array.isArray(customColumns) && customColumns.length > 0) {
    columns = columns.concat(customColumns);
  }

  // Order columns if columnOrder array is provided
  if (Array.isArray(columnOrder) && columnOrder.length > 0) {
    const orderedColumns = columnOrder.map(key => columns.find(col => col.key === key)).filter(col => col);
    const remainingColumns = columns.filter(col => !columnOrder.includes(col.key));
    columns = [...orderedColumns, ...remainingColumns];
  }


  return {
    dataSource,
    columns
  };
}

/**
 * Returns a sorter function for Ant Design Table columns.
 * Supports both numbers and text (strings).
 * @param {'number'|'text'} type - The data type to sort ('number' or 'text')
 * @param {string} [dataIndex] - Optional: the key to sort by (if row is an object)
 */
function antdTableSorter(type, dataIndex) {
  return (a, b) => {
    const aValue = dataIndex ? a[dataIndex] : a;
    const bValue = dataIndex ? b[dataIndex] : b;
    if (type === 'number') {
      return (Number(aValue) || 0) - (Number(bValue) || 0);
    }
    if (type === 'text') {
      return String(aValue || '').localeCompare(String(bValue || ''));
    }
    return 0;
  };
}

export { convertToAntdTable, antdTableSorter }