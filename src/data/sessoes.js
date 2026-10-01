// ---------------------------------------------------------------------------
// Fonte: 10 laudos Fitdays "Relatório de análise de composição corporal",
// a balança que acompanha a série desde julho. Transcrição literal dos PDFs.
// Nenhum valor foi calculado aqui.
//
// A sessão de 31/07 foi medida com ALTURA 165 cm. A altura real é 152 cm.
// Toda a composição daquele laudo é derivada da altura, então ela nasce errada.
// O que NÃO depende da altura continua válido e é usado normalmente:
// o peso (medido pela balança) e as impedâncias (medidas pelos eletrodos).
//
// A partir de 25/09 a balança recebeu uma atualização de software e o laudo
// deixou de trazer a relação cintura/quadril: por isso 'whr' some dessas duas
// sessões, em vez de ser preenchido com um valor que o aparelho não imprimiu.
//
// Em 25/09 entrou uma SEGUNDA balança (Lumi One), que mede a mesma pessoa no
// mesmo dia e chega a outros números. Ela vive em SESSOES_LUMI, separada, e
// nunca entra nas séries da primeira: misturar as duas inventaria variação
// que é só diferença de aparelho.
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
  },
  {
    data: '2026-09-11', rotulo: '11/set', hora: '13:04', idLaudo: 'perfil B',
    alturaRelatada: 152, composicaoValida: true,
    peso: 65.4, gordura: 26.3, ossea: 2.6, proteica: 7.8, agua: 28.6,
    muscular: 36.4, esqueletico: 21.3,
    pontuacao: 67, imc: 28.3, percGordura: 40.2, obesidadePerc: 134,
    pesoAlvo: 50.4, visceral: 11, tmb: 1214, livreGordura: 39.0,
    subcutanea: 28.6, smi: 7.0, idadeCorporal: 67, whr: 0.86,
    gorduraSeg:     { bracoE: 1.8,   bracoD: 1.9,   tronco: 14.1,  pernaE: 4.0,   pernaD: 4.0 },
    gorduraSegPerc: { bracoE: 216.3, bracoD: 219.6, tronco: 307.9, pernaE: 195.7, pernaD: 195.2 },
    musculoSeg:     { bracoE: 1.9,   bracoD: 1.9,   tronco: 16.9,  pernaE: 6.2,   pernaD: 6.2 },
    musculoSegPerc: { bracoE: 94.7,  bracoD: 92.5,  tronco: 92.5,  pernaE: 96.9,  pernaD: 96.7 },
    z20:  { bracoD: 397.2, bracoE: 384.2, tronco: 22.1, pernaD: 281.0, pernaE: 281.8 },
    z100: { bracoD: 359.4, bracoE: 345.7, tronco: 17.1, pernaD: 251.7, pernaE: 253.7 }
  },
  {
    data: '2026-09-25', rotulo: '25/set', hora: '14:54', idLaudo: 'perfil pós-atualização',
    alturaRelatada: 152, composicaoValida: true,
    peso: 63.3, gordura: 25.3, ossea: 2.5, proteica: 7.6, agua: 27.9,
    muscular: 35.4, esqueletico: 20.6,
    pontuacao: 67, imc: 27.4, percGordura: 40.0, obesidadePerc: 130,
    pesoAlvo: 49.2, visceral: 11, tmb: 1190, livreGordura: 38.0,
    subcutanea: 28.5, smi: 6.8, idadeCorporal: 67,
    gorduraSeg:     { bracoE: 1.8,   bracoD: 1.8,   tronco: 13.6,  pernaE: 3.8,   pernaD: 3.8 },
    gorduraSegPerc: { bracoE: 207.8, bracoD: 210.6, tronco: 295.5, pernaE: 188.7, pernaD: 188.4 },
    musculoSeg:     { bracoE: 1.8,   bracoD: 1.8,   tronco: 16.4,  pernaE: 6.0,   pernaD: 6.0 },
    musculoSegPerc: { bracoE: 91.8,  bracoD: 91.0,  tronco: 91.6,  pernaE: 95.6,  pernaD: 95.5 },
    z20:  { bracoD: 398.3, bracoE: 399.6, tronco: 21.2, pernaD: 283.8, pernaE: 285.3 },
    z100: { bracoD: 360.9, bracoE: 358.7, tronco: 16.8, pernaD: 253.9, pernaE: 256.1 }
  },
  {
    data: '2026-10-01', rotulo: '01/out', hora: '15:07', idLaudo: 'perfil pós-atualização',
    alturaRelatada: 152, composicaoValida: true,
    peso: 64.0, gordura: 25.6, ossea: 2.6, proteica: 7.7, agua: 28.2,
    muscular: 35.8, esqueletico: 20.9,
    pontuacao: 67, imc: 27.7, percGordura: 40.0, obesidadePerc: 132,
    pesoAlvo: 49.6, visceral: 11, tmb: 1199, livreGordura: 38.4,
    subcutanea: 28.5, smi: 6.9, idadeCorporal: 67,
    gorduraSeg:     { bracoE: 1.8,   bracoD: 1.8,   tronco: 13.7,  pernaE: 3.9,   pernaD: 3.9 },
    gorduraSegPerc: { bracoE: 209.3, bracoD: 212.9, tronco: 299.8, pernaE: 190.4, pernaD: 190.0 },
    musculoSeg:     { bracoE: 1.9,   bracoD: 1.8,   tronco: 16.6,  pernaE: 6.1,   pernaD: 6.1 },
    musculoSegPerc: { bracoE: 93.4,  bracoD: 92.0,  tronco: 92.0,  pernaE: 96.0,  pernaD: 95.9 },
    z20:  { bracoD: 395.1, bracoE: 392.6, tronco: 20.2, pernaD: 286.7, pernaE: 287.1 },
    z100: { bracoD: 357.8, bracoE: 351.7, tronco: 16.0, pernaD: 255.7, pernaE: 257.0 }
  }
]

// ---------------------------------------------------------------------------
// SEGUNDA BALANÇA (Lumi One), desde 25/09. Mede a mesma pessoa no mesmo dia,
// com poucos minutos de diferença da outra. Traz dois dados que a primeira não
// dá: o ângulo de fase e a divisão da água entre dentro e fora das células.
// Transcrição literal. Duas medições só: ainda não é uma série.
// ---------------------------------------------------------------------------
export const SESSOES_LUMI = [
  {
    data: '2026-09-25', rotulo: '25/set', hora: '14:33',
    peso: 63.5, gorda: 23.4, percGordura: 36.8, magra: 40.1, percMagra: 63.2,
    muscular: 16.3, percMuscular: 25.7, razaoMusculoGordura: 0.7,
    aguaTotal: 28.6, percAguaTotal: 45.1, hidratacao: 2.6, aguaNaMassaMagra: 71.3,
    intracelular: 15.5, percIntracelular: 54.3,
    extracelular: 13.1, percExtracelular: 45.7,
    imc: 27.5, tmb: 1130, anguloFase: 7.0, idadeCelular: 58
  },
  {
    data: '2026-10-01', rotulo: '01/out', hora: '15:03',
    peso: 63.8, gorda: 23.1, percGordura: 36.3, magra: 40.7, percMagra: 63.7,
    muscular: 16.8, percMuscular: 26.3, razaoMusculoGordura: 0.7,
    aguaTotal: 29.2, percAguaTotal: 45.7, hidratacao: 2.7, aguaNaMassaMagra: 71.7,
    intracelular: 15.8, percIntracelular: 54.0,
    extracelular: 13.4, percExtracelular: 46.0,
    imc: 27.6, tmb: 1143, anguloFase: 6.9, idadeCelular: 59
  }
]

export const SEGMENTOS = [
  { chave: 'bracoE', nome: 'Braço esq.', curto: 'Br.E' },
  { chave: 'bracoD', nome: 'Braço dir.', curto: 'Br.D' },
  { chave: 'tronco', nome: 'Tronco',     curto: 'Tronco' },
  { chave: 'pernaE', nome: 'Perna esq.', curto: 'Pe.E' },
  { chave: 'pernaD', nome: 'Perna dir.', curto: 'Pe.D' }
]
