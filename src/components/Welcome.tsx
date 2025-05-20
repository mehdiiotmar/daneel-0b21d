import React from "react";

export const Welcome: React.FC = () => (
  <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md w-full max-w-3xl mx-auto">
    <h1 className="text-3xl font-semibold text-emerald-600 mb-3">
      👋 Bienvenue chez MADOMOTIQUE
    </h1>
    <p className="text-gray-700 text-base">
      Je suis votre assistant intelligent dédié à la <strong>domotique</strong>.
      Posez-moi toutes vos questions sur l’automatisation de votre maison et les
      produits connectés. Ensemble, rendons votre maison plus intelligente !
    </p>

    <div className="mt-4">
      <a
        href="https://www.mksmart.ma/shop"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
      >
        🛒 Voir les produits domotiques
      </a>
    </div>
  </div>
);
