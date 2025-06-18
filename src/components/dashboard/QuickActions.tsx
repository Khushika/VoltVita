
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, FileText, Calendar, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Appliance',
      description: 'Register a new appliance',
      icon: <Plus size={20} />,
      action: () => navigate('/appliances/add'),
      gradient: 'from-primary to-primary/80',
    },
    {
      title: 'Service Records',
      description: 'View service history',
      icon: <FileText size={20} />,
      action: () => navigate('/services'),
      gradient: 'from-secondary to-secondary/80',
    },
    {
      title: 'Schedule Service',
      description: 'Book maintenance',
      icon: <Calendar size={20} />,
      action: () => navigate('/schedule'),
      gradient: 'from-accent to-accent/80',
    },
    {
      title: 'Warranty Check',
      description: 'Check warranty status',
      icon: <Wrench size={20} />,
      action: () => navigate('/warranty'),
      gradient: 'from-purple-500 to-purple-400',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center text-center space-y-2 hover:scale-105 transition-all duration-200 group"
            >
              <div className={`p-2 rounded-full bg-gradient-to-r ${action.gradient} text-white group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <div>
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
