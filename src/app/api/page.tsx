"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Code,
  FileText,
  Settings,
  ExternalLink,
  Copy,
  AlertTriangle,
  Info,
  Download,
  Zap,
  Shield,
  DollarSign,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  TrendingUp,
  Calendar,
  Target,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

export default function ApiPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Code className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                BlockRaise API Reference
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Complete API documentation for BlockRaise smart contracts.
              Interact directly with the blockchain for advanced integrations
              and custom applications.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <FileText className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Solidity Contracts
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <Settings className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Ethereum Sepolia
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <Code className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Web3 Integration
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Chainlink Oracle
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Decentralized
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-12">
        <Tabs defaultValue="factory" className="space-y-6 md:space-y-8">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1">
            <TabsTrigger
              value="factory"
              className="text-sm md:text-base py-2 md:py-3"
            >
              CrowdFundingFactory
            </TabsTrigger>
            <TabsTrigger
              value="campaign"
              className="text-sm md:text-base py-2 md:py-3"
            >
              CrowdFunding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="factory" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    CrowdFundingFactory Contract
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        "0x1D86a62C58650C58ffb4262FA01a919E46176C89"
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Address
                  </Button>
                </CardTitle>
                <CardDescription>
                  Factory contract for deploying and managing crowdfunding
                  campaigns
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Sepolia Testnet</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    0x1D86a62C58650C58ffb4262FA01a919E46176C89
                  </code>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href="https://sepolia.etherscan.io/address/0x1D86a62C58650C58ffb4262FA01a919E46176C89"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="create-campaign">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        createCampaign()
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Write
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Creates a new crowdfunding campaign by deploying a
                          CrowdFunding contract.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <code>string _name</code>
                              <span className="text-muted-foreground">
                                Campaign name
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <code>string _description</code>
                              <span className="text-muted-foreground">
                                Campaign description
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <code>uint256 _goal</code>
                              <span className="text-muted-foreground">
                                Goal in USD (8 decimals)
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <code>uint256 _durationInDays</code>
                              <span className="text-muted-foreground">
                                Campaign duration
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <p className="text-sm text-muted-foreground">
                            None (emits CampaignCreated event)
                          </p>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Example</h4>
                          <pre className="text-xs overflow-x-auto">
                            {`await contract.createCampaign(
  "My Project",
  "Building something amazing",
  100000000000, // $1000 (8 decimals)
  30 // 30 days
);`}
                          </pre>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-campaigns">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getAllCampaigns()
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns an array of all deployed campaigns.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <div className="text-sm">
                            <code>Campaign[] memory</code> - Array of campaign
                            structs containing:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>
                                <code>address campaignAddress</code>
                              </li>
                              <li>
                                <code>address owner</code>
                              </li>
                              <li>
                                <code>string name</code>
                              </li>
                              <li>
                                <code>uint256 creationTime</code>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-user-campaigns">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getUserCampaigns(address)
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns all campaigns created by a specific user.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>address _user</code> - User address
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <p className="text-sm text-muted-foreground">
                            Campaign[] memory - User&apos;s campaigns
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-campaign-details">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getCampaignDetails(address)
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns detailed information about a specific
                          campaign.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>address _campaignAddress</code> - Campaign
                            contract address
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <div className="text-sm space-y-1">
                            <div>
                              <code>string _name</code> - Campaign name
                            </div>
                            <div>
                              <code>string _description</code> - Campaign
                              description
                            </div>
                            <div>
                              <code>uint256 _goal</code> - Goal in USD
                            </div>
                            <div>
                              <code>uint256 _deadline</code> - Unix timestamp
                            </div>
                            <div>
                              <code>address _owner</code> - Campaign owner
                            </div>
                            <div>
                              <code>bool _paused</code> - Pause status
                            </div>
                            <div>
                              <code>uint256 _balance</code> - Contract balance
                              in wei
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="toggle-pause">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">togglePause()</span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Toggles the factory pause state. When paused, no new
                          campaigns can be created.
                        </p>

                        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                                Owner Only
                              </h4>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                This function can only be called by the factory
                                owner.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-campaigns-count">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getCampaignsCount()
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns the total number of campaigns created through
                          this factory.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <p className="text-sm text-muted-foreground">
                            <code>uint256</code> - Total number of campaigns
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-user-campaigns-count">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getUserCampaignsCount(address)
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns the number of campaigns created by a specific
                          user.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>address _user</code> - User address
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <p className="text-sm text-muted-foreground">
                            <code>uint256</code> - Number of user&apos;s
                            campaigns
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-campaign-by-index">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getCampaignByIndex(uint256)
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns campaign details by index in the global
                          campaigns array.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>uint256 _index</code> - Campaign index
                            (0-based)
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <div className="text-sm space-y-1">
                            <div>
                              <code>address campaignAddress</code> - Campaign
                              contract address
                            </div>
                            <div>
                              <code>address owner</code> - Campaign owner
                            </div>
                            <div>
                              <code>string name</code> - Campaign name
                            </div>
                            <div>
                              <code>uint256 creationTime</code> - Unix timestamp
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transfer-ownership">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        transferOwnership(address)
                      </span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Transfers ownership of the factory contract to a new
                          address.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>address _newOwner</code> - New owner address
                          </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                                Irreversible Action
                              </h4>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                This action cannot be undone. Make sure the new
                                owner address is correct.
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
          </TabsContent>

          <TabsContent value="campaign" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CrowdFunding Contract
                </CardTitle>
                <CardDescription>
                  Individual campaign contract with funding logic and state
                  management
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Deployed per Campaign</Badge>
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Each campaign has its own contract
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="fund">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">fund(uint256)</span>
                      <Badge variant="default" className="ml-2">
                        Payable
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Contribute ETH to a specific funding tier. The
                          contribution must meet or exceed the tier&apos;s USD
                          requirement.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>uint256 _index</code> - Tier index (0-based)
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                                Payable Function
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                Send ETH with this function call. The amount
                                must convert to at least the tier&apos;s USD
                                value.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campaign must be active</li>
                            <li>• Campaign must not be paused</li>
                            <li>• Goal must not be reached</li>
                            <li>• Deadline must not have passed</li>
                            <li>• Valid tier index</li>
                            <li>• Sufficient ETH sent</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="withdraw">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">withdraw()</span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Withdraw all funds from a successful campaign. Can
                          only be called once.
                        </p>

                        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                                One-time Action
                              </h4>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                Funds can only be withdrawn once from a
                                successful campaign.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campaign must be successful</li>
                            <li>• Caller must be campaign owner</li>
                            <li>• Funds must not have been withdrawn</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="refund">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">refund()</span>
                      <Badge variant="secondary" className="ml-2">
                        Backer Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Claim refund for contributions to a failed campaign.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campaign must be failed</li>
                            <li>• Caller must have contributed</li>
                            <li>• Funds must not have been withdrawn</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="add-tier">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        addTier(string, uint256)
                      </span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Add a new funding tier to an active campaign.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <code>string _name</code>
                              <span className="text-muted-foreground">
                                Tier name
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <code>uint256 _amount</code>
                              <span className="text-muted-foreground">
                                Minimum USD amount (8 decimals)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campaign must be active</li>
                            <li>• Caller must be owner</li>
                            <li>• Amount must be greater than 0</li>
                            <li>• Amount must not exceed goal</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-campaign-details">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getCampaignDetails()
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns comprehensive campaign information.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <div className="text-sm space-y-1">
                            <div>
                              <code>string name</code> - Campaign name
                            </div>
                            <div>
                              <code>string description</code> - Campaign
                              description
                            </div>
                            <div>
                              <code>uint256 goal</code> - Goal in USD (8
                              decimals)
                            </div>
                            <div>
                              <code>uint256 deadline</code> - Unix timestamp
                            </div>
                            <div>
                              <code>address owner</code> - Campaign owner
                            </div>
                            <div>
                              <code>bool paused</code> - Pause status
                            </div>
                            <div>
                              <code>uint8 state</code> - Campaign state
                              (0=Active, 1=Successful, 2=Failed)
                            </div>
                            <div>
                              <code>uint256 raised</code> - Wei raised
                            </div>
                            <div>
                              <code>uint256 backers</code> - Number of backers
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-tiers">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">getTiers()</span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns all funding tiers for the campaign.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <div className="text-sm">
                            <code>Tier[] memory</code> - Array of tier structs
                            containing:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>
                                <code>string name</code> - Tier name
                              </li>
                              <li>
                                <code>uint256 amount</code> - USD amount (8
                                decimals)
                              </li>
                              <li>
                                <code>uint256 backers</code> - Number of backers
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-latest-eth-price">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getLatestETHPrice()
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns the latest ETH/USD price from Chainlink
                          oracle.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <p className="text-sm text-muted-foreground">
                            <code>int256</code> - ETH price in USD with 8
                            decimals
                          </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                                Chainlink Integration
                              </h4>
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                Uses Chainlink ETH/USD price feed for accurate
                                currency conversion.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="remove-tier">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        removeTier(uint256)
                      </span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Removes a funding tier from an active campaign.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>uint256 _index</code> - Tier index to remove
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campaign must be active</li>
                            <li>• Caller must be owner</li>
                            <li>• Tier index must exist</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="toggle-pause-campaign">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">togglePause()</span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Toggles the campaign pause state. When paused, no new
                          contributions can be made.
                        </p>

                        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start gap-2">
                            <Pause className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                                Pause Control
                              </h4>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                Use this to temporarily halt funding during
                                emergencies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="extend-deadline">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        extendDeadline(uint256)
                      </span>
                      <Badge variant="destructive" className="ml-2">
                        Owner Only
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Extends the campaign deadline by the specified number
                          of days.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Parameters</h4>
                          <div className="text-sm">
                            <code>uint256 _days</code> - Number of days to
                            extend
                          </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Campaign must be active</li>
                            <li>• Caller must be owner</li>
                            <li>• Extension days must be greater than 0</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="get-contract-balance">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        getContractBalance()
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Returns the current ETH balance of the campaign
                          contract.
                        </p>

                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Returns</h4>
                          <p className="text-sm text-muted-foreground">
                            <code>uint256</code> - Contract balance in wei
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="convert-functions">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        Conversion Functions
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Various functions for converting between USD and ETH
                          values.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              convertUSDToWei(uint256)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Converts USD amount (8 decimals) to wei equivalent
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              convertWeiToUSD(uint256)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Converts wei amount to USD equivalent (8 decimals)
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              convertETHToUSD(uint256)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Alias for convertWeiToUSD
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              getMinimumETHForTier(uint256)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns minimum ETH needed for a specific tier
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="progress-functions">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        Progress & Status Functions
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Functions to check campaign progress and status.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              getProgress()
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns campaign progress as percentage (0-100)
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              getTimeRemaining()
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns seconds remaining until deadline
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              getCampaignStatus()
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns current campaign state
                              (Active/Successful/Failed)
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              isDeadlinePassed()
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns true if campaign deadline has passed
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="backer-functions">
                    <AccordionTrigger>
                      <span className="font-mono text-sm">
                        Backer Functions
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Read
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Functions to retrieve backer information and check
                          permissions.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              getBackerDetails(address)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns backer&apos;s contribution details and
                              funded tiers
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              hasFundedTier(address, uint256)
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Checks if a backer has funded a specific tier
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              canWithdraw()
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Returns true if owner can withdraw funds
                            </p>
                          </div>
                          <div className="bg-muted p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">canRefund()</h4>
                            <p className="text-sm text-muted-foreground">
                              Returns true if caller can claim refund
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Integration Examples */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Integration Examples</CardTitle>
            <CardDescription>
              Code examples for integrating with BlockRaise contracts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="solidity">Solidity</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Connect to Factory Contract
                  </h4>
                  <pre className="text-xs overflow-x-auto">
                    {`import { ethers } from 'ethers';

const factoryAddress = '0x1D86a62C58650C58ffb4262FA01a919E46176C89';
const factoryABI = [...]; // Factory contract ABI

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const factoryContract = new ethers.Contract(
  factoryAddress,
  factoryABI,
  signer
);`}
                  </pre>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Create New Campaign</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`const tx = await factoryContract.createCampaign(
  "My Project",
  "Building something amazing",
  ethers.utils.parseUnits("1000", 8), // $1000
  30 // 30 days
);

await tx.wait();
console.log("Campaign created!");`}
                  </pre>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Contribute to Campaign</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`const campaignAddress = '0x...'; // From createCampaign event
const campaignABI = [...]; // Campaign contract ABI

const campaignContract = new ethers.Contract(
  campaignAddress,
  campaignABI,
  signer
);

// Contribute to tier 0 with 0.1 ETH
const tx = await campaignContract.fund(0, {
  value: ethers.utils.parseEther("0.1")
});

await tx.wait();`}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="solidity" className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Import Interfaces</h4>
                  <pre className="text-xs overflow-x-auto">
                    {`import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface ICrowdFundingFactory {
    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _durationInDays
    ) external;

    function getAllCampaigns() external view returns (
        address[] memory addresses,
        address[] memory owners,
        string[] memory names
    );
}

interface ICrowdFunding {
    function fund(uint256 _tierIndex) external payable;
    function getCampaignDetails() external view returns (
        string memory, string memory, uint256, uint256,
        address, bool, uint8, uint256, uint256
    );
}`}
                  </pre>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Interact with Contracts
                  </h4>
                  <pre className="text-xs overflow-x-auto">
                    {`contract BlockRaiseIntegration {
    ICrowdFundingFactory factory = ICrowdFundingFactory(
        0x1D86a62C58650C58ffb4262FA01a919E46176C89
    );

    function createCampaign(
        string memory name,
        string memory description,
        uint256 goal,
        uint256 duration
    ) external {
        factory.createCampaign(name, description, goal, duration);
    }

    function contribute(address campaignAddress, uint256 tierIndex) external payable {
        ICrowdFunding campaign = ICrowdFunding(campaignAddress);
        campaign.fund{value: msg.value}(tierIndex);
    }
}`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Events Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Contract Events
            </CardTitle>
            <CardDescription>
              Important events emitted by the smart contracts for tracking and
              integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="factory-events" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="factory-events">Factory Events</TabsTrigger>
                <TabsTrigger value="campaign-events">
                  Campaign Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="factory-events" className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    CampaignCreated
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Emitted when a new campaign is created through the factory.
                  </p>
                  <div className="text-xs font-mono bg-background p-2 rounded">
                    event CampaignCreated(address indexed campaignAddress,
                    address indexed owner, string name, uint256 goal, uint256
                    deadline);
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="campaign-events" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      Funded
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emitted when a backer contributes to a campaign.
                    </p>
                    <div className="text-xs font-mono bg-background p-2 rounded">
                      event Funded(address indexed backer, uint256 indexed
                      tierIndex, uint256 usdValue, uint256 weiValue);
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-blue-500" />
                      Withdrawn
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emitted when campaign owner withdraws funds.
                    </p>
                    <div className="text-xs font-mono bg-background p-2 rounded">
                      event Withdrawn(address indexed owner, uint256 amount);
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Refunded
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emitted when a backer claims a refund.
                    </p>
                    <div className="text-xs font-mono bg-background p-2 rounded">
                      event Refunded(address indexed backer, uint256 amount);
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-500" />
                      TierAdded
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emitted when a new funding tier is added.
                    </p>
                    <div className="text-xs font-mono bg-background p-2 rounded">
                      event TierAdded(uint256 indexed tierIndex, string name,
                      uint256 amount);
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      DeadlineExtended
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emitted when campaign deadline is extended.
                    </p>
                    <div className="text-xs font-mono bg-background p-2 rounded">
                      event DeadlineExtended(uint256 newDeadline);
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Play className="h-4 w-4 text-indigo-500" />
                      CampaignStateChanged
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Emitted when campaign state changes.
                    </p>
                    <div className="text-xs font-mono bg-background p-2 rounded">
                      event CampaignStateChanged(CampaignState newState);
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Contract Source & ABI */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Contract Source & ABI
            </CardTitle>
            <CardDescription>
              Download contract source code and ABI files for integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">CrowdFundingFactory</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="/contracts/CrowdFundingFactory.sol" download>
                      <FileText className="h-4 w-4 mr-2" />
                      Source Code (.sol)
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href="/artifacts-zk/contracts/CrowdFundingFactory.sol/CrowdFundingFactory.json"
                      download
                    >
                      <Code className="h-4 w-4 mr-2" />
                      ABI & Bytecode (.json)
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">CrowdFunding</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href="/contracts/CrowdFunding.sol" download>
                      <FileText className="h-4 w-4 mr-2" />
                      Source Code (.sol)
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href="/artifacts-zk/contracts/CrowdFunding.sol/CrowdFunding.json"
                      download
                    >
                      <Code className="h-4 w-4 mr-2" />
                      ABI & Bytecode (.json)
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                    Deployment Information
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Contracts are deployed on Ethereum Sepolia testnet. Use the
                    provided addresses and ABIs for your integrations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
