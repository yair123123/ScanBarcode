import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type OptionItem = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

export default function Dropdown({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef<View>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const toggleExpanded = useCallback(() => {
    if (expanded) {
      setExpanded(false);
    } else {
      buttonRef.current?.measure(
        (x, y, width, height, pageX, pageY) => {
          setDropdownPosition({ top: pageY + height, left: pageX, width });
          setExpanded(true);
        }
      );
    }
  }, [expanded]);

  const onSelect = useCallback((item: OptionItem) => {
    onChange(item);
    setValue(item.label);
    setExpanded(false);
  }, [onChange]);

  return (
    <View ref={buttonRef}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} size={18} color="#3498db" />
      </TouchableOpacity>
      {expanded && (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[
                  styles.options,
                  {
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: dropdownPosition.width,
                  },
                ]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  optionItem: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden",
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
    color: "#333",
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
