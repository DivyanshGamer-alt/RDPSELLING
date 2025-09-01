import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Server, Check, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  specifications: any;
  features: string[];
  isActive: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  isLoading?: boolean;
  isInCart?: boolean;
}

export default function ProductCard({ product, onAddToCart, isLoading, isInCart }: ProductCardProps) {
  const isRDP = product.category === 'rdp';
  const isPremium = product.name.toLowerCase().includes('premium');

  const getIcon = () => {
    if (isPremium) {
      return <Star className="w-8 h-8 text-yellow-500" />;
    }
    return <Server className={`w-8 h-8 ${isRDP ? 'text-primary' : 'text-accent'}`} />;
  };

  const getIconBg = () => {
    if (isPremium) {
      return 'bg-gradient-to-br from-primary/20 to-accent/20';
    }
    return isRDP ? 'bg-primary/20' : 'bg-accent/20';
  };

  return (
    <Card className="transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${getIconBg()} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {getIcon()}
          </div>
          <h3 className="text-xl font-bold mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
          <Badge 
            className="mt-2" 
            variant={isRDP ? "default" : "secondary"}
            data-testid={`badge-product-category-${product.id}`}
          >
            {product.category.toUpperCase()}
          </Badge>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <div className="mb-6" data-testid={`specs-${product.id}`}>
            <h4 className="font-semibold mb-3 text-sm">Specifications:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div key={index} className="flex justify-between" data-testid={`spec-${product.id}-${key}`}>
                  <span className="text-muted-foreground capitalize">{key}:</span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-3 mb-6" data-testid={`features-${product.id}`}>
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm" data-testid={`feature-${product.id}-${index}`}>
              <Check className={`w-4 h-4 mr-3 flex-shrink-0 ${isRDP ? 'text-primary' : 'text-accent'}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Separator className="my-6" />

        <div className="flex items-center justify-between mb-4">
          <span 
            className={`text-2xl font-bold ${isPremium ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' : isRDP ? 'text-primary' : 'text-accent'}`}
            data-testid={`text-product-price-${product.id}`}
          >
            ${product.price}/month
          </span>
          <span className="text-sm text-muted-foreground">Monthly</span>
        </div>

        <Button 
          className={`w-full ${isPremium ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' : ''}`}
          variant={isPremium ? "default" : isRDP ? "default" : "outline"}
          onClick={onAddToCart}
          disabled={isLoading || isInCart}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          {isLoading ? "Adding..." : isInCart ? "In Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
