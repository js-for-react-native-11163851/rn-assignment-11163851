import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing images from local directory
const profileImage = require('./images/profile.png');
const mastercardImage = require('./images/Card.png');
const sentIcon = require('./images/send.png');
const receiveIcon = require('./images/recieve.png');
const loanIcon = require('./images/loan.png');
const topupIcon = require('./images/topUp.png');
const appleLogo = require('./images/apple.png');
const spotifyLogo = require('./images/spotify.png');
const moneyTransferLogo = require('./images/moneyTransfer.png');
const groceryLogo = require('./images/grocery.png');
const homeIcon = require('./images/home.png');
const cardsIcon = require('./images/myCards.png'); // Corrected image import
const statisticsIcon = require('./images/statictics.png'); // Corrected image import
const settingsIcon = require('./images/settings.png'); // Corrected image import

// Define transactions data with title and image
const transactionsData = [
  { title: 'Apple Store', image: appleLogo, category: 'Entertainment', amount: '-$5.99' },
  { title: 'Spotify', image: spotifyLogo, category: 'Music', amount: '-$9.99' },
  { title: 'Money Transfer', image: moneyTransferLogo, category: 'Finance', amount: '-$25.00' },
  { title: 'Grocery', image: groceryLogo, category: 'Shopping', amount: '-$35.00' },
];

// Home screen component
const HomeScreen = ({ navigation, isDarkMode, setIsDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <View>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>Welcome back,</Text>
            <Text style={[styles.text, styles.boldText, isDarkMode && styles.darkText]}>Gideon Asomani</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.searchIconContainer}>
          <Image source={require('./images/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <Image source={mastercardImage} style={styles.cardImage} />

      <View style={styles.iconRow}>
        {['Sent', 'Receive', 'Loan', 'Topup'].map((label, index) => (
          <TouchableOpacity key={index} style={styles.iconContainer}>
            <Image source={[sentIcon, receiveIcon, loanIcon, topupIcon][index]} style={styles.icon} />
            <Text style={[styles.iconText, isDarkMode && styles.darkText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.transactions}>
          <Text style={[styles.transactionsTitle, isDarkMode && styles.darkText]}>
            Transactions<Text style={[styles.seeAll, isDarkMode && styles.darkText]}> See all</Text>
          </Text>
         
          {transactionsData.map((transaction, index) => (
            <View key={index} style={styles.transactionContainer}>
              <Image source={transaction.image} style={styles.transactionLogo} />
              <View style={styles.transactionDetails}>
                <Text style={[styles.text, isDarkMode && styles.darkText]}>{transaction.title}</Text>
                <Text style={[styles.text, isDarkMode && styles.darkText]}>{transaction.category}</Text>
              </View>
              <Text style={[styles.transactionAmount, isDarkMode && styles.darkText]}>{transaction.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomRow}>
        {['Home', 'My Cards', 'Statistics', 'Settings'].map((label, index) => (
          <TouchableOpacity key={index} style={styles.bottomIcon} onPress={() => navigation.navigate(label)}>
            <Image source={[homeIcon, cardsIcon, statisticsIcon, settingsIcon][index]} style={styles.icon} />
            <Text style={[styles.iconText, isDarkMode && styles.darkText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Settings screen component
const SettingsScreen = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.settingsTitle, isDarkMode && styles.darkText]}>Settings</Text>
      <View style={styles.settingsList}>
        {['Language', 'My Profile', 'Contact Us', 'Change Password', 'Privacy Policy'].map((label, index) => (
          <TouchableOpacity key={index} style={styles.settingsItem}>
            <Text style={[styles.text, isDarkMode && styles.darkText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.themeToggle}>
        <Text style={[styles.themeToggleText, isDarkMode && styles.darkText]}>Theme</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(newValue) => setIsDarkMode(newValue)}
          trackColor={{ false:  '#767577', true:  'green' }}
          thumbColor={isDarkMode ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
};

// Setting up navigation stack
const Stack = createStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => <SettingsScreen {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  text: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  boldText: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  searchIconContainer: {
    position: 'absolute',
    right: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  cardImage: {
    width: 355,
    height: 210,
    marginVertical: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconText: {
    marginTop: 5,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  transactions: {
    marginBottom: 20,
  },
  transactionsTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  seeAll: {
    color: 'blue',
    fontSize: 15,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    width: 350,
  },
  transactionLogo: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginRight: 5,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionAmount: {
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomIcon: {
    width: '30%',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 24,
    marginBottom: 70,
    fontWeight: 'bold',
  },
  settingsList: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  settingsItem: {
    marginBottom: 40,
    fontWeight: 'bold',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 230,
    bottom: 20,
    left: 20,
  },
  themeToggleText: {
    marginRight: 250,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

