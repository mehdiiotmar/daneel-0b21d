import React from "react";

export const Welcome: React.FC = () => (
  <div className="bg-gradient-to-r from-white to-yellow-50 border border-yellow-100 rounded-2xl p-6 shadow-md w-full max-w-3xl mx-auto">
    <h1 className="text-3xl font-semibold text-red-700 mb-3">
      🍽️ Bienvenue chez Tarik Chami
    </h1>
    <p className="text-gray-800 text-base leading-relaxed">
      🧕 Bienvenue dans l'assistant digital de notre restaurant syrien à Tanger !<br />
      Ici, vous pouvez consulter notre menu, découvrir les spécialités du chef, et passer votre commande en toute simplicité.<br />
      ❤️ Chaque plat est préparé avec amour et les meilleures saveurs du Levant.<br />
      🇸🇾 "الطعام السوري... نكهة الأصالة والحب!"<br />
      <br />
      Explorez notre carte, choisissez vos délices préférés, et vivez une expérience culinaire unique.
    </p>

    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      <a
        href="#menu"
        className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition text-center"
      >
        📖 Voir le Menu
      </a>
      <a
        href="https://maps.app.goo.gl/tarikchami"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition text-center"
      >
        📍 Nous trouver à Tanger
      </a>
      <a
        href="tel:+212600000000"
        className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition text-center"
      >
        📞 Réserver une table
      </a>
    </div>
  </div>
);
