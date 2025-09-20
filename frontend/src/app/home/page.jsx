"use client"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { 
  Leaf, Menu, X, ArrowRight, Play, Smartphone, Download, CheckCircle, 
  Lock, Clock, Users, MapPin, Star, Facebook, Twitter, Instagram, 
  Mail, Phone, Headphones, Globe, BookOpen, Video, Lightbulb, 
  Heart, Zap, Target, Trophy, TrendingUp, Shield, Sun, Moon
} from "lucide-react";
// import heroImage from "@/assets/hero-image.jpg";
// import featuresIcons from "@/assets/features-icons.jpg";

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 bg-transparent border-none cursor-pointer">
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      className="w-9 h-9 bg-transparent border-none cursor-pointer hover:bg-accent transition-colors"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

// Button Component
const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    hero: "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground hover:from-primary/90 hover:to-primary-dark/90 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// Card Component
const Card = ({ className = "", children, ...props }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardContent = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Badge Component
const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Avatar Component
const Avatar = ({ className = "", children, ...props }) => {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
      {children}
    </div>
  );
};

const AvatarImage = ({ className = "", ...props }) => {
  return (
    <img className={`aspect-square h-full w-full ${className}`} {...props} />
  );
};

const AvatarFallback = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
      {children}
    </div>
  );
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-primary to-primary-dark rounded-lg">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">VIKAS.AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#journey" className="text-foreground hover:text-primary transition-colors">
              Journey
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">
              Community
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost">Sign In</Button>
            <Button variant="hero">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#journey"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Journey
              </a>
              <a
                href="#community"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button variant="hero">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                🚀 Journey-Based Financial Learning
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"> Virtual Interactive Knowledge for Asset Success</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Build trust, gain knowledge, and unlock real financial opportunities through 
                our gamified learning platform designed for underserved communities.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Trust Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Communities</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {/* <img
                src={heroImage}
                alt="TrustWise platform showing diverse community members learning about finance"
                className="w-full h-auto"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-30 animate-bounce" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Journey-based Pathways",
      description: "Progress through structured financial milestones designed for your community's specific needs and cultural context."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Knowledge Engine",
      description: "Learn from local mentors and success stories while building trust through peer connections in your language."
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Gamified Learning",
      description: "Engage with scenario-based challenges, family leaderboards, and milestone rewards that make learning fun."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Behavioral Finance Toolkit",
      description: "Get personalized nudges, predictive alerts, and simple tracking tools for savings, loans, and expenses."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Cultural Adaptation Engine",
      description: "Access content in your local dialect with real contexts like crop cycles, seasonal incomes, and festivals."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Trust-First Approach",
      description: "Build confidence with transparent processes, community validation, and gradual financial product access."
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            ✨ Comprehensive Features
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Empowering Financial 
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"> Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cultural understanding with modern fintech to create 
            personalized learning experiences that build real financial capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Learn more 
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Journey Component
const Journey = () => {
  const journeyStages = [
    {
      id: 1,
      title: "Basic Savings",
      description: "Learn fundamental saving principles and build your first emergency fund through practical exercises.",
      status: "completed",
      lessons: 8,
      duration: "2 weeks"
    },
    {
      id: 2,
      title: "Smart Spending",
      description: "Master budgeting, expense tracking, and make informed purchasing decisions for your lifestyle.",
      status: "current",
      lessons: 10,
      duration: "3 weeks"
    },
    {
      id: 3,
      title: "Credit Readiness",
      description: "Understand credit systems, build creditworthiness, and access formal lending opportunities.",
      status: "locked",
      lessons: 12,
      duration: "4 weeks"
    },
    {
      id: 4,
      title: "Investment Awareness",
      description: "Explore investment options, risk management, and long-term wealth building strategies.",
      status: "locked",
      lessons: 15,
      duration: "6 weeks"
    }
  ];

  return (
    <section id="journey" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            🗺️ Learning Path
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Your Financial 
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Progress through carefully designed stages that build upon each other, 
            ensuring you develop strong financial foundations at your own pace.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {journeyStages.map((stage, index) => (
              <Card 
                key={stage.id} 
                className={`group transition-all duration-300 ${
                  stage.status === 'completed' 
                    ? 'bg-green-50 border-green-200 shadow-md' 
                    : stage.status === 'current'
                    ? 'bg-blue-50 border-blue-200 shadow-lg'
                    : 'bg-gray-100 border-gray-200'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Status Icon */}
                      <div className={`p-3 rounded-lg ${
                        stage.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : stage.status === 'current'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {stage.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : stage.status === 'current' ? (
                          <Play className="h-6 w-6" />
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            Stage {stage.id}: {stage.title}
                          </h3>
                          {stage.status === 'completed' && (
                            <Badge className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          {stage.status === 'current' && (
                            <Badge>
                              In Progress
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {stage.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {stage.lessons} lessons
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {stage.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {stage.status !== 'locked' && (
                      <Button 
                        variant={stage.status === 'completed' ? 'outline' : 'default'}
                        className="ml-4"
                      >
                        {stage.status === 'completed' ? 'Review' : 'Continue'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Community Component
const Community = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Small Business Owner",
      location: "Rural Maharashtra",
      avatar: "/placeholder.svg",
      rating: 5,
      badge: "Financial Champion",
      text: "TrustWise helped me understand banking better. Now I can manage my shop's finances and even got my first business loan!"
    },
    {
      name: "Rajesh Kumar",
      role: "Farmer",
      location: "Punjab",
      avatar: "/placeholder.svg",
      rating: 5,
      badge: "Investment Starter",
      text: "The crop cycle planning feature changed everything. I learned to save during harvest season for lean months."
    },
    {
      name: "Anita Devi",
      role: "Homemaker",
      location: "West Bengal",
      avatar: "/placeholder.svg",
      rating: 4,
      badge: "Savings Expert",
      text: "I never trusted banks before. TrustWise made everything clear in my language. My family is financially secure now."
    }
  ];

  const stats = [
    { label: "Active Communities", value: "250+" },
    { label: "Financial Champions", value: "1,200+" },
    { label: "Success Stories", value: "5,000+" },
    { label: "Languages Supported", value: "15+" }
  ];

  return (
    <section id="community" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            🤝 Our Community
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Stories of
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"> Transformation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of learners who have transformed their financial lives through 
            peer support, mentorship, and culturally relevant education.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge className="text-xs bg-gray-100 text-gray-800">
                    {testimonial.badge}
                  </Badge>
                </div>

                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Component
const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of learners who have already started their journey to financial empowerment. 
              Begin with our free modules today.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="secondary" 
              size="lg" 
              className="group bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl font-bold text-white mb-2">100% Free</div>
              <p className="text-white/80">
                Start your journey with completely free basic modules
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl font-bold text-white mb-2">Community Support</div>
              <p className="text-white/80">
                Get help from mentors and peers in your local language
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl font-bold text-white mb-2">Real Rewards</div>
              <p className="text-white/80">
                Unlock actual financial products as you progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-dark rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">TrustWise</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering underserved communities through journey-based financial education and culturally relevant learning experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="#features" className="block text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#journey" className="block text-muted-foreground hover:text-primary transition-colors">
                Learning Journey
              </a>
              <a href="#community" className="block text-muted-foreground hover:text-primary transition-colors">
                Community
              </a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#success" className="block text-muted-foreground hover:text-primary transition-colors">
                Success Stories
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <div className="space-y-3">
              <a href="#help" className="block text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#glossary" className="block text-muted-foreground hover:text-primary transition-colors">
                Financial Glossary
              </a>
              <a href="#blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </a>
              <a href="#webinars" className="block text-muted-foreground hover:text-primary transition-colors">
                Webinars
              </a>
              <a href="#app" className="block text-muted-foreground hover:text-primary transition-colors">
                Mobile App
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@trustwise.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 TrustWise. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Journey />
        <Community />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;