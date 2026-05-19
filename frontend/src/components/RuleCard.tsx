import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  description: string;
  category?: string;
};

const RuleCard: React.FC<Props> = ({ title, description, category }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
      {category && <Text style={styles.category}>{category}</Text>}
    </View>
  );
};

export default RuleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    marginTop: 5,
    color: "#555",
  },
  category: {
    marginTop: 5,
    color: "blue",
    fontSize: 12,
  },
});