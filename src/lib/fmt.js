const nf = (min, max) => new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: min, maximumFractionDigits: max
})

export const n1 = v => (v == null ? '--' : nf(1, 1).format(v))
export const n0 = v => (v == null ? '--' : nf(0, 0).format(v))
export const kg = v => (v == null ? '--' : nf(1, 1).format(v) + ' kg')
export const pct = v => (v == null ? '--' : nf(1, 1).format(v) + '%')

// Delta sempre com sinal explícito: o sinal e a informação.
export const sinal = (v, casas = 1) =>
  v == null ? '--' : (v > 0 ? '+' : v < 0 ? '−' : '') + nf(casas, casas).format(Math.abs(v))

export const dKg = (v, casas = 1) => sinal(v, casas) + ' kg'
export const dPp = (v, casas = 1) => sinal(v, casas) + ' p.p.'

export const dataBR = iso => {
  const [a, m, d] = iso.split('-')
  return `${d}/${m}/${a}`
}
export const dataCurta = iso => {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}
