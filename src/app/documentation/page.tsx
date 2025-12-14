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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  Users,
  Shield,
  Zap,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background mt-15">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">BlockRaise Documentation</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guide to BlockRaise, the decentralized crowdfunding
              platform built on Ethereum. Learn how to create campaigns,
              contribute to projects, and leverage smart contracts for secure
              funding.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                <Shield className="h-4 w-4 mr-1" />
                Decentralized
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Zap className="h-4 w-4 mr-1" />
                Ethereum Sepolia
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Code className="h-4 w-4 mr-1" />
                Smart Contracts
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    What is BlockRaise?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    BlockRaise is a decentralized crowdfunding platform that
                    empowers creators to launch transparent, secure funding
                    campaigns on the Ethereum blockchain. Unlike traditional
                    crowdfunding platforms, BlockRaise uses smart contracts to
                    ensure funds are managed automatically and transparently.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        No platform fees for successful campaigns
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Automatic refunds if campaigns fail
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Real-time funding progress tracking
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Create Campaign</h4>
                        <p className="text-sm text-muted-foreground">
                          Set your funding goal, deadline, and funding tiers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Share & Promote</h4>
                        <p className="text-sm text-muted-foreground">
                          Share your campaign link with potential backers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Receive Funds</h4>
                        <p className="text-sm text-muted-foreground">
                          Backers contribute ETH directly to your campaign
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Benefits</CardTitle>
                <CardDescription>
                  Why choose BlockRaise over traditional crowdfunding?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <h4 className="font-semibold">Trustless</h4>
                    <p className="text-sm text-muted-foreground">
                      Smart contracts ensure funds are held securely and
                      released only when conditions are met.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Zap className="h-8 w-8 text-primary" />
                    <h4 className="font-semibold">Instant</h4>
                    <p className="text-sm text-muted-foreground">
                      No waiting periods or approval processes. Launch your
                      campaign immediately.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <h4 className="font-semibold">Transparent</h4>
                    <p className="text-sm text-muted-foreground">
                      All transactions are recorded on the blockchain and
                      publicly verifiable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Multi-Tier Funding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Create multiple funding tiers with different contribution
                    levels and rewards. Backers can choose the tier that best
                    matches their support level.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Set custom tier names and amounts</li>
                    <li>• Track backers per tier</li>
                    <li>• Flexible reward structures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Time-Locked Campaigns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Set campaign deadlines with the ability to extend if needed.
                    Campaigns automatically transition to success or failure
                    states.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Configurable duration (days)</li>
                    <li>• Deadline extension capability</li>
                    <li>• Automatic state management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    USD-Based Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Set funding goals in USD with real-time ETH/USD price feeds
                    from Chainlink. Contributions are automatically converted
                    and tracked in USD.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Chainlink price oracle integration</li>
                    <li>• Automatic currency conversion</li>
                    <li>• Stable goal tracking</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Automatic Refunds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If a campaign doesn&apos;t reach its goal by the deadline,
                    backers can automatically claim refunds through the smart
                    contract.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Trustless refund mechanism</li>
                    <li>• No manual intervention required</li>
                    <li>• Full contribution amounts returned</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Smart Contract Architecture</CardTitle>
                <CardDescription>
                  BlockRaise uses a factory pattern with two main contracts
                  deployed on Ethereum Sepolia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">
                      CrowdFundingFactory
                    </h4>
                    <p className="text-muted-foreground">
                      Factory contract for deploying and managing crowdfunding
                      campaigns.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <code className="text-sm">
                        0x1D86a62C58650C58ffb4262FA01a919E46176C89
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• Deploy new campaigns</li>
                      <li>• Track all campaigns globally</li>
                      <li>• User-specific campaign management</li>
                      <li>• Factory-level pause controls</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">CrowdFunding</h4>
                    <p className="text-muted-foreground">
                      Individual campaign contract with funding logic and state
                      management.
                    </p>
                    <div className="bg-muted p-3 rounded-lg">
                      <code className="text-sm">Deployed per campaign</code>
                    </div>
                    <ul className="space-y-1 text-sm">
                      <li>• Multi-tier funding system</li>
                      <li>• USD goal tracking with Chainlink</li>
                      <li>• Automatic state transitions</li>
                      <li>• Refund and withdrawal mechanisms</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Key Functions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Factory Contract</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>
                          <code>createCampaign()</code> - Deploy new campaign
                        </li>
                        <li>
                          <code>getAllCampaigns()</code> - List all campaigns
                        </li>
                        <li>
                          <code>getUserCampaigns()</code> - User&apos;s
                          campaigns
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Campaign Contract</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>
                          <code>fund()</code> - Contribute to campaign
                        </li>
                        <li>
                          <code>withdraw()</code> - Owner withdrawal
                        </li>
                        <li>
                          <code>refund()</code> - Backer refund
                        </li>
                        <li>
                          <code>addTier()</code> - Add funding tier
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="getting-started" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">For Creators</CardTitle>
                  <CardDescription>
                    Start your crowdfunding campaign
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="space-y-2 text-sm">
                    <li>1. Connect your wallet</li>
                    <li>2. Click &quot;Create Campaign&quot;</li>
                    <li>3. Fill in campaign details</li>
                    <li>4. Add funding tiers</li>
                    <li>5. Set deadline and goal</li>
                    <li>6. Deploy and share</li>
                  </ol>
                  <Button asChild className="w-full">
                    <Link href="/campaigns">View Campaigns</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">For Backers</CardTitle>
                  <CardDescription>
                    Support projects you believe in
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="space-y-2 text-sm">
                    <li>1. Browse active campaigns</li>
                    <li>2. Connect your wallet</li>
                    <li>3. Choose funding tier</li>
                    <li>4. Confirm transaction</li>
                    <li>5. Track campaign progress</li>
                  </ol>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/campaigns">Browse Campaigns</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Setup</CardTitle>
                  <CardDescription>Developer prerequisites</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li>• MetaMask or compatible wallet</li>
                    <li>• Sepolia ETH for transactions</li>
                    <li>• Basic understanding of crypto</li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/tutorials">View Tutorials</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Testnet Only</h4>
                      <p className="text-sm text-muted-foreground">
                        BlockRaise is currently deployed on Ethereum Sepolia
                        testnet. Use test ETH for all transactions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Gas Fees</h4>
                      <p className="text-sm text-muted-foreground">
                        All blockchain transactions require gas fees paid in
                        ETH. Keep some ETH in your wallet for transaction costs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Irreversible Actions</h4>
                      <p className="text-sm text-muted-foreground">
                        Blockchain transactions are permanent. Double-check all
                        details before confirming transactions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
