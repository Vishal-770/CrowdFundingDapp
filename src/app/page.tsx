"use client";

import Footer from "@/components/Footer";
import { TestimonialsColumn } from "@/components/testimonials-columns-1";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}

      {/* Hero Section */}
      <section className="relative py-25 px-6 overflow-hidden">
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
              <Link href={"/campaigns"}>
                <Button size="lg" className="gap-2">
                  Launch Your Campaign <Rocket className="w-4 h-4" />
                </Button>
              </Link>{" "}
              <Link href={"/campaigns"}>
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
              <Card className="rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-background">
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
              <Card className="rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-background">
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
              <Card className="rounded-2xl border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-background">
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
      <section className="py-20 px-6 bg-background">
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

          <div className="flex items-center justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
            <TestimonialsColumn duration={15} />
            <TestimonialsColumn duration={15} className="hidden md:flex" />
            <TestimonialsColumn duration={15} className="hidden lg:flex" />
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
            className="rounded-3xl bg-primary p-1 shadow-xl"
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
                <Link href={"/campaigns"}>
                  <Button size="lg" className="gap-2">
                    Get Started <Rocket className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={"/campaigns"}>
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

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about BlockRaise crowdfunding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What is BlockRaise?
                </AccordionTrigger>
                <AccordionContent>
                  BlockRaise is a decentralized crowdfunding platform built on
                  Ethereum, allowing creators to launch campaigns and backers to
                  support projects transparently using blockchain technology.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How do I create a campaign?
                </AccordionTrigger>
                <AccordionContent>
                  Connect your wallet, click "Create Campaign", fill in your
                  project details, set funding goals and deadlines, and deploy
                  your campaign to the blockchain.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is my money safe?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! Funds are held in smart contracts and only released to
                  creators when goals are met. If a campaign fails, backers can
                  withdraw their contributions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What cryptocurrencies are supported?
                </AccordionTrigger>
                <AccordionContent>
                  Currently, we support ETH and other ERC-20 tokens on the
                  Ethereum network. We're working on expanding to other
                  blockchains.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Are there any fees?
                </AccordionTrigger>
                <AccordionContent>
                  BlockRaise charges a minimal platform fee of 2% on successful
                  campaigns. Gas fees for blockchain transactions are paid by
                  users.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
