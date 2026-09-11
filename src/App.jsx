import Abertura from './sections/Abertura.jsx'
import Composicao from './sections/Composicao.jsx'
import SemanaASemana from './sections/SemanaASemana.jsx'
import DoisMomentos from './sections/DoisMomentos.jsx'
import MapaDoCorpo from './sections/MapaDoCorpo.jsx'
import SinaisInternos from './sections/SinaisInternos.jsx'
import Rota from './sections/Rota.jsx'
import MedicaoInvalida from './sections/MedicaoInvalida.jsx'
import Sinais from './sections/Sinais.jsx'
import { RESUMO, primeira, ultima } from './lib/derivar.js'
import { dataBR } from './lib/fmt.js'

export default function App() {
  return (
    <>
      <header className="topo">
        <b>Composição corporal</b>
        <span>{RESUMO.medicoes} medições · {RESUMO.dias} dias</span>
      </header>

      <main>
        <Abertura />
        <Composicao />
        <SemanaASemana />
        <DoisMomentos />
        <MapaDoCorpo />
        <SinaisInternos />
        <Rota />
        <MedicaoInvalida />
        <Sinais />
      </main>

      <footer className="rodapePagina">
        Dados transcritos de {RESUMO.medicoes} laudos Fitdays de análise de composição
        corporal, de {dataBR(primeira.data)} a {dataBR(ultima.data)}. Bioimpedância
        estima a composição do corpo,
        ela não mede diretamente. Hidratação, horário e alimentação mexem no
        resultado, então o que vale é a tendência, não a casa decimal de um dia.
      </footer>
    </>
  )
}
