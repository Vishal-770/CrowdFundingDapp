"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  MapPin,
  Send,
  Zap,
  ChevronRight,
} from "lucide-react";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = () => {
    setFormData({
      ...formData,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground py-20">
      {/* Navigation Bar - Same as landing page */}

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
              <MessageSquare className="w-4 h-4 mr-2" />
              <span>Get in Touch</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Talk About Your
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Web3 Project
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-10">
              Have questions about BlockRaise or need support with your
              campaign? Our team is here to help you succeed with decentralized
              crowdfunding.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl border-none shadow-lg bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-sm font-medium mb-2 block"
                        >
                          Full Name
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-medium mb-2 block"
                        >
                          Email Address
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium mb-2 block"
                        >
                          Subject
                        </label>
                        <Input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="w-full"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="text-sm font-medium mb-2 block"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          rows={5}
                          className="w-full"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels. We typically
                  respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">
                      support@blockraise.io
                    </p>
                    <p className="text-muted-foreground">
                      partnerships@blockraise.io
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Support</h3>
                    <p className="text-muted-foreground">
                      Join our Discord server
                    </p>
                    <p className="text-muted-foreground">
                      Telegram: @blockraise_support
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Based In</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                    <p className="text-muted-foreground">Berlin, Germany</p>
                  </div>
                </motion.div>
              </div>

              {/* FAQ Quick Links */}
              <Card className="rounded-2xl border-none shadow-lg bg-gradient-to-b from-background to-muted/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Common Questions</h3>
                  <div className="space-y-3">
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      <span>How do I create a campaign?</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      <span>What are the fees?</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      <span>How do withdrawals work?</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                    >
                      <span>View all FAQs</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to launch your Web3 campaign?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of creators who are already leveraging the power of
              blockchain for their fundraising needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Get Started <Zap className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Learn More <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Same as landing page */}
    </div>
  );
}
