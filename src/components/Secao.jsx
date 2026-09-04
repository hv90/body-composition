export default function Secao({ olho, titulo, legenda, children }) {
  return (
    <section className="sec">
      {olho && <p className="olho">{olho}</p>}
      {titulo && <h2 className="titulo">{titulo}</h2>}
      {legenda && <p className="legenda">{legenda}</p>}
      {children}
    </section>
  )
}
