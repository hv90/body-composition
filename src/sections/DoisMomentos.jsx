import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { QUASE_PARADAS } from '../lib/derivar.js'
import { dKg, n1 } from '../lib/fmt.js'

const NARRATIVA = {
  '13/ago': {
    quando: '6 a 13 de agosto · 7 dias',
    titulo: 'Trocou gordura por músculo',
    texto: 'Perdeu 1,3 kg de gordura e ganhou 0,9 kg de músculo. Como um quase compensou o outro, a balança mal se mexeu. Foi a melhor semana do período.',
    tom: 'bom'
  },
  '03/set': {
    quando: '28 de agosto a 3 de setembro · 6 dias',
    titulo: 'O peso saiu do músculo',
    texto: 'A gordura não mudou nada: 26,3 kg antes e depois. Os 300 gramas que a balança marcou vieram inteiros do músculo. Mesmo número, sinal trocado.',
    tom: 'ruim'
  }
}

// O rótulo vai SEMPRE do lado de fora da ponta da barra. label.position não aceita
// função no ECharts, então a posição e decidida por item, aqui.
function rotulo(nome, v, cor) {
  return {
    value: v,
    name: nome,
    itemStyle: { color: cor, borderRadius: 4, opacity: v === 0 ? 0.25 : 1 },
    label: {
      show: true,
      position: v > 0 ? 'right' : 'left',
      distance: 8,
      color: v === 0 ? C.fraco : C.texto,
      fontSize: 13,
      fontWeight: 700,
      formatter: (v > 0 ? '+' : v < 0 ? '\u2212' : '') + n1(Math.abs(v)) + (v === 0 ? ' (nada mudou)' : '')
    }
  }
}

function painelOpcao(ev) {
  return {
    animationDuration: 700,
    grid: { left: 74, right: 46, top: 10, bottom: 8 },
    tooltip: {
      ...tooltipBase,
      formatter: p => `${p.marker} ${p.name} <b>${dKg(p.value)}</b> em ${ev.dias} dias`
    },
    xAxis: {
      type: 'value', min: -1.9, max: 1.5, interval: 0.85,
      axisLabel: { show: false }, axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(35,46,61,0.45)' } }
    },
    yAxis: {
      type: 'category', data: ['Músculo', 'Gordura'],
      axisLabel: { color: C.fraco, fontSize: 12, fontWeight: 600 },
      axisLine: { show: false }, axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      barWidth: 26,
      data: [
        rotulo('Músculo', ev.dMusculo, C.musculo),
        rotulo('Gordura', ev.dGordura, C.gordura)
      ],
      markLine: {
        silent: true, symbol: 'none',
        lineStyle: { color: C.fraco, width: 1 },
        label: { show: false },
        data: [{ xAxis: 0 }]
      }
    }]
  }
}

export default function DoisMomentos() {
  const paineis = useMemo(
    () => QUASE_PARADAS.map(ev => ({ ev, opcao: painelOpcao(ev), n: NARRATIVA[ev.rotulo] })),
    []
  )

  return (
    <Secao
      olho="Os dois momentos"
      titulo="Duas vezes a balança quase parou. Por motivos opostos."
      legenda={<>Menos de meio quilo nas duas. Se só o peso fosse olhado, as duas semanas seriam iguais. Elas são o contrário uma da outra.</>}
    >
      <div className="duo">
        {paineis.map(({ ev, opcao, n }) => (
          <div className="painel" key={ev.rotulo}>
            <div className="cab">
              <div className="quando">{n.quando}</div>
              <div className="balanca">
                {dKg(ev.dPeso)} <small>na balança</small>
              </div>
            </div>
            <Grafico opcao={opcao} altura={150} aria={`Variação de gordura e músculo em ${n.quando}`} />
            <div className="rodape">
              <b className={n.tom}>{n.titulo}</b>
              {n.texto}
            </div>
          </div>
        ))}
      </div>
    </Secao>
  )
}
