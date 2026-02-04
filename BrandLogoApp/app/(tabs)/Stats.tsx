import { useAuth } from "@/components/AuthProvider";
import colors from "@/styles/colors";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../../styles/defaultStyles";
export default function Stats() {
  const { session, isLoading: authLoading } = useAuth(); 
  const [refreshing, setRefreshing] = useState(false);
  const [candyPercent, setCandyPercent] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [candy, setCandy] = useState("");
  const [loading, setLoading] = useState(false); // screen action loading
  const [initialLoading, setInitialLoading] = useState(true); // loading while fetching profile
  //used ChatGPT to modify useEffect to load candy data, create refresh function, and add stat for % of all users
  //https://chatgpt.com/share/6980ed73-1334-8013-b08b-c7107757f5bb
   async function loadProfile() {
    if (!session?.user) return;

    try {
      const { data } = await supabase
        .from("profiles")
        .select("first_name, last_name, fav_candy")
        .eq("id", session.user.id)
        .single();

      if (data) {
        const fav = data.fav_candy ?? "";

        setFirstName(data.first_name ?? "");
        setLastName(data.last_name ?? "");
        setCandy(fav);

        await loadCandyStats(fav);
      }
    } 
    catch (err) {
      console.warn(err);
    }
  }
  async function loadCandyStats(userFavCandy: string) {
  if (!userFavCandy) return;

  try {
    // Count users with same favorite candy
    const { count: sameCandyCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("fav_candy", userFavCandy);

    // Count total users
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    if (sameCandyCount && totalUsers && totalUsers > 0) {
      const percent = (sameCandyCount / totalUsers) * 100;
      setCandyPercent(percent);
    } else {
      setCandyPercent(0);
    }
  } catch (err) {
    console.warn("Candy stat error:", err);
  }
}

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  };

  useEffect(() => {
  let mounted = true;
  let channel: any;

  
  loadProfile();

  if (session?.user) {
  channel = supabase
    .channel(`profile-${session.user.id}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${session.user.id}`,
      },
      (payload) => {
        console.log("Realtime payload:", payload);

        const updated = payload.new;

        if (updated) {
          setFirstName(updated.first_name ?? "");
          setLastName(updated.last_name ?? "");
          const fav = updated.fav_candy ?? "";
          setCandy(fav);
          loadCandyStats(fav);
        }
      }
    )
    .subscribe();
}

  return () => {
    mounted = false;

    if (channel) {
      supabase.removeChannel(channel);
    }
  };
}, [session]);

  

  return (
    <SafeAreaView style={defaultStyles.container}>
       <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
        <Text style={defaultStyles.titleText}>Favorite Candy Stats</Text>
    
          <Text style={[defaultStyles.titleText, {color: colors.dark}, {fontSize: 16}, {fontFamily: "Georgia"}]}>Your favorite candy is: {candy} </Text>
          {candyPercent !== null && (
          <Text style={[defaultStyles.titleText, {color: colors.dark}, {fontSize: 16}, {fontFamily: "Georgia"}]}>
            You are part of the {candyPercent.toFixed(1)}% of users who picked {candy}
          </Text>
          
      )}
   
      </ScrollView>
    </SafeAreaView>
  );
}
