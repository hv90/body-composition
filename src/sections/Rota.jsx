import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { VALIDAS, primeira, ultima, FAIXAS_IMC, META_PESO, IMC_META } from '../lib/derivar.js'
import { n1 } from '../lib/fmt.js'

export default function Rota() {
  const imc = useMemo(() => ({
    animationDuration: 800,
    grid: { left: 34, right: 18, top: 22, bottom: 34 },
    tooltip: {
      ...tooltipBase, trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: C.borda } },
      formatter: p => `<b>${p[0].name}</b><br/>IMC <b>${n1(p[0].value)}</b>`
    },
    xAxis: {
      type: 'category', data: VALIDAS.map(s => s.rotulo), boundaryGap: false,
      axisLabel: eixoTexto, axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
    },
    yAxis: {
      type: 'value', min: 24, max: 32, interval: 2,
      axisLabel: eixoTexto, axisLine: { show: false }, axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [{
      type: 'line', data: VALIDAS.map(s => s.imc),
      smooth: 0.25, symbol: 'circle', symbolSize: 7,
      lineStyle: { color: C.texto, width: 2.5 },
      itemStyle: { color: C.texto, borderColor: C.fundo, borderWidth: 2 },
      label: { show: true, position: 'top', color: C.fraco, fontSize: 10, formatter: p => n1(p.value) },
      markArea: {
        silent: true,
        label: { position: 'insideBottomRight', color: C.tenue, fontSize: 10, distance: 6 },
        data: FAIXAS_IMC
          .filter(f => f.ate > 24 && f.de < 32)
          .map(f => [
            { yAxis: Math.max(f.de, 24), itemStyle: { color: f.cor }, name: f.nome },
            { yAxis: Math.min(f.ate, 32) }
          ])
      },
      markLine: {
        silent: true, symbol: 'none',
        label: { fontSize: 10, position: 'insideStartTop' },
        data: [
          { yAxis: 25, lineStyle: { color: C.bom, type: 'dashed', width: 1.3 },
            label: { formatter: 'saudável abaixo de 25', color: C.bom } },
          { yAxis: IMC_META, lineStyle: { color: C.musculo, type: 'dotted', width: 1.6 },
            label: { formatter: `meta ${META_PESO} kg`, color: C.musculo,
              position: 'insideEndTop' } }
        ]
      }
    }]
  }), [])

  const meta = META_PESO
  const percorrido = Math.round((primeira.peso - ultima.peso) * 10) / 10
  const restante = Math.round((ultima.peso - meta) * 10) / 10
  const totalCaminho = Math.round((percorrido + restante) * 10) / 10

  const trilha = useMemo(() => ({
    animationDuration: 800,
    grid: { left: 8, right: 8, top: 30, bottom: 8 },
    tooltip: {
      ...tooltipBase, trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,0.04)' } },
      formatter: p => p.map(x => `${x.marker} ${x.seriesName} <b>${n1(x.value)} kg</b>`).join('<br/>')
    },
    xAxis: { type: 'value', max: totalCaminho, show: false },
    yAxis: { type: 'category', data: [''], show: false },
    series: [
      {
        name: 'Já perdeu', type: 'bar', stack: 'x', data: [percorrido], barWidth: 44,
        itemStyle: { color: C.bom, borderRadius: [10, 0, 0, 10] },
        label: { show: true, color: '#0A0E14', fontSize: 13, fontWeight: 700,
          formatter: `${n1(percorrido)} kg` }
      },
      {
        name: 'Falta até a meta', type: 'bar', stack: 'x', data: [restante], barWidth: 44,
        itemStyle: { color: 'rgba(139,152,168,0.22)', borderRadius: [0, 10, 10, 0] },
        label: { show: true, color: C.fraco, fontSize: 13, fontWeight: 600,
          formatter: `${n1(restante)} kg` }
      }
    ]
  }), [])

  return (
    <Secao
      olho="A rota"
      titulo="Saiu da obesidade em duas semanas"
      legenda={<>O IMC atravessou a linha dos 30 entre julho e agosto. A faixa saudável começa em 25, e ele está em <b>28,6</b>.</>}
    >
      <div className="cartao">
        <Grafico opcao={imc} altura={250} aria="IMC ao longo do período sobre as faixas de classificação" />
      </div>

      <div className="cartao">
        <div style={{ padding: '13px 14px 0', fontSize: 11.5, color: C.tenue,
          letterSpacing: '.05em', textTransform: 'uppercase' }}>
          Caminho até a meta de {n1(meta)} kg
        </div>
        <Grafico opcao={trilha} altura={96} aria={`Já perdeu ${percorrido} kg, faltam ${restante} kg até a meta de ${meta} kg`} />
        <div className="rodape" style={{ paddingTop: 4 }}>
          <b style={{ color: 'var(--texto)' }}>
            {Math.round((percorrido / totalCaminho) * 100)}% do caminho, em 42 dias.
          </b>{' '}
          Nos 60 kg o IMC fica em {n1(IMC_META)}, encostando na faixa saudável. O
          aparelho sugere 51 kg, mas essa conta é dele, feita só de altura e idade.
        </div>
      </div>
    </Secao>
  )
}
