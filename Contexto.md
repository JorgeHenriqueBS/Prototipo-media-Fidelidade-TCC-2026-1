# Contexto do Projeto

## Objetivo geral
- Unificar os projetos separados (`Main Menu`, `Fase Lógica de Programação`, `Fase Grafos e caminho Mínimo`, `Fase Árvores de dados BST`) em uma única aplicação web.
- Manter o `Main Menu` como app inicial.

## Estrutura e build
- O build da raiz foi configurado para usar `Main Menu` como `root` do Vite.
- React 18, Vite e TypeScript foram preparados na raiz para suportar a integração.
- Configuração para publicação no GitHub Pages foi adicionada:
  - Workflow em `.github/workflows/pages.yml`.
  - Ajustes em `vite.config.ts` para saída e base compatíveis com deploy estático.

## Integração do menu com fases
- Botão 1 (`Lógica de Programação`) abre o jogo de lógica.
- Botão 2 (`Caminho Mínimo`) abre o jogo de grafos.
- Botão 3 (`Árvore de Dados BST`) abre o jogo de BST.
- Telas de seleção de nível foram mantidas para as três fases.
- Botões de voltar padronizados com `← Voltar`.

## Fluxos finais de retorno ao menu
- Lógica: ao concluir a última fase, botão final retorna ao `Main Menu`.
- Grafos: ao concluir a última fase, botão final retorna ao `Main Menu`.
- BST: ao concluir a última fase, botão final retorna ao `Main Menu`.

## Ajustes de interface já aplicados
- `Main Menu`:
  - Inclusão da tela `Opções` com créditos e botão de voltar.
  - Remoção do objeto visual de livro vermelho e estilos associados.
  - Textos com degradê removidos nos títulos/roles; mantida cor verde sólida.
  - Botão `Sair` com tentativa de encerramento no navegador (com fallback).
- `Fase Lógica`:
  - Editor de comandos com altura fixa e `scroll` interno.
- `Fase BST` (nível 1):
  - Caixa de instruções criada e reposicionada conforme pedidos (lado direito, encostada na margem).
  - Texto atualizado e tipografia/tamanho ajustados.
- `Fase Grafos` (nível 1):
  - Overlay histórico em tela cheia adicionado.
  - Título e conteúdo histórico centralizados.
  - Botão `Vamos navegar?` fecha o overlay e libera o jogo.
  - Exibição reforçada para abrir ao carregar `Menu > Fases > Caminho Mínimo > Nível 1`.

## Observações operacionais
- Em várias validações, `npm run build` exigiu execução fora do sandbox por erro `spawn EPERM`.
- Build final mais recente: concluído com sucesso após os ajustes do overlay do nível 1 de grafos.

## Próximos passos sugeridos
- Teste manual completo do fluxo:
  1. `Main Menu` -> seleções de nível -> entrada em cada fase.
  2. Retorno ao menu nos finais de fase.
  3. Exibição do texto histórico no nível 1 de grafos.
- Publicar branch no GitHub e ativar Pages via `GitHub Actions` nas configurações do repositório.
