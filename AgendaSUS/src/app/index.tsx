import Login from "../pages/login/login";
import React, { useContext } from "react";
import TabNavigator from "../navigation/TabNavigator";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import AuthStack from '../navigation/AuthStack';

function Root() {
  const auth: any = useContext(AuthContext as any);
  const { logged, loading } = auth || { logged: false, loading: true };

  if (loading) return null;

  return logged ? <TabNavigator /> : <AuthStack />;
}

export default function HomePage() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}