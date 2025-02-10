const getQueryDetails = (query) => {
    // Initialize default values
    let sortParams = {};
    let page = 0;
    let limit = 0;
    let select = '';
    let filters = {};
  
    // Handle sorting parameters
    if (query.sortby) {
      query.sortby.split(',').forEach((field) => {
        const [key, order] = field.split('=');
        sortParams[key] = order === 'desc' ? -1 : 1; // -1 for descending, 1 for ascending
      });
    }
  
    // Handle pagination
    if (query.page && query.limit) {
      limit = Number(query.limit);
      page = (Number(query.page) - 1) * limit; // Calculate skip value for pagination
    }
  
    // Handle field selection
    if (query.fields) {
      select = query.fields.split(',').join(' '); // Convert comma-separated fields to space-separated
    }
  
 // Filters
 if (query.filterby) {
    const filterConditions = query.filterby.split('&'); // Split multiple conditions
    filterConditions.forEach((condition) => {
      if (condition.includes('=')) {
        // Handle exact matches with optional case sensitivity
        const [rawKey, rawValue] = condition.split('=');
        const [key, caseOption] = rawKey.split(':'); // Extract case sensitivity option (e.g., taskName:ci)
  
        const value = rawValue.replace(/"/g, ''); // Remove quotes from the value
          // Case-insensitive: Use regex with the 'i' flag
          filters[key] = { $regex: value, $options: 'i' };
       
      } else if (/>=|<=|>|</.test(condition)) {
        // Handle numeric filters (e.g., salary>100)
        const match = condition.match(/(.*?)(>=|<=|>|<)(.*)/);
        if (match) {
          const [, field, operator, value] = match;
          filters[field] = { [`$${operator}`]: Number(value) }; // Add MongoDB operator
        }
      }
    });
  }
  
    
  
    // Return the processed query details
    return {
      sortParams,
      page,
      limit,
      select,
      filters
    };
  };
  
  module.exports = getQueryDetails;
  