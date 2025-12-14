"use client";

import client from "@/app/client";
import { useParams } from "next/navigation";
import React from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Copy } from "lucide-react";
import { toast } from "sonner";

interface Tier {
  name: string;
  amount: bigint;
  backers: bigint;
}

/** Extend Deadline Component */
function ExtendDeadline({
  contract,
}: {
  contract: ReturnType<typeof getContract>;
}) {
  const [days, setDays] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Extend Deadline</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extend Campaign Deadline</DialogTitle>
          <DialogDescription>
            Enter the number of days to extend the campaign deadline.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="days">Days to Extend</Label>
            <Input
              id="days"
              type="number"
              min={1}
              placeholder="e.g. 7"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <TransactionButton
            disabled={!days || isNaN(Number(days)) || Number(days) <= 0}
            transaction={() =>
              prepareContractCall({
                contract,
                method: "function extendDeadline(uint256 _days)",
                params: [BigInt(days)],
              })
            }
            onTransactionConfirmed={() => {
              toast.success("Deadline extended successfully!");
              setDays("");
              setIsOpen(false);
            }}
            onError={() => toast.error("Failed to extend deadline")}
          >
            Extend
          </TransactionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const CampaignPage = () => {
  const { contractAddress } = useParams();
  const contract = getContract({
    address: contractAddress as string,
    chain: sepolia,
    client,
  });
  const account = useActiveAccount();
  const [isEdit, setIsEdit] = React.useState(false);
  const [newTierName, setNewTierName] = React.useState("");
  const [newTierAmount, setNewTierAmount] = React.useState("");

  // Reads
  const { data: nameData } = useReadContract({
    contract,
    method: "function name() view returns (string)",
  });
  const { data: descriptionData } = useReadContract({
    contract,
    method: "function description() view returns (string)",
  });
  const { data: ownerData } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
  });
  const { data: goalData, isPending: isGoalLoading } = useReadContract({
    contract,
    method: "function getGoalInUSD() view returns (uint256)",
  });
  if (!isGoalLoading && goalData) {
    console.log(Number(goalData) / 1e18);
  }

  const { data: balanceData } = useReadContract({
    contract,
    method: "function getContractBalance() view returns (uint256)",
  });
  const { data: deadlineData } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
  });
  const { data: statusData } = useReadContract({
    contract,
    method: "function getCampaignStatus() view returns (uint8)",
  });
  const { data: pausedData } = useReadContract({
    contract,
    method: "function paused() view returns (bool)",
  });
  const { data: tiersData, isPending: isTiersLoading } = useReadContract({
    contract,
    method:
      "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])",
  });

  // Additional reads for better UX
  const { data: timeRemainingData } = useReadContract({
    contract,
    method: "function getTimeRemaining() view returns (uint256)",
  });

  const { data: campaignDetailsData } = useReadContract({
    contract,
    method:
      "function getCampaignDetails() view returns (string campaignName, string campaignDescription, uint256 campaignGoal, uint256 campaignDeadline, address campaignOwner, bool isPaused, uint8 campaignState, uint256 raisedAmount, uint256 totalBackers)",
  });

  // Get current ETH price and conversion functions
  const { data: ethPriceData } = useReadContract({
    contract,
    method: "function getLatestETHPrice() view returns (int256)",
  });

  const { data: totalRaisedUSDData } = useReadContract({
    contract,
    method: "function getTotalRaisedUSD() view returns (uint256)",
  });

  const { data: goalInWeiData } = useReadContract({
    contract,
    method: "function getGoalInWei() view returns (uint256)",
  });

  // Get user contributions for refund
  const { data: backerDetailsData } = useReadContract({
    contract,
    method:
      "function getBackerDetails(address _backer) view returns (uint256 totalContributionsUSD, uint256 totalContributionsWei, uint256[] memory fundedTierIndices)",
    params: [account?.address ?? "0x0000000000000000000000000000000000000000"],
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

  const formatTimeRemaining = (seconds?: bigint) => {
    if (!seconds || Number(seconds) <= 0) return "Ended";
    const totalSeconds = Number(seconds);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const getStatusLabel = (status?: number, paused?: boolean) => {
    if (paused) {
      return { text: "Paused", className: "bg-yellow-500 text-black" };
    }
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

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatETH = (amount: number) => {
    return (
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(amount) + " ETH"
    );
  };

  const weiToETH = (wei: bigint | number) => {
    return Number(wei) / 1e18;
  };
  console.log(tiersData);
  // USD amounts (with 8 decimals)
  const ethPrice = ethPriceData ? Math.abs(Number(ethPriceData)) / 1e8 : 0;
  console.log(ethPrice);
  const goalETH = goalData ? Number(goalData) / 1e18 : 0;
  const goalUSD = ethPrice > 0 ? goalETH * ethPrice : 0;
  const balanceUSD = totalRaisedUSDData ? Number(totalRaisedUSDData) / 1e8 : 0;
  const balanceETH = balanceData ? weiToETH(balanceData) : 0;

  const formatTierAmount = (amountBigInt: bigint) => {
    const amountUSD = Number(amountBigInt) / 1e8;
    return formatUSD(amountUSD);
  };

  // Tier validation helper
  const validateTierAmount = (tierAmountUSD: number) => {
    if (goalUSD > 0 && tierAmountUSD > goalUSD) {
      return "Tier amount cannot exceed campaign goal";
    }
    return null;
  };

  const userContributionsUSD = backerDetailsData
    ? Number(backerDetailsData[0]) / 1e8
    : 0;
  const userContributionsWei = backerDetailsData
    ? Number(backerDetailsData[1])
    : 0;
  const remainingETH = Math.max(goalETH - balanceETH, 0);
  const progress =
    goalUSD > 0 ? Math.min((balanceUSD / goalUSD) * 100, 100) : 0;
  const status =
    statusData !== undefined
      ? getStatusLabel(Number(statusData), pausedData)
      : null;

  return (
    <div className="w-full min-h-screen bg-background px-4 md:px-6 lg:px-12 py-20 md:py-28">
      {/* Paused State */}
      <div className="w-full max-w-5xl mx-auto mb-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm md:text-base">
            Paused State:
          </span>
          <span
            className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${
              pausedData
                ? "bg-yellow-500 text-black"
                : "bg-green-600 text-white"
            }`}
          >
            {pausedData ? "Paused" : "Not Paused"}
          </span>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="w-full max-w-5xl mx-auto border rounded-xl md:rounded-2xl shadow-sm p-4 md:p-6 lg:p-10 bg-card text-card-foreground mb-8 md:mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {nameData || "Loading..."}
          </h1>
          {status && (
            <span
              className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full ${status.className}`}
            >
              {status.text}
            </span>
          )}
        </div>

        <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6">
          {descriptionData || "Loading description..."}
        </p>

        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <p className="text-sm md:text-base">
            <span className="font-medium">Owner:</span>{" "}
            {shortenAddress(ownerData)}
          </p>
          {ownerData && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navigator.clipboard.writeText(ownerData);
                toast.success("Address copied to clipboard");
              }}
              className="h-6 w-6 md:h-7 md:w-7"
            >
              <Copy className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          )}
        </div>

        {/* Goal, Raised & Remaining */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="bg-muted rounded-lg md:rounded-xl p-3 md:p-4">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">
              Goal
            </p>
            <p className="text-lg md:text-xl font-semibold">
              {formatUSD(goalUSD)}
            </p>
            {goalETH > 0 && (
              <p className="text-xs text-muted-foreground">
                ≈ {formatETH(goalETH)}
              </p>
            )}
          </div>
          <div className="bg-muted rounded-lg md:rounded-xl p-3 md:p-4">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">
              Raised
            </p>
            <p className="text-lg md:text-xl font-semibold">
              {formatUSD(balanceUSD)}
            </p>
            <p className="text-xs text-muted-foreground">
              ≈ {formatETH(balanceETH)}
            </p>
          </div>
          <div className="bg-muted rounded-lg md:rounded-xl p-3 md:p-4">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">
              Remaining
            </p>
            <p className="text-lg md:text-xl font-semibold">
              {formatUSD(Math.max(goalUSD - balanceUSD, 0))}
            </p>
            <p className="text-xs text-muted-foreground">
              ≈ {formatETH(remainingETH)}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4 md:mb-6">
          <div className="w-full bg-muted rounded-full h-3 md:h-4 overflow-hidden">
            <div
              className="bg-primary h-3 md:h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            {progress.toFixed(2)}% funded • {formatETH(remainingETH)} remaining
          </p>
        </div>

        {/* Campaign Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-primary">
              {campaignDetailsData ? Number(campaignDetailsData[8]) : 0}
            </p>
            <p className="text-xs text-muted-foreground">Backers</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-primary">
              {tiersData ? tiersData.length : 0}
            </p>
            <p className="text-xs text-muted-foreground">Tiers</p>
          </div>
          <div className="text-center">
            <p className="text-lg md:text-2xl font-bold text-primary">
              {timeRemainingData && Number(timeRemainingData) > 0
                ? formatTimeRemaining(timeRemainingData)
                : "Ended"}
            </p>
            <p className="text-xs text-muted-foreground">Time Left</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-primary">
              {ethPrice > 0 ? formatUSD(ethPrice) : "Loading..."}
            </p>
            <p className="text-xs text-muted-foreground">ETH Price</p>
          </div>
        </div>

        <p className="text-sm md:text-base">
          <span className="font-medium">Deadline:</span>{" "}
          {formatDate(deadlineData)}
          {timeRemainingData && Number(timeRemainingData) > 0 && (
            <span className="text-xs md:text-sm text-muted-foreground ml-2">
              ({formatTimeRemaining(timeRemainingData)} remaining)
            </span>
          )}
        </p>

        {/* Owner Actions */}
        {account?.address === ownerData && (
          <div className="flex flex-wrap gap-2 md:gap-3 items-center mt-4 md:mt-6">
            <Button
              size="sm"
              variant={isEdit ? "secondary" : "outline"}
              onClick={() => setIsEdit((prev) => !prev)}
              className="text-sm"
            >
              {isEdit ? "Done" : "Edit"}
            </Button>

            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract,
                  method: "function togglePause()",
                  params: [],
                })
              }
              onTransactionConfirmed={() =>
                toast.success("Campaign pause state toggled!")
              }
              onError={() => toast.error("Failed to toggle pause")}
            >
              Toggle Pause
            </TransactionButton>

            {goalInWeiData !== undefined &&
              balanceData !== undefined &&
              balanceData >= goalInWeiData && ( // check if campaign goal is reached
                <>
                  <br />
                  <h3 className="text-sm md:text-base font-semibold text-green-600">
                    Goal reached successfully!
                  </h3>
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract,
                        method: "function withdraw()",
                        params: [],
                      })
                    }
                    onTransactionConfirmed={() =>
                      toast.success("Successfully Withdrawn Amount")
                    }
                    onError={() => toast.error("Not Allowed to Withdraw")}
                  >
                    Withdraw
                  </TransactionButton>
                </>
              )}

            {isEdit && <ExtendDeadline contract={contract} />}
          </div>
        )}

        {/* Refund Section for Failed Campaigns */}
        {account && status?.text === "Failed" && userContributionsUSD > 0 && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-muted/50 rounded-lg border border-destructive/20">
            <h3 className="font-semibold text-base md:text-lg mb-2 text-destructive">
              Campaign Failed - Refund Available
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-3">
              You contributed {formatUSD(userContributionsUSD)} (
              {(userContributionsWei / 1e18).toFixed(6)} ETH) to this campaign.
              Since the campaign failed to meet its goal, you can claim a
              refund.
            </p>
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract,
                  method: "function refund()",
                  params: [],
                })
              }
              onTransactionConfirmed={() =>
                toast.success("Refund processed successfully!")
              }
              onError={(error) =>
                toast.error("Failed to process refund: " + error.message)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm"
            >
              Claim Refund
            </TransactionButton>
          </div>
        )}
      </div>

      {/* Tiers Section */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Support Tiers</h2>

          {account?.address === ownerData && isEdit && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 text-sm">
                  <Plus className="h-3 w-3 md:h-4 md:w-4" /> Add Tier
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Tier</DialogTitle>
                  <DialogDescription>
                    Create a new support tier. Amount is in USD.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="tierName">Name</Label>
                    <Input
                      id="tierName"
                      placeholder="e.g. Bronze Supporter"
                      value={newTierName}
                      onChange={(e) => setNewTierName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tierAmount">Amount (USD)</Label>
                    <Input
                      id="tierAmount"
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="10.00"
                      value={newTierAmount}
                      onChange={(e) => setNewTierAmount(e.target.value)}
                    />
                    {newTierAmount && ethPrice > 0 && (
                      <p className="text-sm text-muted-foreground">
                        ≈ {formatETH(parseFloat(newTierAmount) / ethPrice)}
                      </p>
                    )}
                    {newTierAmount &&
                      validateTierAmount(parseFloat(newTierAmount)) && (
                        <p className="text-sm text-destructive">
                          {validateTierAmount(parseFloat(newTierAmount))}
                        </p>
                      )}
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <TransactionButton
                    disabled={
                      !newTierName.trim() ||
                      !newTierAmount ||
                      Number(newTierAmount) <= 0 ||
                      validateTierAmount(parseFloat(newTierAmount)) !== null
                    }
                    transaction={() => {
                      // Convert USD to 8-decimal format (e.g., $10.00 -> 1000000000)
                      const amtUSD = Math.round(
                        parseFloat(newTierAmount) * 1e8
                      );
                      return prepareContractCall({
                        contract,
                        method:
                          "function addTier(string _name, uint256 _amount)",
                        params: [newTierName, BigInt(amtUSD)],
                      });
                    }}
                    onTransactionConfirmed={() => {
                      toast.success("Tier added successfully!");
                      setNewTierName("");
                      setNewTierAmount("");
                    }}
                    onError={(error) =>
                      toast.error("Failed to add tier" + error.message)
                    }
                  >
                    Add Tier
                  </TransactionButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {isTiersLoading ? (
          <p className="text-muted-foreground text-sm md:text-base">
            Loading tiers...
          </p>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tiersData?.map((tier: Tier, idx: number) => (
              <div
                key={idx}
                className="border rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 bg-card text-card-foreground flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm mb-1">
                    <span className="font-medium">Amount:</span>{" "}
                    {formatTierAmount(tier.amount)}
                  </p>
                  {ethPrice > 0 && (
                    <p className="text-xs text-muted-foreground mb-1">
                      ≈ {formatETH(Number(tier.amount) / 1e8 / ethPrice)}
                    </p>
                  )}
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                    {Number(tier.backers)} backers
                  </p>
                  {backerDetailsData &&
                    backerDetailsData[2].includes(BigInt(idx)) && (
                      <div className="mb-3 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                          ✓ You funded this tier
                        </p>
                      </div>
                    )}
                </div>

                {!isEdit && (
                  <TransactionButton
                    className="w-full mt-auto text-sm"
                    disabled={pausedData === true || status?.text !== "Active"}
                    transaction={async () => {
                      // Get the tier price in wei for the transaction
                      const { readContract } = await import("thirdweb");
                      const tierPriceInWei = await readContract({
                        contract,
                        method:
                          "function getTierPriceInWei(uint256) view returns (uint256)",
                        params: [BigInt(idx)],
                      });
                      console.log(tierPriceInWei);
                      return prepareContractCall({
                        contract,
                        method: "function fund(uint256 _index) payable",
                        params: [BigInt(idx)],
                        value: tierPriceInWei + BigInt(1),
                      });
                    }}
                    onTransactionConfirmed={() =>
                      toast.success(`Successfully funded ${tier.name} tier!`)
                    }
                    onError={(error) =>
                      toast.error("Funding failed: " + error.message)
                    }
                  >
                    {pausedData === true
                      ? "Campaign Paused"
                      : status?.text !== "Active"
                      ? "Campaign Not Active"
                      : "Fund This Tier"}
                  </TransactionButton>
                )}

                {account?.address === ownerData && isEdit && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-3 flex items-center gap-1 text-xs md:text-sm"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" /> Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Tier</DialogTitle>
                        <DialogDescription>
                          This will permanently delete the tier {tier.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <TransactionButton
                          transaction={() =>
                            prepareContractCall({
                              contract,
                              method: "function removeTier(uint256 _index)",
                              params: [BigInt(idx)],
                            })
                          }
                          onTransactionConfirmed={() =>
                            toast.success("Tier removed successfully!")
                          }
                          onError={() => toast.error("Failed to remove tier")}
                        >
                          Confirm
                        </TransactionButton>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
