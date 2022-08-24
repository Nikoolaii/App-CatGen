import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Image, Text, PermissionsAndroid, Platform, } from "react-native";
import { useState, useEffect } from "react";
import { downloadFileFromUri } from 'expo-downloads-manager';

export default function App() {
    const [img, setImg] = useState(" ");
    const [fileName, setfileName] = useState(" ");

    const [downloadStatus, setDownloadStatus] = useState("NOTSTARTED");
    const [downloadProgress, setDownloadProgress] = useState(0);

    const getCat = () => {
        let date = new Date();
        fetch("https://aws.random.cat/meow")
            .then((response) => response.json())
            .then((data) => {
                setImg(data.file);
                let ext = data.file.split('.').pop();
                setfileName(Math.floor(date.getTime() + date.getSeconds() / 2) + ext);
                console.log(img);
            });
    };

    useEffect(() => {
        getCat();
    }, []);

    const callback = (downloadProgress) => {
        const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Générateur de chat</Text>
            <Image source={{ uri: img }} style={styles.img} />
            <Button
                onPress={getCat}
                title="ignorer une image"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                title='Download'
                color="#841584"
                onPress={async () => {
                const { status, error } = await downloadFileFromUri(
                    img,
                    fileName,
                    callback
                );
            }}
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
