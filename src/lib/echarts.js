// Import enxuto: só o que as telas usam de fato, para o bundle caber bem no celular.
import * as echarts from 'echarts/core'
import {
  BarChart, LineChart, RadarChart, GaugeChart,
  HeatmapChart, GraphChart, ScatterChart, CustomChart
} from 'echarts/charts'
import {
  GridComponent, TooltipComponent, LegendComponent,
  MarkLineComponent, MarkPointComponent, MarkAreaComponent,
  VisualMapComponent, RadarComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  BarChart, LineChart, RadarChart, GaugeChart,
  HeatmapChart, GraphChart, ScatterChart, CustomChart,
  GridComponent, TooltipComponent, LegendComponent,
  MarkLineComponent, MarkPointComponent, MarkAreaComponent,
  VisualMapComponent, RadarComponent,
  CanvasRenderer
])

export default echarts
