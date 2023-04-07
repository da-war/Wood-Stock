import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";

const DropDown = ({
  data,
  onSelectItem = () => {},
  placeholder = "Select Item",
  selectedItem,
}) => {
  const [showOptions, setShowOption] = React.useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.dropDownContainer}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOptions)}
      >
        {selectedItem?.name ? (
          <Text>{selectedItem.name}</Text>
        ) : (
          <Text style={styles.place}>{placeholder}</Text>
        )}
        <MaterialCommunityIcons
          name="chevron-down"
          color={COLORS.gray}
          size={25}
          style={{ transform: [{ rotate: showOptions ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.dropDownList}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  onSelectItem(item);
                  setShowOption(false);
                  console.log("selected item", item);
                }}
              >
                <View style={styles.container}>
                  <Text key={item.id} style={styles.text}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropDownContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 7,
    minHeight: 42,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.lighter,
  },
  dropDownList: {
    backgroundColor: COLORS.lighter,
    padding: 10,
    borderRadius: 25,
  },
  dropDownText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginLeft: 10,
  },

  container: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 7,
    minHeight: 35,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
  },
  place: {
    color: COLORS.gray,
  },
  text: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    marginLeft: 10,
  },
});
