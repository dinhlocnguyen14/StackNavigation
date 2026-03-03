import React, { useState } from 'react';
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
  Alert,
  Dimensions 
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 54 : StatusBar.currentHeight; 

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isValid = phoneNumber.length >= 9;

  const handlePress = () => {
    Alert.alert("Thông báo", `Đăng nhập với số: ${phoneNumber}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

        {/* 2. Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>✕</Text> 
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đăng nhập</Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* 3. Body */}
        <View style={styles.body}>
          <Text style={styles.title}>Nhập số điện thoại</Text>
          <Text style={styles.description}>
            Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
          </Text>

          <View style={[
            styles.inputContainer, 
            isFocused && styles.inputContainerFocused
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại của bạn"
              placeholderTextColor="#A0A0A0"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={true}
              selectionColor="#2D9CDB"
            />
            {phoneNumber.length > 0 && (
              <TouchableOpacity onPress={() => setPhoneNumber('')}>
                <View style={styles.clearBtn}>
                  <Text style={styles.clearBtnText}>✕</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 4. Footer */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.footer}
         
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <TouchableOpacity 
            style={[styles.button, !isValid && styles.buttonDisabled]} 
            disabled={!isValid}
            onPress={handlePress}
          >
            <Text style={[styles.buttonText, !isValid && styles.buttonTextDisabled]}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    
    paddingTop: STATUSBAR_HEIGHT, 
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, 
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50, 
    marginTop: 10, 
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconText: {
    fontSize: 24,
    color: '#1A1A1A',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  body: {
    paddingHorizontal: 24,
    paddingTop: 20, 
    flex: 1,
  },
  title: {
    fontSize: 26, 
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 22,
    marginBottom: 30,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
    paddingVertical: 10,
  },
  inputContainerFocused: {
    borderBottomColor: '#2D9CDB', 
    borderBottomWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#1A1A1A',
    paddingVertical: 5,
    fontWeight: '500',
  },
  clearBtn: {
    backgroundColor: '#E0E0E0',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearBtnText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20, 
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#2D9CDB', 
    paddingVertical: 16,
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#2D9CDB", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
  buttonDisabled: {
    backgroundColor: '#F2F2F2', 
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#BDBDBD',
  },
});