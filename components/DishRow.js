import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Currency from 'react-currency-formatter';
 

const DishRow = ({ id, name, description, price, image }) => {
  return (
    <TouchableOpacity>
      <View>
        <Text className="text-lg mb-1">{name}</Text>
        <Text className="Text-gray-400">{description}</Text>
        <Text>
          {price}
          <Currency quantity={price} currency="GBP" />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DishRow;
