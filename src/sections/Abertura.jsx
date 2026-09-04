import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { VALIDAS, magra, RESUMO, META_PESO } from '../lib/derivar.js'
import { n1, dKg, dPp } from '../lib/fmt.js'

// Linha simples no tempo: a data corre da esquerda para a direita, que é como se lê.
// O halter que estava aqui antes colocava o valor recente à esquerda sempre que o
// número caía, e ninguém lê um gráfico de trás para frente.
const SERIES = [
  { nome: 'Peso',        cor: C.peso,    traco: 'solid',  largura: 2.8, valor: s => s.peso },
  { nome: 'Gordura',     cor: C.gordura, traco: 'solid',  largura: 2.4, valor: s => s.gordura },
  { nome: 'Massa magra', cor: C.musculo, traco: 'dashed', largura: 2.4, valor: s => magra(s) }
]

export default function Abertura() {
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
      axisLabel: { ...eixoTexto, fontSize: 10 },
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
      olho="23 de julho a 3 de setembro de 2026 · 7 medições"
      titulo="Cinco quilos a menos. Todos eles de gordura."
    >
      <div className="heroNum">
        <span className="v bom">−5,0</span>
        <span className="u">kg na balança</span>
      </div>

      <div className="cartao" style={{ marginTop: 12 }}>
        <Grafico opcao={opcao} altura={282} aria="Peso, gordura e massa magra ao longo do período" />
        <div className="rodape">
          A linha branca é o peso e a laranja é a gordura: as duas caem juntas. A
          tracejada verde é a massa magra, que fica parada. A pontilhada é a meta
          de 60 kg.
        </div>
      </div>

      <div className="grade">
        <div className="tile">
          <div className="rot">Gordura</div>
          <div className="val corGordura">{dKg(RESUMO.dGordura)}</div>
          <div className="sub">31,5 → 26,3 kg</div>
        </div>
        <div className="tile">
          <div className="rot">Massa magra</div>
          <div className="val corMusculo">{dKg(RESUMO.dMagra)}</div>
          <div className="sub">39,5 → 39,7 kg</div>
        </div>
        <div className="tile">
          <div className="rot">% de gordura</div>
          <div className="val bom">{dPp(RESUMO.dPercGordura)}</div>
          <div className="sub">44,3 → 39,8%</div>
        </div>
        <div className="tile">
          <div className="rot">Gordura visceral</div>
          <div className="val bom">14 → 11</div>
          <div className="sub">meta abaixo de 10</div>
        </div>
      </div>
    </Secao>
  )
}
