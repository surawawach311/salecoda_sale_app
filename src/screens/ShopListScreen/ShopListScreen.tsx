import { Container, Content, List, ListItem ,Header} from "native-base";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ShopListScreen: React.FC = () => {
  return (
    <Container>
    {/* <Header /> */}
    <Content>
      <List>
        <ListItem itemDivider>
          <Text>A</Text>
        </ListItem>                    
        <ListItem>
          <Text>Aaron Bennet</Text>
        </ListItem>
        <ListItem>
          <Text>Ali Connors</Text>
        </ListItem>
        <ListItem itemDivider>
          <Text>B</Text>
        </ListItem>  
        <ListItem>
          <Text>Bradley Horowitz</Text>
        </ListItem>
      </List>
    </Content>
  </Container>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ShopListScreen;
