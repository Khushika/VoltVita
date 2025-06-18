
import React, { useEffect } from 'react';
import { useApplianceStore } from '../stores/applianceStore';
import StatsCard from '../components/dashboard/StatsCard';
import QuickActions from '../components/dashboard/QuickActions';
import ApplianceCard from '../components/appliances/ApplianceCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Shield, 
  Calendar, 
  DollarSign, 
  Plus,
  AlertTriangle 
} from 'lucide-react';

const Dashboard = () => {
  const { 
    appliances, 
    fetchAppliances, 
    isLoading, 
    deleteAppliance,
    setSelectedAppliance 
  } = useApplianceStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppliances();
  }, [fetchAppliances]);

  const totalAppliances = appliances.length;
  const activeWarranties = appliances.filter(
    app => new Date(app.warranty_expiry) > new Date()
  ).length;
  const expiringWarranties = appliances.filter(app => {
    const expiry = new Date(app.warranty_expiry);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  }).length;
  const totalValue = appliances.reduce((sum, app) => sum + app.purchase_price, 0);

  const handleEditAppliance = (appliance: any) => {
    setSelectedAppliance(appliance);
    navigate('/appliances/edit');
  };

  const handleDeleteAppliance = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this appliance?')) {
      await deleteAppliance(id);
    }
  };

  const handleViewDetails = (appliance: any) => {
    setSelectedAppliance(appliance);
    navigate('/appliances/details');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome to your Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage all your appliances in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Appliances"
          value={totalAppliances}
          subtitle="Registered devices"
          icon={<Home size={24} />}
          gradient="bg-gradient-to-r from-primary to-primary/80"
        />
        <StatsCard
          title="Active Warranties"
          value={activeWarranties}
          subtitle="Currently covered"
          icon={<Shield size={24} />}
          gradient="bg-gradient-to-r from-secondary to-secondary/80"
        />
        <StatsCard
          title="Expiring Soon"
          value={expiringWarranties}
          subtitle="Within 30 days"
          icon={<AlertTriangle size={24} />}
          gradient="bg-gradient-to-r from-accent to-accent/80"
        />
        <StatsCard
          title="Total Value"
          value={`₹${totalValue.toLocaleString()}`}
          subtitle="Investment protected"
          icon={<DollarSign size={24} />}
          gradient="bg-gradient-to-r from-purple-500 to-purple-400"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Appliances */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Your Appliances</CardTitle>
          <Button
            onClick={() => navigate('/appliances/add')}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus size={20} className="mr-2" />
            Add Appliance
          </Button>
        </CardHeader>
        <CardContent>
          {appliances.length === 0 ? (
            <div className="text-center py-12">
              <Home size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No appliances yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first appliance
              </p>
              <Button
                onClick={() => navigate('/appliances/add')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus size={20} className="mr-2" />
                Add Your First Appliance
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appliances.slice(0, 6).map((appliance) => (
                <ApplianceCard
                  key={appliance.id}
                  appliance={appliance}
                  onEdit={handleEditAppliance}
                  onDelete={handleDeleteAppliance}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
          
          {appliances.length > 6 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/appliances')}
              >
                View All Appliances
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
