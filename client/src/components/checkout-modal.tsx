import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, Bitcoin, Lock, Info, CheckCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

import { CartItemWithProduct } from "@shared/schema";

type CartItem = CartItemWithProduct;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemWithProduct[];
  total: number;
  onSuccess: () => void;
}

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  total,
  onSuccess 
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: (response) => {
      setOrderResult(response);
      onSuccess();
      toast({
        title: "Order Successful!",
        description: "Your order has been processed successfully. Check your email for details.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "Session expired. Please login again.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(false);
    },
  });

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Prepare order data
    const orderData = {
      total: total.toFixed(2),
      paymentMethod,
      items: cartItems.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setOrderResult(null);
      onClose();
    }
  };

  // Show success screen if order was created
  if (orderResult) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md" data-testid="dialog-checkout-success">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center" data-testid="text-success-title">
              <CheckCircle className="w-6 h-6 text-primary mx-auto" />
              Order Successful!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2" data-testid="text-order-confirmation">
                Payment Processed Successfully
              </h3>
              <p className="text-muted-foreground" data-testid="text-order-id">
                Order ID: #{orderResult.id?.slice(-8)}
              </p>
            </div>

            <Card className="bg-secondary/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-bold text-primary" data-testid="text-paid-amount">
                      ${orderResult.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="capitalize" data-testid="text-payment-method">
                      {orderResult.paymentMethod}
                    </span>
                  </div>
                  {orderResult.paymentId && (
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="text-sm font-mono" data-testid="text-payment-id">
                        {orderResult.paymentId}
                      </span>
                    </div>
                  )}
                  {orderResult.cryptoAddress && (
                    <div className="flex justify-between">
                      <span>Crypto Address:</span>
                      <span className="text-sm font-mono" data-testid="text-crypto-address">
                        {orderResult.cryptoAddress?.slice(0, 20)}...
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-accent/10 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-accent mb-1">What's Next?</div>
                  <div className="text-muted-foreground space-y-1">
                    <p>• Your server will be provisioned within 60 seconds</p>
                    <p>• Check your email for login credentials</p>
                    <p>• Contact support via Telegram for assistance</p>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleClose}
              className="w-full"
              data-testid="button-close-success"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-checkout">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" data-testid="text-checkout-title">
            <CreditCard className="w-5 h-5" />
            Secure Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Payment Method Selection */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4" data-testid="text-payment-method-title">Payment Method</h3>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-3"
                data-testid="radio-group-payment-method"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="razorpay" id="razorpay" data-testid="radio-razorpay" />
                  <Label 
                    htmlFor="razorpay" 
                    className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 flex-1"
                  >
                    <CreditCard className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <div className="font-medium" data-testid="text-razorpay-title">Razorpay Gateway</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-razorpay-description">
                        Credit/Debit Card, UPI, NetBanking
                      </div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crypto" id="crypto" data-testid="radio-crypto" />
                  <Label 
                    htmlFor="crypto" 
                    className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 flex-1"
                  >
                    <Bitcoin className="w-5 h-5 text-accent mr-3" />
                    <div>
                      <div className="font-medium" data-testid="text-crypto-title">Cryptocurrency</div>
                      <div className="text-sm text-muted-foreground" data-testid="text-crypto-description">
                        Bitcoin, Ethereum, USDT
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Features */}
            <Card className="bg-secondary/50">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Secure Payment Features
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    SSL encrypted transactions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    PCI DSS compliant
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    Instant confirmation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                    24/7 fraud monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button 
              onClick={handleCheckout}
              disabled={isProcessing || cartItems.length === 0}
              className="w-full"
              data-testid="button-pay-now"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Pay ${total.toFixed(2)} Securely
                </>
              )}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4" data-testid="text-order-summary-title">Order Summary</h3>
              
              <Card className="bg-secondary/50">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start" data-testid={`order-item-${item.productId}`}>
                        <div className="flex-1">
                          <div className="font-medium" data-testid={`text-order-item-name-${item.productId}`}>
                            {item.product.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <Badge 
                              variant={item.product.category === 'rdp' ? 'default' : 'secondary'} 
                              className="mr-2"
                              data-testid={`badge-order-item-category-${item.productId}`}
                            >
                              {item.product.category.toUpperCase()}
                            </Badge>
                            Qty: {item.quantity || 0}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium" data-testid={`text-order-item-price-${item.productId}`}>
                            ${(parseFloat(item.product.price) * (item.quantity || 0)).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${item.product.price}/month
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span data-testid="text-subtotal">${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Setup Fee</span>
                        <span data-testid="text-setup-fee">Free</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Processing Fee</span>
                        <span data-testid="text-processing-fee">$0.00</span>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary" data-testid="text-final-total">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-accent/10 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-accent mb-1" data-testid="text-instant-setup-title">
                    Instant Setup Guarantee
                  </div>
                  <div className="text-muted-foreground" data-testid="text-instant-setup-description">
                    Your server will be ready within 60 seconds after payment confirmation. 
                    Login credentials will be sent to your email address.
                  </div>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 text-primary" data-testid="text-support-title">
                  Need Help?
                </h4>
                <p className="text-sm text-muted-foreground mb-3" data-testid="text-support-description">
                  🇸🇹🇦🇷 X OWNER ️ 👁️‍🗨️ - 24/7 Support Available
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-primary">fxpl.hi2@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-primary">+91 9142292490</span>
                  </div>
                  <a 
                    href="https://t.me/XSTARxOWNER" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    data-testid="link-support-telegram-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16l-1.571 7.401c-.117.553-.427.688-.866.428l-2.385-1.759-1.151 1.107c-.128.128-.235.235-.482.235l.173-2.451 4.458-4.027c.194-.171-.042-.269-.299-.097l-5.507 3.465-2.372-.741c-.515-.161-.527-.515.107-.762l9.274-3.576c.427-.159.806.097.654.773z"/>
                    </svg>
                    @XSTARxOWNER
                  </a>
                  <a 
                    href="https://wa.me/919142292490" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    data-testid="link-support-whatsapp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.03 1.506 5.709L0 24l6.565-1.726c1.617.892 3.443 1.402 5.452 1.402 6.621 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637.001 12.017.001zM12.017 21.861c-1.748 0-3.404-.474-4.825-1.299l-.348-.207-3.6.947.963-3.517-.228-.36c-.897-1.427-1.372-3.081-1.372-4.837 0-4.959 4.035-8.994 8.994-8.994s8.994 4.035 8.994 8.994c.016 4.959-4.019 8.994-8.994 8.994zm4.943-6.751c-.268-.134-1.593-.787-1.841-.877-.248-.089-.429-.134-.608.134-.179.268-.692.877-.848 1.056-.156.179-.312.201-.58.067-.268-.134-1.132-.418-2.157-1.33-.798-.712-1.336-1.592-1.492-1.86-.156-.268-.017-.413.118-.547.121-.121.268-.312.402-.469.134-.156.179-.268.268-.446.089-.179.045-.335-.022-.469-.067-.134-.608-1.464-.832-2.005-.218-.513-.441-.444-.608-.451-.156-.007-.335-.009-.513-.009-.179 0-.469.067-.715.335-.246.268-.938.918-.938 2.239 0 1.32.96 2.595 1.094 2.774.134.179 1.888 2.883 4.573 4.043.639.275 1.139.441 1.528.564.642.204 1.227.175 1.69.106.515-.077 1.593-.652 1.817-1.281.224-.63.224-1.171.156-1.281-.067-.111-.246-.179-.513-.313z"/>
                    </svg>
                    WhatsApp Support
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
