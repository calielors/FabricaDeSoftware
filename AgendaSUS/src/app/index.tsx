import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../contexts/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { logged, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!logged) {
        router.replace("/auth/login");
      } else {
        router.replace("/home/home");
      }
    }
  }, [loading, logged]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}