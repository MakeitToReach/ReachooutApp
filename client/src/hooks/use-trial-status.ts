import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { getUserFromToken } from "@/api/auth";
import { getToken } from "@/lib/isAuthenticated";

// Simple cache to prevent duplicate requests
let trialStatusCache: { [userId: string]: boolean | null } = {};//eslint-disable-line
let isFetching = false;

export const useTrialStatus = () => {
  const { user } = useUserStore();
  const [isTrialUser, setIsTrialUser] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrialStatus = async () => {
    if (!user) {
      setIsTrialUser(null);
      return;
    }

    // Check cache first
    if (trialStatusCache[user.id] !== undefined) {
      setIsTrialUser(trialStatusCache[user.id]);
      return;
    }

    // Prevent duplicate requests
    if (isFetching) {
      return;
    }

    setIsLoading(true);
    isFetching = true;

    try {
      // Get token from cookies
      const token = getToken();

      if (!token) {
        console.warn("No token found, cannot fetch trial status");
        setIsTrialUser(null);
        trialStatusCache[user.id] = null;
        return;
      }

      const response = await getUserFromToken(token);
      if (response?.user?.isTrialUser !== undefined) {
        const trialStatus = response.user.isTrialUser;
        setIsTrialUser(trialStatus);
        trialStatusCache[user.id] = trialStatus;
      } else {
        console.warn("Trial status not found in response:", response);
        setIsTrialUser(null);
        trialStatusCache[user.id] = null;
      }
    } catch (error) {
      console.error("Error fetching trial status:", error);
      // Fallback: assume trial user if we can't fetch the status
      setIsTrialUser(true);
      trialStatusCache[user.id] = true;
    } finally {
      setIsLoading(false);
      isFetching = false;
    }
  };

  useEffect(() => {
    // Clear cache when user changes to ensure fresh data
    if (user?.id) {
      delete trialStatusCache[user.id];
    }
    fetchTrialStatus();
  }, [user?.id]); // Re-fetch when user changes

  return {
    isTrialUser,
    isLoading,
    refetch: fetchTrialStatus,
  };
}; 