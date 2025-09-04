"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Users, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      {/* Navigation Bar */}

      {/* Hero Section */}
      <section className="relative py-25 px-6 overflow-hidden">
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
              <span>Powered by Ethereum</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              The Future of Crowdfunding is
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Decentralized
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
              BlockRaise empowers creators with transparent, borderless
              fundraising through blockchain technology. No intermediaries, just
              direct community support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href={"/home"}>
                <Button size="lg" className="gap-2">
                  Launch Your Campaign <Rocket className="w-4 h-4" />
                </Button>
              </Link>{" "}
              <Link href={"/home"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 cursor-pointer"
                >
                  Explore Projects <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-muted/50 border rounded-2xl p-1 shadow-lg max-w-4xl w-full"
            >
              <div className="bg-background rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$42M+</div>
                  <div className="text-muted-foreground">
                    Total Funds Raised
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1,200+</div>
                  <div className="text-muted-foreground">
                    Successful Campaigns
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BlockRaise?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;ve reimagined crowdfunding for the Web3 era with
              transparency, security, and community at the core.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn}>
              <Card className="rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast & Global</h3>
                  <p className="text-muted-foreground">
                    Raise funds instantly across borders with Ethereum-powered
                    smart contracts. No waiting for bank approvals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Secure & Transparent
                  </h3>
                  <p className="text-muted-foreground">
                    Every transaction is verifiable on-chain, ensuring trustless
                    crowdfunding with no hidden fees.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Card className="rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Community Driven
                  </h3>
                  <p className="text-muted-foreground">
                    Backers and creators collaborate directly, without
                    intermediaries taking a large cut of funds.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Innovators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what creators are saying about their experience with
              BlockRaise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border-none shadow-md bg-background hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Jane Doe</h4>
                      <p className="text-sm text-muted-foreground">
                        Indie Game Developer
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;BlockRaise helped me fund my game project in just 2
                    weeks. The transparency of blockchain gave my backers
                    confidence.&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border-none shadow-md bg-background hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">JS</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">John Smith</h4>
                      <p className="text-sm text-muted-foreground">
                        Climate Tech Founder
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;As an international startup, traditional crowdfunding
                    platforms had too many restrictions. BlockRaise was the
                    perfect solution.&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="rounded-2xl border-none shadow-md bg-background hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold">AR</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Alex Rivera</h4>
                      <p className="text-sm text-muted-foreground">
                        Open Source Maintainer
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;The Web3 community rallied behind our project in ways
                    traditional platforms never allowed. The future of funding
                    is here.&quot;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-1 shadow-xl"
          >
            <div className="bg-background rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to launch your Web3 campaign?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of creators who are already leveraging the power
                of blockchain for their fundraising needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/home"}>
                  <Button size="lg" className="gap-2">
                    Get Started <Rocket className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={"/home"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 cursor-pointer"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
