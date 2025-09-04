"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-6"
        >
          BlockRaise – Web3 Crowdfunding on Ethereum
        </motion.h1>
        <p className="text-lg max-w-2xl mb-8">
          Empower creators and backers with transparent, decentralized
          fundraising. Secure, borderless, and community-driven.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Start a Campaign</Button>
          <Button size="lg" variant="outline">
            Explore Projects
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Rocket className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Global</h3>
              <p className="text-sm text-muted-foreground">
                Raise funds instantly across borders with Ethereum-powered smart
                contracts.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <ShieldCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Secure & Transparent
              </h3>
              <p className="text-sm text-muted-foreground">
                Every transaction is verifiable on-chain, ensuring trustless
                crowdfunding.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Backers and creators collaborate directly, without
                intermediaries.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to launch your campaign?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Join the future of decentralized crowdfunding. Raise funds securely
          and reach a global audience today.
        </p>
        <Button size="lg">Get Started</Button>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BlockRaise. All rights reserved.
      </footer>
    </div>
  );
}
