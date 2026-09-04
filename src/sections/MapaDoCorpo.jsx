import { useMemo, useState } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase } from '../lib/tema.js'
import { VALIDAS, primeira, ultima } from '../lib/derivar.js'
import { SEGMENTOS } from '../data/sessoes.js'
import { n1, dataCurta } from '../lib/fmt.js'

// Coordenadas em espaço cartesiano com y para CIMA: braços em cima, pernas embaixo.
// O grafo do ECharts sem sistema de coordenadas escala o grupo inteiro para caber na
// área, e a escala é diferente em x e em y, o que transforma todo círculo em elipse.
// Ancorar em cartesian2d com min/max fixos resolve: o símbolo passa a ser desenhado
// em pixels, então círculo sai círculo em qualquer largura de tela.
const POS = {
  bracoE: [-62, 66], bracoD: [62, 66],
  tronco: [0, 72],
  pernaE: [-20, 14], pernaD: [20, 14]
}

const METRICAS = {
  gordura: {
    nome: 'Gordura', cor: C.gordura, campo: 'gorduraSeg', campoPerc: 'gorduraSegPerc',
    maxRadar: 400, faixa: 'padrão entre 80% e 160%',
    corDe: p => (p > 160 ? C.gordura : C.musculo)
  },
  musculo: {
    nome: 'Músculo', cor: C.musculo, campo: 'musculoSeg', campoPerc: 'musculoSegPerc',
    maxRadar: 130, faixa: 'padrão entre 90% e 110%',
    corDe: p => (p < 90 ? C.alerta : C.musculo)
  }
}

const eixoOculto = extras => ({
  type: 'value', show: false, ...extras
})

export default function MapaDoCorpo() {
  const [metrica, setMetrica] = useState('gordura')
  const [i, setI] = useState(VALIDAS.length - 1)
  const m = METRICAS[metrica]
  const s = VALIDAS[i]

  const corpo = useMemo(() => {
    const kg = s[m.campo]
    const pc = s[m.campoPerc]
    const nos = SEGMENTOS.map(seg => {
      const v = kg[seg.chave]
      const cor = m.corDe(pc[seg.chave])
      return {
        name: seg.nome,
        value: [POS[seg.chave][0], POS[seg.chave][1], v],
        perc: pc[seg.chave],
        symbolSize: Math.sqrt(v) * 16.5,
        itemStyle: { color: cor, opacity: 0.9, shadowBlur: 10, shadowColor: cor },
        label: {
          show: true, position: 'inside', color: '#08111A',
          fontSize: 11.5, fontWeight: 700, formatter: () => n1(v)
        }
      }
    })

    return {
      animationDuration: 420, animationDurationUpdate: 420,
      grid: { left: 10, right: 10, top: 16, bottom: 16 },
      xAxis: eixoOculto({ min: -100, max: 100 }),
      yAxis: eixoOculto({ min: 0, max: 100 }),
      tooltip: {
        ...tooltipBase,
        formatter: p => p.dataType === 'node'
          ? `<b>${p.name}</b><br/>${m.nome} <b>${n1(p.data.value[2])} kg</b><br/><span style="color:${C.fraco}">${n1(p.data.perc)}% do padrão</span>`
          : ''
      },
      series: [{
        type: 'graph', coordinateSystem: 'cartesian2d',
        symbol: 'circle', symbolKeepAspect: true,
        edgeSymbol: ['none', 'none'],
        lineStyle: { color: C.borda, width: 2, opacity: 0.7 },
        data: nos,
        links: ['bracoE', 'bracoD', 'pernaE', 'pernaD'].map(k => ({
          source: 'Tronco',
          target: SEGMENTOS.find(g => g.chave === k).nome
        })),
        emphasis: { focus: 'none', scale: false }
      }]
    }
  }, [metrica, i])

  const radar = useMemo(() => {
    const serie = ss => SEGMENTOS.map(seg => ss[m.campoPerc][seg.chave])
    return {
      animationDuration: 520,
      tooltip: { ...tooltipBase, trigger: 'item' },
      legend: {
        type: 'scroll', bottom: 0, itemWidth: 10, itemHeight: 10,
        textStyle: { color: C.fraco, fontSize: 11 }, inactiveColor: C.tenue
      },
      radar: {
        center: ['50%', '46%'], radius: '60%',
        indicator: SEGMENTOS.map(seg => ({ name: seg.curto, max: m.maxRadar })),
        axisName: { color: C.fraco, fontSize: 10.5 },
        splitLine: { lineStyle: { color: 'rgba(35,46,61,0.9)' } },
        splitArea: { areaStyle: { color: ['rgba(255,255,255,0.012)', 'transparent'] } },
        axisLine: { lineStyle: { color: 'rgba(35,46,61,0.9)' } }
      },
      series: [{
        type: 'radar', symbolSize: 4,
        data: [
          { name: `${dataCurta(primeira.data)} (início)`, value: serie(primeira),
            lineStyle: { color: C.tenue, width: 1.5, type: 'dashed' },
            itemStyle: { color: C.tenue }, areaStyle: { color: 'rgba(139,152,168,0.10)' } },
          { name: `${dataCurta(ultima.data)} (agora)`, value: serie(ultima),
            lineStyle: { color: m.cor, width: 2.5 },
            itemStyle: { color: m.cor }, areaStyle: { color: m.cor + '33' } }
        ]
      }]
    }
  }, [metrica])

  return (
    <Secao
      olho="Onde no corpo"
      titulo="O tronco é quem carrega, e é ele quem mais cede"
      legenda={<>Cada bola é um pedaço do corpo, do tamanho do que ela pesa. Arraste a data para ver o corpo mudar. Em gordura, o tronco sai de <b>16,9</b> para <b>14,2 kg</b>.</>}
    >
      <div className="cartao">
        <div className="controles">
          {Object.keys(METRICAS).map(k => (
            <button key={k} className="pil" data-on={metrica === k ? '1' : '0'} data-cor={k}
              onClick={() => setMetrica(k)}>{METRICAS[k].nome}</button>
          ))}
        </div>
        <Grafico opcao={corpo} altura={310} aria={`Mapa do corpo com ${m.nome} por segmento em ${s.rotulo}`} />
        <div className="faixaData">
          <div className="atual">{dataCurta(s.data)} · {n1(s.peso)} kg</div>
          <input type="range" min={0} max={VALIDAS.length - 1} step={1} value={i}
            aria-label="Escolher data da medição"
            onChange={e => setI(Number(e.target.value))} />
          <div className="marcas">
            <span>{VALIDAS[0].rotulo}</span>
            <span>{VALIDAS[VALIDAS.length - 1].rotulo}</span>
          </div>
        </div>
      </div>

      <div className="cartao">
        <Grafico opcao={radar} altura={290} aria={`Comparação de ${m.nome} por segmento entre a primeira e a última medição`} />
        <div className="rodape" style={{ padding: '0 14px 13px', fontSize: 11.5 }}>
          100% é a referência do aparelho para essa idade e altura · {m.faixa}
        </div>
      </div>
    </Secao>
  )
}
