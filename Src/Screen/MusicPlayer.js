"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native"
import SoundPlayer from "react-native-sound-player"
import { useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import { launchImageLibrary } from "react-native-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/Ionicons"

const { width } = Dimensions.get("window")

const MusicPlayer = () => {
  const navigation = useNavigation()
  const songs = ["dhan", "cm", "sohar", "news", "aawele"]
  const [songIndex, setSongIndex] = useState(0)
  const currentSong = songs[songIndex]
  const [imageUri, setImageUri] = useState(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [dateTime, setDateTime] = useState("")
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // 🔥 Fix: Animated values stable banaye useRef ke sath
  const spinValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current
  const pulseValue = useRef(new Animated.Value(1)).current
  const slideValue = useRef(new Animated.Value(0)).current

  // Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return "Good Morning, Nici! ☕️";
    }
    if (hour >= 12 && hour < 17) {
      return "Good Afternoon, Nici! ☀️";
    }
    if (hour >= 17 && hour < 21) {
      return "Good Evening, Nici. 🌙";
    }
    return "Good Night, Baby ka Mammy.\n Baby love you ❤️";
};
  
  // Example usage
  console.log(getGreeting());

  // Time + Greeting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setDateTime(
        now.toLocaleString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
      setGreeting(getGreeting())
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Slide In Animation
  useEffect(() => {
    Animated.timing(slideValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [])

  // Album Spin
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
      ).start()
    } else {
      spinValue.stopAnimation()
      spinValue.setValue(0)
    }
  }, [isPlaying])

  // Pulse
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      pulseValue.setValue(1)
    }
  }, [isPlaying])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })
  const slideY = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  })

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const togglePlayPause = async () => {
    animateButtonPress()
    try {
      if (isPlaying) {
        SoundPlayer.pause()
        setIsPlaying(false)
      } else {
        SoundPlayer.playSoundFile(currentSong, "mp3")
        setIsPlaying(true)
        setTimeout(async () => {
          try {
            const info = await SoundPlayer.getInfo()
            setDuration(info.duration || 0)
          } catch {}
        }, 500)
      }
    } catch (e) {
      console.log("Error:", e)
    }
  }

  const stopSound = () => {
    try {
      SoundPlayer.stop()
      setIsPlaying(false)
      setCurrentTime(0)
    } catch {}
  }

  const switchSong = () => {
    animateButtonPress()
    stopSound()
    setSongIndex((prev) => (prev + 1) % songs.length)
  }

  const prevSong = () => {
    animateButtonPress()
    stopSound()
    setSongIndex((prev) => (prev - 1 + songs.length) % songs.length)
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(async () => {
        try {
          const info = await SoundPlayer.getInfo()
          setCurrentTime(info.currentTime || 0)
        } catch {}
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  // Album Image Load
  useEffect(() => {
    AsyncStorage.getItem("albumImage").then((savedUri) => savedUri && setImageUri(savedUri))
  }, [])

  const requestGalleryPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }
    return true
  }

  const handleImagePress = async () => {
    if (!(await requestGalleryPermission())) return Alert.alert("Permission Denied")
    const result = await launchImageLibrary({ mediaType: "photo" })
    if (result.assets?.length) {
      const uri = result.assets[0].uri
      setImageUri(uri)
      await AsyncStorage.setItem("albumImage", uri)
    }
  }

  const formatTime = (seconds) => {
    if (!seconds) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <LinearGradient colors={["#FF9A8B", "#FF6A88", "#FF99AC"]} style={styles.container}>
      <StatusBar backgroundColor="#FF6A88" barStyle="light-content" />

      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Music Player</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-vertical" size={22} color="white" />
        </TouchableOpacity>
      </View> */}

      <View style={styles.timeContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>

        {/* Unique Time Display with Glass Effect */}
        <View style={styles.timeGlassContainer}>
          <View style={styles.timeRow}>
            <View style={styles.timeDigitContainer}>
              <Text style={styles.timeDigit}>{new Date().getHours() % 12 || 12}</Text>
              <View style={styles.timeDots}>
                <View style={[styles.dot, { opacity: new Date().getSeconds() % 2 ? 1 : 0.3 }]} />
                <View style={[styles.dot, { opacity: new Date().getSeconds() % 2 ? 1 : 0.3 }]} />
              </View>
              <Text style={styles.timeDigit}>{new Date().getMinutes().toString().padStart(2, "0")}</Text>
            </View>
            <View style={styles.amPmContainer}>
              <Text style={styles.amPmText}>{new Date().getHours() >= 12 ? "PM" : "AM"}</Text>
              <View style={styles.secondsContainer}>
                <Text style={styles.secondsText}>{new Date().getSeconds().toString().padStart(2, "0")}</Text>
              </View>
            </View>
          </View>

          {/* Animated Progress Bar for Seconds */}
          <View style={styles.secondsProgressContainer}>
            <View style={styles.secondsProgressBar}>
              <View style={[styles.secondsProgress, { width: `${(new Date().getSeconds() / 60) * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Enhanced Date Display */}
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>
            {new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase()}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Text>
        </View>
      </View>

      {/* Album */}
      <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
        <Animated.View style={[styles.albumArt, { transform: [{ rotate: spin }] }]}>
          <Image source={imageUri ? { uri: imageUri } : require("../Assest/myphoto.jpg")} style={styles.albumImage} />
        </Animated.View>
      </TouchableOpacity>

      {/* Song Info */}
      <Text style={styles.songTitle}>{currentSong}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.songProgressBar}>
          <View style={[styles.songProgress, { width: duration ? `${(currentTime / duration) * 100}%` : "0%" }]} />
        </View>
        <View style={styles.songTimeRow}>
          <Text style={styles.songTime}>{formatTime(currentTime)}</Text>
          <Text style={styles.songTime}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={prevSong}>
          <Icon name="play-skip-back" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playPause}>
          <Icon name={isPlaying ? "pause" : "play"} size={40} color="#FF6A88" />
        </TouchableOpacity>
        <TouchableOpacity onPress={switchSong}>
          <Icon name="play-skip-forward" size={36} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default MusicPlayer

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  menuButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  timeContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  greetingText: {
    fontSize: 18,
    color: "white",
    marginBottom: 15,
    fontWeight: "bold",
  },
  timeGlassContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    paddingHorizontal:30,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeDigitContainer: {
    flexDirection: "row",
    alignItems: "center",

  },
  timeDigit: {
    fontSize: 52,
    color: "white",
    fontWeight: "800",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  timeDots: {
    marginHorizontal: 8,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    marginVertical: 2,
  },
  amPmContainer: {
    marginLeft: 12,
    alignItems: "center",
  },
  amPmText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    opacity: 0.9,
  },
  secondsContainer: {
    marginTop: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  secondsText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },
  secondsProgressContainer: {
    marginTop: 12,
    width: "100%",
  },
  secondsProgressBar: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  secondsProgress: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 2,
  },
  dateContainer: {
    alignItems: "center",
    marginTop: 12,
  },
  dayText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 2,
    opacity: 0.9,
  },
  dateText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  dateTime: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  albumArt: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    overflow: "hidden",
    margin: 20,
    borderWidth: 10,
    borderColor: "#fff",
  },
  albumImage: { width: "100%", height: "100%", borderRadius: width * 0.35 },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  progressContainer: { width: "85%", marginVertical: 10 },
  songProgressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
  },
  songProgress: { height: "100%", backgroundColor: "white", borderRadius: 3 },
  songTimeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 7 },
  songTime: { fontSize: 12, color: "white" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  playPause: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
})
