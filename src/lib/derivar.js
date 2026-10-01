import { SESSOES, SESSOES_LUMI } from '../data/sessoes.js'

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

// Nem todo laudo traz todo campo: a atualização de software de 25/09 parou de
// imprimir a relação cintura/quadril. Isto devolve a medição mais recente que
// ainda tem o campo, para a tela poder dizer de quando é o número que mostra.
export const ultimoCom = campo => [...VALIDAS].reverse().find(s => s[campo] != null)

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

// A GORDURA PARADA. Quantas medições válidas no fim da série repetem exatamente o
// mesmo valor de gordura, e o que o peso e o músculo fizeram nesse intervalo. Derivado
// e não escrito à mão: quando a gordura voltar a cair, isto se apaga sozinho.
export const GORDURA_PARADA = (() => {
  const valor = ultima.gordura
  let i = VALIDAS.length - 1
  while (i > 0 && VALIDAS[i - 1].gordura === valor) i--
  const de = VALIDAS[i]
  return {
    medicoes: VALIDAS.length - i,
    valor,
    de,
    dias: diasEntre(de.data, ultima.data),
    dPeso: r1(ultima.peso - de.peso),
    dMusculo: r1(ultima.muscular - de.muscular),
    dPercGordura: r1(ultima.percGordura - de.percGordura)
  }
})()

// ---------------------------------------------------------------------------
// A SEGUNDA BALANÇA. Entrou em 25/09 e mede nos mesmos dias da primeira, com
// minutos de diferença. As duas nunca se misturam numa série: o que elas
// permitem é comparar leitura com leitura, no mesmo dia e no mesmo corpo.
// ---------------------------------------------------------------------------
export const LUMI = SESSOES_LUMI
export const lumiPrimeira = LUMI[0]
export const lumiUltima = LUMI[LUMI.length - 1]

// Um par por dia em que as duas mediram.
export const PARES = LUMI
  .map(l => ({ lumi: l, base: VALIDAS.find(v => v.data === l.data) }))
  .filter(p => p.base)
  .map(p => ({
    data: p.base.data,
    rotulo: p.base.rotulo,
    base: p.base,
    lumi: p.lumi,
    difPeso: r1(p.lumi.peso - p.base.peso),
    difGordura: r1(p.lumi.gorda - p.base.gordura),
    difMagra: r1(p.lumi.magra - magra(p.base)),
    difPercGordura: r1(p.lumi.percGordura - p.base.percGordura),
    difImc: r1(p.lumi.imc - p.base.imc)
  }))

// O que cada balança diz que aconteceu entre o primeiro e o último dia em que
// as duas mediram. Quando os sinais divergem, as duas contam histórias opostas
// sobre o mesmo intervalo.
export const CONFRONTO = (() => {
  if (PARES.length < 2) return null
  const a = PARES[0]
  const b = PARES[PARES.length - 1]
  const dGorduraBase = r1(b.base.gordura - a.base.gordura)
  const dGorduraLumi = r1(b.lumi.gorda - a.lumi.gorda)
  return {
    de: a, para: b,
    dias: diasEntre(a.data, b.data),
    dPesoBase: r1(b.base.peso - a.base.peso),
    dPesoLumi: r1(b.lumi.peso - a.lumi.peso),
    dGorduraBase,
    dGorduraLumi,
    dMagraBase: r1(magra(b.base) - magra(a.base)),
    dMagraLumi: r1(b.lumi.magra - a.lumi.magra),
    // Discordam na direção quando uma vê gordura subindo e a outra vê caindo.
    direcaoOposta: dGorduraBase !== 0 && dGorduraLumi !== 0 &&
      Math.sign(dGorduraBase) !== Math.sign(dGorduraLumi),
    dAnguloFase: r1(b.lumi.anguloFase - a.lumi.anguloFase),
    dIdadeCelular: b.lumi.idadeCelular - a.lumi.idadeCelular,
    // Maior distância entre as duas leituras de gordura, em kg, nos dias pareados.
    maiorDifGordura: PARES.reduce((m, p) => Math.abs(p.difGordura) > Math.abs(m) ? p.difGordura : m, 0),
    maiorDifPeso: PARES.reduce((m, p) => Math.abs(p.difPeso) > Math.abs(m) ? p.difPeso : m, 0)
  }
})()

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
