// App.js (React Native)
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Slider
} from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [volume, setVolume] = useState(0.7);

  const channels = [
    {
      id: 'kirtan',
      name: 'ਕੀਰਤਨ',
      description: 'ਸ਼ਾਂਤੀਪੂਰਣ ਗੁਰਬਾਣੀ ਕੀਰਤਨ',
      icon: 'music',
      color: '#FF9800'
    },
    {
      id: 'katha',
      name: 'ਕਥਾ',
      description: 'ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਕਥਾ',
      icon: 'book-open',
      color: '#4CAF50'
    },
    {
      id: 'history',
      name: 'ਇਤਿਹਾਸ',
      description: 'ਸਿੱਖ ਇਤਿਹਾਸ ਅਤੇ ਸਾਖੀਆਂ',
      icon: 'landmark',
      color: '#2196F3'
    },
    {
      id: 'live',
      name: 'ਲਾਈਵ',
      description: 'ਲਾਈਵ ਹਰਿਮੰਦਰ ਸਾਹਿਬ',
      icon: 'broadcast-tower',
      color: '#F44336'
    }
  ];

  const playChannel = async (channel) => {
    if (sound) {
      await sound.unloadAsync();
    }
    
    setCurrentChannel(channel);
    
    // Load and play audio
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: `YOUR_STREAM_URL_${channel.id}` },
      { shouldPlay: true, volume }
    );
    
    setSound(newSound);
    setIsPlaying(true);
  };

  const togglePlayPause = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="pray" size={30} color="#FF9800" />
        <Text style={styles.headerTitle}>ਗੁਰਬਾਣੀ ਰੇਡੀਓ</Text>
      </View>

      {/* Player */}
      <View style={styles.player}>
        <Text style={styles.currentTrack}>
          {currentChannel?.name || 'ਕੀਰਤਨ'}
        </Text>
        <Text style={styles.artist}>
          {currentChannel?.description || 'ਗੁਰਬਾਣੀ'}
        </Text>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn}>
            <Icon name="step-backward" size={24} color="#FF9800" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playBtn} 
            onPress={togglePlayPause}
          >
            <Icon 
              name={isPlaying ? 'pause' : 'play'} 
              size={30} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlBtn}>
            <Icon name="step-forward" size={24} color="#FF9800" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.volumeContainer}>
          <Icon name="volume-up" size={20} color="#FF9800" />
          <Slider
            style={styles.slider}
            value={volume}
            onValueChange={setVolume}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FF9800"
          />
        </View>
      </View>

      {/* Channels */}
      <ScrollView style={styles.channelsContainer}>
        <Text style={styles.sectionTitle}>ਚੈਨਲ</Text>
        {channels.map((channel) => (
          <TouchableOpacity
            key={channel.id}
            style={styles.channelCard}
            onPress={() => playChannel(channel)}
          >
            <View style={[styles.channelIcon, {backgroundColor: channel.color}]}>
              <Icon name={channel.icon} size={24} color="white" />
            </View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.channelDesc}>{channel.description}</Text>
            </View>
            <Icon name="play-circle" size={24} color="#FF9800" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  player: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  currentTrack: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  artist: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  controlBtn: {
    padding: 15,
  },
  playBtn: {
    backgroundColor: '#FF9800',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
  channelsContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  channelIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelInfo: {
    flex: 1,
    marginLeft: 15,
  },
  channelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  channelDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
