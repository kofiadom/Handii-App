import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  Heart,
  GraduationCap,
  Briefcase,
  Home,
  User,
  Calendar,
  Shield,
  Award
} from "lucide-react";

interface VolunteerDetailProps {
  volunteerId: string;
  onBack: () => void;
}

export function VolunteerDetail({ volunteerId, onBack }: VolunteerDetailProps) {
  // Mock data - in a real app this would come from props or API
  const volunteer = {
    id: volunteerId,
    name: 'Sarah Johnson',
    age: 34,
    rating: 4.9,
    completedTasks: 127,
    specialties: ['Forms', 'Appointments', 'Shopping', 'Transportation'],
    location: '0.8 miles away',
    currentStatus: 'Available now',
    timeAway: '5 minutes',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyNzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Retired registered nurse with 30 years of healthcare experience. I am passionate about helping seniors navigate complex healthcare systems and administrative processes. My approach is patient, compassionate, and thorough.',
    hobbies: ['Reading', 'Gardening', 'Cooking', 'Volunteering at animal shelter'],
    education: 'Bachelor of Science in Nursing - University of California, San Francisco (1989)',
    hometown: 'San Francisco, CA',
    currentWork: 'Retired - Previously Head Nurse at UCSF Medical Center',
    phone: '(555) 123-4567',
    emergencyContact: {
      name: 'Michael Johnson (Husband)',
      phone: '(555) 987-6543',
      relationship: 'Spouse'
    },
    verifications: ['Background Check Verified', 'Healthcare License Verified', 'References Verified'],
    joinDate: 'March 2023',
    responseTime: 'Usually responds within 15 minutes',
    languages: ['English', 'Spanish (Conversational)']
  };

  const recommendedVolunteers = [
    {
      id: '3',
      name: 'Emma Wilson',
      rating: 4.9,
      specialties: ['Forms', 'Organization'],
      location: '0.5 miles away',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTgyNzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isAvailable: true
    },
    {
      id: '4',
      name: 'David Rodriguez',
      rating: 4.7,
      specialties: ['Appointments', 'Transportation'],
      location: '1.8 miles away',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjczMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      rating: 4.8,
      specialties: ['Transportation', 'Shopping'],
      location: '1.2 miles away',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4MjczMjIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      isAvailable: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl text-gray-800">Volunteer Profile</h1>
            <p className="text-gray-600">Complete profile and contact information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                      <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl text-gray-800">{volunteer.name}</h2>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-lg">{volunteer.rating}</span>
                        <span className="text-gray-600">({volunteer.completedTasks} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{volunteer.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{volunteer.timeAway} away</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {volunteer.currentStatus}
                      </Badge>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call Now
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Send Message
                      </Button>
                      <Button variant="outline">
                        Request Help
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Bio and Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About Sarah
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">{volunteer.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-red-500 mt-1" />
                      <div>
                        <h4 className="text-gray-800 mb-1">Hobbies & Interests</h4>
                        <p className="text-gray-600">{volunteer.hobbies.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-blue-500 mt-1" />
                      <div>
                        <h4 className="text-gray-800 mb-1">Education</h4>
                        <p className="text-gray-600">{volunteer.education}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="text-gray-800 mb-1">Hometown</h4>
                        <p className="text-gray-600">{volunteer.hometown}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-purple-500 mt-1" />
                      <div>
                        <h4 className="text-gray-800 mb-1">Work Experience</h4>
                        <p className="text-gray-600">{volunteer.currentWork}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-gray-800 mb-2">Primary Contact</h4>
                    <p className="text-gray-600">Phone: {volunteer.phone}</p>
                    <p className="text-gray-600">Response time: {volunteer.responseTime}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-gray-800 mb-2">Emergency Contact</h4>
                    <p className="text-gray-600">{volunteer.emergencyContact.name}</p>
                    <p className="text-gray-600">Phone: {volunteer.emergencyContact.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Specialties */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>What Sarah Can Help With</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {volunteer.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verifications */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {volunteer.verifications.map((verification, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{verification}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-gray-600">
                  <p>Member since: {volunteer.joinDate}</p>
                  <p>Languages: {volunteer.languages.join(', ')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Sarah's Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="text-gray-800">{volunteer.completedTasks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gray-800">{volunteer.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="text-gray-800">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">On-time Rate</span>
                    <span className="text-gray-800">99%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Volunteers */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Other Recommended Volunteers</CardTitle>
            <p className="text-gray-600">Similar volunteers who can help with administrative tasks</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedVolunteers.map((rec) => (
                <div key={rec.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={rec.avatar} alt={rec.name} />
                        <AvatarFallback>{rec.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {rec.isAvailable && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-800">{rec.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-gray-600">{rec.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rec.specialties.slice(0, 2).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">{rec.location}</span>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}