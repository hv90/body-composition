import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { VALIDAS, primeira, ultima } from '../lib/derivar.js'

export default function SinaisInternos() {
  const gauge = useMemo(() => ({
    animationDuration: 900,
    series: [
      {
        type: 'gauge', min: 0, max: 20, startAngle: 205, endAngle: -25,
        center: ['50%', '62%'], radius: '92%',
        splitNumber: 4,
        axisLine: { lineStyle: { width: 15, color: [[0.45, C.bom], [0.7, C.alerta], [1, C.ruim]] } },
        pointer: { icon: 'path://M2,0 L-2,0 L-1,-58 L1,-58 Z', width: 5, length: '58%',
          offsetCenter: [0, 0], itemStyle: { color: C.texto } },
        anchor: { show: true, size: 12, itemStyle: { color: C.texto } },
        axisTick: { distance: -15, length: 4, lineStyle: { color: C.fundo, width: 1 } },
        splitLine: { distance: -15, length: 15, lineStyle: { color: C.fundo, width: 2 } },
        axisLabel: { distance: -20, color: C.tenue, fontSize: 9.5 },
        title: { offsetCenter: [0, '78%'], color: C.fraco, fontSize: 11.5 },
        detail: {
          offsetCenter: [0, '48%'], color: C.texto, fontSize: 40, fontWeight: 700,
          valueAnimation: true, formatter: '{value}'
        },
        data: [{ value: ultima.visceral, name: 'gordura visceral hoje' }]
      },
      {
        type: 'gauge', min: 0, max: 20, startAngle: 205, endAngle: -25,
        center: ['50%', '62%'], radius: '92%', z: 1,
        axisLine: { show: false }, axisTick: { show: false }, splitLine: { show: false },
        axisLabel: { show: false }, anchor: { show: false },
        detail: { show: false }, title: { show: false },
        pointer: { icon: 'path://M1,0 L-1,0 L-1,-52 L1,-52 Z', width: 3, length: '52%',
          offsetCenter: [0, 0], itemStyle: { color: C.tenue, opacity: 0.75 } },
        data: [{ value: primeira.visceral }]
      }
    ]
  }), [])

  const linhas = useMemo(() => ({
    animationDuration: 700,
    grid: { left: 32, right: 34, top: 30, bottom: 44 },
    legend: {
      type: 'scroll', bottom: 2, itemWidth: 10, itemHeight: 10, itemGap: 14,
      textStyle: { color: C.fraco, fontSize: 11 }, inactiveColor: C.tenue
    },
    tooltip: { ...tooltipBase, trigger: 'axis', axisPointer: { type: 'line', lineStyle: { color: C.borda } } },
    xAxis: {
      type: 'category', data: VALIDAS.map(s => s.rotulo),
      axisLabel: eixoTexto, axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
    },
    yAxis: [
      { type: 'value', min: 55, max: 75, interval: 5, name: 'pontos',
        nameTextStyle: { color: C.tenue, fontSize: 10, align: 'left' },
        axisLabel: eixoTexto, axisLine: { show: false }, axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } } },
      { type: 'value', min: 62, max: 70, interval: 2, name: 'anos',
        nameTextStyle: { color: C.tenue, fontSize: 10, align: 'right' },
        axisLabel: eixoTexto, axisLine: { show: false }, axisTick: { show: false },
        splitLine: { show: false } }
    ],
    series: [
      {
        name: 'Pontuação corporal', type: 'bar', data: VALIDAS.map(s => s.pontuacao),
        barMaxWidth: 26, itemStyle: { color: 'rgba(45,212,191,0.55)', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'insideBottom', distance: 7, color: '#08111A',
          fontSize: 10, fontWeight: 700 }
      },
      {
        name: 'Idade corporal', type: 'line', yAxisIndex: 1,
        data: VALIDAS.map(s => s.idadeCorporal),
        symbol: 'circle', symbolSize: 7, smooth: 0.2,
        lineStyle: { color: C.alerta, width: 2.5 }, itemStyle: { color: C.alerta },
        endLabel: { show: true, color: C.alerta, fontSize: 10, fontWeight: 600,
          formatter: p => p.value + ' anos', offset: [-4, -14] }
      }
    ]
  }), [])

  return (
    <Secao
      olho="Por dentro"
      titulo="A gordura que ninguém vê também cedeu"
      legenda={<>O ponteiro fino marca onde estava em julho. A gordura visceral é a que fica em volta dos órgãos, e é a que mais pesa na saúde. Saiu da faixa vermelha e entrou na amarela.</>}
    >
      <div className="cartao">
        <Grafico opcao={gauge} altura={230} aria="Medidor de gordura visceral, hoje em 11, antes em 14" />
      </div>

      <div className="grade tres" style={{ marginTop: 10, marginBottom: 10 }}>
        <div className="tile">
          <div className="rot">Pontuação</div>
          <div className="val bom">67</div>
          <div className="sub">era 62 · de 100</div>
        </div>
        <div className="tile">
          <div className="rot">Idade corp.</div>
          <div className="val alerta">67</div>
          <div className="sub">era 68 · real 64</div>
        </div>
        <div className="tile">
          <div className="rot">Cint./quadril</div>
          <div className="val bom">0,87</div>
          <div className="sub">era 0,89</div>
        </div>
      </div>

      <div className="cartao">
        <Grafico opcao={linhas} altura={260} aria="Pontuação corporal e idade corporal ao longo do período" />
      </div>
    </Secao>
  )
}
