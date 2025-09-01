import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import CartModal from "@/components/cart-modal";
import CheckoutModal from "@/components/checkout-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Package, Clock, CreditCard } from "lucide-react";
import { Product, CartItem, CartItemWithProduct, Order, User } from "@shared/schema";

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [user, authLoading, toast]);

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    retry: false,
  });

  // Fetch cart items
  const { data: cartItems = [], isLoading: cartLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    retry: false,
    enabled: !!user,
  });

  // Fetch user orders
  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    retry: false,
    enabled: !!user,
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await apiRequest("POST", "/api/cart", { productId, quantity: 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to Cart",
        description: "Product has been added to your cart.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await apiRequest("DELETE", `/api/cart/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Removed from Cart",
        description: "Product has been removed from your cart.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to remove product from cart.",
        variant: "destructive",
      });
    },
  });

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    return total + parseFloat(item.product.price) * (item.quantity || 0);
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        user={user} 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <section className="mb-12" data-testid="welcome-section">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" data-testid="text-welcome-title">
              Welcome back, {user.firstName || user.email}!
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-welcome-description">
              Manage your RDP/VPS services and explore new offerings
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card data-testid="card-cart-items">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Items in Cart</p>
                    <p className="text-2xl font-bold" data-testid="text-cart-count">{cartCount}</p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-total-orders">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold" data-testid="text-orders-count">{orders.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-cart-total">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cart Total</p>
                    <p className="text-2xl font-bold text-primary" data-testid="text-cart-total">${cartTotal.toFixed(2)}</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Available Products */}
        <section className="mb-12" data-testid="products-section">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" data-testid="text-products-title">Available Services</h2>
            {cartCount > 0 && (
              <Button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2"
                data-testid="button-view-cart"
              >
                <ShoppingCart className="w-4 h-4" />
                View Cart ({cartCount})
              </Button>
            )}
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} data-testid={`skeleton-product-${i}`}>
                  <CardContent className="p-6">
                    <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCartMutation.mutate(product.id)}
                  isLoading={addToCartMutation.isPending}
                  isInCart={cartItems.some(item => item.productId === product.id)}
                />
              ))}
            </div>
          )}

          {products.length === 0 && !productsLoading && (
            <Card className="p-12 text-center" data-testid="card-no-products">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="text-no-products-title">No Products Available</h3>
              <p className="text-muted-foreground" data-testid="text-no-products-description">
                Products will be available soon. Check back later!
              </p>
            </Card>
          )}
        </section>

        {/* Recent Orders */}
        <section data-testid="orders-section">
          <h2 className="text-3xl font-bold mb-8" data-testid="text-orders-title">Recent Orders</h2>

          {ordersLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} data-testid={`skeleton-order-${i}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <div className="text-right space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <Card key={order.id} data-testid={`card-order-${order.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold" data-testid={`text-order-id-${order.id}`}>#{order.id.slice(-8)}</p>
                        <p className="text-sm text-muted-foreground" data-testid={`text-order-date-${order.id}`}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-sm text-muted-foreground" data-testid={`text-order-method-${order.id}`}>
                          {order.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={order.status === 'completed' ? 'default' : order.status === 'pending' ? 'secondary' : 'destructive'}
                          data-testid={`badge-order-status-${order.id}`}
                        >
                          {order.status}
                        </Badge>
                        <p className="text-lg font-bold text-primary mt-2" data-testid={`text-order-total-${order.id}`}>
                          ${order.total}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center" data-testid="card-no-orders">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="text-no-orders-title">No Orders Yet</h3>
              <p className="text-muted-foreground mb-4" data-testid="text-no-orders-description">
                Start by adding some products to your cart!
              </p>
              <Button 
                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-browse-products"
              >
                Browse Products
              </Button>
            </Card>
          )}
        </section>
      </main>

      {/* Modals */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(productId) => removeFromCartMutation.mutate(productId)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        total={cartTotal}
        isLoading={cartLoading || removeFromCartMutation.isPending}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={cartTotal}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
          queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
        }}
      />
    </div>
  );
}
