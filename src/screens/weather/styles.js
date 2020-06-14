import { StyleSheet } from "react-native";

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  searchBar: {
    paddingTop: '5%',
    width: '100%',
  },
  weatherContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textShadowColor: "#1B1806",
    textShadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
  },
  tempText: {
    fontSize: 72,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 25,
    color: "#fff",
  },
  city: {
    fontSize: 25,
    color: "#fff",
  },
  subtitle: {
    fontSize: 24,
    color: "#fff",
  },
  error: {
    fontSize: 24,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
