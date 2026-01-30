import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../../styles/defaultStyles";
export default async function Candy() {
 const { session, isLoading: authLoading } = useAuth(); // AuthProvider provides session. :contentReference[oaicite:4]{index=4}

  // Local form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [candy, setCandy] = useState("");
  const [loading, setLoading] = useState(false); // screen action loading
  const [initialLoading, setInitialLoading] = useState(true); // loading while fetching profile

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      if (!session?.user) {
        // no user signed in (shouldn't happen in a protected route)
        if (mounted) setInitialLoading(false);
        return;
      }
      setInitialLoading(true);
      try {
        const userId = session.user.id;

        // Read the profile row. We expect a single row matched by id.
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, fav_candy")
          .eq("id", userId)
          .single();

        if (error) {
          // No row found is okay (trigger created an empty row—may be null),
          // but show the error if it's unexpected.
          console.warn("loadProfile error:", error);
          // If there's no data but no error.code, data can be null; we handle that below.
        }

        if (mounted && data) {
          setFirstName(data.first_name ?? "");
          setLastName(data.last_name ?? "");
          setCandy(data.fav_candy ?? "");
        }
      } catch (err) {
        console.warn("loadProfile exception:", err);
        Alert.alert("Failed to load profile. Check your network or try again.");
      } finally {
        if (mounted) setInitialLoading(false);
      }
    }

    loadProfile();
    return () => {
      mounted = false;
    };
    
  }, [session]);


  

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style={defaultStyles.titleText}>Favorite Candy Stats</Text>
      <Text>Your favorite candy is: {candy} </Text>
    </SafeAreaView>
  );
}
