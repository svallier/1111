import React, { useState } from 'react';
import { MessageSquare, Send, X, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState, Property } from '../types';

interface ProjectChatbotProps {
  onUpdateFilters: (filters: Partial<FilterState>) => void;
  onHighlightProperties: (properties: Property[]) => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
}

interface ProjectPreferences {
  budget?: number;
  city?: string;
  propertyType?: string[];
  minRooms?: number;
  minYield?: number;
  hasLoan?: boolean;
}

export function ProjectChatbot({ onUpdateFilters, onHighlightProperties }: ProjectChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: "Bonjour ! Je suis là pour vous aider à trouver le bien idéal pour votre investissement. Pouvez-vous me parler de votre projet ?"
  }]);
  const [input, setInput] = useState('');
  const [preferences, setPreferences] = useState<ProjectPreferences>({});

  const analyzeMessage = (message: string) => {
    const newPreferences = { ...preferences };
    
    // Analyse du budget
    const budgetMatch = message.match(/(\d+)\s*(?:k€|k|000|K)/);
    if (budgetMatch) {
      newPreferences.budget = parseInt(budgetMatch[1]) * 1000;
    }

    // Analyse de la ville
    const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Strasbourg', 'Lille', 'Montpellier', 'Rennes'];
    for (const city of cities) {
      if (message.toLowerCase().includes(city.toLowerCase())) {
        newPreferences.city = city;
        break;
      }
    }

    // Analyse du type de bien
    if (message.toLowerCase().includes('maison')) {
      newPreferences.propertyType = ['house'];
    } else if (message.toLowerCase().includes('appartement')) {
      newPreferences.propertyType = ['apartment'];
    } else if (message.toLowerCase().includes('immeuble')) {
      newPreferences.propertyType = ['building'];
    }

    // Analyse du nombre de pièces
    const roomsMatch = message.match(/(\d+)\s*pièces?/);
    if (roomsMatch) {
      newPreferences.minRooms = parseInt(roomsMatch[1]);
    }

    // Analyse du rendement
    const yieldMatch = message.match(/(\d+)%/);
    if (yieldMatch) {
      newPreferences.minYield = parseInt(yieldMatch[1]);
    }

    // Analyse du financement
    if (message.toLowerCase().includes('prêt') || message.toLowerCase().includes('crédit')) {
      newPreferences.hasLoan = true;
    }

    return newPreferences;
  };

  const generateResponse = (newPreferences: ProjectPreferences): string => {
    const missing = [];
    if (!newPreferences.budget) missing.push('votre budget');
    if (!newPreferences.city) missing.push('la ville souhaitée');
    if (!newPreferences.propertyType) missing.push('le type de bien recherché');
    
    if (missing.length > 0) {
      return `Pouvez-vous me préciser ${missing.join(', ')} ?`;
    }

    // Si nous avons toutes les informations principales
    let response = "D'après ce que je comprends, vous recherchez ";
    if (newPreferences.propertyType) {
      response += `un${newPreferences.propertyType[0] === 'apartment' ? ' ' : 'e '}${
        newPreferences.propertyType[0] === 'apartment' ? 'appartement' :
        newPreferences.propertyType[0] === 'house' ? 'maison' :
        'immeuble'
      } `;
    }
    if (newPreferences.city) {
      response += `à ${newPreferences.city} `;
    }
    if (newPreferences.budget) {
      response += `avec un budget de ${(newPreferences.budget / 1000).toFixed(0)}k€ `;
    }
    if (newPreferences.minRooms) {
      response += `d'au moins ${newPreferences.minRooms} pièces `;
    }
    if (newPreferences.minYield) {
      response += `avec un rendement minimum de ${newPreferences.minYield}% `;
    }

    response += "\n\nJe vais adapter les filtres pour vous montrer les biens correspondants. Souhaitez-vous affiner davantage votre recherche ?";

    // Mise à jour des filtres
    onUpdateFilters({
      city: newPreferences.city || '',
      minPrice: 0,
      maxPrice: newPreferences.budget || 0,
      propertyType: newPreferences.propertyType || [],
      minRooms: newPreferences.minRooms || 0,
      minGrossYield: newPreferences.minYield || 0
    });

    return response;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { id: Date.now().toString(), type: 'user' as const, content: input }
    ];

    const newPreferences = analyzeMessage(input);
    setPreferences(newPreferences);

    const botResponse = generateResponse(newPreferences);
    newMessages.push({
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse
    });

    setMessages(newMessages);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed left-4 ${isMinimized ? 'bottom-4' : 'bottom-4'} z-50 bg-white rounded-lg shadow-xl transition-all duration-200 ${
      isMinimized ? 'w-64' : 'w-96'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Assistant projet</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isMinimized ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="p-4 h-96 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Décrivez votre projet..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}