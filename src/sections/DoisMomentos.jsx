import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { QUASE_PARADAS, MAIOR_GANHO_MUSCULO } from '../lib/derivar.js'
import { dKg, n1 } from '../lib/fmt.js'

// Quantos intervalos quase-parados existem hoje. A seção já nasceu com dois e
// chegou a três; o número vem da derivação para o título não envelhecer.
const VEZES = { 1: 'Uma vez', 2: 'Duas vezes', 3: 'Três vezes', 4: 'Quatro vezes',
  5: 'Cinco vezes', 6: 'Seis vezes' }

// Texto escrito à mão para os intervalos que já aconteceram. Um intervalo novo cai
// na derivação abaixo em vez de derrubar a página: antes desta função, um terceiro
// quase-parado deixava a tela inteira em branco, porque NARRATIVA não o conhecia.
const NARRATIVA = {
  '13/ago': {
    quando: '6 a 13 de agosto · 7 dias',
    titulo: 'Trocou gordura por músculo',
    texto: 'Perdeu 1,3 kg de gordura e ganhou 0,9 kg de músculo. Como um quase compensou o outro, a balança mal se mexeu.',
    tom: 'bom'
  },
  '03/set': {
    quando: '28 de agosto a 3 de setembro · 6 dias',
    titulo: 'O peso saiu do músculo',
    texto: 'A gordura não mudou nada: 26,3 kg antes e depois. Os 300 gramas que a balança marcou vieram inteiros do músculo. Mesmo número, sinal trocado.',
    tom: 'ruim'
  },
  '15/out': {
    quando: '8 a 15 de outubro · 7 dias',
    titulo: 'A balança subiu, e subiu de músculo',
    texto: 'A gordura ficou nos mesmos 24,0 kg e o músculo subiu 0,2 kg. A balança marcou 300 gramas a mais sem que nada disso fosse gordura, e o percentual de gordura caiu mesmo com ela subindo.',
    tom: 'bom'
  },
  '23/out': {
    quando: '15 a 23 de outubro · 8 dias',
    titulo: 'Os 100 gramas eram gordura, e só gordura',
    texto: 'O músculo não se mexeu nem um grama: 36,4 kg antes e depois. A gordura caiu 0,3 kg, então a massa magra subiu 0,2 kg e a balança marcou só 100 gramas a menos. Tudo o que saiu era gordura.',
    tom: 'bom'
  }
}

// O caso que NARRATIVA não cobre. Sai dos números do próprio intervalo, então
// nunca fica sem resposta nem afirma mais do que mediu.
function narrativaDerivada(ev) {
  const subiuMusculo = ev.dMusculo > 0
  const gorduraParada = ev.dGordura === 0
  const musculoParado = ev.dMusculo === 0
  return {
    quando: `${ev.de.rotulo} a ${ev.para.rotulo} · ${ev.dias} dias`,
    titulo: subiuMusculo
      ? (gorduraParada ? 'A gordura parou, o músculo subiu' : 'Trocou gordura por músculo')
      : musculoParado
        ? (gorduraParada ? 'Nada se mexeu por dentro' : 'O peso que saiu era gordura')
        : (gorduraParada ? 'O peso saiu do músculo' : 'A balança quase não se mexeu'),
    texto: `A balança marcou ${dKg(ev.dPeso)}. Por dentro: gordura ${dKg(ev.dGordura)}` +
      ` e músculo ${dKg(ev.dMusculo)}.`,
    tom: ev.dMusculo >= 0 ? 'bom' : 'ruim'
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
    () => QUASE_PARADAS.map(ev => ({
      ev, opcao: painelOpcao(ev), n: NARRATIVA[ev.rotulo] || narrativaDerivada(ev)
    })),
    []
  )

  return (
    <Secao
      olho="Quando a balança quase não se mexe"
      titulo={`${VEZES[QUASE_PARADAS.length] || `${QUASE_PARADAS.length} vezes`} a balança quase parou. Nem sempre pelo mesmo motivo.`}
      legenda={<>Menos de meio quilo em cada uma. Se só o peso fosse olhado, essas semanas seriam a mesma coisa. Por dentro elas não são.</>}
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
              {ev === MAIOR_GANHO_MUSCULO && ' É o maior ganho de músculo de toda a série.'}
            </div>
          </div>
        ))}
      </div>
    </Secao>
  )
}
