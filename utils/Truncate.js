export const truncateWords = (str, length, ending) => {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + " " + ending;
  } else {
    return str;
  }
};

export const NumberFormat = (val) => {
  if (val) {
    // remove sign if negative
    var sign = 1;
    if (val < 0) {
      sign = -1;
      val = -val;
    }
    // trim the number decimal point if it exists
    let num = val.toString().includes(".")
      ? val.toString().split(".")[0]
      : val.toString();
    let len = num.toString().length;
    let result = "";
    let count = 1;

    for (let i = len - 1; i >= 0; i--) {
      result = num.toString()[i] + result;
      if (count % 3 === 0 && count !== 0 && i !== 0) {
        result = "," + result;
      }
      count++;
    }
    // return result with - sign if negative
    return sign < 0 ? "-" + result : result;
  }
  return null;
};
export const NumberFormatAcres = (val) => {
  if (val) {
    // remove sign if negative
    var sign = 1;
    if (val < 0) {
      sign = -1;
      val = -val;
    }
    // trim the number decimal point if it exists
    let num = val.toString().includes(".")
      ? val.toString().split(".")[0]
      : val.toString();
    let len = num.toString().length;
    let result = "";
    let count = 1;

    for (let i = len - 1; i >= 0; i--) {
      result = num.toString()[i] + result;
      if (count % 3 === 0 && count !== 0 && i !== 0) {
        result = "," + result;
      }
      count++;
    }

    // add number after decimal point
    if (val.toString().includes(".")) {
      result = result + "." + val.toString().split(".")[1];
    }
    // return result with - sign if negative
    return sign < 0 ? "-" + result : result;
  }
  return null;
};
// export const NumberFormat = (number) => {
//   if(number){
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }
//   return null
// };
