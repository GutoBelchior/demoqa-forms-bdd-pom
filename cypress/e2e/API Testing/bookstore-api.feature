# language: pt
@api @e2e @smoke
Funcionalidade: Fluxo E2E da API do Book Store (DemoQA)
  Como analista de QA
  Quero executar todo o fluxo de API em uma única execução
  Para validar criação, autenticação, autorização e manipulação de livros

  Cenário: Criar usuário -> Gerar token -> Autorizar -> Listar -> Adicionar 2 livros -> Validar
    Dado que eu crio um usuário válido para o Book Store
    Quando eu gero o token de acesso para esse usuário
    Então o usuário deve estar autorizado na API
    E eu consulto a lista de livros disponíveis
    Quando eu adiciono dois livros aleatórios à coleção do usuário
    Então devo ver os dois livros na coleção do usuário e imprimir seus detalhes
