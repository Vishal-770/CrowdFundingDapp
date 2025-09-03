"use client";

import client from "@/app/client";
import { useParams } from "next/navigation";
import React from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { TransactionButton, useReadContract } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
interface Tier {
  name: string;
  amount: bigint;
  backers: bigint;
}
const CampaignPage = () => {
  const { contractAddress } = useParams();

  const contract = getContract({
    address: contractAddress as string,
    chain: sepolia,
    client,
  });

  // Reads
  const { data: nameData } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  });

  const { data: descriptionData } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: [],
  });

  const { data: ownerData } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: [],
  });

  const { data: goalData } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
    params: [],
  });

  const { data: balanceData } = useReadContract({
    contract,
    method: "function getContractBalance() view returns (uint256)",
    params: [],
  });

  const { data: deadlineData } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
    params: [],
  });

  const { data: statusData } = useReadContract({
    contract,
    method: "function getCampaignStatus() view returns (uint8)",
    params: [],
  });

  const { data: tiersData, isPending: isTiersLoading } = useReadContract({
    contract,
    method:
      "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
    params: [],
  });

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
        return {
          text: "Successful",
          className: "bg-secondary text-secondary-foreground",
        };
      case 2:
        return {
          text: "Failed",
          className: "bg-destructive text-destructive-foreground",
        };
      default:
        return { text: "Unknown", className: "bg-muted text-muted-foreground" };
    }
  };

  const goal = goalData ? Number(goalData) : 0;
  const balance = balanceData ? Number(balanceData) : 0;
  const progress = goal > 0 ? Math.min((balance / goal) * 100, 100) : 0;

  const status =
    statusData !== undefined ? getStatusLabel(Number(statusData)) : null;

  return (
    <div className="w-full min-h-screen bg-background px-6 md:px-12 py-26">
      {/* Campaign Overview */}
      <div className="w-full max-w-5xl mx-auto border rounded-2xl shadow-sm p-10 bg-card text-card-foreground mb-12">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h1 className="text-4xl font-bold">{nameData || "Loading..."}</h1>
          {status && (
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full ${status.className}`}
            >
              {status.text}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8">
          {descriptionData || "Loading description..."}
        </p>

        {/* Owner */}
        <div className="flex items-center gap-2 mb-6">
          <p className="text-base">
            <span className="font-medium">Owner:</span>{" "}
            {shortenAddress(ownerData)}
          </p>
          {ownerData && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigator.clipboard.writeText(ownerData)}
              className="h-7 w-7"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Goal & Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Goal</p>
            <p className="text-xl font-semibold">{goal.toLocaleString()} wei</p>
          </div>
          <div className="bg-muted rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-xl font-semibold">
              {balance.toLocaleString()} wei
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="bg-primary h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {progress.toFixed(2)}% funded
          </p>
        </div>

        {/* Deadline */}
        <p className="text-base">
          <span className="font-medium">Deadline:</span>{" "}
          {formatDate(deadlineData)}
        </p>
      </div>

      {/* Tiers Section */}
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Support Tiers</h2>
        {isTiersLoading ? (
          <p className="text-muted-foreground">Loading tiers...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiersData?.map((tier: Tier, idx: number) => (
              <div
                key={idx}
                className="border rounded-xl shadow-sm p-6 bg-card text-card-foreground flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Amount:</span>{" "}
                    {Number(tier.amount).toLocaleString()} wei
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {Number(tier.backers)} backers
                  </p>
                </div>
                {/* <Button disabled={!account} className="mt-auto w-full">
                  Donate
                </Button> */}
                <TransactionButton
                  transaction={() =>
                    prepareContractCall({
                      contract: contract,
                      method: "function fund(uint256 _index) payable",
                      params: [BigInt(idx)],
                      value: tier.amount,
                    })
                  }
                  onTransactionConfirmed={() => alert("Success")}
                >
                  Donate
                </TransactionButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
