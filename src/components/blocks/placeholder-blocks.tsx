import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Smile } from "lucide-react";

const PlaceholderBlock = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
  <Card className="bg-muted/30 border-dashed">
    <CardHeader className="flex-row items-center gap-4">
      <Icon className="w-8 h-8 text-muted-foreground" />
      <CardTitle className="text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">This is a placeholder for the {title} block. The full component will be implemented soon.</p>
    </CardContent>
  </Card>
);

export const MapBlock = () => <PlaceholderBlock icon={MapPin} title="Map" />;
export const TestimonialBlock = () => <PlaceholderBlock icon={Smile} title="Testimonial" />;
