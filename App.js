import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [img, setImg] = useState(" ");
  const getCat = () => {
    fetch("https://aws.random.cat/meow")
      .then((response) => response.json())
      .then((data) => {
        setImg(data.file);
        console.log(img);
      });
  };
  useEffect(() => {
    getCat();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Générateur de chat</Text>
      <Image source={{ uri: img }} style={styles.img} />
      <Button
        onPress={getCat}
        title="Générer une image"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "80%",
    height: "65%",
    borderRadius: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
