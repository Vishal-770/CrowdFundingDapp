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
  useSendTransaction,
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
import { Trash2, Plus } from "lucide-react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
interface Tier {
  name: string;
  amount: bigint;
  backers: bigint;
}
const CampaignPage = () => {
  const { contractAddress } = useParams();
  const { mutate: sendTx, isPending: isSending } = useSendTransaction();
  const [newTierName, setNewTierName] = React.useState("");
  const [newTierAmount, setNewTierAmount] = React.useState("");
  const [removingIndex, setRemovingIndex] = React.useState<number | null>(null);
  const [isEdit, setIsEdit] = React.useState(false);

  const contract = getContract({
    address: contractAddress as string,
    chain: sepolia,
    client,
  });
  const account = useActiveAccount();
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
        {account?.address == ownerData && (
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              size="sm"
              variant={isEdit ? "secondary" : "outline"}
              onClick={() => {
                setIsEdit((prev) => !prev);
                setRemovingIndex(null);
              }}
            >
              {isEdit ? "Exit Edit Mode" : "Enter Edit Mode"}
            </Button>
            {isEdit && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="default"
                    className="flex items-center gap-2"
                  >
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
                    <Button
                      disabled={
                        !newTierName.trim() ||
                        !newTierAmount ||
                        Number(newTierAmount) <= 0 ||
                        isSending
                      }
                      onClick={() => {
                        try {
                          const amt = BigInt(newTierAmount);
                          const tx = prepareContractCall({
                            contract,
                            method:
                              "function AddTier(string _name, uint256 _amount)",
                            params: [newTierName, amt],
                          });
                          sendTx(tx, {
                            onSuccess: () => {
                              setNewTierName("");
                              setNewTierAmount("");
                            },
                          });
                        } catch (e) {
                          console.error(e);
                        }
                      }}
                    >
                      {isSending ? "Adding..." : "Add Tier"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        )}
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
                {!isEdit && (
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: contract,
                        method: "function fund(uint256 _index) payable",
                        params: [BigInt(idx)],
                        value: tier.amount,
                      })
                    }
                    onTransactionConfirmed={() =>
                      toast.success("Funded SuccessFully")
                    }
                  >
                    Donate
                  </TransactionButton>
                )}
                {account?.address == ownerData && isEdit && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-3 flex items-center gap-1"
                        onClick={() => setRemovingIndex(idx)}
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Tier</DialogTitle>
                        <DialogDescription>
                          This action will permanently delete the tier &quot;
                          {tier.name}&quot;.
                        </DialogDescription>
                      </DialogHeader>
                      <p className="text-sm text-muted-foreground">
                        Are you sure you want to remove this tier? Backer counts
                        won&apos;t be recoverable.
                      </p>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          disabled={isSending}
                          onClick={() => {
                            if (removingIndex === null) return;
                            const tx = prepareContractCall({
                              contract,
                              method: "function RemoveTier(uint256 _index)",
                              params: [BigInt(removingIndex)],
                            });
                            sendTx(tx, {
                              onSuccess: () => setRemovingIndex(null),
                              onSettled: () => setRemovingIndex(null),
                            });
                          }}
                        >
                          {isSending ? "Removing..." : "Confirm"}
                        </Button>
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
