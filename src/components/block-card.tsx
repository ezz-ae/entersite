import { GripVertical, Trash2, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface BlockCardProps {
  blockType: string;
  children: React.ReactNode;
}

export function BlockCard({ blockType, children }: BlockCardProps) {
  return (
    <div className="relative group">
      <Card className="overflow-visible">
        <CardContent className="p-0">
          {children}
        </CardContent>
      </Card>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="secondary" size="icon" className="h-8 w-8 cursor-grab">
          <GripVertical />
          <span className="sr-only">Move block</span>
        </Button>
        <Button variant="secondary" size="icon" className="h-8 w-8">
          <Settings />
          <span className="sr-only">Block settings</span>
        </Button>
        <Button variant="destructive" size="icon" className="h-8 w-8">
          <Trash2 />
          <span className="sr-only">Delete block</span>
        </Button>
      </div>
       <div className="absolute -top-3 left-4 z-10">
          <span className="px-2 py-1 text-xs font-semibold uppercase rounded-full bg-primary text-primary-foreground">
            {blockType.replace('-', ' ')}
          </span>
       </div>
    </div>
  );
}
