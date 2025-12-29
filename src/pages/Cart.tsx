import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, placeOrder, totalPrice } = useCart();

  const handlePlaceOrder = () => {
    placeOrder();
    toast({
      title: "Order placed! 🎉",
      description: "Your healthy meal is on its way!",
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-4 max-w-lg mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">Your Cart</h1>
            <p className="text-muted-foreground text-sm">{items.length} items</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto">
        {items.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl p-4 border border-border flex gap-4 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
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
                    <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
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
            <div className="bg-card rounded-2xl p-5 border border-border mb-4">
              <h3 className="font-display font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="gradient"
                size="xl"
                className="w-full"
                onClick={handlePlaceOrder}
              >
                Place Order
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
          </>
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

      <BottomNav />
    </div>
  );
};

export default Cart;
