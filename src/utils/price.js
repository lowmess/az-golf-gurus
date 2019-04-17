const toMoney = num => {
  const money = num.toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  // `minimumFractionDigits` can do this, but also will turn
  // `123.4` to `$123.4` which is not desired
  return money.includes('.00') ? money.slice(0, -3) : money
}

export { toMoney }
