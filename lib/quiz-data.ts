import type {
  AreaInsight,
  AreaKey,
  QuizBlock,
  RevenueOption,
  RoleOption,
  Solution,
  SolutionKey,
} from "./types";

/* =========================================================
   PERGUNTAS DO QUIZ
   20 perguntas originais, mantidas exatamente como estavam
   (nenhuma pergunta foi adicionada ou removida).
   ========================================================= */
export const QUIZ_DATA: QuizBlock[] = [
  {
    key: "lucratividade",
    label: "Lucratividade",
    subtitle: "Descubra se seu lucro está realmente protegido.",
    questions: [
      {
        text: "Se hoje o custo dos seus ingredientes aumentasse 8%, você conseguiria dizer exatamente quanto precisaria reajustar seus preços para manter sua margem?",
        options: [
          { label: "Não faço ideia", score: 0 },
          { label: "Faria uma estimativa", score: 1 },
          { label: "Conseguiria calcular para alguns produtos", score: 2 },
          { label: "Sei exatamente como calcular", score: 3 },
        ],
      },
      {
        text: "Se eu perguntasse agora quais são os 5 produtos que mais geram lucro no seu delivery, você conseguiria responder com dados?",
        options: [
          { label: "Não saberia responder", score: 0 },
          { label: "Tenho uma ideia", score: 1 },
          { label: "Sei parte deles", score: 2 },
          { label: "Sim, acompanho esses números", score: 3 },
        ],
      },
      {
        text: "Hoje você sabe exatamente onde está perdendo mais dinheiro dentro da operação?",
        options: [
          { label: "Não sei", score: 0 },
          { label: "Tenho suspeitas", score: 1 },
          { label: "Identifico alguns pontos", score: 2 },
          { label: "Tenho clareza baseada em números", score: 3 },
        ],
      },
    ],
  },
  {
    key: "controladoria",
    label: "Controladoria",
    subtitle: "O lucro pode estar escapando sem você perceber.",
    questions: [
      {
        text: "Você sabe qual é o CMV real do seu delivery hoje?",
        options: [
          { label: "Nunca calculei", score: 0 },
          { label: "Tenho apenas uma estimativa", score: 1 },
          { label: "Calculo de vez em quando", score: 2 },
          { label: "Acompanho regularmente", score: 3 },
        ],
      },
      {
        text: "Se um funcionário preparasse um prato diferente da ficha técnica, você conseguiria identificar rapidamente essa perda?",
        options: [
          { label: "Não", score: 0 },
          { label: "Talvez", score: 1 },
          { label: "Em alguns casos", score: 2 },
          { label: "Sim, tenho controle", score: 3 },
        ],
      },
      {
        text: "Você consegue saber quando estoque, desperdício ou fornecedores começam a reduzir sua margem?",
        options: [
          { label: "Não consigo", score: 0 },
          { label: "Percebo tarde", score: 1 },
          { label: "Consigo identificar parte", score: 2 },
          { label: "Monitoro continuamente", score: 3 },
        ],
      },
    ],
  },
  {
    key: "financeiro",
    label: "Financeiro",
    subtitle: "Sua empresa toma decisões com números ou com sensação?",
    questions: [
      {
        text: "Se hoje seu faturamento caísse 20%, você saberia exatamente quanto tempo sua empresa suportaria?",
        options: [
          { label: "Não faço ideia", score: 0 },
          { label: "Tenho uma noção", score: 1 },
          { label: "Consigo estimar", score: 2 },
          { label: "Sei exatamente", score: 3 },
        ],
      },
      {
        text: "Você possui um DRE atualizado que realmente utiliza para tomar decisões?",
        options: [
          { label: "Não tenho", score: 0 },
          { label: "Tenho, mas quase não uso", score: 1 },
          { label: "Consulto eventualmente", score: 2 },
          { label: "Utilizo todos os meses", score: 3 },
        ],
      },
      {
        text: "Você conhece exatamente quanto sua empresa precisa faturar por mês para não operar no prejuízo?",
        options: [
          { label: "Não sei", score: 0 },
          { label: "Tenho uma ideia", score: 1 },
          { label: "Já calculei", score: 2 },
          { label: "Acompanho constantemente", score: 3 },
        ],
      },
    ],
  },
  {
    key: "processos",
    label: "Processos",
    subtitle: "Sua operação cresce com organização ou improviso?",
    questions: [
      {
        text: "Se amanhã sua demanda dobrasse, sua operação conseguiria manter o mesmo padrão de qualidade?",
        options: [
          { label: "Não conseguiria", score: 0 },
          { label: "Com muita dificuldade", score: 1 },
          { label: "Provavelmente conseguiria", score: 2 },
          { label: "Sim, estamos preparados", score: 3 },
        ],
      },
      {
        text: "Quando ocorre um erro de pedido, existe um processo definido para evitar que ele aconteça novamente?",
        options: [
          { label: "Não existe", score: 0 },
          { label: "Cada caso é resolvido de um jeito", score: 1 },
          { label: "Existe parcialmente", score: 2 },
          { label: "Existe e é seguido pela equipe", score: 3 },
        ],
      },
      {
        text: "Você acompanha indicadores como tempo de preparo, entrega e erros operacionais?",
        options: [
          { label: "Não acompanho", score: 0 },
          { label: "Olho ocasionalmente", score: 1 },
          { label: "Acompanho alguns", score: 2 },
          { label: "Monitoro todos regularmente", score: 3 },
        ],
      },
    ],
  },
  {
    key: "equipe",
    label: "Gestão de Equipe",
    subtitle: "Seu negócio depende da equipe ou apenas de você?",
    questions: [
      {
        text: "Sua equipe trabalha seguindo padrões claros e treinamentos definidos?",
        options: [
          { label: "Não", score: 0 },
          { label: "Parcialmente", score: 1 },
          { label: "Na maior parte", score: 2 },
          { label: "Sim, totalmente", score: 3 },
        ],
      },
      {
        text: "Como o desempenho da equipe é acompanhado hoje?",
        options: [
          { label: "Não acompanho", score: 0 },
          { label: "Apenas pela percepção", score: 1 },
          { label: "Com alguns indicadores", score: 2 },
          { label: "Com indicadores e avaliações frequentes", score: 3 },
        ],
      },
      {
        text: "Se você ficasse 15 dias completamente afastado da operação, o restaurante continuaria funcionando normalmente?",
        options: [
          { label: "Não funcionaria", score: 0 },
          { label: "Funcionaria com muitos problemas", score: 1 },
          { label: "Funcionaria parcialmente", score: 2 },
          { label: "Funcionaria normalmente", score: 3 },
        ],
      },
      {
        text: "Hoje a operação depende diretamente de você para tomar decisões importantes?",
        options: [
          { label: "Totalmente", score: 0 },
          { label: "Na maior parte", score: 1 },
          { label: "Em poucas situações", score: 2 },
          { label: "Praticamente não depende", score: 3 },
        ],
      },
      {
        text: "Se você decidisse implementar uma mudança importante amanhã, sua equipe conseguiria executar rapidamente?",
        options: [
          { label: "Não conseguiria", score: 0 },
          { label: "Com muita dificuldade", score: 1 },
          { label: "Com algum suporte", score: 2 },
          { label: "Sim, imediatamente", score: 3 },
        ],
      },
    ],
  },
  {
    key: "marketing",
    label: "Marketing",
    subtitle: "Seu marketing gera pedidos ou apenas movimenta as redes sociais?",
    questions: [
      {
        text: "Você sabe exatamente quanto custa adquirir um novo cliente hoje?",
        options: [
          { label: "Não sei", score: 0 },
          { label: "Tenho uma estimativa", score: 1 },
          { label: "Acompanho parcialmente", score: 2 },
          { label: "Conheço esse indicador", score: 3 },
        ],
      },
      {
        text: "Seu restaurante possui uma estratégia previsível para gerar novos pedidos todos os meses?",
        options: [
          { label: "Não possui", score: 0 },
          { label: "Depende de promoções", score: 1 },
          { label: "Existe parcialmente", score: 2 },
          { label: "Sim, é previsível", score: 3 },
        ],
      },
      {
        text: "Você consegue medir quanto dinheiro cada ação de marketing realmente gera para o restaurante?",
        options: [
          { label: "Não consigo", score: 0 },
          { label: "Tenho uma ideia", score: 1 },
          { label: "Consigo medir parte", score: 2 },
          { label: "Sim, acompanho ROI regularmente", score: 3 },
        ],
      },
    ],
  },
];

/* =========================================================
   FATURAMENTO → PRODUTO RECOMENDADO

   OBS: a régua abaixo foi reorganizada em relação à versão
   anterior (que colocava a "Reunião de Diagnóstico" no meio
   da escada, entre o Curso e a Delivery Class, quebrando a
   progressão). Assumi uma progressão lógica de ticket/oferta:

   até 50k  → Curso (autoaplicável, ponto de entrada)
   até 200k → Delivery Class (aprofunda estratégia e execução)
   até 300k → Reunião de Diagnóstico (ponte para consultoria)
   500k+    → Consultoria personalizada (alto ticket, dedicada)

   Se a régua comercial de vocês for outra, é só ajustar o
   campo `solutionKey` de cada faixa abaixo.
   ========================================================= */
export const REVENUE_OPTIONS: RevenueOption[] = [
  { label: "Faturo até R$ 20 mil por mês", solutionKey: "curso" },
  { label: "Faturo até R$ 50 mil por mês", solutionKey: "curso" },
  { label: "Faturo até R$ 100 mil por mês", solutionKey: "deliveryclass" },
  { label: "Faturo até R$ 200 mil por mês", solutionKey: "deliveryclass" },
  { label: "Faturo até R$ 300 mil por mês", solutionKey: "diagnostico" },
  { label: "Faturo até R$ 500 mil por mês", solutionKey: "consultoria" },
  { label: "Faturo mais de R$ 500 mil por mês", solutionKey: "consultoria" },
];

export const SOLUTIONS: Record<SolutionKey, Solution> = {
  curso: {
    title: "Curso Método LCD",
    text: "No faturamento em que você está agora, o maior salto não vem de gastar mais em anúncio ou testar mais um app — vem de arrumar a base: precificação, cardápio, ficha técnica e processos. É exatamente isso que o Curso Método LCD entrega, passo a passo, no seu ritmo, sem o custo de uma consultoria personalizada. É o caminho mais rápido para parar de operar no escuro e começar a tomar decisão com segurança, no seu tempo e sem depender de agenda de terceiros.",
  },
  deliveryclass: {
    title: "Delivery Class",
    text: "Você já saiu do básico — sua operação tem volume e já sente na pele onde estão as travas. Nesse estágio, o ganho está em refinar o que já funciona e corrigir os pontos que seguram o próximo degrau de faturamento. A Delivery Class aprofunda estratégia e execução em grupo, com direcionamento próximo, para quem quer escalar com consistência em vez de continuar testando no improviso.",
  },
  diagnostico: {
    title: "Reunião de Diagnóstico Online",
    text: "Com o volume que você já movimenta, cada ponto percentual de margem representa um valor real em dinheiro todo mês. Por isso, o passo mais eficiente agora não é mais um curso — é uma conversa direta com um especialista, que vai olhar seus números e apontar com precisão onde estão os maiores vazamentos de lucro da sua operação hoje, e o que fazer primeiro.",
  },
  consultoria: {
    title: "Consultoria Personalizada",
    text: "No seu faturamento, mudanças pequenas movem valores grandes — e também o risco de deixar um problema sem solução por mais tempo. Por isso, o caminho mais eficiente é uma consultoria dedicada, mão na massa, direto na área que está custando mais caro para o seu negócio agora, com acompanhamento próximo até o resultado aparecer no caixa.",
  },
};

/* =========================================================
   INSIGHTS POR ÁREA
   Cada área tem uma "consequência" (o que a falta de maturidade
   custa, na prática) e um "diagnóstico" mais longo, explicando
   a implicação de não resolver e tangibilizando o ganho de
   resolver — do alívio imediato até a mudança de longo prazo.
   ========================================================= */
export const AREA_INSIGHTS: Record<AreaKey, AreaInsight> = {
  lucratividade: {
    label: "Lucratividade",
    consequence:
      "Sem clareza de margem, cada aumento de venda pode estar, na prática, aumentando seu prejuízo — e você só descobre isso quando o mês já fechou e o dinheiro não sobrou.",
    diagnosis:
      "Quando esse ponto é resolvido, a primeira mudança é simples: parar de precificar no chute. Você passa a saber, prato por prato, quanto realmente sobra depois de todos os custos, e isso tira o peso de mexer em preço com medo de perder cliente. Em poucas semanas esse controle vira rotina — você ajusta cardápio, combos e promoções olhando para números, não para intuição, e vê a margem responder a cada decisão. No médio prazo, isso muda o tipo de dono de negócio que você é: você deixa de torcer para o mês fechar bem e passa a construir lucro por escolha, de forma repetível, mês após mês.",
  },
  controladoria: {
    label: "Controladoria",
    consequence:
      "Sem controle de CMV, ficha técnica e estoque, parte do seu lucro está sendo consumida silenciosamente na cozinha todos os dias — e nenhum número te avisa disso a tempo.",
    diagnosis:
      "Resolver esse ponto começa com algo bem concreto: saber o custo real de cada prato e enxergar rápido quando algo sai da ficha técnica, do estoque ou do fornecedor combinado. Isso muda a sensação no dia a dia — em vez de descobrir o resultado só no fechamento do mês, você acompanha e corrige no momento em que o desperdício acontece. Com o tempo, sua cozinha passa a proteger o lucro na origem, e isso faz qualquer crescimento futuro — mais pedidos, mais cardápio, mais unidades — ser mais seguro e mais rentável, porque a base já está sob controle.",
  },
  financeiro: {
    label: "Financeiro",
    consequence:
      "Sem DRE, fluxo de caixa e ponto de equilíbrio claros, você pode estar a poucos meses de uma crise financeira sem nenhum aviso prévio — o primeiro sinal costuma ser a conta que não fecha.",
    diagnosis:
      "Resolver esse ponto dá a você números confiáveis para decidir quando investir, quando cortar custo e quando esperar — em vez de decidir no sentimento. Isso reduz a ansiedade de fim de mês, porque você já sabe o que vai encontrar no extrato antes mesmo de abrir o aplicativo do banco. Com o hábito sustentado, você deixa de tocar o negócio no susto, de mês em mês, e passa a conduzi-lo com visão de longo prazo — sabendo com antecedência quando vem aperto e quando dá para investir em crescimento.",
  },
  processos: {
    label: "Processos",
    consequence:
      "Sem processos padronizados, cada pico de demanda é um risco real de erro, atraso e cliente perdido para o concorrente que está a um clique de distância no app.",
    diagnosis:
      "Quando esse ponto é resolvido, os pedidos passam a sair mais rápido e com menos erro, mesmo nos dias de maior movimento — porque existe um jeito certo de fazer, e a equipe segue esse jeito sem precisar te perguntar a cada situação. Isso tira uma boa parte do estresse operacional do seu dia a dia. Sustentado por alguns meses, esse padrão constrói algo mais valioso que a rapidez: consistência — o cliente sabe o que vai receber toda vez que pede, e isso é o que traz ele de volta sem depender de cupom ou desconto.",
  },
  equipe: {
    label: "Gestão de Equipe",
    consequence:
      "Enquanto o negócio depender só de você para funcionar bem, ele tem um teto de crescimento — e um risco enorme se você precisar se ausentar por doença, viagem ou imprevisto.",
    diagnosis:
      "Resolver esse ponto começa com uma equipe treinada e avaliada, capaz de manter o padrão sem você precisar estar em cima o tempo todo. No curto prazo, isso já devolve algumas horas do seu dia. Com o tempo, essa autonomia cresce até o ponto de você conseguir tirar um fim de semana — ou até férias — sem o negócio parar ou piorar. É a diferença entre ser o motor único da operação e ser dono de um negócio que roda mesmo quando você não está lá, o que muda completamente sua qualidade de vida e o valor do seu negócio no longo prazo.",
  },
  marketing: {
    label: "Marketing",
    consequence:
      "Sem estratégia ativa e sem medir retorno, você pode estar gastando dinheiro e energia em marketing todo mês sem nenhuma certeza de que isso está de fato trazendo pedido.",
    diagnosis:
      "Resolver esse ponto significa atrair e recuperar clientes de forma previsível, com dados mostrando exatamente o que funciona e o que não funciona — em vez de repetir a mesma promoção torcendo para dar certo. Isso traz tranquilidade: cada real investido em divulgação passa a ter propósito e retorno mensurável. No médio e longo prazo, seu negócio para de depender de sorte, de cupom ou de algoritmo de rede social para vender, e passa a crescer apoiado em uma marca forte, reconhecida e lembrada na hora da fome — que é o ativo mais valioso de qualquer delivery.",
  },
};

/* =========================================================
   OPÇÕES DE CARGO/FUNÇÃO NO FORMULÁRIO DE LEAD
   ========================================================= */
export const ROLE_OPTIONS: RoleOption[] = [
  "Proprietário",
  "Sócio",
  "Gerente",
  "Gestor de Lojas iFood ou 99",
  "Gestor de tráfego",
  "Outro",
];

export const FORM_NAME = "forms-diagnostico-quiz";
