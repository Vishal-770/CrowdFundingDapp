"use client";

import { getContract } from "thirdweb";
import client from "../client";
import { sepolia } from "thirdweb/chains";
import { FactoryContractAddress } from "@/constans/contractdetails";
import { useReadContract } from "thirdweb/react";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const contract = getContract({
    client,
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
    <div className="min-h-screen px-4 md:px-12 py-25 bg-background text-foreground">
      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center font-bold text-3xl md:text-5xl mb-4"
      >
        Discover Campaigns
      </motion.h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore decentralized crowdfunding campaigns powered by Ethereum. Back
        projects you believe in and be part of the future of Web3 fundraising.
      </p>

      {/* Campaign List */}
      {isPending ? (
        <p className="text-center text-muted-foreground animate-pulse">
          Loading campaigns...
        </p>
      ) : data?.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            No campaigns found. Be the first to start one!
          </p>
          <Button size="lg">Create Campaign</Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data?.map((item, index) => (
            <CampaignCard key={index} campaignAddress={item.campaignAddress} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
