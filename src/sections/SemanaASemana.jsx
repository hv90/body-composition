import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { INTERVALOS } from '../lib/derivar.js'
import { n1, dKg } from '../lib/fmt.js'

export default function SemanaASemana() {
  const opcao = useMemo(() => {
    const rot = INTERVALOS.map(i => i.rotulo)
    const destaque = INTERVALOS
      .map((i, idx) => (i.quaseParada ? idx : -1))
      .filter(i => i >= 0)

    return {
      animationDuration: 700,
      grid: { left: 34, right: 14, top: 46, bottom: 52 },
      legend: {
        type: 'scroll', bottom: 2, itemWidth: 10, itemHeight: 10, itemGap: 14,
        textStyle: { color: C.fraco, fontSize: 11 }, inactiveColor: C.tenue
      },
      tooltip: {
        ...tooltipBase, trigger: 'axis',
        axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,0.04)' } },
        formatter: p => {
          const i = INTERVALOS[p[0].dataIndex]
          const linhas = p.filter(x => x.seriesName !== 'Balança')
            .map(x => `${x.marker} ${x.seriesName} <b>${dKg(x.value)}</b>`).join('<br/>')
          return `<b>${i.intervalo}</b> · ${i.dias} dias<br/>Balança <b>${dKg(i.dPeso)}</b><br/>${linhas}`
        }
      },
      xAxis: {
        type: 'category', data: rot,
        axisLabel: { ...eixoTexto, fontSize: 10.5 },
        axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value', min: -2.5, max: 1.4,
        axisLabel: { ...eixoTexto, formatter: v => (v > 0 ? '+' : '') + v },
        axisLine: { show: false }, axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } }
      },
      series: [
        {
          name: 'Gordura', type: 'bar', data: INTERVALOS.map(i => i.dGordura),
          barMaxWidth: 22, itemStyle: { color: C.gordura, borderRadius: 3 },
          markArea: {
            silent: true,
            itemStyle: { color: 'rgba(251,191,36,0.10)' },
            label: { show: false },
            data: destaque.map(d => [{ xAxis: d - 0.5 }, { xAxis: d + 0.5 }])
          }
        },
        {
          name: 'Massa magra', type: 'bar', data: INTERVALOS.map(i => i.dMagra),
          barMaxWidth: 22, itemStyle: { color: C.musculo, borderRadius: 3 }
        },
        {
          name: 'Balança', type: 'line', data: INTERVALOS.map(i => i.dPeso),
          symbol: 'diamond', symbolSize: 11, z: 6,
          lineStyle: { color: C.peso, width: 1.4, type: 'dotted' },
          itemStyle: { color: C.peso },
          label: {
            show: true, position: 'top', color: C.texto, fontSize: 10.5, fontWeight: 600,
            formatter: p => (p.value > 0 ? '+' : '−') + n1(Math.abs(p.value))
          },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: C.tenue, width: 1 },
            label: { show: false },
            data: [{ yAxis: 0 }]
          }
        }
      ]
    }
  }, [])

  return (
    <Secao
      olho="O que a balança esconde"
      titulo="Cada intervalo, aberto por dentro"
      legenda={<>O losango branco é o que a balança mostrou. As barras são de onde o peso saiu de verdade. Nos dois intervalos marcados a balança mal se mexeu, e é ali que a história muda.</>}
    >
      <div className="cartao">
        <Grafico opcao={opcao} altura={330} aria="Variação de gordura, massa magra e peso em cada intervalo entre medições" />
      </div>
    </Secao>
  )
}
