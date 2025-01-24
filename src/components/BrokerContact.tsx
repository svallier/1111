import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Building2, Phone, Mail, ArrowLeft, Check } from 'lucide-react';
import { Property } from '../types';

interface LocationState {
  properties: Property[];
  totalInvestment: number;
  totalMonthlyPayment: number;
  totalAnnualCashflow: number;
  globalYield: number;
}

export function BrokerContact() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Ici on pourrait ajouter l'envoi réel du formulaire
  };

  if (!state?.properties) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Aucun portefeuille sélectionné</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la recherche
          </button>
        </div>
      </div>
    );
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h2>
          <p className="text-gray-600 mb-6">
            Un courtier de Meilleur Taux vous contactera très prochainement pour étudier votre projet d'investissement.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la recherche
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la recherche
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informations courtier */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold">Meilleur Taux</h1>
            </div>

            <div className="prose">
              <p className="text-gray-600">
                Meilleur Taux est le leader du courtage en France avec plus de 15 ans d'expérience.
                Nos experts vous accompagnent dans votre projet d'investissement immobilier :
              </p>
              
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Recherche du meilleur taux</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Négociation avec les banques</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Montage du dossier</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Suivi personnalisé</span>
                </li>
              </ul>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>contact@meilleurtaux.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Votre projet d'investissement</h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Résumé du portefeuille</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre de biens :</span>
                  <span className="font-medium">{state.properties.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investissement total :</span>
                  <span className="font-medium">{state.totalInvestment.toLocaleString()}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mensualité estimée :</span>
                  <span className="font-medium">{state.totalMonthlyPayment.toLocaleString()}€/mois</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rendement global :</span>
                  <span className="font-medium text-blue-600">{state.globalYield}%</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Jean Dupont"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="jean.dupont@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="06 12 34 56 78"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  placeholder="Précisez vos attentes..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Envoyer ma demande
              </button>

              <p className="text-xs text-gray-500 mt-4">
                En soumettant ce formulaire, vous acceptez d'être recontacté par un courtier de Meilleur Taux.
                Vos données personnelles seront traitées conformément à notre politique de confidentialité.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}