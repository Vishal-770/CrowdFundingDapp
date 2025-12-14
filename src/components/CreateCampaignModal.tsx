"use client";

import React from "react";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { darkTheme, lightTheme } from "thirdweb/react";
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
import { useForm } from "react-hook-form";
import { TransactionButton } from "thirdweb/react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import client from "@/app/client";
import { FactoryContractAddress } from "@/constans/contractdetails";

interface CampaignFormData {
  name: string;
  description: string;
  goal: string;
  duration: string;
}

interface CreateCampaignModalProps {
  trigger: React.ReactNode;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  trigger,
}) => {
  const { theme: currentTheme } = useTheme();

  const contract = getContract({
    client,
    chain: sepolia,
    address: FactoryContractAddress,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>();

  const buildTx = (data: CampaignFormData) => {
    // Convert ETH to wei (e.g., 2.5 ETH -> 2500000000000000000 wei)
    const goalInWei = parseFloat(data.goal) * 1e18;

    return prepareContractCall({
      contract,
      method:
        "function createCampaign(string _name, string _description, uint256 _goal, uint256 _durationInDays)",
      params: [
        data.name,
        data.description,
        BigInt(goalInWei),
        BigInt(data.duration),
      ],
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Launch a New Campaign
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
              step="0.001"
              placeholder="2.5"
              {...register("goal", {
                required: "Goal is required",
                validate: (val) =>
                  Number(val) > 0 || "Goal must be greater than 0",
              })}
            />
            <p className="text-xs text-muted-foreground">
              Enter your funding goal in ETH
            </p>
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
              <p className="text-sm text-red-500">{errors.duration.message}</p>
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
                  document.getElementById("description") as HTMLTextAreaElement
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
            className="w-full rounded-full"
          >
            Create Campaign
          </TransactionButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
