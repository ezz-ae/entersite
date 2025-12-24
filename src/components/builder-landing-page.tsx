'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft, Building, User, Mic, Bot, LayoutTemplate } from 'lucide-react';
import { BlueprintEditorDialog } from '@/components/blueprint-editor-dialog';

// --- Configuration Data ---
const projectCategories = {
  agent: {
    key: 'agent',
    title: "Individual or Team",
    icon: User,
    blueprints: [
      {
        title: "Top-Performing Agent Portfolio",
        description: "A personal portfolio website for a top-performing real estate agent specializing in luxury properties. The site should be elegant, professional, and showcase a portfolio of sold listings, client testimonials, and market insights.",
      },
      {
        title: "Real Estate Team Hub",
        description: "A website for a growing real estate team. It needs to feature agent profiles, team-specific listings, a shared blog, and lead capture forms that can be routed to different team members.",
      },
    ]
  },
  development: {
    key: 'development',
    title: "Property Development",
    icon: Building,
    blueprints: [
      {
        title: "Luxury High-Rise Condominium",
        description: "A marketing site for a new 50-story luxury condominium tower in a bustling downtown area. The site must convey exclusivity and feature state-of-the-art amenities, floor plans, a gallery, and panoramic city views.",
      },
      {
        title: "Suburban Community Masterplan",
        description: "A comprehensive site for a master-planned community of single-family homes. It should feel warm and family-friendly, highlighting parks, schools, community centers, and available home models.",
      },
    ]
  },
  campaign: {
    key: 'campaign',
    title: "Promotional Campaign",
    icon: Mic,
    blueprints: [
      {
        title: "Open House Event",
        description: "A single-page landing site for an upcoming open house event. It needs an image gallery of the property, a map, date/time details, and an RSVP form to collect attendee information.",
      },
      {
        title: "Exclusive First-Access List",
        description: "A squeeze page designed to capture leads for a future development. The page will have a single call-to-action: sign up to get on the exclusive first-access list for information and early-bird pricing.",
      },
    ]
  },
};

// --- Prop Interfaces ---
interface BuilderLandingPageProps {
  onStartWithAI: (initialPrompt: string) => void;
  onChooseTemplate: () => void;
}

// --- Main Component ---
export function BuilderLandingPage({ onStartWithAI, onChooseTemplate }: BuilderLandingPageProps) {
  const [step, setStep] = useState('category'); // 'category' or 'options'
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setStep('options');
  };

  const handleBack = () => {
    setStep('category');
    setSelectedCategory(null);
  };

  if (step === 'category') {
    return <CategorySelectionScreen onSelect={handleCategorySelect} />;
  }

  if (step === 'options' && selectedCategory) {
    return (
      <OptionSelectionScreen 
        category={selectedCategory} 
        onBack={handleBack}
        onStartWithAI={onStartWithAI}
        onChooseTemplate={onChooseTemplate}
      />
    );
  }
  
  return null; // Should not happen
}

// --- Child Components ---

function CategorySelectionScreen({ onSelect }: { onSelect: (cat: any) => void; }) {
  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">What are you building today?</h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto">First, select a project type. This will help us tailor the next steps for you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {Object.values(projectCategories).map(cat => (
          <button key={cat.key} onClick={() => onSelect(cat)} className="text-left">
            <Card className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800/80 hover:border-blue-500 transition-all duration-300 flex flex-col p-8 h-full">
              <cat.icon className="h-10 w-10 mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold mb-2 text-white">{cat.title}</h3>
              <p className="text-zinc-400 flex-grow">Blueprints for agents, teams, and brokerages.</p>
              <div className="text-blue-400 font-semibold flex items-center mt-6">Select <ArrowRight className="ml-2 h-4 w-4" /></div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

function OptionSelectionScreen({ category, onBack, onStartWithAI, onChooseTemplate }: any) {
  const [description, setDescription] = useState("");
  
  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
       <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Button onClick={onBack} variant="outline" size="icon" className="bg-transparent hover:bg-zinc-800 border-zinc-700">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <category.icon className="h-8 w-8 text-blue-400"/>
          <h1 className="text-4xl font-bold tracking-tight">{category.title}</h1>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Blueprints & Custom AI */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold flex items-center gap-3 text-zinc-300"><Bot className="h-6 w-6 text-zinc-400"/>Option 1: Generate with AI</h2>
            
            {/* Blueprints */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Start from a Blueprint:</h3>
              <div className="space-y-3">
                {category.blueprints.map((bp: any) => (
                   <button 
                    key={bp.title} 
                    onClick={() => onStartWithAI(bp.description)} 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-left hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-200">
                    <p className="font-semibold text-white">{bp.title}</p>
                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{bp.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Description */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Or write your own description:</h3>
               <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`e.g., A modern website for a real estate agency in Miami specializing in waterfront properties...`}
                className="min-h-[120px] bg-zinc-900 border-zinc-700 text-base focus-visible:ring-blue-500"
                rows={5}
              />
              <Button onClick={() => onStartWithAI(description)} disabled={!description} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                  Generate Site <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Templates */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold flex items-center gap-3 text-zinc-300"><LayoutTemplate className="h-6 w-6 text-zinc-400"/>Option 2: Use a Template</h2>
            <Card className="bg-green-500/10 border-green-500/30 hover:border-green-500 transition-all duration-300 flex flex-col p-8 text-center items-center justify-center h-full">
              <h3 className="text-2xl font-bold mb-2 text-white">Start with a Visual</h3>
              <p className="text-green-200/80 mb-6 flex-grow">Browse our library of professionally designed, market-tested templates. You can filter by '{category.title}' or view all.</p>
              <Button onClick={onChooseTemplate} variant="default" className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg mt-auto">
                Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
