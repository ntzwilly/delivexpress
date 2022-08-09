import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  AdjustmentsIcon,
  UserIcon,
  SearchIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
                     ...,
                     restaurants[]->{
                     ...,
                     dishes[]->,
                    },
          }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  console.log(featuredCategories)

  // const query = '*[_type == "featured"] { ..., restaurants[]->{ ..., dishes[]->,  },}';
  
  // client.fetch(query).then((data) => {
  //   console.log(data);
  // });

  return (
    <View className="bg-white pt-10">
      <View className="flex-row pb-3 items-center mx-2 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-400 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-300 p-3">
          <SearchIcon color="gray" />
          <TextInput placeholder="Restaurants and Cuisines" />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>
      {/* Featured Row */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />
        {/* Featured Rows */}
        <FeaturedRow
          id="123"
          title="Featured"
          description="Pad placements from our partners"
        />
        <FeaturedRow
          id="1234"
          title="Tasty Discounts"
          description="Pad placements from our partners"
        />
        <FeaturedRow
          id="12345"
          title="Offers near you!"
          description="Pad placements from our partners"
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
