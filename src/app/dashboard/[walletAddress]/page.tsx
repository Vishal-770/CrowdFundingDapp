"use client";

import client from "@/app/client";
import CampaignCard from "@/components/CampaignCard";
import { FactoryContractAddress } from "@/constans/contractdetails";
import { useParams } from "next/navigation";
import React from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { darkTheme, lightTheme, useReadContract } from "thirdweb/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ✅ react-hook-form
import { useForm } from "react-hook-form";

// ✅ thirdweb transaction button
import { TransactionButton } from "thirdweb/react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

interface Campaigns {
  campaignAddress: string;
}

interface CampaignFormData {
  name: string;
  description: string;
  goal: string;
  duration: string;
}

const DashBoardPage = () => {
  const { walletAddress } = useParams();
  const { theme: currentTheme } = useTheme();
  const contract = getContract({
    client,
    chain: sepolia,
    address: FactoryContractAddress,
  });

  const { data: campaigns, isPending } = useReadContract({
    contract,
    method:
      "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [walletAddress as string],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>();

  const buildTx = (data: CampaignFormData) =>
    prepareContractCall({
      contract,
      method:
        "function createCampaign(string _name, string _description, uint256 _goal, uint256 _durationInDays)",
      params: [
        data.name,
        data.description,
        BigInt(data.goal), // ⚡ convert ETH→wei before sending if needed
        BigInt(data.duration),
      ],
    });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 pt-25">
      {/* Top Button with Dialog */}
      <div className="w-full flex justify-end mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create a New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Create a New Campaign
              </DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(() => {})}
              className="flex flex-col gap-6 py-4"
            >
              {/* Campaign Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="My Awesome Campaign"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="What's this campaign about?"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Goal */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="goal">Goal (ETH)</Label>
                <Input
                  id="goal"
                  type="number"
                  step="any"
                  placeholder="10"
                  {...register("goal", {
                    required: "Goal is required",
                    validate: (val) =>
                      Number(val) > 0 || "Goal must be greater than 0",
                  })}
                />
                {errors.goal && (
                  <p className="text-sm text-red-500">{errors.goal.message}</p>
                )}
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  {...register("duration", {
                    required: "Duration is required",
                    validate: (val) =>
                      Number(val) > 0 || "Duration must be greater than 0",
                  })}
                />
                {errors.duration && (
                  <p className="text-sm text-red-500">
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Transaction Button */}
              <TransactionButton
                theme={currentTheme === "light" ? lightTheme() : darkTheme()}
                transaction={() =>
                  buildTx({
                    name: (document.getElementById("name") as HTMLInputElement)
                      ?.value,
                    description: (
                      document.getElementById(
                        "description"
                      ) as HTMLTextAreaElement
                    )?.value,
                    goal: (document.getElementById("goal") as HTMLInputElement)
                      ?.value,
                    duration: (
                      document.getElementById("duration") as HTMLInputElement
                    )?.value,
                  })
                }
                onError={(err) => toast.error(err.message)}
                onTransactionConfirmed={() => {
                  toast.success("Campaign created successfully!");
                  reset();
                }}
                className="w-full"
              >
                Create Campaign
              </TransactionButton>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {campaigns?.map((campaign: Campaigns) => (
          <CampaignCard
            key={campaign.campaignAddress}
            campaignAddress={campaign.campaignAddress}
          />
        ))}
      </div>

      {!isPending && campaigns?.length === 0 && (
        <p className="text-muted-foreground mt-10">No campaigns found.</p>
      )}
    </div>
  );
};

export default DashBoardPage;
