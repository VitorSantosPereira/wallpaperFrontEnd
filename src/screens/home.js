import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
    
      <Text style={{fontSize: 45,fontWeight: 'bold',marginBottom: 10,color: '#333'}}>FOTO DE FUNDO</Text>
      <Text style={styles.subtitle}>Escolha uma opção para começar</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Fotos')}
      >
        <Text style={styles.buttonText}>FOTOS</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate('Automacao')}
      >
        <Text style={styles.buttonText}>AUTOMAÇÃO</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40, 
    textAlign: 'center'
  },

  button: {
    width: '80%',
    padding: 16,
    borderRadius: 12, 
    backgroundColor: '#007AFF', 
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loginButton: {
    backgroundColor: '#555', 
  },

  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.5 
  }
}); 