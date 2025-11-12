import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  FileText, 
  Car, 
  Languages, 
  Heart, 
  Users, 
  Clock,
  MapPin,
  CheckCircle 
} from "lucide-react";

interface HomepageProps {
  onNavigateToHub: (hub: string) => void;
}

export function Homepage({ onNavigateToHub }: HomepageProps) {
  const hubs = [
    {
      id: 'administrative',
      title: 'Administrative Hub',
      description: 'Forms, appointments, and paperwork assistance',
      icon: FileText,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'transportation',
      title: 'Transportation Hub',
      description: 'Rides and travel assistance',
      icon: Car,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 'language',
      title: 'Language Hub',
      description: 'Translation and communication help',
      icon: Languages,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'medical',
      title: 'Medical Hub',
      description: 'Healthcare support and guidance',
      icon: Heart,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 'social',
      title: 'Social Hub',
      description: 'Companionship and social activities',
      icon: Users,
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'Medical appointment scheduled',
      volunteer: 'Sarah Johnson',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'form',
      title: 'Insurance form completed',
      volunteer: 'Michael Chen',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'ride',
      title: 'Grocery shopping trip',
      volunteer: 'Emma Wilson',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center mb-6">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1752084794888-0b27a762b6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwc2VuaW9yJTIwcGVyc29uJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODI3MzIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Welcome" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-4xl text-gray-800 mb-2">Welcome back, Margaret!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with caring volunteers ready to help you with daily tasks, appointments, and more. 
            Your community is here to support you.
          </p>
          <Badge variant="secondary" className="px-4 py-2 text-lg">
            <Clock className="w-4 h-4 mr-2" />
            3 active volunteers nearby
          </Badge>
        </div>

        {/* Recent Activities */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="text-gray-800">{activity.title}</h4>
                    <p className="text-gray-600">Helped by {activity.volunteer} • {activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Hubs */}
        <div>
          <h2 className="text-2xl text-gray-800 mb-6 text-center">Choose a Service Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub) => {
              const IconComponent = hub.icon;
              return (
                <Card key={hub.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full ${hub.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-gray-800">{hub.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <p className="text-gray-600">{hub.description}</p>
                    <Button 
                      onClick={() => onNavigateToHub(hub.id)}
                      className="w-full"
                      size="lg"
                    >
                      Get Help
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="shadow-lg border-2 border-red-200 bg-red-50">
          <CardContent className="text-center py-6">
            <h3 className="text-xl text-red-800 mb-2">Emergency Support</h3>
            <p className="text-red-700 mb-4">Need immediate assistance? Our emergency volunteers are available 24/7</p>
            <Button variant="destructive" size="lg" className="px-8">
              Contact Emergency Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}