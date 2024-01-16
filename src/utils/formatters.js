const currency = (number) => {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(number);
};

module.exports = currency
