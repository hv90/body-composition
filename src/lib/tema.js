export const C = {
  fundo:    '#0A0E14',
  cartao:   '#131A24',
  borda:    '#232E3D',
  texto:    '#E6EDF3',
  fraco:    '#8B98A8',
  tenue:    '#5B6B7D',

  gordura:  '#F2994A',
  gorduraF: 'rgba(242,153,74,0.22)',
  musculo:  '#2DD4BF',
  musculoF: 'rgba(45,212,191,0.20)',
  peso:     '#E6EDF3',
  agua:     '#60A5FA',
  osso:     '#A78BFA',

  bom:      '#34D399',
  ruim:     '#F87171',
  alerta:   '#FBBF24',
  invalido: '#F87171'
}

// Base comum de tooltip. confine: true e obrigatório -- sem ele o balão
// vaza da viewport em 375px e o texto corta na borda.
export const tooltipBase = {
  confine: true,
  backgroundColor: 'rgba(12,17,24,0.96)',
  borderColor: C.borda,
  borderWidth: 1,
  padding: [8, 10],
  textStyle: { color: C.texto, fontSize: 12 },
  extraCssText: 'border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.5);max-width:78vw;'
}

export const eixoTexto = { color: C.fraco, fontSize: 10 }
export const linhaEixo = { lineStyle: { color: C.borda } }
export const linhaSplit = { lineStyle: { color: 'rgba(35,46,61,0.6)', type: 'dashed' } }
