function sum_to_n_a(n) {
  let sum = 0
  for (let i = 0; i <= n; i++) {
    sum += i
  }
  return sum
}

function sum_to_n_b(n) {
  let sum = 0
  while (n > 0) {
    sum += n
    n -= 1
  }
  return sum
}

function sum_to_n_c(n) {
  if (n > 0) {
    return n + sum_to_n_c(n - 1)
  }
  else return n
}

