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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Users,
  Settings,
  Wallet,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  BookOpen,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-background mt-15">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Play className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">BlockRaise Tutorials</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Step-by-step guides to help you get started with BlockRaise. Learn
              how to create campaigns, contribute to projects, and make the most
              of decentralized crowdfunding.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <Tabs defaultValue="creators" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="creators">For Campaign Creators</TabsTrigger>
            <TabsTrigger value="backers">For Backers</TabsTrigger>
          </TabsList>

          <TabsContent value="creators" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Getting Started as a Creator
                  </CardTitle>
                  <CardDescription>
                    Follow these steps to launch your first crowdfunding
                    campaign on BlockRaise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Set Up Your Wallet
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Install MetaMask and connect to Sepolia testnet
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              <li>• Download MetaMask extension</li>
                              <li>• Create or import a wallet</li>
                              <li>• Switch to Sepolia testnet</li>
                              <li>• Get test ETH from faucet</li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold">Access BlockRaise</h4>
                            <p className="text-sm text-muted-foreground">
                              Navigate to the BlockRaise platform and connect
                              your wallet
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Create Your Campaign
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Fill in your campaign details
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              <li>• Campaign name and description</li>
                              <li>• Funding goal in USD</li>
                              <li>• Campaign duration</li>
                              <li>• Add funding tiers</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            4
                          </div>
                          <div>
                            <h4 className="font-semibold">Deploy Campaign</h4>
                            <p className="text-sm text-muted-foreground">
                              Confirm the transaction to deploy your campaign
                              contract
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            5
                          </div>
                          <div>
                            <h4 className="font-semibold">Share & Promote</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Spread the word about your campaign
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              <li>• Share campaign link</li>
                              <li>• Post on social media</li>
                              <li>• Engage with community</li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            6
                          </div>
                          <div>
                            <h4 className="font-semibold">Monitor & Manage</h4>
                            <p className="text-sm text-muted-foreground">
                              Track progress and manage your campaign
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Pro Tips for Success
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • Set realistic funding goals based on your project
                          scope
                        </li>
                        <li>
                          • Create compelling descriptions with clear project
                          benefits
                        </li>
                        <li>
                          • Offer attractive funding tiers with meaningful
                          rewards
                        </li>
                        <li>
                          • Engage actively with your backers throughout the
                          campaign
                        </li>
                        <li>• Have a marketing plan ready before launching</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Campaign Management</CardTitle>
                  <CardDescription>
                    Tools and features for managing your campaign
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="tiers">
                      <AccordionTrigger>Adding Funding Tiers</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>
                            Funding tiers allow backers to choose different
                            contribution levels:
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Early Bird - $10 (limited availability)</li>
                            <li>Supporter - $25 (digital rewards)</li>
                            <li>Patron - $50 (exclusive access)</li>
                            <li>Champion - $100 (premium benefits)</li>
                          </ul>
                          <p className="mt-2">
                            Each tier tracks the number of backers who
                            contributed at that level.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="deadline">
                      <AccordionTrigger>
                        Extending Campaign Deadline
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>
                            If your campaign needs more time, you can extend the
                            deadline:
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Only possible for active campaigns</li>
                            <li>Extension is in days (e.g., add 7 days)</li>
                            <li>Can only be done by campaign owner</li>
                            <li>Backers are notified of changes</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pause">
                      <AccordionTrigger>Pausing Your Campaign</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>Temporarily pause contributions if needed:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Prevents new contributions</li>
                            <li>Existing backers can still view campaign</li>
                            <li>Can be toggled on/off by owner</li>
                            <li>Doesn&apos;t affect campaign deadline</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign States & Actions</CardTitle>
                  <CardDescription>
                    Understanding campaign lifecycle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h4 className="font-semibold">Active</h4>
                        <p className="text-xs text-muted-foreground">
                          Accepting contributions
                        </p>
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h4 className="font-semibold">Successful</h4>
                        <p className="text-xs text-muted-foreground">
                          Goal reached - withdraw funds
                        </p>
                      </div>

                      <div className="text-center p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h4 className="font-semibold">Failed</h4>
                        <p className="text-xs text-muted-foreground">
                          Deadline passed - refunds available
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Available Actions by State
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-blue-600 dark:text-blue-400">
                            Active
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Accept contributions</li>
                            <li>• Add/remove tiers</li>
                            <li>• Extend deadline</li>
                            <li>• Pause/unpause</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-600 dark:text-green-400">
                            Successful
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Withdraw funds</li>
                            <li>• View backers</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-red-600 dark:text-red-400">
                            Failed
                          </h5>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Backers can refund</li>
                            <li>• View final stats</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="backers" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Getting Started as a Backer
                  </CardTitle>
                  <CardDescription>
                    Learn how to support projects and contribute to campaigns on
                    BlockRaise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold">Set Up Wallet</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Get ready to contribute with cryptocurrency
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              <li>• Install MetaMask</li>
                              <li>• Connect to Sepolia</li>
                              <li>• Get test ETH</li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold">Browse Campaigns</h4>
                            <p className="text-sm text-muted-foreground">
                              Explore active crowdfunding campaigns
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold">Choose Your Tier</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Select the contribution level that suits you
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                              <li>• Review tier benefits</li>
                              <li>• Check minimum amounts</li>
                              <li>• Consider your budget</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            4
                          </div>
                          <div>
                            <h4 className="font-semibold">Make Contribution</h4>
                            <p className="text-sm text-muted-foreground">
                              Send ETH directly to the campaign contract
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            5
                          </div>
                          <div>
                            <h4 className="font-semibold">Track Progress</h4>
                            <p className="text-sm text-muted-foreground">
                              Monitor campaign progress and your contribution
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                            6
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              Claim Rewards/Refunds
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Get rewards or refund based on campaign outcome
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        Backer Safety Tips
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • Always verify campaign details before contributing
                        </li>
                        <li>
                          • Check the campaign owner&apos;s address and
                          reputation
                        </li>
                        <li>
                          • Understand that contributions are final once
                          confirmed
                        </li>
                        <li>• Keep records of your transactions</li>
                        <li>• Use test ETH first to understand the process</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Understanding Contributions</CardTitle>
                  <CardDescription>
                    How funding works on BlockRaise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="currency">
                      <AccordionTrigger>Currency Conversion</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>
                            BlockRaise uses USD for goals but accepts ETH
                            payments:
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Goals are set in USD (stable value)</li>
                            <li>Contributions are made in ETH</li>
                            <li>Real-time ETH/USD conversion via Chainlink</li>
                            <li>Your contribution value is locked in USD</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tiers">
                      <AccordionTrigger>
                        Funding Tiers Explained
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>Campaigns offer multiple contribution levels:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Each tier has a minimum USD amount</li>
                            <li>
                              You must contribute at least the tier amount
                            </li>
                            <li>You can contribute more than the minimum</li>
                            <li>
                              Tiers help creators offer different reward levels
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="refunds">
                      <AccordionTrigger>
                        When Can I Get Refunds?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>Automatic refunds are available when:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Campaign fails to reach its goal</li>
                            <li>Deadline passes without success</li>
                            <li>You contributed to the failed campaign</li>
                            <li>
                              You call the refund function on the contract
                            </li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managing Your Contributions</CardTitle>
                  <CardDescription>
                    Track and manage your backed campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        <div>
                          <h4 className="font-semibold">
                            View Your Contributions
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Check all campaigns you&apos;ve backed and your
                            contribution amounts
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-semibold">
                            Track Campaign Progress
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Monitor funding progress and campaign status in
                            real-time
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Shield className="h-5 w-5 text-orange-500" />
                        <div>
                          <h4 className="font-semibold">Claim Refunds</h4>
                          <p className="text-sm text-muted-foreground">
                            If a campaign fails, claim your full contribution
                            back
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Important Reminders
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Contributions are irreversible once confirmed</li>
                        <li>• Always double-check campaign details</li>
                        <li>• Keep your wallet secure and backed up</li>
                        <li>• Transaction fees (gas) are paid in ETH</li>
                        <li>• Use testnet first to practice</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/documentation">
                <BookOpen className="h-4 w-4 mr-2" />
                Full Documentation
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/api">
                <Settings className="h-4 w-4 mr-2" />
                API Reference
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/help-center">
                <Users className="h-4 w-4 mr-2" />
                Help Center
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
