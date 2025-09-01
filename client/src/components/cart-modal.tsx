import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

import { CartItemWithProduct } from "@shared/schema";

type CartItem = CartItemWithProduct;

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemWithProduct[];
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  total: number;
  isLoading?: boolean;
}

export default function CartModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onCheckout, 
  total,
  isLoading 
}: CartModalProps) {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[80vh] flex flex-col" data-testid="dialog-cart">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" data-testid="text-cart-title">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2" data-testid="cart-items-container">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg" data-testid={`skeleton-cart-item-${i}`}>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                  data-testid={`cart-item-${item.productId}`}
                >
                  <div className="flex-1">
                    <h3 className="font-medium" data-testid={`text-cart-item-name-${item.productId}`}>
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-cart-item-description-${item.productId}`}>
                      Monthly Plan
                    </p>
                    <Badge 
                      variant={item.product.category === 'rdp' ? 'default' : 'secondary'} 
                      className="mt-1"
                      data-testid={`badge-cart-item-category-${item.productId}`}
                    >
                      {item.product.category.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1" data-testid={`text-cart-item-quantity-${item.productId}`}>
                      Qty: {item.quantity || 0}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-primary" data-testid={`text-cart-item-price-${item.productId}`}>
                      ${(parseFloat(item.product.price) * (item.quantity || 0)).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/80 mt-1"
                      onClick={() => onRemoveItem(item.productId)}
                      data-testid={`button-remove-cart-item-${item.productId}`}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12" data-testid="cart-empty-state">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="text-cart-empty-title">Your cart is empty</h3>
              <p className="text-muted-foreground text-center" data-testid="text-cart-empty-description">
                Add some products to get started!
              </p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold" data-testid="text-cart-total-label">Total:</span>
                <span className="text-xl font-bold text-primary" data-testid="text-cart-total-amount">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                  data-testid="button-cart-continue-shopping"
                >
                  Continue Shopping
                </Button>
                <Button 
                  onClick={onCheckout}
                  className="flex-1"
                  data-testid="button-cart-checkout"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Checkout
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground" data-testid="text-cart-setup-info">
                  <span className="text-accent font-medium">Free setup</span> • Instant activation
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
