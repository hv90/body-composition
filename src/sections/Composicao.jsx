import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { VALIDAS, magra } from '../lib/derivar.js'
import { n1 } from '../lib/fmt.js'

// Esta tela e sobre COMPOSICAO, e 31/07 não tem composição válida. Um null no meio
// de uma área empilhada derruba a faixa até zero, o que leria como "ela não tinha
// massa nenhuma naquele dia". Entao a data simplesmente não entra aqui: ela aparece
// inteira, com peso e tudo, na secao dedicada a ela.
export default function Composicao() {
  const opcao = useMemo(() => ({
    animationDuration: 800,
    grid: { left: 38, right: 16, top: 30, bottom: 46 },
    legend: {
      type: 'scroll', bottom: 2, itemWidth: 10, itemHeight: 10, itemGap: 14,
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
      type: 'value', min: 0, max: 75, interval: 25,
      axisLabel: eixoTexto, axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } }
    },
    series: [
      {
        name: 'Massa magra', type: 'line', stack: 'corpo',
        data: VALIDAS.map(s => magra(s)),
        smooth: 0.25, symbol: 'none', lineStyle: { width: 0 },
        itemStyle: { color: C.musculo },
        areaStyle: { color: 'rgba(45,212,191,0.32)' },
        emphasis: { disabled: true }
      },
      {
        name: 'Gordura', type: 'line', stack: 'corpo',
        data: VALIDAS.map(s => s.gordura),
        smooth: 0.25, symbol: 'none', lineStyle: { width: 0 },
        itemStyle: { color: C.gordura },
        areaStyle: { color: 'rgba(242,153,74,0.42)' },
        emphasis: { disabled: true },
        // As duas pontas da faixa laranja, escritas na propria faixa: e a única
        // coisa que a tela precisa dizer em números.
        markPoint: {
          symbol: 'roundRect', symbolSize: [52, 22], symbolOffset: [0, 0],
          itemStyle: { color: 'rgba(10,14,20,0.72)', borderColor: C.gordura, borderWidth: 1 },
          label: { color: C.gordura, fontSize: 11, fontWeight: 700,
            formatter: p => n1(p.value) + ' kg' },
          data: [
            { name: 'inicio', coord: [0, VALIDAS[0].peso - VALIDAS[0].gordura / 2],
              value: VALIDAS[0].gordura },
            { name: 'fim', symbolOffset: [-27, 0],
              coord: [VALIDAS.length - 1,
                VALIDAS[VALIDAS.length - 1].peso - VALIDAS[VALIDAS.length - 1].gordura / 2],
              value: VALIDAS[VALIDAS.length - 1].gordura }
          ]
        }
      },
      {
        name: 'Peso', type: 'line', data: VALIDAS.map(s => s.peso),
        smooth: 0.25, symbolSize: 6,
        lineStyle: { color: C.peso, width: 2 },
        itemStyle: { color: C.peso, borderColor: C.fundo, borderWidth: 1.5 },
        z: 5
      }
    ]
  }), [])

  return (
    <Secao
      olho="A composição ao longo do tempo"
      titulo="A faixa laranja encolhe. A verde não."
      legenda={<>As duas faixas somadas dão o peso. A gordura cai de <b>31,5</b> para <b>26,3 kg</b> enquanto a massa magra fica onde estava, entre 39,5 e 40,6 kg o tempo todo.</>}
    >
      <div className="cartao">
        <Grafico opcao={opcao} altura={300} aria="Gordura e massa magra empilhadas ao longo do tempo, somando o peso" />
        <div className="rodape">
          São 6 datas, não 7: a medição de 31/07 saiu daqui porque a composição
          dela nasceu de uma altura errada. Ela aparece inteira mais abaixo.
        </div>
      </div>
    </Secao>
  )
}
