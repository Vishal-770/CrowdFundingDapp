"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Zap, Users, Globe, Shield, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Former Ethereum core developer with 8+ years in blockchain technology.",
    },
    {
      name: "Maria Chen",
      role: "Head of Product",
      bio: "Product lead from Coinbase, passionate about decentralized finance.",
    },
    {
      name: "David Kim",
      role: "Smart Contract Architect",
      bio: "Security expert who has audited over 50+ DeFi protocols.",
    },
    {
      name: "Sarah Williams",
      role: "Community Lead",
      bio: "Built communities for multiple Web3 projects with 10k+ members.",
    },
  ];

  const stats = [
    { value: "$42M+", label: "Total Funds Raised" },
    { value: "1,200+", label: "Successful Campaigns" },
    { value: "98%", label: "Success Rate" },
    { value: "50+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground pt-16">
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-primary/10 opacity-30"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6"
            >
              <Zap className="w-4 h-4 mr-2" />
              <span>Our Story</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Revolutionizing
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Crowdfunding
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-10">
              BlockRaise was founded in 2021 with a simple mission: to
              democratize access to funding through blockchain technology. We
              believe in a future where creators and innovators can connect
              directly with their supporters, without intermediaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re building a world where anyone, anywhere can access
                funding for their ideas and projects. By leveraging blockchain
                technology, we&apos;re removing barriers and creating a
                transparent, global funding ecosystem.
              </p>
              <p className="text-muted-foreground">
                Traditional crowdfunding platforms take significant cuts, have
                geographical restrictions, and lack transparency. BlockRaise
                changes all of that with smart contracts, lower fees, and a
                borderless approach.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="rounded-xl border-none shadow-md bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Our Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    A world where funding ideas knows no borders or barriers
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-none shadow-md bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Our Values</h3>
                  <p className="text-sm text-muted-foreground">
                    Transparency, accessibility, and innovation at our core
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-none shadow-md bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Supporting creators from over 50 countries worldwide
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-none shadow-md bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Security First</h3>
                  <p className="text-sm text-muted-foreground">
                    Audited smart contracts and secure fund handling
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A diverse team of blockchain experts, product builders, and
              community enthusiasts passionate about decentralized funding.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="rounded-2xl border-none shadow-md bg-background hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
              <p className="text-muted-foreground mb-6">
                BlockRaise is built on Ethereum, leveraging smart contracts to
                ensure transparency, security, and trustless interactions
                between creators and backers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span className="text-muted-foreground">
                    Smart contracts for secure, automated fund management
                  </span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span className="text-muted-foreground">
                    Multi-signature wallets for added security
                  </span>
                </li>
                <li className="flex items-start">
                  <Globe className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span className="text-muted-foreground">
                    IPFS for decentralized content storage
                  </span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span className="text-muted-foreground">
                    DAO structure for community governance
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 rounded-2xl"
            >
              <div className="bg-background rounded-xl p-6 shadow-md">
                <h3 className="font-semibold mb-4">Technical Highlights</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Security</span>
                      <span className="text-sm text-primary">100%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Uptime</span>
                      <span className="text-sm text-primary">99.9%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "99.9%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Gas Efficiency</span>
                      <span className="text-sm text-primary">95%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">User Experience</span>
                      <span className="text-sm text-primary">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
