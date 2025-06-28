import React from "react";

export const Welcome: React.FC = () => (
  <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md w-full max-w-3xl mx-auto">
    <h1 className="text-3xl font-semibold text-emerald-600 mb-3">
      👋 Bienvenue chez KAIZEN OFFICE SHIFT D 
    </h1>
    <p className="text-gray-700 text-base">
      👋 Welcome to the APM Kaizen Assistant!
      This tool helps you turn your improvement ideas into a clear and professional One-Pager — identifying the goal, root causes, key improvements, and impacted KPIs.
      Let’s build a safer, smoother, and smarter terminal together.
      💬 "كل فكرة لها قيمة. صوتك يساعدنا في بناء محطة أكثر أمانًا وسلاسة وذكاءً – معًا.
    </p>

    <div className="mt-4">
      <a
        href="https://madomotique.ma/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
      >
        🛒 Voir les produits domotiques
      </a>
    </div>
  </div>
);
