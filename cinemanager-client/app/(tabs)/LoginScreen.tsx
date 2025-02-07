import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        if (!email || !password) {
            alert('Both fields are required.');
            return;
          }
        console.log('Logging in with:', email, password);
    };

    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                        <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.registerText}>
                    Don't have an account? <Text style={styles.link}>Register here</Text>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        maxWidth: 400,
        marginTop: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        color: '#C72C41',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 18,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        width: '100%',
        borderColor: '#C72C41',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        color: 'black',
    },
    button: {
        backgroundColor: '#C72C41',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    registerText: {
        textAlign: 'center',
        color: 'black',
    },
    link: {
        color: '#C72C41',
        fontWeight: 'bold',
    },
});

export default LoginScreen;