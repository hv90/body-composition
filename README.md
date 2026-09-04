# Composicao corporal em graficos

Sete laudos de bioimpedancia (Fitdays), de 23/07/2026 a 03/09/2026, virados em uma
pagina de graficos ECharts. Mobile-first: tudo foi desenhado para 375 px de largura
primeiro, e o desktop apenas se acomoda.

## O que a pagina conta

| # | Secao | O grafico |
|---|---|---|
| 1 | Abertura | Halteres: inicio e fim de peso, gordura e massa magra |
| 2 | Composicao | Areas empilhadas gordura + massa magra = peso, no tempo |
| 3 | Semana a semana | Barras divergentes por intervalo, com a balanca como losango |
| 4 | Dois momentos | Os dois intervalos de menos de 500 g, lado a lado |
| 5 | Mapa do corpo | Grafo em forma de corpo, com data deslizante e troca gordura/musculo |
| 6 | Por dentro | Ponteiro de gordura visceral + pontuacao e idade corporal |
| 7 | A rota | IMC sobre as faixas de classificacao + caminho ate a meta de 60 kg |
| 8 | 31 de julho | A medicao com altura errada, e o que dela foi aproveitado |
| 9 | Sinais brutos | Mapa de calor das impedancias, normalizado por segmento |

## Os dois momentos

O eixo da pagina. Duas vezes a balanca andou menos de meio quilo, por motivos opostos:

- **06 → 13 de agosto, −0,4 kg.** Gordura −1,3 kg, musculo **+0,9 kg**. Um compensou o outro.
- **28 de agosto → 3 de setembro, −0,3 kg.** Gordura **0,0 kg**, musculo **−0,3 kg**.

Mesma leitura, sinal trocado. `src/lib/derivar.js` marca esses intervalos sozinho
(`quaseParada`, `|dPeso| < 0.5`), sem lista fixa: se entrarem novas medicoes, o
destaque se move junto.

## A meta de 60 kg

`META_PESO` em `src/lib/derivar.js`. Veio de fora dos laudos, e por isso esta
declarada la em cima como constante e nao inferida de campo nenhum.

Os laudos trazem um `pesoAlvo` proprio, 51,0 kg, que e a sugestao do aparelho a partir
de altura e idade. Esse campo continua nos dados, mas nao manda em nada: a barra de
progresso e a linha pontilhada dos graficos usam os 60 kg. Nessa meta o IMC fica em
26,0, logo acima da faixa saudavel, e o caminho de 71,0 kg ate la esta 45% andado.

## A medicao de 31/07

Foi feita com **165 cm** no cadastro em vez de **152 cm**. Bioimpedancia deriva quase
tudo da altura, entao aquele laudo inteiro sai errado: ele registra +8,9 kg de musculo
e −10,9 kg de gordura em oito dias.

A sessao **nao foi descartada**. `composicaoValida: false` separa as duas metades:

- **Continua valendo** o que os sensores mediram direto e nao passa pela altura:
  o peso de 69,8 kg e as cinco impedancias. Aparecem na linha do peso (secao 2) e
  no mapa de sinais (secao 9).
- **Fica de fora** tudo que e derivado: gordura, musculo, agua, IMC, visceral, TMB,
  idade corporal e os segmentos. Esses campos vivem sob a chave `relatado`, preservados
  para a secao 8 mostrar exatamente o tamanho do erro, e nunca entram nas series.

Nenhum valor foi recalculado ou estimado para tapar o buraco. Os intervalos da secao 3
sao computados entre medicoes validas consecutivas, entao 23/07 liga direto em 06/08.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
```

## Publicar no GitHub Pages

`vite.config.js` usa `base: './'`, entao o mesmo build serve tanto em
`usuario.github.io/<repo>/` quanto na raiz, sem precisar acertar o nome do repositorio.

`.github/workflows/deploy.yml` ja faz build e deploy a cada push na `main`. Do lado do
GitHub falta so uma coisa: **Settings → Pages → Source: GitHub Actions**.

## Estrutura

```
src/
  data/sessoes.js     transcricao literal dos 7 laudos, nada calculado aqui
  lib/derivar.js      intervalos, deltas, resumo, faixas de IMC
  lib/tema.js         cores e a base de tooltip (confine: true em todas)
  lib/echarts.js      import enxuto do ECharts
  components/         Grafico (wrapper com ResizeObserver) e Secao
  sections/           uma tela por arquivo
```

## Notas de leitura

Bioimpedancia **estima** a composicao, nao a mede. Hidratacao, horario e alimentacao
mexem no resultado, entao o que vale e a tendencia ao longo das semanas, nao a casa
decimal de um dia isolado. Massa magra aqui e sempre `peso − gordura`, para que as
duas faixas empilhadas fechem o peso exato sem sobra de arredondamento.
