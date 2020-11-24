import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
import { data } from "../../definitions/IntroductionSliderItem";
import { IntroductionSliderItem } from "../../models/IntroductionSliderItem";

const OnBoardingScreen: React.FC = () => {
//   const slider: AppIntroSlider | undefined;

  const _renderItem = ({ item }: { item: IntroductionSliderItem }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Text style={{ color: "#FFFFFF" }}>เริ่มต้นใช้งาน</Text>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Text style={{ color: "#FFFFFF" }}>ต่อไป</Text>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.buttonSkip}>
        <Text style={{ color: "#000000" }}>ข้าม</Text>
      </View>
    );
  };

  const _keyExtractor = (item: IntroductionSliderItem) => item.title;


  return (
    <AppIntroSlider
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      data={data}
    //   onDone={_onDone}
      showSkipButton
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      nextLabel="ต่อไป"
      skipLabel="ข้าม"
      bottomButton
      activeDotStyle={styles.dot}
    />
  );
};
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    marginTop: 10,
    color: "#616A7B",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "#000000",
    textAlign: "center",
  },
  button: {
    height: 48,
    backgroundColor: "#4C95FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    color: "#FFFFFF",
  },
  buttonSkip: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    color: "#FFFFFF",
    margin: 5,
  },

  dot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: "#4C95FF",
  },
});

export default OnBoardingScreen