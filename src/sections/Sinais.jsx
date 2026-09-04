import { useMemo, useState } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { TODAS } from '../lib/derivar.js'
import { SEGMENTOS } from '../data/sessoes.js'
import { n1 } from '../lib/fmt.js'

const mediana = xs => {
  const a = [...xs].sort((x, y) => x - y)
  const m = Math.floor(a.length / 2)
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2
}

export default function Sinais() {
  const [freq, setFreq] = useState('z100')

  const opcao = useMemo(() => {
    // Tronco mede ~20 ohms e os membros ~380. Numa escala única o tronco vira
    // uma faixa morta. Então cada segmento é comparado consigo mesmo: quanto o
    // dia se afasta da mediana daquele segmento.
    const base = {}
    SEGMENTOS.forEach(seg => {
      base[seg.chave] = mediana(TODAS.map(s => s[freq][seg.chave]))
    })

    const dados = []
    TODAS.forEach((s, x) => {
      SEGMENTOS.forEach((seg, y) => {
        const bruto = s[freq][seg.chave]
        const desvio = ((bruto - base[seg.chave]) / base[seg.chave]) * 100
        dados.push([x, y, Math.round(desvio * 10) / 10, bruto])
      })
    })

    return {
      animationDuration: 500,
      grid: { left: 58, right: 14, top: 14, bottom: 66 },
      tooltip: {
        ...tooltipBase,
        formatter: p => {
          const seg = SEGMENTOS[p.value[1]]
          const s = TODAS[p.value[0]]
          return `<b>${s.rotulo} · ${seg.nome}</b><br/>${n1(p.value[3])} Ω<br/>` +
            `<span style="color:${C.fraco}">${(p.value[2] > 0 ? '+' : '')}${n1(p.value[2])}% da mediana</span>`
        }
      },
      xAxis: {
        type: 'category', data: TODAS.map(s => s.rotulo),
        axisLabel: { ...eixoTexto, fontSize: 8.5, interval: 0 },
        axisLine: { show: false }, axisTick: { show: false },
        splitArea: { show: true, areaStyle: { color: ['transparent'] } }
      },
      yAxis: {
        type: 'category', data: SEGMENTOS.map(s => s.nome), inverse: true,
        axisLabel: { ...eixoTexto, fontSize: 10 },
        axisLine: { show: false }, axisTick: { show: false }
      },
      visualMap: {
        dimension: 2,
        min: -12, max: 12, calculable: false, orient: 'horizontal',
        left: 'center', bottom: 4, itemWidth: 11, itemHeight: 110,
        text: ['mais alto', 'mais baixo'],
        textStyle: { color: C.tenue, fontSize: 10 },
        inRange: { color: ['#2DD4BF', '#1B2530', '#F2994A'] }
      },
      series: [{
        type: 'heatmap', data: dados,
        itemStyle: { borderColor: C.fundo, borderWidth: 2, borderRadius: 4 },
        emphasis: { itemStyle: { borderColor: C.texto, borderWidth: 2 } },
        progressive: 0
      }]
    }
  }, [freq])

  return (
    <Secao
      olho="Os sinais brutos"
      titulo="O que os eletrodos leram, antes de virar conta"
      legenda={<>A balança manda uma corrente pelo corpo e mede a resistência de cada membro. É daí que sai todo o resto. Cada quadrado se compara com o próprio histórico, então o tronco cabe no mesmo mapa que os braços.</>}
    >
      <div className="cartao">
        <div className="controles">
          <button className="pil" data-on={freq === 'z20' ? '1' : '0'} onClick={() => setFreq('z20')}>20 kHz</button>
          <button className="pil" data-on={freq === 'z100' ? '1' : '0'} onClick={() => setFreq('z100')}>100 kHz</button>
        </div>
        <Grafico opcao={opcao} altura={300} aria="Mapa de calor das impedâncias por segmento e por data" />
      </div>
      <p className="legenda" style={{ marginTop: 10 }}>
        O quadrado verde-água do tronco em 13/ago é uma leitura fora do padrão:
        12,2 Ω contra os 16 a 17 dos outros dias. Nada mais naquele laudo destoa,
        então provavelmente foi contato de pele, e não o corpo.
      </p>
    </Secao>
  )
}
