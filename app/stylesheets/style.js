import { StyleSheet  } from 'react-native';

export default StyleSheet.create({
  loginView: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    backgroundColor: '#333',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
  },
  buttonPair: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  }
});
