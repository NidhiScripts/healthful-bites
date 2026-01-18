import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard, Smartphone, Banknote, MapPin, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { toast } from '@/hooks/use-toast';
import { formatPrice } from '@/data/foodData';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PaymentMethod = 'cod' | 'upi' | 'card';

const paymentMethods = [
  { id: 'cod' as PaymentMethod, label: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
  { id: 'upi' as PaymentMethod, label: 'UPI', icon: Smartphone, description: 'GPay, PhonePe, Paytm' },
  { id: 'card' as PaymentMethod, label: 'Card', icon: CreditCard, description: 'Debit/Credit Card' },
];

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, placeOrder, totalPrice } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cod');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [placedOrder, setPlacedOrder] = useState<ReturnType<typeof placeOrder>>(null);

  const handleProceedToPayment = () => {
    if (items.length === 0) return;
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter your delivery address",
        variant: "destructive"
      });
      return;
    }

    const order = placeOrder(selectedPayment, deliveryAddress);
    if (order) {
      setPlacedOrder(order);
      setStep('success');
      toast({
        title: "Order placed! 🎉",
        description: "Your healthy meal is on its way!",
      });
    }
  };

  const handleTrackOrder = () => {
    if (placedOrder) {
      navigate(`/order/${placedOrder.id}`);
    }
  };

  if (step === 'success' && placedOrder) {
    return (
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="w-24 h-24 rounded-full bg-safe/20 flex items-center justify-center mb-6 animate-scale-in">
            <Check className="w-12 h-12 text-safe" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2 text-center">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-center mb-2">
            Order ID: {placedOrder.id.replace('order_', '#')}
          </p>
          <p className="text-muted-foreground text-center mb-6">
            Total: {formatPrice(placedOrder.total)}
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button variant="gradient" size="lg" onClick={handleTrackOrder}>
              Track Order
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
              Continue Shopping
            </Button>
          </div>
        </div>
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="px-4 py-4 max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setStep('cart')}
              className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground">Payment</h1>
              <p className="text-muted-foreground text-sm">Choose payment method</p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 max-w-4xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6">
              {/* Delivery Address */}
              <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Address
                </h3>
                <Input
                  placeholder="Enter your full address..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Payment Methods */}
              <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up" style={{ animationDelay: '50ms' }}>
                <h3 className="font-display font-bold text-foreground mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                          selectedPayment === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          selectedPayment === method.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{method.label}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <Check className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 lg:mt-0">
              <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up lg:sticky lg:top-24" style={{ animationDelay: '100ms' }}>
                <h3 className="font-display font-bold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <Button
                  variant="gradient"
                  size="xl"
                  className="w-full mt-6"
                  onClick={handlePlaceOrder}
                >
                  Pay {formatPrice(totalPrice)}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-4 max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground">Your Cart</h1>
            <p className="text-muted-foreground text-sm">{items.length} items</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto">
        {items.length > 0 ? (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 mb-6 lg:mb-0">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl p-4 border border-border flex gap-4 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-semibold w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-5 border border-border mb-4 lg:sticky lg:top-24">
                <h3 className="font-display font-bold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 mt-6">
                  <Button
                    variant="gradient"
                    size="xl"
                    className="w-full"
                    onClick={handleProceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Explore our healthy menu and add some delicious items to your cart!
            </p>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              Browse Menu
            </Button>
          </div>
        )}
      </main>

      {/* Bottom Nav - hidden on desktop */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Cart;