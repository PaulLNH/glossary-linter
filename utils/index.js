exports.removeEmptyStringsFromArray = arr => {
  if (Array.isArray(arr)) {
    return arr.filter(str => str === "" ? false : true)
  } else {
    console.log("Error: The following data is not of type 'Array'.", arr);
  }
};
