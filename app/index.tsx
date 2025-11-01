import { ActivityIndicator, View } from "react-native";

// Root index - the _layout.tsx handles auth routing
export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

