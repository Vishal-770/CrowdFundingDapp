"use client";

import { getContract } from "thirdweb";
import client from "./client";
import { sepolia } from "thirdweb/chains";
import { FactoryContractAddress } from "@/constans/contractdetails";
import { useReadContract } from "thirdweb/react";
import CampaignCard from "@/components/CampaignCard"; // adjust path if needed

export default function Home() {
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: FactoryContractAddress,
  });

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
    params: [],
  });

  return (
    <div className="min-h-screen px-4 md:px-12 py-20">
      <h1 className="text-center font-bold text-3xl md:text-4xl mb-10">
        Campaigns
      </h1>

      {isPending ? (
        <p className="text-center text-muted-foreground">
          Loading campaigns...
        </p>
      ) : data?.length === 0 ? (
        <p className="text-center text-muted-foreground">No campaigns found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((item, index) => (
            <CampaignCard key={index} campaignAddress={item.campaignAddress} />
          ))}
        </div>
      )}
    </div>
  );
}
