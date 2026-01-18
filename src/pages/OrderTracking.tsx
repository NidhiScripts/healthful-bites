import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChefHat, Truck, Package, MapPin, Clock } from 'lucide-react';
import { useCart, OrderStatus } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { formatPrice } from '@/data/foodData';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const statusSteps: { status: OrderStatus; label: string; icon: typeof Check }[] = [
  { status: 'confirmed', label: 'Order Confirmed', icon: Check },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: Package },
];

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useCart();
  const [currentOrder, setCurrentOrder] = useState(orders.find(o => o.id === orderId));

  useEffect(() => {
    const order = orders.find(o => o.id === orderId);
    setCurrentOrder(order);
  }, [orders, orderId]);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-4">Order not found</h1>
          <Button variant="gradient" onClick={() => navigate('/dashboard')}>
            Go to Menu
          </Button>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.status === currentOrder.status);

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI';
      case 'card': return 'Card';
      default: return method;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-4 max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground">Track Order</h1>
            <p className="text-muted-foreground text-sm">{currentOrder.id.replace('order_', '#')}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Tracking Progress */}
          <div className="mb-6 lg:mb-0">
            <div className="bg-card rounded-2xl p-6 border border-border animate-slide-up">
              <h3 className="font-display font-bold text-foreground mb-6">Order Status</h3>
              
              <div className="space-y-0">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.status} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                              isCompleted
                                ? isCurrent
                                  ? "bg-primary text-primary-foreground animate-pulse"
                                  : "bg-safe text-safe-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          {index < statusSteps.length - 1 && (
                            <div
                              className={cn(
                                "w-0.5 h-12 transition-all duration-500",
                                index < currentStepIndex ? "bg-safe" : "bg-border"
                              )}
                            />
                          )}
                        </div>
                        <div className="pt-3">
                          <p className={cn(
                            "font-semibold transition-colors",
                            isCompleted ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {step.label}
                          </p>
                          {isCurrent && currentOrder.status !== 'delivered' && (
                            <p className="text-sm text-primary mt-1">In progress...</p>
                          )}
                          {isCompleted && !isCurrent && (
                            <p className="text-sm text-safe mt-1">Completed</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentOrder.status !== 'delivered' && (
                <div className="mt-6 p-4 bg-primary/10 rounded-xl flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(currentOrder.estimatedDelivery), 'h:mm a')}
                    </p>
                  </div>
                </div>
              )}

              {currentOrder.status === 'delivered' && (
                <div className="mt-6 p-4 bg-safe/10 rounded-xl flex items-center gap-3">
                  <Check className="w-5 h-5 text-safe" />
                  <p className="text-sm font-medium text-foreground">
                    Order delivered successfully!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            {/* Delivery Address */}
            <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up" style={{ animationDelay: '50ms' }}>
              <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Delivery Address
              </h3>
              <p className="text-muted-foreground">{currentOrder.deliveryAddress}</p>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h3 className="font-display font-bold text-foreground mb-4">Order Items</h3>
              <div className="space-y-3">
                {currentOrder.items.map((item) => (
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
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="text-foreground">{getPaymentLabel(currentOrder.paymentMethod)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatPrice(currentOrder.total)}</span>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate('/dashboard')}
            >
              Order More
            </Button>
          </div>
        </div>
      </main>

      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default OrderTracking;