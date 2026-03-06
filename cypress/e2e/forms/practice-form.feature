# language: pt
@forms @practice @smoke
Funcionalidade: Enviar o Practice Form do DemoQA
  Como um usuário do DemoQA
  Quero preencher e submeter o Practice Form
  Para validar o modal de confirmação

  Cenário: Preencher o formulário com valores aleatórios e enviar
    Dado que acesso o site DemoQA
    E navego até o card "Forms"
    E acesso o submenu "Practice Form"
    Quando preencho todo o formulário com valores aleatórios e faço upload do arquivo
    E envio o formulário
    Então devo visualizar o popup de confirmação do envio
    E fecho o popup
