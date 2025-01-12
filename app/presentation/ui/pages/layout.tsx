import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Layout = () => {
    return <View>
        <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log('Home')}
        >
          <MaterialCommunityIcons name="home" size={30}/>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log('Settings')}
        >
          <MaterialCommunityIcons name="settings-helper" size={30} />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>

    </View>
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    navButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    navLabel: {
      fontSize: 12,
      color: 'gray',
    },
  });
  

export default Layout;