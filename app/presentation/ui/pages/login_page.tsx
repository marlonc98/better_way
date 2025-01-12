import di from '@/app/dependency_injection';
import { WaiterStatus } from '@/app/domain/entities/waiter_entity';
import LoginWithUserAndPasswordUseCase, { LoginWithUserAndPasswordUseCaseName } from '@/app/domain/use_cases/auth/login_with_user_and_password_use_case';
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import routeList from '../../routes/route_list';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length <= 0) {
            setError('Password is required');
            return
        }
        setError('');
        setLoading(true);
        const response = await di.get<LoginWithUserAndPasswordUseCase>(LoginWithUserAndPasswordUseCaseName).call({
            email,
            password,
        });
        console.log
        setLoading(false);
        if (response.status === WaiterStatus.ERROR) {
            setError(response.error ?? "Something went wrong");
            return
        } else {
            //navigate replacing the current route
            navigation.navigate(routeList.pokemons.relativePath as never);
        }
        // Call your login function here
        console.log('Login successful');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Poke App</Text>
            <Text style={styles.description}>Welcome! input your email and password to login. </Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                editable={!loading}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                editable={!loading}
                onChangeText={setPassword}
                secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button disabled={loading} title="Login" onPress={handleLogin} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
    },
    error: {
        color: 'red',
        marginBottom: 16,
    },
});

export default LoginPage;