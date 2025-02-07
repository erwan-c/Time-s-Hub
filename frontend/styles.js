import { StyleSheet } from 'react-native';

export const stylesGlobal = StyleSheet.create({
 
  title: {
    alignSelf:"center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#c6c6c6",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#FF9000',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  
  buttonSecondary: {
    backgroundColor: '#FF9000',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPlayText: {
    color:'#000000',
    fontSize: 42,
    fontWeight: 'bold',
  },
  buttonText: {
    color:'#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FF9000',
    borderRadius: 6,
    fontSize: 16,
    color: '#c6c6c6',
    marginBottom: 10,
    backgroundColor: '#212121', 

  },
  container: {
    flex: 1,
    backgroundColor: '#0000',
    paddingTop: 50,
  },
  linkText: { color: "#c6c6c6", marginTop: 10, fontSize: 16 },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 18,
    color: "#FF9000",
  },
  errorTitle: {
    fontSize: 24,
    color: "#FF9000",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#c6c6c6",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF9000",
  },
  info: {
    fontSize: 16,
    color: "#c6c6c6",
    marginTop: 5,
  },
  subTitle: {
    fontSize: 20,
    color: "#FF9000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c6c6c6",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  teamScore: {
    fontSize: 16,
    color: "#c6c6c6",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});
