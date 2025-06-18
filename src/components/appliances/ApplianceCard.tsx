
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Appliance } from '../../types';
import { Calendar, DollarSign, Shield, Edit, Trash2 } from 'lucide-react';

interface ApplianceCardProps {
  appliance: Appliance;
  onEdit: (appliance: Appliance) => void;
  onDelete: (id: string) => void;
  onViewDetails: (appliance: Appliance) => void;
}

const ApplianceCard: React.FC<ApplianceCardProps> = ({
  appliance,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const isWarrantyExpired = new Date(appliance.warranty_expiry) < new Date();
  const daysUntilExpiry = Math.ceil(
    (new Date(appliance.warranty_expiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      kitchen: 'bg-orange-100 text-orange-800',
      laundry: 'bg-blue-100 text-blue-800',
      cooling: 'bg-cyan-100 text-cyan-800',
      entertainment: 'bg-purple-100 text-purple-800',
      cleaning: 'bg-green-100 text-green-800',
      personal_care: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {appliance.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {appliance.brand} - {appliance.model}
            </p>
          </div>
          <Badge className={getCategoryColor(appliance.category)}>
            {appliance.category.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span>Purchased: {new Date(appliance.purchase_date).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign size={16} className="text-muted-foreground" />
            <span>₹{appliance.purchase_price.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Shield size={16} className={isWarrantyExpired ? 'text-red-500' : 'text-green-500'} />
          <span className={`text-sm ${isWarrantyExpired ? 'text-red-600' : 'text-green-600'}`}>
            Warranty: {isWarrantyExpired 
              ? 'Expired' 
              : `${daysUntilExpiry} days left`
            }
          </span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            onClick={() => onViewDetails(appliance)}
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-primary hover:text-white transition-colors"
          >
            View Details
          </Button>
          
          <Button
            onClick={() => onEdit(appliance)}
            variant="outline"
            size="sm"
            className="px-3 hover:bg-secondary hover:text-white transition-colors"
          >
            <Edit size={16} />
          </Button>
          
          <Button
            onClick={() => onDelete(appliance.id)}
            variant="outline"
            size="sm"
            className="px-3 hover:bg-destructive hover:text-white transition-colors"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplianceCard;
