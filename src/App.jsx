import Abertura from './sections/Abertura.jsx'
import Composicao from './sections/Composicao.jsx'
import SemanaASemana from './sections/SemanaASemana.jsx'
import DoisMomentos from './sections/DoisMomentos.jsx'
import MapaDoCorpo from './sections/MapaDoCorpo.jsx'
import SinaisInternos from './sections/SinaisInternos.jsx'
import Rota from './sections/Rota.jsx'
import MedicaoInvalida from './sections/MedicaoInvalida.jsx'
import Sinais from './sections/Sinais.jsx'
import { RESUMO } from './lib/derivar.js'

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
        Dados transcritos de 7 laudos Fitdays de análise de composição corporal,
        de 23/07/2026 a 03/09/2026. Bioimpedância estima a composição do corpo,
        ela não mede diretamente. Hidratação, horário e alimentação mexem no
        resultado, então o que vale é a tendência, não a casa decimal de um dia.
      </footer>
    </>
  )
}
