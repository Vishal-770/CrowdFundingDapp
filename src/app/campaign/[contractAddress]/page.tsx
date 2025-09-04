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
  const { data: goalData } = useReadContract({
    contract,
    method: "function goal() view returns (uint256)",
  });
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
          text: "Not Completed",
          className: "bg-primary text-primary-foreground",
        };
      case 1:
        return { text: "Successful", className: "bg-green-600 text-white" };
      case 2:
        return {
          text: "Failed",
          className: "bg-destructive text-destructive-foreground",
        };
      case 3:
        return { text: "Paused", className: "bg-yellow-500 text-black" };
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
    <div className="w-full min-h-screen bg-background px-6 md:px-12 py-28">
      {/* Paused State */}
      <div className="w-full max-w-5xl mx-auto mb-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Paused State:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
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
      <div className="w-full max-w-5xl mx-auto border rounded-2xl shadow-sm p-10 bg-card text-card-foreground mb-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h1 className="text-4xl font-bold">{nameData || "Loading..."}</h1>
          {status && (
            <span
              className={`px-4 py-2 text-sm font-medium rounded-full ${status.className}`}
            >
              {status.text}
            </span>
          )}
        </div>

        <p className="text-lg text-muted-foreground mb-6">
          {descriptionData || "Loading description..."}
        </p>

        <div className="flex items-center gap-2 mb-6">
          <p className="text-base">
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

        <p className="text-base">
          <span className="font-medium">Deadline:</span>{" "}
          {formatDate(deadlineData)}
        </p>

        {/* Owner Actions */}
        {account?.address === ownerData && (
          <div className="flex flex-wrap gap-3 items-center mt-6">
            <Button
              size="lg"
              variant={isEdit ? "secondary" : "outline"}
              onClick={() => setIsEdit((prev) => !prev)}
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

            {goalData !== undefined &&
              balanceData !== undefined &&
              balanceData >= goalData && ( // check if campaign goal is reached
                <>
                  <br />
                  <h3>Goal reached successfully!</h3>
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
      </div>

      {/* Tiers Section */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Support Tiers</h2>

          {account?.address === ownerData && isEdit && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Tier
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Tier</DialogTitle>
                  <DialogDescription>
                    Create a new support tier. Amount is in wei.
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
                    <Label htmlFor="tierAmount">Amount (wei)</Label>
                    <Input
                      id="tierAmount"
                      type="number"
                      min={0}
                      placeholder="1000000000000000"
                      value={newTierAmount}
                      onChange={(e) => setNewTierAmount(e.target.value)}
                    />
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
                      Number(newTierAmount) <= 0
                    }
                    transaction={() =>
                      prepareContractCall({
                        contract,
                        method:
                          "function addTier(string _name, uint256 _amount)",
                        params: [newTierName, BigInt(newTierAmount)],
                      })
                    }
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

                {!isEdit && (
                  <TransactionButton
                    disabled={pausedData === true}
                    transaction={() =>
                      prepareContractCall({
                        contract,
                        method: "function fund(uint256 _index) payable",
                        params: [BigInt(idx)],
                        value: tier.amount,
                      })
                    }
                    onTransactionConfirmed={() =>
                      toast.success("Funded successfully!")
                    }
                    onError={(error) =>
                      toast.error("Funding failed" + error.message)
                    }
                    className="w-full mt-auto"
                  >
                    Donate
                  </TransactionButton>
                )}

                {account?.address === ownerData && isEdit && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-3 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
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
