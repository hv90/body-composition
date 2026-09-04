// ---------------------------------------------------------------------------
// Fonte: 7 relatorios Fitdays "Relatorio de análise de composição corporal".
// Transcricao literal dos PDFs. Nenhum valor foi calculado aqui.
//
// A sessao de 31/07 foi medida com ALTURA 165 cm. A altura real e 152 cm.
// Toda a composição daquele laudo e derivada da altura, então ela nasce errada.
// O que NAO depende da altura continua válido e e usado normalmente:
// o peso (medido pela balança) e as impedâncias (medidas pelos eletrodos).
// ---------------------------------------------------------------------------

export const PERFIL = {
  sexo: 'Mulher',
  idade: 64,
  alturaCm: 152
}

export const SESSOES = [
  {
    data: '2026-07-23', rotulo: '23/jul', hora: '14:13', idLaudo: 'perfil A',
    alturaRelatada: 152, composicaoValida: true,
    peso: 71.0, gordura: 31.5, ossea: 2.7, proteica: 8.0, agua: 29.0,
    muscular: 37.0, esqueletico: 21.6,
    pontuacao: 62, imc: 30.7, percGordura: 44.3, obesidadePerc: 146,
    pesoAlvo: 50.8, visceral: 14, tmb: 1225, livreGordura: 39.7,
    subcutanea: 31.5, smi: 7.1, idadeCorporal: 68, whr: 0.89,
    gorduraSeg:     { bracoE: 2.2,   bracoD: 2.3,   tronco: 16.9,  pernaE: 4.7,   pernaD: 4.7 },
    gorduraSegPerc: { bracoE: 263.3, bracoD: 266.4, tronco: 368.5, pernaE: 230.0, pernaD: 228.5 },
    musculoSeg:     { bracoE: 2.0,   bracoD: 1.9,   tronco: 17.1,  pernaE: 6.3,   pernaD: 6.3 },
    musculoSegPerc: { bracoE: 91.9,  bracoD: 90.4,  tronco: 89.2,  pernaE: 93.5,  pernaD: 93.1 },
    z20:  { bracoD: 387.3, bracoE: 379.8, tronco: 22.1, pernaD: 276.4, pernaE: 268.7 },
    z100: { bracoD: 349.9, bracoE: 340.6, tronco: 17.4, pernaD: 246.1, pernaE: 242.5 }
  },
  {
    data: '2026-07-31', rotulo: '31/jul', hora: '14:41', idLaudo: 'perfil B',
    alturaRelatada: 165, composicaoValida: false,
    // Validos: medida direta, não dependem da altura.
    peso: 69.8,
    z20:  { bracoD: 395.8, bracoE: 399.0, tronco: 22.2, pernaD: 280.6, pernaE: 275.6 },
    z100: { bracoD: 357.5, bracoE: 357.8, tronco: 17.1, pernaD: 250.5, pernaE: 247.8 },
    // Invalidos: o aparelho derivou tudo isto de 165 cm.
    relatado: {
      gordura: 20.6, ossea: 3.3, proteica: 9.8, agua: 36.1,
      muscular: 45.9, esqueletico: 27.4,
      pontuacao: 78, imc: 25.6, percGordura: 29.5, obesidadePerc: 122,
      pesoAlvo: 62.3, visceral: 8, tmb: 1432, livreGordura: 49.2,
      subcutanea: 21.1, smi: 7.7, idadeCorporal: 63, whr: 0.85,
      gorduraSeg:     { bracoE: 1.4,   bracoD: 1.4,   tronco: 11.0,  pernaE: 3.2,   pernaD: 3.2 },
      gorduraSegPerc: { bracoE: 139.9, bracoD: 141.5, tronco: 203.2, pernaE: 135.0, pernaD: 134.3 },
      musculoSeg:     { bracoE: 2.5,   bracoD: 2.5,   tronco: 21.4,  pernaE: 8.0,   pernaD: 8.0 },
      musculoSegPerc: { bracoE: 112.6, bracoD: 112.3, tronco: 106.1, pernaE: 113.3, pernaD: 113.1 }
    }
  },
  {
    data: '2026-08-06', rotulo: '06/ago', hora: '13:50', idLaudo: 'perfil A',
    alturaRelatada: 152, composicaoValida: true,
    peso: 69.0, gordura: 29.3, ossea: 2.7, proteica: 7.9, agua: 29.1,
    muscular: 37.0, esqueletico: 21.7,
    pontuacao: 64, imc: 29.9, percGordura: 42.5, obesidadePerc: 142,
    pesoAlvo: 51.0, visceral: 13, tmb: 1227, livreGordura: 39.7,
    subcutanea: 30.2, smi: 7.1, idadeCorporal: 68, whr: 0.89,
    gorduraSeg:     { bracoE: 2.1,   bracoD: 2.1,   tronco: 15.8,  pernaE: 4.4,   pernaD: 4.4 },
    gorduraSegPerc: { bracoE: 242.9, bracoD: 245.0, tronco: 343.7, pernaE: 215.1, pernaD: 213.9 },
    musculoSeg:     { bracoE: 2.0,   bracoD: 2.0,   tronco: 17.2,  pernaE: 6.3,   pernaD: 6.3 },
    musculoSegPerc: { bracoE: 93.7,  bracoD: 93.1,  tronco: 91.0,  pernaE: 95.2,  pernaD: 94.9 },
    z20:  { bracoD: 383.3, bracoE: 385.1, tronco: 22.1, pernaD: 284.6, pernaE: 277.5 },
    z100: { bracoD: 345.2, bracoE: 344.1, tronco: 17.3, pernaD: 252.3, pernaE: 248.5 }
  },
  {
    data: '2026-08-13', rotulo: '13/ago', hora: '14:37', idLaudo: 'perfil B',
    alturaRelatada: 152, composicaoValida: true,
    peso: 68.6, gordura: 28.0, ossea: 2.7, proteica: 8.1, agua: 29.8,
    muscular: 37.9, esqueletico: 22.2,
    pontuacao: 67, imc: 29.7, percGordura: 40.8, obesidadePerc: 141,
    pesoAlvo: 51.9, visceral: 12, tmb: 1246, livreGordura: 40.6,
    subcutanea: 29.0, smi: 7.3, idadeCorporal: 67, whr: 0.86,
    gorduraSeg:     { bracoE: 2.0,   bracoD: 2.0,   tronco: 15.5,  pernaE: 4.2,   pernaD: 4.2 },
    gorduraSegPerc: { bracoE: 236.2, bracoD: 237.6, tronco: 338.1, pernaE: 206.6, pernaD: 206.0 },
    musculoSeg:     { bracoE: 2.0,   bracoD: 1.9,   tronco: 17.6,  pernaE: 6.5,   pernaD: 6.5 },
    musculoSegPerc: { bracoE: 93.2,  bracoD: 92.8,  tronco: 93.6,  pernaE: 98.0,  pernaD: 97.8 },
    z20:  { bracoD: 403.7, bracoE: 404.5, tronco: 19.2, pernaD: 288.4, pernaE: 283.9 },
    z100: { bracoD: 366.5, bracoE: 365.6, tronco: 12.2, pernaD: 257.5, pernaE: 254.7 }
  },
  {
    data: '2026-08-20', rotulo: '20/ago', hora: '13:14', idLaudo: 'perfil B',
    alturaRelatada: 152, composicaoValida: true,
    peso: 67.5, gordura: 27.7, ossea: 2.7, proteica: 8.0, agua: 29.2,
    muscular: 37.2, esqueletico: 21.7,
    pontuacao: 66, imc: 29.2, percGordura: 41.1, obesidadePerc: 139,
    pesoAlvo: 51.0, visceral: 12, tmb: 1229, livreGordura: 39.9,
    subcutanea: 29.3, smi: 7.2, idadeCorporal: 67, whr: 0.88,
    gorduraSeg:     { bracoE: 2.0,   bracoD: 2.0,   tronco: 14.9,  pernaE: 4.2,   pernaD: 4.2 },
    gorduraSegPerc: { bracoE: 228.3, bracoD: 231.0, tronco: 324.4, pernaE: 205.2, pernaD: 204.7 },
    musculoSeg:     { bracoE: 2.0,   bracoD: 2.0,   tronco: 17.2,  pernaE: 6.3,   pernaD: 6.3 },
    musculoSegPerc: { bracoE: 95.9,  bracoD: 94.2,  tronco: 92.4,  pernaE: 96.9,  pernaD: 96.8 },
    z20:  { bracoD: 385.6, bracoE: 374.9, tronco: 21.1, pernaD: 272.1, pernaE: 269.4 },
    z100: { bracoD: 348.3, bracoE: 337.0, tronco: 16.7, pernaD: 243.9, pernaE: 242.6 }
  },
  {
    data: '2026-08-28', rotulo: '28/ago', hora: '13:12', idLaudo: 'perfil A',
    alturaRelatada: 152, composicaoValida: true,
    peso: 66.3, gordura: 26.3, ossea: 2.7, proteica: 8.0, agua: 29.3,
    muscular: 37.3, esqueletico: 21.8,
    pontuacao: 68, imc: 28.7, percGordura: 39.7, obesidadePerc: 136,
    pesoAlvo: 51.3, visceral: 11, tmb: 1234, livreGordura: 40.0,
    subcutanea: 28.3, smi: 7.2, idadeCorporal: 67, whr: 0.87,
    gorduraSeg:     { bracoE: 1.8,   bracoD: 1.9,   tronco: 14.2,  pernaE: 4.0,   pernaD: 4.0 },
    gorduraSegPerc: { bracoE: 216.4, bracoD: 218.5, tronco: 310.7, pernaE: 194.9, pernaD: 194.4 },
    musculoSeg:     { bracoE: 2.0,   bracoD: 2.0,   tronco: 17.3,  pernaE: 6.3,   pernaD: 6.3 },
    musculoSegPerc: { bracoE: 96.1,  bracoD: 95.1,  tronco: 94.0,  pernaE: 98.3,  pernaD: 98.1 },
    z20:  { bracoD: 391.2, bracoE: 387.3, tronco: 21.4, pernaD: 286.8, pernaE: 281.2 },
    z100: { bracoD: 353.6, bracoE: 348.2, tronco: 15.8, pernaD: 255.2, pernaE: 251.3 }
  },
  {
    data: '2026-09-03', rotulo: '03/set', hora: '13:39', idLaudo: 'perfil B',
    alturaRelatada: 152, composicaoValida: true,
    peso: 66.0, gordura: 26.3, ossea: 2.7, proteica: 7.9, agua: 29.1,
    muscular: 37.0, esqueletico: 21.6,
    pontuacao: 67, imc: 28.6, percGordura: 39.8, obesidadePerc: 136,
    pesoAlvo: 51.0, visceral: 11, tmb: 1227, livreGordura: 39.7,
    subcutanea: 28.3, smi: 7.1, idadeCorporal: 67, whr: 0.87,
    gorduraSeg:     { bracoE: 1.8,   bracoD: 1.9,   tronco: 14.2,  pernaE: 4.0,   pernaD: 4.0 },
    gorduraSegPerc: { bracoE: 216.1, bracoD: 219.1, tronco: 309.0, pernaE: 195.7, pernaD: 195.0 },
    musculoSeg:     { bracoE: 2.0,   bracoD: 1.9,   tronco: 17.2,  pernaE: 6.3,   pernaD: 6.3 },
    musculoSegPerc: { bracoE: 96.2,  bracoD: 94.3,  tronco: 93.5,  pernaE: 97.9,  pernaD: 97.7 },
    z20:  { bracoD: 392.1, bracoE: 380.1, tronco: 21.6, pernaD: 273.6, pernaE: 269.9 },
    z100: { bracoD: 354.9, bracoE: 342.3, tronco: 16.4, pernaD: 244.4, pernaE: 242.6 }
  }
]

export const SEGMENTOS = [
  { chave: 'bracoE', nome: 'Braço esq.', curto: 'Br.E' },
  { chave: 'bracoD', nome: 'Braço dir.', curto: 'Br.D' },
  { chave: 'tronco', nome: 'Tronco',     curto: 'Tronco' },
  { chave: 'pernaE', nome: 'Perna esq.', curto: 'Pe.E' },
  { chave: 'pernaD', nome: 'Perna dir.', curto: 'Pe.D' }
]
