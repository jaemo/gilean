import { StyleSheet  } from 'react-native';

export default StyleSheet.create({
  loginView: {
    backgroundColor: "#212121",
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  logoframe: {
    flex: 1,
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    width: 300,
  },
  scrollContainer: {
    backgroundColor: '#333',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#333',
  },
  listitem: {
    backgroundColor: '#282828',
    borderWidth: 0,
  },
  listItemText: {
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#282828',
    borderRadius: 6,
    borderWidth: 0,
  },
  text: {
    color: "#fff",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  lighterInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    color: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 6,
    marginBottom: 10,
    fontWeight: 'bold',
    backgroundColor: '#444444'
  },
  button: {
    backgroundColor: "#666",
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  formLabel: {
    marginBottom: 10,
    color: "#ddd",
  },
  buttonPair: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonPairButton: {
    width: '40%',
    backgroundColor: "#666",
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  deletebutton: {
    backgroundColor: "#666",
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row'
  },
  buttonText: {
    justifyContent: 'center',
    color: "#4286f4",
    fontWeight: "bold",
    fontSize: 16,
  },
  deletebuttonText: {
    justifyContent: 'center',
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
  largeHeader: {
    alignItems:'center',
    justifyContent:'center',
    fontSize: 20,
    textAlign: 'center',
    color: "#ffffff",
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deleteModal: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  deleteWarningDialog: {
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(1,1,1, 0.5)',

  },
  deleteWarningCard: {
    backgroundColor: "#333",
    borderRadius: 6,
  }
});
