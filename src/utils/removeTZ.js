const dateWithoutTZ = (date) => {
  return date.split('T')[0];
}

export default dateWithoutTZ;