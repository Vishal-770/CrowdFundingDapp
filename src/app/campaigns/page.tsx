"use client";

import { getContract } from "thirdweb";
import client from "../client";
import { sepolia } from "thirdweb/chains";
import { FactoryContractAddress } from "@/constans/contractdetails";
import { useReadContract } from "thirdweb/react";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import CreateCampaignModal from "@/components/CreateCampaignModal";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, Filter } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  const account = useActiveAccount();

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

  // Enhanced campaigns data with additional details for filtering/sorting
  const enhancedCampaigns = useMemo(() => {
    if (!data) return [];

    return data.map((campaign, index) => ({
      ...campaign,
      index,
      // We'll need to get additional data for each campaign
      // For now, we'll use the basic data available
    }));
  }, [data]);

  // Filter and sort campaigns
  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = enhancedCampaigns;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.campaignAddress
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Additional filters
    if (filterBy === "my-campaigns" && account) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.owner.toLowerCase() === account.address.toLowerCase()
      );
    } else if (filterBy === "recent") {
      const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      filtered = filtered.filter(
        (campaign) => Number(campaign.creationTime) * 1000 > oneWeekAgo
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return Number(b.creationTime) - Number(a.creationTime);
        case "oldest":
          return Number(a.creationTime) - Number(b.creationTime);
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [enhancedCampaigns, searchTerm, sortBy, filterBy, account]);

  return (
    <div className="min-h-screen px-4 md:px-12 py-25 bg-background text-foreground">
      {/* Page Header */}

      {/* Search and Filter Controls */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-6 rounded-lg border">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search campaigns by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort and Filter */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="recent">Recent (7 days)</SelectItem>
                  {account && (
                    <SelectItem value="my-campaigns">My Campaigns</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        {!isPending && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Showing {filteredAndSortedCampaigns.length} of{" "}
            {enhancedCampaigns.length} campaigns
          </p>
        )}
      </div>

      {/* Campaign List */}
      {isPending ? (
        <p className="text-center text-muted-foreground animate-pulse">
          Loading campaigns...
        </p>
      ) : filteredAndSortedCampaigns.length === 0 ? (
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? "No campaigns match your search. Try a different term."
              : "No campaigns found. Be the first to start one!"}
          </p>
          {!searchTerm && (
            <CreateCampaignModal
              trigger={<Button size="lg">Create Campaign</Button>}
            />
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAndSortedCampaigns.map((item) => (
            <CampaignCard
              key={item.index}
              campaignAddress={item.campaignAddress}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
