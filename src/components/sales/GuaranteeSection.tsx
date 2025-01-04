import { ShieldCheck } from "lucide-react";

export const GuaranteeSection = () => {
  return (
    <div className="text-center mb-24">
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-3xl p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          Garantia de 7 Dias
        </h3>
        <p className="text-gray-300 text-lg mb-4">
          Experimente nossa plataforma com total segurança. Se não ficar satisfeito com os resultados,
          devolvemos 100% do seu investimento em até 7 dias.
        </p>
        <p className="text-purple-400">
          Sem perguntas, sem burocracia. Sua satisfação é nossa prioridade.
        </p>
      </div>
    </div>
  );
};