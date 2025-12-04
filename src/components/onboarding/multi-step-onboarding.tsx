'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AgentChat } from '@/components/onboarding/agent-chat';
import { InitialPromptSelector } from '@/components/onboarding/initial-prompt-selector';

export function MultiStepOnboarding({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(1);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [siteConfig, setSiteConfig] = useState(null);

  const handlePromptSelected = (prompt: string) => {
    setInitialPrompt(prompt);
    setStep(2); // Move to Agent Chat step
  };

  const handleSiteConfigReady = (config: any) => {
    setSiteConfig(config);
    onComplete(config); // Pass the final config to the parent builder page
  };

  return (
    <div className="fixed inset-0 bg-background z-[100] flex items-center justify-center p-4">
      <motion.div 
        key={step}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full h-full max-w-6xl max-h-[90vh] bg-card border rounded-2xl shadow-2xl flex flex-col"
      >
        {step === 1 && (
          <InitialPromptSelector 
            onPromptSelect={handlePromptSelected} 
          />
        )}
        
        {step === 2 && (
          <AgentChat
            initialPrompt={initialPrompt}
            onSiteConfigReady={handleSiteConfigReady}
          />
        )}
      </motion.div>
    </div>
  );
}
