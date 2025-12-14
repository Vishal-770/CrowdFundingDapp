"use client";

import client from "@/app/client";
import React, { useState } from "react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Check, Info, Clock, Users } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface CampaignCardProps {
  campaignAddress: string;
}

export default function CampaignCard({ campaignAddress }: CampaignCardProps) {
  const [copied, setCopied] = useState(false);

  const contract = getContract({
    client,
    address: campaignAddress,
    chain: sepolia,
  });

  const { data: campaignDetails, isPending: loadingCampaign } = useReadContract(
    {
      contract,
      method:
        "function getCampaignDetails() view returns (string,string,uint256,uint256,address,bool,uint8,uint256,uint256)",
      params: [],
    }
  );

  const { data: ethPrice, isPending: loadingPrice } = useReadContract({
    contract,
    method: "function getLatestETHPrice() view returns (int256)",
    params: [],
  });

  const { data: totalRaisedUSD } = useReadContract({
    contract,
    method: "function getTotalRaisedUSD() view returns (uint256)",
    params: [],
  });

  /* -------------------- Loading -------------------- */
  if (loadingCampaign || loadingPrice || totalRaisedUSD === undefined) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-2 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!campaignDetails || !ethPrice) {
    return (
      <Card>
        <CardContent className="text-sm text-muted-foreground">
          Failed to load campaign
        </CardContent>
      </Card>
    );
  }

  const [
    name,
    description,
    goalRaw,
    deadline,
    owner,
    isPaused,
    state,
    raisedWei,
    backers,
  ] = campaignDetails;

  /* -------------------- CORRECT CONVERSIONS -------------------- */

  const ethUsd = Number(ethPrice) / 1e8;

  // USD values (AUTHORITATIVE)
  const goalUSD = Number(goalRaw) / 1e8;
  const raisedUSD = Number(totalRaisedUSD) / 1e8;

  // ETH values (DISPLAY ONLY)
  const raisedEth = Number(raisedWei) / 1e18;
  const goalEth = goalUSD / ethUsd;
  const remainingEth = Math.max(goalEth - raisedEth, 0);

  const progress = goalUSD > 0 ? Math.min((raisedUSD / goalUSD) * 100, 100) : 0;

  const deadlineDate = new Date(Number(deadline) * 1000);
  const daysLeft = Math.max(
    Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    0
  );

  const campaignStateLabel =
    state === 0 ? "Active" : state === 1 ? "Successful" : "Failed";

  const getStatusBadgeClasses = () => {
    if (isPaused) return "bg-muted text-muted-foreground border-muted";
    if (campaignStateLabel === "Failed")
      return "bg-destructive text-destructive-foreground border-destructive";
    if (campaignStateLabel === "Successful")
      return "bg-primary text-primary-foreground border-primary";
    return "bg-secondary text-secondary-foreground border-secondary"; // Active
  };

  const formatUSD = (amount: number) => {
    if (amount >= 1000000) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(amount);
    } else if (amount % 1 === 0) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
  };

  /* -------------------- UI (UNCHANGED) -------------------- */
  return (
    <Link href={`/campaign/${campaignAddress}`}>
      <Card className="transition hover:shadow-lg hover:border-primary/40 cursor-pointer min-h-[600px] flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className="text-xs bg-muted text-muted-foreground border-muted">
                Sepolia
              </Badge>
              <Badge
                className={`text-xs font-medium border ${getStatusBadgeClasses()}`}
              >
                {isPaused ? "Paused" : campaignStateLabel}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-3 transition-all duration-1000 ease-out"
              aria-label={`Campaign progress: ${progress.toFixed(1)}%`}
            />
            <p className="text-sm text-center text-muted-foreground">
              {formatUSD(raisedUSD)} of {formatUSD(goalUSD)} raised
            </p>
            {raisedEth === 0 ? (
              <p className="text-sm text-center text-muted-foreground italic">
                🚀 ✨ Be the first to support this campaign
              </p>
            ) : null}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{Number(backers)} backers</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Ends in {daysLeft} days</span>
              </div>
            </div>
            {raisedEth === 0 ? null : (
              <p className="text-sm text-center text-muted-foreground">
                {raisedEth.toFixed(4)} of {goalEth.toFixed(4)} ETH raised
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Raised
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-2xl font-bold text-foreground">
                      {formatUSD(raisedUSD)}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Calculated using Chainlink ETH/USD price feed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-sm text-muted-foreground">
                ≈ {raisedEth.toFixed(4)} ETH
              </p>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Tap to contribute
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Goal
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-lg font-semibold text-foreground">
                        {formatUSD(goalUSD)}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Calculated using Chainlink ETH/USD price feed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-xs text-muted-foreground">
                  ≈ {goalEth.toFixed(4)} ETH
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Remaining
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p
                        className={`text-sm font-medium ${
                          Math.max(goalUSD - raisedUSD, 0) === 0
                            ? "text-muted-foreground/50"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatUSD(Math.max(goalUSD - raisedUSD, 0))}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Calculated using Chainlink ETH/USD price feed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-xs text-muted-foreground">
                  ≈ {remainingEth.toFixed(4)} ETH
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Created by
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `https://sepolia.etherscan.io/address/${owner}`,
                            "_blank"
                          );
                        }}
                        className="font-mono text-xs bg-muted px-2 py-1 rounded flex items-center gap-1 hover:bg-muted/80 cursor-pointer"
                      >
                        {owner.slice(0, 6)}…{owner.slice(-4)} ↗
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Campaign creator - Click to view on Etherscan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-4 w-4 ml-1"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await navigator.clipboard.writeText(owner);
                    setCopied(true);
                    toast.success("Address copied!");
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Info className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground/70">
                        ⓘ {formatUSD(ethUsd)}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ETH Price: {formatUSD(ethUsd)} (via Chainlink)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
