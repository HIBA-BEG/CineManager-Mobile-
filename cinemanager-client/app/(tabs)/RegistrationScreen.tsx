import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { register } from '../services/authService';

const RegistrationScreen = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        numero_telephone: '',
        adresse: '',
        birthday: '',
        profilePic: null,
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!formData.nom || !formData.prenom || !formData.email || !formData.password || !formData.numero_telephone) {
            setError('All fields are required.');
            return;
        }
        try {
            const response = await register(formData);
            console.log('Registration successful:', response);
            // I still need to add the redirection
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Registration failed. Please try again.');
        }
        // console.log('Registering with:', formData);
    };

    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <View style={styles.form}>
                    {['nom', 'prenom', 'email', 'password', 'numero_telephone'].map((field) => (
                        <View key={field}>
                            <Text style={styles.label}>{field === 'numero_telephone' ? 'Numero Telephone' : field}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={`Enter your ${field === 'numero_telephone' ? 'numero telephone number' : field}`}
                                // value={formData[field]}
                                onChangeText={(value) => handleChange(field, value)}
                                secureTextEntry={field === 'password'}
                                keyboardType={field === 'email' ? 'email-address' : 'default'}
                            />
                        </View>
                    ))}
                    {/* <View>
                        <Text style={styles.label}>Profile Picture</Text>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
                        </TouchableOpacity>
                    </View> */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                        <Text style={styles.buttonText}>{isLoading ? 'Registering...' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.registerText}>
                    Already have an account? <Text style={styles.link}>Login here</Text>
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
    label: {
        fontWeight: 'bold',
        color: '#C72C41',
        marginBottom: 5,
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
    datePicker: {
        width: '100%',
        marginBottom: 15,
    },
    uploadButton: {
        padding: 10,
        backgroundColor: '#C72C41',
        borderRadius: 5,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#C72C41',
        padding: 10,
        borderRadius: 12,
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

export default RegistrationScreen;