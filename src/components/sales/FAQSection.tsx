import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "Como a IA pode realmente me ajudar a criar conteúdo?",
      answer: "Nossa IA é treinada para entender seu nicho e público-alvo, gerando conteúdo personalizado e persuasivo. Ela analisa dados de mercado e tendências para criar textos, roteiros e materiais que realmente conectam com sua audiência."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "A maioria dos nossos clientes começa a ver resultados nas primeiras semanas de uso. A IA ajuda a acelerar significativamente o processo de criação e otimização de conteúdo, permitindo que você lance suas ofertas mais rapidamente."
    },
    {
      question: "O conteúdo gerado pela IA é original e único?",
      answer: "Sim! Nossa IA gera conteúdo 100% único e personalizado para seu negócio. Cada texto, página de vendas ou VSL é criado considerando seu método, propósito e diferencial competitivo."
    },
    {
      question: "Preciso ter experiência com tecnologia?",
      answer: "Não! Nossa plataforma foi desenvolvida pensando em empreendedores de todos os níveis. A interface é intuitiva e oferecemos suporte completo para ajudá-lo em cada etapa."
    },
    {
      question: "E se eu já tiver um método ou curso pronto?",
      answer: "Perfeito! Nossa IA pode ajudar a otimizar e escalar seu material existente, identificando oportunidades de melhoria e criando variações para diferentes públicos e canais."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto mb-24">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-12 text-center">
        Perguntas Frequentes
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-2xl px-6"
          >
            <AccordionTrigger className="text-white hover:text-purple-400 text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};