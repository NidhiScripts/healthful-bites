import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Package, TrendingUp, Flame } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LineChart, Line, Tooltip } from 'recharts';
import { format, subDays, parseISO, isWithinInterval } from 'date-fns';
import { useMemo } from 'react';
import { formatPrice } from '@/data/foodData';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { orders } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate weekly nutrition data
  const weeklyData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date: format(date, 'EEE'),
        fullDate: date,
        calories: 0,
        healthScore: 0,
        orderCount: 0
      };
    });

    orders.forEach(order => {
      const orderDate = parseISO(order.date);
      last7Days.forEach(day => {
        if (isWithinInterval(orderDate, {
          start: new Date(day.fullDate.setHours(0, 0, 0, 0)),
          end: new Date(day.fullDate.setHours(23, 59, 59, 999))
        })) {
          order.items.forEach(item => {
            day.calories += item.nutrition.calories * item.quantity;
            day.healthScore += item.healthScore * item.quantity;
            day.orderCount += item.quantity;
          });
        }
      });
    });

    return last7Days.map(day => ({
      ...day,
      avgHealthScore: day.orderCount > 0 ? Math.round((day.healthScore / day.orderCount) * 10) / 10 : 0
    }));
  }, [orders]);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const avgHealthScore = useMemo(() => {
    if (orders.length === 0) return 0;
    let total = 0;
    let count = 0;
    orders.forEach(order => {
      order.items.forEach(item => {
        total += item.healthScore * item.quantity;
        count += item.quantity;
      });
    });
    return count > 0 ? Math.round((total / count) * 10) / 10 : 0;
  }, [orders]);

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="px-4 py-4 max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-border"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-xl lg:text-2xl font-display font-bold text-foreground">Profile</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 max-w-4xl mx-auto">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {/* User Info */}
            <div className="bg-card rounded-2xl p-6 border border-border mb-6 animate-slide-up">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl lg:text-3xl font-bold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-display font-bold text-foreground">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-card rounded-2xl p-4 border border-border text-center animate-slide-up" style={{ animationDelay: '50ms' }}>
                <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
                <Flame className="w-6 h-6 mx-auto mb-2 text-secondary" />
                <p className="text-xl font-bold text-foreground">{formatPrice(totalSpent)}</p>
                <p className="text-xs text-muted-foreground">Spent</p>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border text-center animate-slide-up" style={{ animationDelay: '150ms' }}>
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-safe" />
                <p className="text-2xl font-bold text-foreground">{avgHealthScore}</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">

        {/* Weekly Calories Chart */}
        {orders.length > 0 && (
          <div className="bg-card rounded-2xl p-5 border border-border mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="font-display font-bold text-foreground mb-4">Weekly Calories</h3>
            <div className="h-40 lg:h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-md)'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="calories" radius={[8, 8, 0, 0]} fill="hsl(var(--chart-calories))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Health Score Trend */}
        {orders.length > 0 && (
          <div className="bg-card rounded-2xl p-5 border border-border mb-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <h3 className="font-display font-bold text-foreground mb-4">Health Score Trend</h3>
            <div className="h-32 lg:h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  />
                  <YAxis hide domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgHealthScore" 
                    stroke="hsl(var(--safe))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--safe))', strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Order History */}
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <h3 className="font-display font-bold text-foreground mb-4">Order History</h3>
          {orders.length > 0 ? (
            <div className="space-y-3">
              {orders.slice().reverse().map((order, index) => (
                <div
                  key={order.id}
                  className="bg-card rounded-2xl p-4 border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">
                      {format(parseISO(order.date), 'MMM d, yyyy • h:mm a')}
                    </span>
                    <span className="font-bold text-foreground">{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 border border-border text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="font-semibold text-foreground mb-2">No orders yet</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Start ordering healthy meals to see your history here!
              </p>
              <Button variant="gradient" onClick={() => navigate('/dashboard')}>
                Browse Menu
              </Button>
            </div>
          )}
        </div>
          </div>
        </div>
      </main>

      {/* Bottom Nav - hidden on desktop */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;
