import React, { useRef, useEffect } from 'react';
import { HelpCircle, Award, TrendingUp, Home, Users, Calculator, ChevronRight } from 'lucide-react';

export function InvestmentGuide() {
  const [isOpen, setIsOpen] = React.useState(false);
  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guideRef.current && !guideRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const ScoreExample = ({ score, color, description }: { score: string, color: string, description: string }) => (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white font-bold`}>
        {score}
      </div>
      <span className="text-gray-600">{description}</span>
    </div>
  );

  return (
    <div className="relative" ref={guideRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50"
      >
        <HelpCircle className="w-4 h-4" />
        <span>Guide des calculs</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Guide de l'investisseur</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Fermer</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Colonne de gauche */}
              <div className="space-y-6">
                {/* Système de scoring */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Système de scoring</h4>
                  </div>
                  <div className="space-y-3">
                    <ScoreExample score="A" color="bg-green-500" description="Excellent investissement (≥ 8% net)" />
                    <ScoreExample score="B" color="bg-blue-500" description="Bon investissement (≥ 6% net)" />
                    <ScoreExample score="C" color="bg-orange-500" description="Investissement moyen (≥ 4% net)" />
                    <ScoreExample score="D" color="bg-red-500" description="Investissement risqué (&lt; 4% net)" />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Le score est calculé en combinant :</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Rendement net (60%)</li>
                      <li>Tension locative (40%)</li>
                    </ul>
                  </div>
                </div>

                {/* Indicateurs de marché */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Indicateurs de marché</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tension locative</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">A ≥ 95%</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">D &lt; 85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Croissance démographique</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-green-600">+1.5%</span>
                        <span className="text-sm text-gray-500">par an</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne de droite */}
              <div className="space-y-6">
                {/* Calculs de rendement */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Calculs de rendement</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Rendement brut</span>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          (Loyer annuel / Prix) × 100
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Rapport entre les loyers et le prix d'achat, sans les charges
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Rendement net</span>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          ((Loyer - Charges) / Prix) × 100
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Rendement réel après déduction des charges et impôts
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Cashflow mensuel</span>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          Loyer - Charges - Mensualité
                        </code>
                      </div>
                      <p className="text-sm text-gray-600">
                        Revenu mensuel net après remboursement du prêt
                      </p>
                    </div>
                  </div>
                </div>

                {/* Critères d'évaluation */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Critères d'évaluation</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium">Tension locative</span>
                        <p className="text-sm text-gray-600">Demande locative dans le secteur</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium">Potentiel de plus-value</span>
                        <p className="text-sm text-gray-600">Évolution du prix au m² sur 5 ans</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}