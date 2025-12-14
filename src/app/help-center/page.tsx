"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Search,
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  MessageCircle,
  Mail,
  BookOpen,
  Play,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-background mt-15">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Help Center</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions and get help with BlockRaise.
              Browse our FAQ or contact support if you need assistance.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search for help..." className="pl-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Help */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Link href="#getting-started" className="block">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">Getting Started</h4>
                        <p className="text-sm text-muted-foreground">
                          New to BlockRaise? Start here
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link href="#troubleshooting" className="block">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <div>
                        <h4 className="font-semibold">Troubleshooting</h4>
                        <p className="text-sm text-muted-foreground">
                          Common issues and solutions
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link href="#contact" className="block">
                    <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <MessageCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">Contact Support</h4>
                        <p className="text-sm text-muted-foreground">
                          Get help from our team
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    How do I connect my wallet?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    What is test ETH and how do I get it?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Why did my transaction fail?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    How do refunds work?
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Campaign states explained
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card id="getting-started">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Basic questions for new users</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="what-is-blockraise">
                    <AccordionTrigger>What is BlockRaise?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground mb-4">
                        BlockRaise is a decentralized crowdfunding platform
                        built on Ethereum. It allows creators to launch
                        transparent, secure funding campaigns using smart
                        contracts, and enables backers to support projects with
                        cryptocurrency.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                              Key Benefits
                            </p>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                              <li>
                                • No platform fees for successful campaigns
                              </li>
                              <li>• Automatic refunds if campaigns fail</li>
                              <li>• Transparent and verifiable transactions</li>
                              <li>
                                • Decentralized - no single point of failure
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="wallet-setup">
                    <AccordionTrigger>
                      How do I set up my wallet?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          You&apos;ll need a Web3 wallet to interact with
                          BlockRaise. We recommend MetaMask.
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                          <li>Download MetaMask from the official website</li>
                          <li>Create a new wallet or import an existing one</li>
                          <li>Switch to the Sepolia test network</li>
                          <li>Get test ETH from a faucet (see below)</li>
                          <li>Connect your wallet to BlockRaise</li>
                        </ol>
                        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Security Warning
                              </p>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                Never share your seed phrase or private keys
                                with anyone. BlockRaise will never ask for your
                                private information.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="test-eth">
                    <AccordionTrigger>
                      What is test ETH and how do I get it?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Test ETH is fake Ethereum used on test networks like
                          Sepolia. It&apos;s free and used for testing without
                          real money.
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-semibold">Popular Faucets:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="p-3 border rounded-lg">
                              <p className="font-medium">
                                Alchemy Sepolia Faucet
                              </p>
                              <p className="text-sm text-muted-foreground">
                                https://sepoliafaucet.com
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                asChild
                              >
                                <a
                                  href="https://sepoliafaucet.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Visit{" "}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                            <div className="p-3 border rounded-lg">
                              <p className="font-medium">
                                Infura Sepolia Faucet
                              </p>
                              <p className="text-sm text-muted-foreground">
                                https://www.infura.io/faucet/sepolia
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                asChild
                              >
                                <a
                                  href="https://www.infura.io/faucet/sepolia"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Visit{" "}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Note: You may need to create an account or complete
                          captcha verification on some faucets.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="create-campaign">
                    <AccordionTrigger>
                      How do I create a campaign?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                          <li>Connect your wallet to BlockRaise</li>
                          <li>Click &quot;Create Campaign&quot; button</li>
                          <li>
                            Fill in campaign details (name, description, goal,
                            duration)
                          </li>
                          <li>
                            Add funding tiers with names and minimum amounts
                          </li>
                          <li>Review and confirm the transaction</li>
                          <li>
                            Share your campaign link with potential backers
                          </li>
                        </ol>
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                                Pro Tip
                              </p>
                              <p className="text-sm text-green-700 dark:text-green-300">
                                Start with a realistic goal and clear
                                description. Include what backers will receive
                                at different tiers.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card id="troubleshooting">
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
                <CardDescription>
                  Common issues and their solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="transaction-failed">
                    <AccordionTrigger>
                      Why did my transaction fail?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Several factors can cause transaction failures:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline">1</Badge>
                            <div>
                              <h4 className="font-semibold">
                                Insufficient Gas
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                Make sure you have enough ETH for gas fees. Even
                                with test ETH, you need some for transaction
                                costs.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge variant="outline">2</Badge>
                            <div>
                              <h4 className="font-semibold">Wrong Network</h4>
                              <p className="text-sm text-muted-foreground">
                                Ensure you&apos;re connected to Sepolia testnet,
                                not mainnet.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge variant="outline">3</Badge>
                            <div>
                              <h4 className="font-semibold">Invalid Amount</h4>
                              <p className="text-sm text-muted-foreground">
                                Check that your contribution meets the minimum
                                tier requirement.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge variant="outline">4</Badge>
                            <div>
                              <h4 className="font-semibold">Campaign State</h4>
                              <p className="text-sm text-muted-foreground">
                                Verify the campaign is still active and
                                accepting contributions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="wallet-not-connecting">
                    <AccordionTrigger>
                      My wallet won&apos;t connect
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Try these solutions:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Refresh the page and try connecting again</li>
                          <li>• Make sure MetaMask is unlocked</li>
                          <li>
                            • Check if you&apos;re on the correct network
                            (Sepolia)
                          </li>
                          <li>• Try disabling and re-enabling the extension</li>
                          <li>• Clear your browser cache and cookies</li>
                          <li>
                            • Make sure you&apos;re using a supported browser
                          </li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-4">
                          If issues persist, try using a different browser or
                          device.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contribution-not-showing">
                    <AccordionTrigger>
                      My contribution isn&apos;t showing up
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Blockchain transactions take time to confirm.
                          Here&apos;s what to check:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>
                            • Wait for transaction confirmation (usually 15-30
                            seconds)
                          </li>
                          <li>• Check transaction status on Etherscan</li>
                          <li>• Refresh the campaign page</li>
                          <li>
                            • Verify you&apos;re viewing the correct campaign
                          </li>
                          <li>• Check your wallet transaction history</li>
                        </ul>
                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Transaction Speed
                              </p>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                Sepolia testnet transactions are usually fast,
                                but network congestion can cause delays.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="refund-not-received">
                    <AccordionTrigger>
                      I didn&apos;t receive my refund
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground mb-4">
                          Refunds are processed automatically when campaigns
                          fail. If you haven&apos;t received yours:
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>
                            • Confirm the campaign has actually failed (past
                            deadline, goal not met)
                          </li>
                          <li>
                            • Check that you contributed to this specific
                            campaign
                          </li>
                          <li>
                            • Call the refund function on the campaign contract
                          </li>
                          <li>• Wait for transaction confirmation</li>
                          <li>
                            • Check your wallet balance after confirmation
                          </li>
                        </ul>
                        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Manual Refund
                              </p>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                If automatic refund doesn&apos;t work, you may
                                need to manually call the refund function.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card id="contact">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">Email Support</h4>
                        <p className="text-sm text-muted-foreground">
                          support@blockraise.com
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send us an email with details about your issue. Include
                      your wallet address, transaction hashes, and screenshots
                      if applicable.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">Community Forum</h4>
                        <p className="text-sm text-muted-foreground">
                          Join our Discord
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect with other users and get help from the community.
                      Share your experiences and learn from others.
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">
                    Before Contacting Support
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">What to Include:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Your wallet address</li>
                        <li>• Transaction hash (if applicable)</li>
                        <li>• Campaign address (if applicable)</li>
                        <li>• Steps to reproduce the issue</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Response Time:</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Email: 24-48 hours</li>
                        <li>• Urgent issues: Check Discord</li>
                        <li>• Testnet issues: Usually quick</li>
                        <li>• Mainnet issues: Priority support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Can&apos;t find what you&apos;re looking for? Check our
                    documentation or tutorials.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild variant="outline">
                      <Link href="/documentation">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Documentation
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/tutorials">
                        <Play className="h-4 w-4 mr-2" />
                        Tutorials
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
