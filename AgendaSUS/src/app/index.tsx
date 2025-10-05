import Login from "../pages/login/login";
import React, { useContext } from "react";
import TabNavigator from "../navigation/TabNavigator";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";

function Root() {
  const auth: any = useContext(AuthContext as any);
  const { logged, loading } = auth || { logged: false, loading: true };

  if (loading) return null;

  return logged ? <TabNavigator /> : <Login />;
}

export default function HomePage() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}