import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { VALIDAS, magra, RESUMO, META_PESO, primeira, ultima, GORDURA_PARADA } from '../lib/derivar.js'
import { n1, dKg, dPp } from '../lib/fmt.js'

// Linha simples no tempo: a data corre da esquerda para a direita, que é como se lê.
// O halter que estava aqui antes colocava o valor recente à esquerda sempre que o
// número caía, e ninguém lê um gráfico de trás para frente.
const SERIES = [
  { nome: 'Peso',        cor: C.peso,    traco: 'solid',  largura: 2.8, valor: s => s.peso },
  { nome: 'Gordura',     cor: C.gordura, traco: 'solid',  largura: 2.4, valor: s => s.gordura },
  { nome: 'Massa magra', cor: C.musculo, traco: 'dashed', largura: 2.4, valor: s => magra(s) }
]

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
const porExtenso = iso => {
  const [, m, d] = iso.split('-')
  return `${Number(d)} de ${MESES[Number(m) - 1]}`
}

export default function Abertura() {
  // A gordura "parou" quando duas ou mais medições seguidas repetem o mesmo valor.
  // Quando ela voltar a cair, GORDURA_PARADA.medicoes cai para 1, o título troca
  // sozinho e o aviso some. Nada aqui precisa ser reescrito à mão.
  const parou = GORDURA_PARADA.medicoes >= 2

  const opcao = useMemo(() => ({
    animationDuration: 900,
    grid: { left: 40, right: 48, top: 28, bottom: 48 },
    legend: {
      type: 'scroll', bottom: 2, itemWidth: 20, itemHeight: 10, itemGap: 14,
      textStyle: { color: C.fraco, fontSize: 11 }, inactiveColor: C.tenue
    },
    tooltip: {
      ...tooltipBase, trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: C.borda } },
      formatter: p => `<b>${p[0].name}</b><br/>` +
        p.map(x => `${x.marker} ${x.seriesName} <b>${n1(x.value)} kg</b>`).join('<br/>')
    },
    xAxis: {
      type: 'category', data: VALIDAS.map(s => s.rotulo), boundaryGap: false,
      axisLabel: { ...eixoTexto, fontSize: 9.5 },
      axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
    },
    yAxis: {
      type: 'value', min: 20, max: 80, interval: 20,
      axisLabel: { ...eixoTexto, formatter: v => v + ' kg' },
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } }
    },
    series: SERIES.map(s => ({
      name: s.nome,
      type: 'line',
      smooth: 0.22,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { color: s.cor, width: s.largura, type: s.traco },
      itemStyle: { color: s.cor, borderColor: C.fundo, borderWidth: 1.5 },
      // Primeiro ponto rotulado à esquerda, último à direita: a leitura vai de onde
      // começou para onde chegou, no mesmo sentido do eixo.
      data: VALIDAS.map((sess, i) => (i === 0
        ? { value: s.valor(sess),
            label: { show: true, position: 'top', offset: [17, 1],
              color: C.fraco, fontSize: 11, formatter: n1(s.valor(sess)) } }
        : s.valor(sess))),
      endLabel: {
        show: true, color: s.cor, fontSize: 12.5, fontWeight: 700,
        formatter: p => n1(p.value), offset: [4, 0]
      },
      ...(s.nome === 'Peso' ? {
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: C.musculo, type: 'dotted', width: 1.6 },
          label: { formatter: `meta ${META_PESO} kg`, color: C.musculo, fontSize: 10,
            position: 'insideStartTop' },
          data: [{ yAxis: META_PESO }]
        }
      } : {})
    }))
  }), [])

  return (
    <Secao
      olho={`${porExtenso(primeira.data)} a ${porExtenso(ultima.data)} de ${ultima.data.slice(0, 4)} · ${RESUMO.medicoes} medições`}
      titulo={parou
        ? `${n1(Math.abs(RESUMO.dPeso))} kg a menos. Mas a gordura parou.`
        : `${n1(Math.abs(RESUMO.dPeso))} kg a menos, e ${n1(RESUMO.fracaoGordura)}% vieram da gordura.`}
    >
      <div className="heroNum">
        <span className="v bom">{dKg(RESUMO.dPeso).replace(' kg', '')}</span>
        <span className="u">kg na balança</span>
      </div>

      {parou && (
        <div className="aviso" style={{ background: 'rgba(251,191,36,.07)', borderColor: 'rgba(251,191,36,.32)' }}>
          <span className="mk">⚠</span>
          <span className="tx">
            A gordura está em <b>{n1(GORDURA_PARADA.valor)} kg</b> há{' '}
            <b>{GORDURA_PARADA.medicoes} medições</b>, desde {GORDURA_PARADA.de.rotulo}.
            Nesses {GORDURA_PARADA.dias} dias a balança caiu <b>{n1(Math.abs(GORDURA_PARADA.dPeso))} kg</b>{' '}
            e o músculo caiu <b>{n1(Math.abs(GORDURA_PARADA.dMusculo))} kg</b>: o peso que saiu era músculo.
            Por isso o percentual de gordura <b>subiu</b> {dPp(GORDURA_PARADA.dPercGordura)} no período,
            mesmo ela pesando menos.
          </span>
        </div>
      )}

      <div className="cartao" style={{ marginTop: 10 }}>
        <Grafico opcao={opcao} altura={282} aria="Peso, gordura e massa magra ao longo do período" />
        <div className="rodape">
          A linha branca é o peso e a laranja é a gordura. A tracejada verde é a massa
          magra. A pontilhada é a meta de {META_PESO} kg.
        </div>
      </div>

      <div className="grade">
        <div className="tile">
          <div className="rot">Gordura</div>
          <div className="val corGordura">{dKg(RESUMO.dGordura)}</div>
          <div className="sub">{n1(primeira.gordura)} → {n1(ultima.gordura)} kg</div>
        </div>
        <div className="tile">
          <div className="rot">Massa magra</div>
          <div className={`val ${RESUMO.dMagra >= 0 ? 'corMusculo' : 'alerta'}`}>{dKg(RESUMO.dMagra)}</div>
          <div className="sub">{n1(magra(primeira))} → {n1(magra(ultima))} kg</div>
        </div>
        <div className="tile">
          <div className="rot">% de gordura</div>
          <div className="val bom">{dPp(RESUMO.dPercGordura)}</div>
          <div className="sub">{n1(primeira.percGordura)} → {n1(ultima.percGordura)}%</div>
        </div>
        <div className="tile">
          <div className="rot">Gordura visceral</div>
          <div className="val bom">{primeira.visceral} → {ultima.visceral}</div>
          <div className="sub">meta abaixo de 10</div>
        </div>
      </div>
    </Secao>
  )
}
