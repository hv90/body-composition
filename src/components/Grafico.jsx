import { useEffect, useRef } from 'react'
import echarts from '../lib/echarts.js'

/**
 * Envolve uma instância do ECharts. Redimensiona sozinho, o que importa
 * quando o celular gira ou a barra do navegador aparece e some.
 */
export default function Grafico({ opcao, altura = 300, aria }) {
  const alvo = useRef(null)
  const inst = useRef(null)

  useEffect(() => {
    inst.current = echarts.init(alvo.current, null, { renderer: 'canvas' })
    const ro = new ResizeObserver(() => inst.current && inst.current.resize())
    ro.observe(alvo.current)
    return () => { ro.disconnect(); inst.current.dispose(); inst.current = null }
  }, [])

  useEffect(() => {
    if (inst.current) inst.current.setOption(opcao, true)
  }, [opcao])

  return <div ref={alvo} className="chart" style={{ height: altura }} role="img" aria-label={aria} />
}
