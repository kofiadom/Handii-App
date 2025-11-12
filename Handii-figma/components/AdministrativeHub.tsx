import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Car,
  CalendarDays,
  Home,
  Scissors,
  ShoppingCart,
  CheckCircle2,
  Star,
  MapPin,
  Phone,
  MessageCircle
} from "lucide-react";

interface AdministrativeHubProps {
  onBack: () => void;
  onSelectVolunteer: (volunteerId: string) => void;
}

export function AdministrativeHub({ onBack, onSelectVolunteer }: AdministrativeHubProps) {
  const services = [
    {
      id: 'appointment-scheduler',
      title: 'Appointment Scheduler',
      description: 'Schedule medical, dental, or other appointments',
      icon: Calendar,
      requestCount: 12
    },
    {
      id: 'appointment-reminder',
      title: 'Appointment Reminder',
      description: 'Get reminders for upcoming appointments',
      icon: Clock,
      requestCount: 8
    },
    {
      id: 'filling-form',
      title: 'Filling Forms',
      description: 'Help with insurance, government, or medical forms',
      icon: FileText,
      requestCount: 15
    },
    {
      id: 'request-ride',
      title: 'Request Ride',
      description: 'Transportation to appointments or errands',
      icon: Car,
      requestCount: 22
    },
    {
      id: 'special-events',
      title: 'Special Events',
      description: 'Assistance with event planning and attendance',
      icon: CalendarDays,
      requestCount: 6
    },
    {
      id: 'home-organization',
      title: 'Home Organization',
      description: 'Help organizing living spaces and belongings',
      icon: Home,
      requestCount: 9
    },
    {
      id: 'gardening',
      title: 'Gardening',
      description: 'Garden maintenance and plant care',
      icon: Scissors,
      requestCount: 7
    },
    {
      id: 'shopping',
      title: 'Shopping',
      description: 'Grocery shopping and errand assistance',
      icon: ShoppingCart,
      requestCount: 18
    }
  ];

  const availableVolunteers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 34,
      rating: 4.9,
      completedTasks: 127,
      specialties: ['Forms', 'Appointments', 'Shopping'],
      location: '0.8 miles away',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyNzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Retired nurse with 30 years of healthcare experience. Passionate about helping seniors navigate healthcare systems.',
      isOnline: true,
      nextAvailable: 'Available now'
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 42,
      rating: 4.8,
      completedTasks: 89,
      specialties: ['Transportation', 'Shopping', 'Gardening'],
      location: '1.2 miles away',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjczMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Former social worker specializing in senior care coordination. Enjoys helping with daily tasks and transportation.',
      isOnline: false,
      nextAvailable: 'Available at 2:00 PM'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      age: 28,
      rating: 4.9,
      completedTasks: 156,
      specialties: ['Forms', 'Home Organization', 'Technology'],
      location: '0.5 miles away',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyNzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Administrative assistant with expertise in paperwork and organization. Loves helping seniors stay organized.',
      isOnline: true,
      nextAvailable: 'Available now'
    },
    {
      id: '4',
      name: 'David Rodriguez',
      age: 55,
      rating: 4.7,
      completedTasks: 203,
      specialties: ['Appointments', 'Transportation', 'Gardening'],
      location: '1.8 miles away',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjczMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Retired teacher who enjoys helping seniors with various daily tasks. Very patient and understanding.',
      isOnline: true,
      nextAvailable: 'Available now'
    }
  ];

  const acceptedVolunteers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      task: 'Doctor appointment scheduling',
      scheduledDate: 'Tomorrow at 10:00 AM',
      status: 'confirmed',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyNzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      task: 'Medicare form assistance',
      scheduledDate: 'Friday at 2:00 PM',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyNzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl text-gray-800">Administrative Hub</h1>
            <p className="text-gray-600">Get help with paperwork, appointments, and daily tasks</p>
          </div>
        </div>

        {/* Services Available */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Here's what a volunteer can help you do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800">{service.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {service.requestCount} requests this month
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Available Volunteers */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Available Volunteers Near You</CardTitle>
            <p className="text-gray-600">Choose a volunteer to help with your administrative needs</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableVolunteers.map((volunteer) => (
                <div key={volunteer.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                        <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {volunteer.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-800">{volunteer.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-gray-600">{volunteer.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{volunteer.bio}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-gray-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{volunteer.completedTasks} tasks completed</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{volunteer.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {volunteer.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600">{volunteer.nextAvailable}</span>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Message
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => onSelectVolunteer(volunteer.id)}
                            className="flex items-center gap-1"
                          >
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accepted Volunteers */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Volunteers Who Have Accepted Your Requests</CardTitle>
            <p className="text-gray-600">Track your upcoming assistance appointments</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {acceptedVolunteers.map((volunteer) => (
                <div key={volunteer.id} className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                    <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-gray-800">{volunteer.name}</h4>
                    <p className="text-gray-600">{volunteer.task}</p>
                    <p className="text-green-700">{volunteer.scheduledDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={volunteer.status === 'confirmed' ? 'default' : 'secondary'}
                      className={volunteer.status === 'confirmed' ? 'bg-green-600' : ''}
                    >
                      {volunteer.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Request New Help */}
        <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
          <CardContent className="text-center py-6">
            <h3 className="text-xl text-blue-800 mb-2">Need Additional Help?</h3>
            <p className="text-blue-700 mb-4">Request assistance with any administrative task</p>
            <Button size="lg" className="px-8">
              Create New Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}