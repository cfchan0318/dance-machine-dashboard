function convertToAntdTable(data, displayColumns = [], columnConfigs = {}) {
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
  
    // Generate columns from the first object's keys
    let columns = Object.keys(data[0])
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
  
    return {
      dataSource,
      columns
    };
  }
  
export {convertToAntdTable}