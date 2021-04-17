module.exports = {
  removeEmptyStringsFromArray: (arr) => {
    if (Array.isArray(arr)) {
      return arr.filter((str) => (str === "" ? false : true));
    } else {
      console.log("Error: The following data is not of type 'Array'.", arr);
    }
  },
  isArray: (arr) => {
    if (Array.isArray(arr)) {
      return true;
    } else {
      return false;
    }
  },
  titleCase: (str) => {
    let upper = true;
    let newStr = "";
    for (let i = 0, l = str.length; i < l; i++) {
      // Note that you can also check for all kinds of spaces  with
      // str[i].match(/\s/)
      if (str[i] == " ") {
        upper = true;
        newStr += str[i];
        continue;
      }
      newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
      upper = false;
    }
    return newStr;
  },
  parseJSONForWritingToFile: (json) => {
    return JSON.stringify(json, null, 2);
  },
};
