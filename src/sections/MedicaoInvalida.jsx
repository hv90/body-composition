import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { TODAS, CORROMPIDA } from '../lib/derivar.js'
import { PERFIL } from '../data/sessoes.js'
import { n1 } from '../lib/fmt.js'

export default function MedicaoInvalida() {
  const opcao = useMemo(() => {
    const iMau = TODAS.findIndex(s => !s.composicaoValida)
    const rot = TODAS.map(s => s.rotulo)
    const validos = TODAS.map(s => (s.composicaoValida ? s.percGordura : null))
    const reportado = TODAS.map((s, i) => (i === iMau ? CORROMPIDA.relatado.percGordura : null))

    return {
      animationDuration: 800,
      grid: { left: 36, right: 16, top: 38, bottom: 44 },
      legend: {
        type: 'scroll', bottom: 2, itemWidth: 10, itemHeight: 10, itemGap: 14,
        textStyle: { color: C.fraco, fontSize: 11 }, inactiveColor: C.tenue
      },
      tooltip: {
        ...tooltipBase, trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { color: C.borda } },
        formatter: p => {
          const v = p.filter(x => x.value != null)
          if (!v.length) return ''
          return `<b>${v[0].name}</b><br/>` +
            v.map(x => `${x.marker} ${x.seriesName} <b>${n1(x.value)}%</b>`).join('<br/>')
        }
      },
      xAxis: {
        type: 'category', data: rot, boundaryGap: false,
        axisLabel: eixoTexto, axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value', min: 26, max: 48, interval: 4,
        axisLabel: { ...eixoTexto, formatter: v => v + '%' },
        axisLine: { show: false }, axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } }
      },
      series: [
        {
          name: '% de gordura medida', type: 'line', data: validos,
          connectNulls: true, smooth: 0.2, symbol: 'circle', symbolSize: 7,
          lineStyle: { color: C.gordura, width: 2.5 },
          itemStyle: { color: C.gordura, borderColor: C.fundo, borderWidth: 2 },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: C.invalido, width: 1.2, type: 'dashed', opacity: 0.5 },
            label: { show: false },
            data: [{ xAxis: iMau }]
          }
        },
        {
          name: 'O que o laudo de 31/07 disse', type: 'scatter', data: reportado,
          symbol: 'path://M0,0 L20,20 M20,0 L0,20',
          symbolSize: 20, z: 10,
          itemStyle: { color: C.invalido, borderColor: C.invalido, borderWidth: 3 },
          label: {
            show: true, position: 'bottom', distance: 10,
            color: C.invalido, fontSize: 11, fontWeight: 700,
            formatter: p => n1(p.value) + '%'
          },
          markLine: {
            silent: true, symbol: ['none', 'arrow'], symbolSize: 8,
            lineStyle: { color: C.invalido, type: 'dashed', width: 1.4 },
            label: { show: false },
            data: [[{ coord: [iMau, 29.5] }, { coord: [iMau, 43.4] }]]
          }
        }
      ]
    }
  }, [])

  const r = CORROMPIDA.relatado

  return (
    <Secao
      olho="A medição de 31 de julho"
      titulo="Um número errado no cadastro derruba o laudo inteiro"
      legenda={<>Naquele dia a balança foi configurada com <b>165 cm</b> em vez de <b>152 cm</b>. O aparelho calcula quase tudo a partir da altura, então a linha despenca 13 pontos e volta. O corpo não fez isso.</>}
    >
      <div className="cartao">
        <Grafico opcao={opcao} altura={290} aria="Percentual de gordura ao longo do tempo com a medição inválida de 31 de julho fora da curva" />
      </div>

      <div className="aviso">
        <span className="mk">✕</span>
        <span className="tx">
          <b>Descartado</b> tudo que vem da altura: gordura, músculo, água, IMC, visceral,
          metabolismo, idade corporal e os segmentos. O laudo diz que ela ganhou{' '}
          <b>{n1(r.muscular - 37.0)} kg de músculo em 8 dias</b> e perdeu{' '}
          <b>{n1(31.5 - r.gordura)} kg de gordura</b> no mesmo período, o que não acontece.
        </span>
      </div>

      <div className="aviso" style={{ background: 'rgba(52,211,153,.06)', borderColor: 'rgba(52,211,153,.28)' }}>
        <span className="mk">✓</span>
        <span className="tx">
          <b>Aproveitado</b> o que os sensores mediram direto, sem passar pela altura:
          o <b>peso de {n1(CORROMPIDA.peso)} kg</b> e as cinco impedâncias. Por isso a
          medição continua no mapa de sinais, e só a composição ficou de fora.
        </span>
      </div>

      <div className="chaveValor">
        <span className="k">Altura no cadastro</span><span className="v ruim">165 cm</span>
        <span className="k">Altura real</span><span className="v">{PERFIL.alturaCm} cm</span>
        <span className="k">Medições no total</span><span className="v">7</span>
        <span className="k">Com composição válida</span><span className="v">6</span>
        <span className="k">Com peso válido</span><span className="v bom">7</span>
      </div>
    </Secao>
  )
}
