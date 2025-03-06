import React, { useState, useEffect } from "react";

const LoadingSpinner = () => {
  const [loadingText, setLoadingText] = useState("Envoi du texte...");

  useEffect(() => {
    const messages = [
      "Envoi du texte...",
      "Analyse du texte...",
      "Changement des données...",
      "Préparation de la réponse...",
    ];

    let currentMessageIndex = 0;

    // Fonction pour changer le message à chaque intervalle
    const interval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      setLoadingText(messages[currentMessageIndex]);
    }, 8000); // Change le message toutes les 2 secondes

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <span className="text-sm tracking-normal">{loadingText}</span>{" "}
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
