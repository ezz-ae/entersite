'use client';

import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    text?: string;
}

export const LoadingSpinner = ({ size = 48, text }: LoadingSpinnerProps) => (
    <div className="flex flex-col items-center justify-center gap-4">
        <Loader className="animate-spin text-blue-500" size={size} />
        {text && <p className="text-lg font-medium text-zinc-300">{text}</p>}
    </div>
);