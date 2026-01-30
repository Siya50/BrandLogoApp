import { useAuth } from "@/components/AuthProvider";
import Button from "@/components/Button";
import TextField from "@/components/TextField";
import colors from "@/styles/colors";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../../styles/defaultStyles";

export default function Index() {
  const { session, isLoading: authLoading } = useAuth(); // AuthProvider provides session. :contentReference[oaicite:4]{index=4}

  // Local form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [candy, setCandy] = useState("");
  const [loading, setLoading] = useState(false); // screen action loading
  const [initialLoading, setInitialLoading] = useState(true); // loading while fetching profile

  // Load profile when component mounts or when session changes
  /* Subscribe to realtime updates for the current user's profile */

  /*
  EditProfile responsibilities:
  - Load current user's profile
  - Populate form fields
  - Validate input
  - Save changes with upsert
*/

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

  // Basic validation
  function validate(): boolean {
    if (!firstName.trim()) {
      Alert.alert("Please enter a first name.");
      return false;
    }
    if (!lastName.trim()) {
      Alert.alert("Please enter a last name.");
      return false;
    }
  
    if (!candy.trim()) {
      Alert.alert("Please enter your favorite candy.");
      return false;
    }
    return true;
  }

  async function saveProfile() {
    if (!session?.user) {
      Alert.alert("You must be signed in to update your profile.");
      return;
    }
    if (!validate()) return;

    setLoading(true);
    try {
      const userId = session.user.id;

      // Build payload (key names must match your DB columns)
      const payload = {
        id: userId, // must match auth.uid() in your RLS
        first_name: firstName?.trim() || null,
        last_name: lastName?.trim() || null,
        fav_candy: candy?.trim() || null,
        updated_at: new Date().toISOString(),
      };

      console.log("upsert payload:", payload);

      // Upsert without the unsupported `returning` option.
      // Chain .select() to ask PostgREST to return the row(s).
      // maybeSingle() returns either an object or null (no error if empty).
      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload) // upsert accepts object or array
        .select() // request returned rows
        .maybeSingle(); // safe: returns one object or null

      console.log("upsert result — data:", data, "error:", error);

      if (error) {
        // Show the server error message (friendly)
        Alert.alert("Save failed", error.message || JSON.stringify(error));
        return;
      }

      Alert.alert("Saved", "Your profile has been updated.");
    } catch (err) {
      console.error("saveProfile exception:", err);
      Alert.alert("Unexpected error", String(err));
    } finally {
      setLoading(false);
    }
  }
  if (initialLoading || authLoading) {
    return (
      <View style={[defaultStyles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 12 }}>Loading profile…</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text style= {defaultStyles.text}>Update your profile!</Text>
      <TextField
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextField
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextField
          placeholder="Favorite Candy"
          value={candy}
          onChangeText={setCandy}
        />
        <Button title= "Save Changes"  onPress = {saveProfile}></Button>
      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  form: {
    marginBottom: 24,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
