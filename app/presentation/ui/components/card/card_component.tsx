import React, { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CardComponentProps from "./card_component_props";

const CardComponent: FC<CardComponentProps> = ({ title, description, image, width = "100%", height = 200, }) => {
    return (
        <View style={{...styles.card, width: width}}>
            <Image source={{ uri: image }} style={{...styles.image, height: height}} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 10,
    },
    image: {
        objectFit: 'contain',
    },
    textContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: "capitalize",
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default CardComponent;