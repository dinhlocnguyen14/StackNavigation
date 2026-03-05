import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const PRIMARY_COLOR = "#2D9CDB";

/* ================= LOGIN SCREEN ================= */

function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 6);
    const part3 = cleaned.slice(6, 10);

    if (cleaned.length <= 3) return part1;
    if (cleaned.length <= 6) return `${part1} ${part2}`;
    return `${part1} ${part2} ${part3}`;
  };

  const validatePhone = (phone) => {
    const regex = /^0(3|5|7|8|9)[0-9]{8}$/;

    if (phone.length === 0) {
      setError("");
      return;
    }

    if (!regex.test(phone)) {
      setError("Số điện thoại không đúng định dạng");
    } else {
      setError("");
    }
  };

  const handleChangeText = (text) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.startsWith("84")) {
      cleaned = "0" + cleaned.slice(2);
    }

    cleaned = cleaned.slice(0, 10);

    setPhoneNumber(cleaned);
    validatePhone(cleaned);
  };

  const isValid = phoneNumber.length === 10 && error === "";

  const handlePress = () => {
    if (!isValid) return;
    navigation.navigate("Home", { phone: phoneNumber });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />

        <View style={styles.body}>
          <Text style={styles.title}>Nhập số điện thoại</Text>
          <Text style={styles.description}>
            Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
          </Text>

          <View
            style={[
              styles.inputContainer,
              isFocused && styles.inputFocused,
              error && styles.inputError,
            ]}
          >
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={formatPhone(phoneNumber)}
              onChangeText={handleChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          {error !== "" && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.footer}
        >
          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            disabled={!isValid}
            onPress={handlePress}
          >
            <Text
              style={[styles.buttonText, !isValid && styles.buttonTextDisabled]}
            >
              TIẾP TỤC
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

/* ================= HOME SCREEN ================= */

function HomeScreen({ route }) {
  const { phone } = route.params;

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Trang chủ</Text>
      <Text style={homeStyles.phoneValue}>{phone}</Text>
    </View>
  );
}

/* ================= APP ROOT ================= */

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: PRIMARY_COLOR,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Trang chủ",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  inputFocused: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2,
  },
  inputError: {
    borderBottomColor: "#EB5757",
    borderBottomWidth: 2,
  },
  input: {
    fontSize: 18,
  },
  errorText: {
    color: "#EB5757",
    marginTop: 8,
  },
  footer: {
    padding: 24,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    borderRadius: 4, // Android thường ít bo tròn
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: "#888",
  },
});

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  phoneValue: {
    fontSize: 18,
  },
});
