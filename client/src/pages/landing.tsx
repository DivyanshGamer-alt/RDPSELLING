import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Server, Shield, Clock, Headphones, Rocket, Bitcoin, CreditCard, Check, Star, Zap, Globe, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const telegramChannels = [
    { name: "🇸🇹🇦🇷 X OWNER", url: "https://t.me/XSTARxOWNER" },
    { name: "Star RDP", url: "https://t.me/StarRdp" },
    { name: "General Chat", url: "https://t.me/STAR_FF07777" },
    { name: "Support 24/7", url: "https://t.me/XSTARxOWNER" }
  ];

  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Instant Setup",
      description: "Get your server ready in under 60 seconds"
    },
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Secure & Protected",
      description: "Advanced security with DDoS protection"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "99.9% Uptime",
      description: "Reliable infrastructure you can trust"
    },
    {
      icon: <Headphones className="w-6 h-6 text-accent" />,
      title: "24/7 Support",
      description: "Expert support whenever you need it"
    }
  ];

  const services = [
    {
      icon: <Server className="w-8 h-8 text-primary" />,
      name: "Low Plan",
      description: "Perfect for basic browsing, automation, and light tasks",
      price: "$3/month",
      priceINR: "₹220/month",
      features: ["2GB RAM", "2 CPU Cores", "40GB SSD", "24/7 Support", "30 Days Warranty"],
      popular: false
    },
    {
      icon: <Server className="w-8 h-8 text-accent" />,
      name: "Standard Plan",
      description: "Perfect for trading, editing, and advanced automation",
      price: "$8/month",
      priceINR: "₹700/month",
      features: ["8GB RAM", "4 CPU Cores", "100GB SSD", "High Speed", "30 Days Warranty"],
      popular: true
    },
    {
      icon: <Star className="w-8 h-8 text-gradient" />,
      name: "Ultra Plan",
      description: "Ultimate power for heavy-duty professional tasks",
      price: "$43/month",
      priceINR: "₹4000/month",
      features: ["64GB RAM", "16 CPU Cores", "250GB SSD", "Super Performance", "30 Days Warranty"],
      popular: false
    }
  ];

  const pricingPlans = [
    {
      name: "Low Plan",
      price: "$3",
      priceINR: "₹220",
      features: ["2GB RAM", "2 CPU Cores", "40GB SSD", "Windows 10/11", "Full Admin Access"],
      popular: false
    },
    {
      name: "Basic Plan",
      price: "$6",
      priceINR: "₹440",
      features: ["4GB RAM", "2 CPU Cores", "50GB SSD", "Windows 10/11", "Full Admin Access"],
      popular: false
    },
    {
      name: "Standard Plan",
      price: "$8",
      priceINR: "₹700",
      features: ["8GB RAM", "4 CPU Cores", "100GB SSD", "Windows 10/11", "High Speed"],
      popular: true
    },
    {
      name: "Pro Plan",
      price: "$13",
      priceINR: "₹1000",
      features: ["16GB RAM", "4 CPU Cores", "120GB SSD", "Windows 10/11", "High Speed"],
      popular: false
    },
    {
      name: "Pro Max Plan",
      price: "$23",
      priceINR: "₹2000",
      features: ["32GB RAM", "8 CPU Cores", "120GB SSD", "Windows 10/11", "High Speed"],
      popular: false
    },
    {
      name: "Ultra Plan",
      price: "$43",
      priceINR: "₹4000",
      features: ["64GB RAM", "16 CPU Cores", "250GB SSD", "Windows 10/11", "Super Performance"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, hsl(217 91% 50% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, hsl(195 100% 50% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, hsl(217 91% 50% / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, hsl(195 100% 50% / 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" 
              data-testid="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Premium RDP & VPS Solutions
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" 
              data-testid="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              High-performance remote desktop and virtual private servers with 99.9% uptime guarantee.
              Perfect for development, testing, and production environments.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 glow-effect relative overflow-hidden"
                  onClick={() => window.location.href = "/api/login"}
                  data-testid="button-get-started"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <Rocket className="mr-2 h-5 w-5 relative z-10" />
                  <span className="relative z-10">Get Started Now</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="button-view-pricing"
                >
                  View Pricing
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-background to-secondary/30" 
        data-testid="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose Star RDP?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience unmatched performance with enterprise-grade infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 floating-animation"
                  style={{ animationDelay: `${index * 0.5}s` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Telegram Channels Promotion */}
      <motion.section 
        className="py-12 bg-secondary/50" 
        data-testid="telegram-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4" data-testid="text-community-title">Join Our Community</h2>
            <p className="text-muted-foreground" data-testid="text-community-description">Stay updated with exclusive offers and tech news</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {telegramChannels.map((channel, index) => (
              <motion.a
                key={index}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 bg-card rounded-lg hover:bg-card/80 transition-colors"
                data-testid={`link-telegram-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
              >
                <motion.svg 
                  className="w-5 h-5 text-accent mr-3" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </motion.svg>
                <span className="font-medium" data-testid={`text-channel-${index}`}>{channel.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        className="py-20" 
        data-testid="services-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4" data-testid="text-services-title">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
              Choose from our range of high-performance solutions tailored for your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
              >
                <Card className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50" data-testid={`card-service-${index}`}>
                  {service.popular && (
                    <motion.div
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-primary text-primary-foreground animate-pulse" data-testid={`badge-popular-${index}`}>
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        {service.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2" data-testid={`text-service-name-${index}`}>{service.name}</h3>
                      <p className="text-muted-foreground" data-testid={`text-service-description-${index}`}>{service.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center text-sm" 
                          data-testid={`text-feature-${index}-${featureIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                          viewport={{ once: true }}
                        >
                          <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Separator className="my-6" />
                    <motion.div 
                      className="flex flex-col items-center mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-2xl font-bold text-primary" data-testid={`text-service-price-${index}`}>{service.price}</span>
                      {service.priceINR && (
                        <span className="text-lg font-semibold text-accent" data-testid={`text-service-price-inr-${index}`}>{service.priceINR}</span>
                      )}
                      <span className="text-sm text-muted-foreground">Monthly</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full relative overflow-hidden"
                        variant={service.popular ? "default" : "outline"}
                        onClick={() => window.location.href = "/api/login"}
                        data-testid={`button-add-to-cart-${index}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">Get Started</span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        id="pricing" 
        className="py-20 bg-secondary/30" 
        data-testid="pricing-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4" data-testid="text-pricing-title">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-pricing-description">No hidden fees, no setup costs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                viewport={{ once: true }}
              >
                <Card className={`relative ${plan.popular ? 'border-2 border-primary shadow-xl shadow-primary/20' : 'border-2 border-transparent hover:border-primary/30'} transition-all duration-300`} data-testid={`card-plan-${index}`}>
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white pulse-glow" data-testid={`badge-popular-plan-${index}`}>
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}
                  <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2" data-testid={`text-plan-name-${index}`}>{plan.name}</h3>
                    <div className="text-4xl font-bold text-primary mb-2" data-testid={`text-plan-price-${index}`}>{plan.price}</div>
                    {plan.priceINR && (
                      <div className="text-2xl font-semibold text-accent mb-2" data-testid={`text-plan-price-inr-${index}`}>{plan.priceINR}</div>
                    )}
                    <p className="text-muted-foreground">per month</p>
                  </div>
                    <motion.ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center" 
                          data-testid={`text-plan-feature-${index}-${featureIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                          viewport={{ once: true }}
                        >
                          <Check className="w-4 h-4 text-primary mr-3" />
                          {feature}
                        </motion.li>
                      ))}
                    </motion.ul>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full relative overflow-hidden"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => window.location.href = "/api/login"}
                        data-testid={`button-choose-plan-${index}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">Choose Plan</span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Payment Methods */}
      <motion.section 
        className="py-20 bg-secondary/30" 
        data-testid="payment-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4" data-testid="text-payment-title">Secure Payment Options</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-payment-description">Choose your preferred payment method</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300" data-testid="card-razorpay">
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <CreditCard className="w-8 h-8 text-primary mr-4" />
                  <div>
                    <h3 className="text-xl font-bold" data-testid="text-razorpay-title">Razorpay Gateway</h3>
                    <p className="text-muted-foreground" data-testid="text-razorpay-description">Credit/Debit Cards, UPI, NetBanking</p>
                  </div>
                </motion.div>
                <ul className="space-y-2">
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Instant processing
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Secure transactions
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-primary mr-2" />
                    Multiple payment options
                  </motion.li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 hover:shadow-lg transition-shadow duration-300" data-testid="card-crypto">
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bitcoin className="w-8 h-8 text-accent mr-4" />
                  <div>
                    <h3 className="text-xl font-bold" data-testid="text-crypto-title">Cryptocurrency</h3>
                    <p className="text-muted-foreground" data-testid="text-crypto-description">Bitcoin, Ethereum, USDT</p>
                  </div>
                </motion.div>
                <ul className="space-y-2">
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-accent mr-2" />
                    Anonymous payments
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-accent mr-2" />
                    Global accessibility
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Check className="w-4 h-4 text-accent mr-2" />
                    Low fees
                  </motion.li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary via-accent to-primary" 
        data-testid="cta-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers using our premium RDP and VPS services
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-6 font-semibold bg-white text-primary hover:bg-white/90 transition-all duration-300"
                onClick={() => window.location.href = "/api/login"}
                data-testid="button-get-started-cta"
              >
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-16 bg-secondary border-t border-border" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Server className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold" data-testid="text-footer-brand">STAR RDP/VPS</span>
              </div>
              <p className="text-muted-foreground mb-4" data-testid="text-footer-description">
                Premium remote desktop and virtual private server solutions for professionals and businesses.
              </p>
              <div className="flex space-x-4">
                {telegramChannels.slice(0, 2).map((channel, index) => (
                  <a
                    key={index}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`link-footer-telegram-${index}`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-services-title">Services</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-windows-rdp">Windows RDP</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-linux-vps">Linux VPS</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-premium-plans">Premium Plans</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-custom-solutions">Custom Solutions</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-support-title">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-documentation">Documentation</a></li>
                <li><a href={telegramChannels[0].url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact-support">Contact Support</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-server-status">Server Status</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4" data-testid="text-footer-contact-title">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span data-testid="text-footer-email">fxpl.hi2@gmail.com</span>
                </li>
                <li className="text-muted-foreground flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span data-testid="text-footer-phone">+91 9142292490</span>
                </li>
                <li className="text-muted-foreground flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.958 1.404-5.958s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.741-1.378 0 0-.597 2.28-.744 2.837-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-12.014C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                  <span data-testid="text-footer-telegram">@XSTARxOWNER</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-12" />
          <div className="text-center">
            <p className="text-muted-foreground" data-testid="text-footer-copyright">© 2024 STAR RDP/VPS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}