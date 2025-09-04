"use client";

import client from "@/app/client";
import React, { useState } from "react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  campaignAddress: string;
}

const CampaignCard = ({ campaignAddress }: CampaignCardProps) => {
  const contract = getContract({
    client,
    address: campaignAddress,
    chain: sepolia,
  });

  // Contract reads
  const { data: deadlineData, isPending: isDeadlineLoading } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const { data: descriptionData, isPending: isDescriptionLoading } =
    useReadContract({
      contract,
      method: "function description() view returns (string)",
      params: [],
    });

  const { data: statusData, isPending: isStatusLoading } = useReadContract({
    contract,
    method: "function getCampaignStatus() view returns (uint8)",
    params: [],
  });

  const { data: balanceData, isPending: isBalanceLoading } = useReadContract({
    contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const { data: goalData, isPending: isGoalLoading } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: nameData, isPending: isNameLoading } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: ownerData, isPending: isOwnerLoading } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  // Local state for copy feedback
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Helpers
  const shortenAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  const formatDate = (timestamp?: bigint) => {
    if (!timestamp) return "";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusLabel = (status?: number) => {
    switch (status) {
      case 0:
        return {
          text: "Active",
          className: "bg-primary text-primary-foreground",
        };
      case 1:
        return { text: "Successful", className: "bg-green-600 text-white" };
      case 2:
        return {
          text: "Failed",
          className: "bg-destructive text-destructive-foreground",
        };
      default:
        return { text: "Unknown", className: "bg-muted text-muted-foreground" };
    }
  };

  const status =
    !isStatusLoading && statusData !== undefined
      ? getStatusLabel(Number(statusData))
      : null;

  const goal = goalData ? Number(goalData) : 0;
  const balance = balanceData ? Number(balanceData) : 0;
  const progress = goal > 0 ? Math.min((balance / goal) * 100, 100) : 0;

  return (
    <div className="border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 bg-card text-card-foreground p-6 flex flex-col justify-between">
      <div>
        {/* Campaign Name */}
        <h2 className="text-2xl font-bold mb-2">
          {isNameLoading ? "Loading name..." : nameData}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {isDescriptionLoading ? "Loading description..." : descriptionData}
        </p>

        {/* Owner */}
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm">
            <span className="font-medium">Owner:</span>{" "}
            {isOwnerLoading ? "Loading..." : shortenAddress(ownerData)}
          </p>
          {!isOwnerLoading && ownerData && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopy(ownerData)}
              className="h-6 w-6"
            >
              <Copy className="h-3 w-3" />
            </Button>
          )}
          {copied && (
            <span className="text-xs text-primary font-medium">Copied!</span>
          )}
        </div>

        {/* Goal & Balance */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <p>
            <span className="font-medium">Goal:</span>{" "}
            {isGoalLoading ? "Loading..." : goal.toLocaleString()} wei
          </p>
          <p>
            <span className="font-medium">Balance:</span>{" "}
            {isBalanceLoading ? "Loading..." : balance.toLocaleString()} wei
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {progress.toFixed(2)}% funded
          </p>
        </div>

        {/* Deadline */}
        <p className="text-sm">
          <span className="font-medium">Deadline:</span>{" "}
          {isDeadlineLoading ? "Loading..." : formatDate(deadlineData)}
        </p>
      </div>

      {/* Status + View Button */}
      <div className="mt-6 flex items-center justify-between">
        {isStatusLoading ? (
          <span className="text-sm text-muted-foreground">
            Loading status...
          </span>
        ) : (
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${status?.className}`}
          >
            {status?.text}
          </span>
        )}

        <Link href={`/campaign/${campaignAddress}`}>
          <Button size="sm" variant="secondary" className="rounded-full px-4 cursor-pointer">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
