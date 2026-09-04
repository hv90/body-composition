import { SESSOES } from '../data/sessoes.js'

const r1 = v => Math.round(v * 10) / 10

// Todas as sessoes, para as series que só dependem de medida direta (peso, impedância).
export const TODAS = SESSOES

// Somente as sessoes cuja composição e confiavel: 31/07 fica de fora porque
// o aparelho derivou tudo dela de uma altura errada.
export const VALIDAS = SESSOES.filter(s => s.composicaoValida)

export const CORROMPIDA = SESSOES.find(s => !s.composicaoValida)

export const ts = iso => new Date(iso + 'T12:00:00').getTime()

// Massa magra definida como peso menos gordura: assim gordura + magra fecha
// exatamente o peso em todo gráfico empilhado, sem sobra de arredondamento.
export const magra = s => r1(s.peso - s.gordura)

export const primeira = VALIDAS[0]
export const ultima = VALIDAS[VALIDAS.length - 1]

export const diasEntre = (a, b) => Math.round((ts(b) - ts(a)) / 86400000)

// Um intervalo por par de medições válidas consecutivas.
export const INTERVALOS = VALIDAS.slice(1).map((s, i) => {
  const p = VALIDAS[i]
  const dPeso = r1(s.peso - p.peso)
  const dGordura = r1(s.gordura - p.gordura)
  const dMagra = r1(magra(s) - magra(p))
  return {
    de: p, para: s,
    rotulo: s.rotulo,
    intervalo: `${p.rotulo} → ${s.rotulo}`,
    dias: diasEntre(p.data, s.data),
    dPeso, dGordura, dMagra,
    dMusculo: r1(s.muscular - p.muscular),
    dEsqueletico: r1(s.esqueletico - p.esqueletico),
    dAgua: r1(s.agua - p.agua),
    dPercGordura: r1(s.percGordura - p.percGordura),
    // O recorte pedido: a balança mal se mexeu.
    quaseParada: Math.abs(dPeso) < 0.5
  }
})

export const QUASE_PARADAS = INTERVALOS.filter(i => i.quaseParada)

export const RESUMO = {
  dias: diasEntre(primeira.data, ultima.data),
  medicoes: TODAS.length,
  dPeso: r1(ultima.peso - primeira.peso),
  dGordura: r1(ultima.gordura - primeira.gordura),
  dMagra: r1(magra(ultima) - magra(primeira)),
  dMusculo: r1(ultima.muscular - primeira.muscular),
  dPercGordura: r1(ultima.percGordura - primeira.percGordura),
  dImc: r1(ultima.imc - primeira.imc),
  dVisceral: ultima.visceral - primeira.visceral,
  dPontuacao: ultima.pontuacao - primeira.pontuacao,
  dIdadeCorporal: ultima.idadeCorporal - primeira.idadeCorporal,
  // Quanto do peso perdido saiu de gordura. Passa de 100% quando a massa
  // magra sobe enquanto o peso cai.
  fracaoGordura: r1((r1(ultima.gordura - primeira.gordura) / r1(ultima.peso - primeira.peso)) * 100)
}

// A meta real de peso, informada fora dos laudos. O aparelho sugere 51,0 kg
// (campo pesoAlvo, derivado de altura e idade), o que é outra coisa e fica guardado
// separado para não se misturar com o objetivo dela.
export const META_PESO = 60

// IMC que a meta representa, para dizer onde ela cai nas faixas.
export const IMC_META = Math.round((META_PESO / Math.pow(1.52, 2)) * 10) / 10

// Faixas de IMC usadas como fundo do gráfico de IMC.
export const FAIXAS_IMC = [
  { de: 0,    ate: 18.5, nome: 'Abaixo',     cor: 'rgba(96,165,250,0.14)' },
  { de: 18.5, ate: 25,   nome: 'Saudável',   cor: 'rgba(52,211,153,0.16)' },
  { de: 25,   ate: 30,   nome: 'Sobrepeso',  cor: 'rgba(251,191,36,0.14)' },
  { de: 30,   ate: 45,   nome: 'Obesidade',  cor: 'rgba(248,113,113,0.14)' }
]
