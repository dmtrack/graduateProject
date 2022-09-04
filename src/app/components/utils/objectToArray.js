const ObjectToArray = (object) => {
  const newArray = [];
  for (const elem of object) {
    newArray.push(elem);
  }
  return newArray;
};

export default ObjectToArray;
