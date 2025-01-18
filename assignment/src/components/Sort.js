export function dynamicSort(properties, sortOrder = 'asc') {
    return function (a, b) {
      for (let i = 0; i < properties.length; i++) {
        let prop = properties[i];
        if (a[prop] < b[prop]) return sortOrder === 'asc' ? -1 : 1;
        if (a[prop] > b[prop]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    };
  }
  