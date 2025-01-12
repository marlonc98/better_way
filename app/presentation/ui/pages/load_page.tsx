import di from '@/app/dependency_injection';
import GetCurrentUseCase, { GetCurrentUseCaseName } from '@/app/domain/use_cases/auth/get_current_user_use_case';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, Animated } from 'react-native';
import routeList from '../../routes/route_list';

const LoadPage = () => {
    const navigation = useNavigation();
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shake = () => {
            Animated.sequence([
                Animated.timing(shakeAnimation, {
                    toValue: 10,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -10,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 10,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start(() => shake());
        };

        shake();
    }, [shakeAnimation]);

    const shakeStyle = {
        transform: [{ translateX: shakeAnimation }],
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                style={[styles.logo, shakeStyle]}
                source={require('@/assets/images/logo.png')}
            />
            <Text style={styles.text}>PokeApp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    }
});

export default LoadPage;