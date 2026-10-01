import { useMemo } from 'react'
import Grafico from '../components/Grafico.jsx'
import Secao from '../components/Secao.jsx'
import { C, tooltipBase, eixoTexto } from '../lib/tema.js'
import { PARES, CONFRONTO, VALIDAS, magra, lumiUltima, lumiPrimeira } from '../lib/derivar.js'
import { n1, dKg, dPp } from '../lib/fmt.js'

// A segunda balança ganha uma cor própria. Mesmo tipo de gráfico da abertura,
// cor e traço diferentes: é a mesma leitura feita por outro aparelho.
const COR_B = C.osso

export default function SegundaBalanca() {
  const ultimo = PARES[PARES.length - 1]

  // Gordura dia a dia, uma linha por balança. Com duas linhas quase paralelas e
  // separadas por dois quilos, a distância entre elas é o próprio assunto.
  const gordura = useMemo(() => ({
    animationDuration: 800,
    grid: { left: 42, right: 58, top: 26, bottom: 46 },
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
      type: 'category', data: PARES.map(p => p.rotulo), boundaryGap: ['18%', '18%'],
      axisLabel: { ...eixoTexto, interval: 0 },
      axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
    },
    yAxis: {
      type: 'value', min: 20, max: 28, interval: 2,
      axisLabel: { ...eixoTexto, formatter: v => v + ' kg' },
      axisLine: { show: false }, axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } }
    },
    series: [
      {
        name: 'Balança 1', type: 'line', symbol: 'circle', symbolSize: 8,
        data: PARES.map(p => p.base.gordura),
        lineStyle: { color: C.gordura, width: 2.8 },
        itemStyle: { color: C.gordura, borderColor: C.fundo, borderWidth: 1.5 },
        endLabel: { show: true, color: C.gordura, fontSize: 12.5, fontWeight: 700,
          formatter: p => n1(p.value) + ' kg', offset: [4, 0] }
      },
      {
        name: 'Balança 2', type: 'line', symbol: 'circle', symbolSize: 8,
        data: PARES.map(p => p.lumi.gorda),
        lineStyle: { color: COR_B, width: 2.8, type: 'dashed' },
        itemStyle: { color: COR_B, borderColor: C.fundo, borderWidth: 1.5 },
        endLabel: { show: true, color: COR_B, fontSize: 12.5, fontWeight: 700,
          formatter: p => n1(p.value) + ' kg', offset: [4, 0] }
      }
    ]
  }), [])

  // O mesmo dia, lado a lado. O peso quase coincide; o que ele é por dentro, não.
  const lado = useMemo(() => {
    const itens = [
      { nome: 'Peso',        a: ultimo.base.peso,    b: ultimo.lumi.peso },
      { nome: 'Gordura',     a: ultimo.base.gordura, b: ultimo.lumi.gorda },
      { nome: 'Massa magra', a: magra(ultimo.base),  b: ultimo.lumi.magra }
    ]
    const barra = (nome, cor, chave) => ({
      name: nome, type: 'bar', barMaxWidth: 20,
      itemStyle: { color: cor, borderRadius: [0, 4, 4, 0] },
      data: itens.map(i => i[chave]),
      label: { show: true, position: 'right', color: C.fraco, fontSize: 10.5,
        formatter: p => n1(p.value) }
    })
    return {
      animationDuration: 800,
      grid: { left: 76, right: 44, top: 26, bottom: 44 },
      legend: {
        type: 'scroll', bottom: 2, itemWidth: 12, itemHeight: 10, itemGap: 14,
        textStyle: { color: C.fraco, fontSize: 11 }, inactiveColor: C.tenue
      },
      tooltip: {
        ...tooltipBase, trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: p => `<b>${p[0].name}</b><br/>` +
          p.map(x => `${x.marker} ${x.seriesName} <b>${n1(x.value)} kg</b>`).join('<br/>')
      },
      xAxis: {
        type: 'value', min: 0, max: 70, interval: 35,
        axisLabel: { ...eixoTexto, formatter: v => v + ' kg' },
        axisLine: { show: false }, axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(35,46,61,0.5)' } }
      },
      yAxis: {
        type: 'category', data: itens.map(i => i.nome), inverse: true,
        axisLabel: { ...eixoTexto, fontSize: 11, interval: 0 },
        axisLine: { lineStyle: { color: C.borda } }, axisTick: { show: false }
      },
      series: [barra('Balança 1', C.gordura, 'a'), barra('Balança 2', COR_B, 'b')]
    }
  }, [ultimo])

  return (
    <Secao
      olho="Duas balanças"
      titulo={CONFRONTO && CONFRONTO.direcaoOposta
        ? 'A segunda balança discorda da primeira'
        : 'A segunda balança, medindo o mesmo corpo'}
      legenda={<>
        Desde {PARES[0].rotulo} uma segunda balança mede no mesmo dia, com poucos
        minutos de diferença. Elas quase não discutem o <b>peso</b>: a maior
        distância entre as duas foi de {n1(Math.abs(CONFRONTO ? CONFRONTO.maiorDifPeso : PARES[0].difPeso))} kg.
        Sobre <b>gordura</b> a distância chega
a {n1(Math.abs(CONFRONTO ? CONFRONTO.maiorDifGordura : PARES[0].difGordura))} kg.
      </>}
    >
      <div className="cartao">
        <Grafico opcao={lado} altura={236} aria={`Peso, gordura e massa magra em ${ultimo.rotulo} segundo as duas balanças`} />
        <div className="rodape">
          <b>{ultimo.rotulo}, as duas no mesmo dia.</b>{' '}
          Mesmo peso na balança, {n1(Math.abs(ultimo.difGordura))} kg de diferença no que
          elas chamam de gordura. Bioimpedância estima; cada aparelho estima com a
          sua própria fórmula.
        </div>
      </div>

      {CONFRONTO && (
        <>
          <div className="cartao" style={{ marginTop: 10 }}>
            <Grafico opcao={gordura} altura={246} aria="Gordura medida por cada balança nos dias em que as duas mediram" />
            <div className="rodape">
              Em {CONFRONTO.dias} dias a primeira viu a gordura ir
              a <b>{dKg(CONFRONTO.dGorduraBase)}</b> e a segunda
              a <b>{dKg(CONFRONTO.dGorduraLumi)}</b>.
              {CONFRONTO.direcaoOposta
                ? ' Direções opostas, mesmo corpo: com dois pontos, nenhuma das duas provou nada ainda.'
                : ' Mesma direção, apesar da diferença de nível.'}
            </div>
          </div>

          {CONFRONTO.direcaoOposta && (
            <div className="aviso" style={{ background: 'rgba(251,191,36,.07)', borderColor: 'rgba(251,191,36,.32)' }}>
              <span className="mk">⚠</span>
              <span className="tx">
                Quando duas balanças discordam, a saída não é escolher a mais simpática:
                é seguir <b>cada uma na sua própria série</b>. A balança 1 tem {VALIDAS.length} medições
                de composição e já mostra tendência. A balança 2 tem {PARES.length}, e {PARES.length}
                pontos não formam tendência nenhuma.
              </span>
            </div>
          )}
        </>
      )}

      <div className="grade tres" style={{ marginTop: 10 }}>
        <div className="tile">
          <div className="rot">Ângulo de fase</div>
          <div className="val">{n1(lumiUltima.anguloFase)}°</div>
          <div className="sub">era {n1(lumiPrimeira.anguloFase)}° · {PARES[0].rotulo}</div>
        </div>
        <div className="tile">
          <div className="rot">Idade celular</div>
          <div className="val">{lumiUltima.idadeCelular}</div>
          <div className="sub">era {lumiPrimeira.idadeCelular} anos</div>
        </div>
        <div className="tile">
          <div className="rot">Água na célula</div>
          <div className="val">{n1(lumiUltima.percIntracelular)}%</div>
          <div className="sub">{n1(lumiUltima.intracelular)} de {n1(lumiUltima.aguaTotal)} L</div>
        </div>
      </div>

      <div className="rodape" style={{ paddingLeft: 2, paddingRight: 2 }}>
        Estes três a primeira balança não mede. O ângulo de fase e a idade celular
        falam da qualidade da célula, não do tamanho dela. Só valerão como notícia
        depois de algumas medições.
      </div>
    </Secao>
  )
}
