import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";
import DropDownItem from "./DropDownItem";

const FieldItem = ({
  title,
  onPress,
  type,
  list,
  dropDownItems = [],
  onDeleteDropDownItem,
}) => {
  const [showList, setShowList] = React.useState(false);

  const onPressDown = () => {
    setShowList(!showList);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.iconsContainer}>
          {type === "dropdown" && (
            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color={COLORS.secondary}
              onPress={onPressDown}
              style={showList ? { transform: [{ rotate: "180deg" }] } : {}}
            />
          )}
          <MaterialCommunityIcons
            name="delete"
            size={24}
            color={COLORS.secondary}
            onPress={onPress}
          />
        </View>
      </View>
      <View style={styles.rowyContainer}>
        <ScrollView horizontal>
          {showList &&
            dropDownItems.map((item, index) => (
              <DropDownItem
                title={item.name}
                onPressDelete={onDeleteDropDownItem}
                hide={true}
              />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default FieldItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 7,
    borderRadius: 4,
    paddingHorizontal: 12,
    marginVertical: 3,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  title: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  rowyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
