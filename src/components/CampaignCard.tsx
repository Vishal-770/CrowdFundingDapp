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
import { Copy, Check } from "lucide-react";
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

  const statusVariant =
    isPaused || campaignStateLabel === "Failed"
      ? "destructive"
      : campaignStateLabel === "Successful"
      ? "secondary"
      : "default";

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
            <Badge variant={statusVariant}>
              {isPaused ? "Paused" : campaignStateLabel}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* ETH Price */}
          <p className="text-sm text-muted-foreground">
            ETH Price Today:{" "}
            <span className="font-medium text-foreground">
              ${ethUsd.toFixed(2)}
            </span>
          </p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Raised</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          {/* Funding Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Stat
              label="Goal"
              eth={goalEth.toFixed(2)}
              usd={(goalEth * ethUsd).toFixed(2)}
            />
            <Stat
              label="Raised"
              eth={raisedEth.toFixed(4)}
              usd={(raisedEth * ethUsd).toFixed(2)}
            />
            <Stat
              label="Remaining"
              eth={remainingEth.toFixed(4)}
              usd={(remainingEth * ethUsd).toFixed(2)}
            />
            <div>
              <p className="text-muted-foreground">Backers</p>
              <p className="font-medium">{Number(backers)}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="border-t pt-4 text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">Deadline:</span>{" "}
              {deadlineDate.toLocaleDateString()} ({daysLeft} days left)
            </p>
            <div className="flex items-center justify-between">
              <p>
                <span className="text-muted-foreground">Owner:</span>{" "}
                {owner.slice(0, 6)}…{owner.slice(-4)}
              </p>
              <Button
                size="icon"
                variant="ghost"
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
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/* -------------------- Small Helper -------------------- */
function Stat({
  label,
  eth,
  usd,
}: {
  label: string;
  eth: string;
  usd: string;
}) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">
        {eth} ETH
        <br />
        <span className="text-xs text-muted-foreground">${usd}</span>
      </p>
    </div>
  );
}
