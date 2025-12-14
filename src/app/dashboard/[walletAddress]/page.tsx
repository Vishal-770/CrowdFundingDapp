"use client";

import client from "@/app/client";
import CampaignCard from "@/components/CampaignCard";
import CreateCampaignModal from "@/components/CreateCampaignModal";
import { FactoryContractAddress } from "@/constans/contractdetails";
import { useParams } from "next/navigation";
import React from "react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { Button } from "@/components/ui/button";

interface Campaigns {
  campaignAddress: string;
}

const DashBoardPage = () => {
  const { walletAddress } = useParams();

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

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-25 md:px-12 bg-background text-foreground">
      {/* Top Button + Dialog */}
      <div className="w-full flex justify-end mb-8">
        <CreateCampaignModal
          trigger={
            <Button size="lg" className="rounded-full shadow-md">
              + Create Campaign
            </Button>
          }
        />
      </div>

      {/* Campaigns Grid */}
      <div className="grid gap-6 w-full max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {campaigns?.map((campaign: Campaigns) => (
          <CampaignCard
            key={campaign.campaignAddress}
            campaignAddress={campaign.campaignAddress}
          />
        ))}
      </div>

      {!isPending && campaigns?.length === 0 && (
        <p className="text-muted-foreground mt-12 text-center text-lg">
          You don’t have any campaigns yet. Start by creating one!
        </p>
      )}
    </div>
  );
};

export default DashBoardPage;
