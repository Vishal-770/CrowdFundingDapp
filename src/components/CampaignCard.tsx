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

  /* -------------------- Loading State -------------------- */
  if (loadingCampaign || loadingPrice) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-2 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
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
    goal,
    deadline,
    owner,
    isPaused,
    state,
    raised,
    backers,
  ] = campaignDetails;

  /* -------------------- Conversions -------------------- */
  const ethUsd = Number(ethPrice) / 1e8;

  const goalEth = Number(goal) / 1e18;
  const raisedEth = Number(raised) / 1e18;
  const remainingEth = Math.max(goalEth - raisedEth, 0);

  const progress = goalEth > 0 ? Math.min((raisedEth / goalEth) * 100, 100) : 0;

  const deadlineDate = new Date(Number(deadline) * 1000);
  const daysLeft = Math.max(
    Math.ceil((deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    0
  );

  const campaignStateLabel =
    state === 0 ? "Active" : state === 1 ? "Successful" : "Failed";

  const getStatusBadgeClasses = () => {
    if (isPaused) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (campaignStateLabel === "Failed")
      return "bg-red-100 text-red-800 border-red-200";
    if (campaignStateLabel === "Successful")
      return "bg-green-100 text-green-800 border-green-200";
    return "bg-blue-100 text-blue-800 border-blue-200"; // Active
  };

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  /* -------------------- UI -------------------- */
  return (
    <Link href={`/campaign/${campaignAddress}`}>
      <Card className="transition hover:shadow-md cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
            <Badge
              className={`text-xs font-medium border ${getStatusBadgeClasses()}`}
            >
              {isPaused ? "Paused" : campaignStateLabel}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Progress with Context */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} />
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{Number(backers)} backers</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{daysLeft} days left</span>
              </div>
            </div>
            {raisedEth === 0 ? (
              <p className="text-sm text-center text-muted-foreground italic">
                Be the first to support this campaign 🚀
              </p>
            ) : (
              <p className="text-sm text-center text-muted-foreground">
                {raisedEth.toFixed(4)} of {goalEth.toFixed(2)} ETH raised
              </p>
            )}
          </div>

          {/* Funding Stats with Hierarchy */}
          <div className="space-y-4">
            {/* Raised - Biggest */}
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Raised
              </p>
              <p className="text-2xl font-bold text-foreground">
                {raisedEth.toFixed(4)} ETH
              </p>
              <p className="text-sm text-muted-foreground">
                ≈ {formatUSD(raisedEth * ethUsd)}
              </p>
            </div>

            {/* Goal and Remaining - Medium/Small */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Goal
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {goalEth.toFixed(2)} ETH
                </p>
                <p className="text-xs text-muted-foreground">
                  ≈ {formatUSD(goalEth * ethUsd)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Remaining
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {remainingEth.toFixed(4)} ETH
                </p>
                <p className="text-xs text-muted-foreground">
                  ≈ {formatUSD(remainingEth * ethUsd)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer with ETH Price and Owner */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Owner</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {owner.slice(0, 6)}…{owner.slice(-4)}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await navigator.clipboard.writeText(campaignAddress);
                    setCopied(true);
                    toast.success("Address copied to clipboard!");
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
              <div className="flex items-center gap-1 text-muted-foreground">
                <Info className="h-3 w-3" />
                <span className="text-xs">ETH: {formatUSD(ethUsd)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
