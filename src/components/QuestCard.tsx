
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QuestCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  onClick: () => void;
  disabled?: boolean;
}

const QuestCard = ({ title, description, icon, gradient, onClick, disabled }: QuestCardProps) => {
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        disabled ? 'opacity-50' : 'cursor-pointer'
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className={`absolute inset-0 ${gradient} opacity-90`} />
      <CardContent className="relative z-10 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl animate-bounce-gentle">{icon}</div>
          {disabled && (
            <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
              Bald verfügbar
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2 text-shadow">{title}</h3>
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
        <Button 
          variant="secondary" 
          className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
          disabled={disabled}
        >
          {disabled ? 'Coming Soon' : 'Starten'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestCard;
