import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CardModal = ({ route, navigation }) => {
    const { card, listId, updateList } = route.params;
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [dueDate, setDueDate] = useState(card.dueDate);

    const saveChanges = () => {
        const updatedCard = { ...card, title, description, dueDate };

        updateList(listId, (prevCards) => {
            const updatedCards = prevCards.map(c => (c.id === card.id ? updatedCard : c));
            return updatedCards;
        });

        navigation.goBack();
    };

    const deleteCard = () => {
        updateList(listId, (prevCards) => {
            const updatedCards = prevCards.filter(c => c.id !== card.id);
            return updatedCards;
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text  style={styles.headerTxt}>Edit Card</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />
            <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="Due Date (YYYY-MM-DD)" />
            <View style={styles.buttons}>
                <TouchableOpacity onPress={saveChanges} style={[styles.btn, { backgroundColor: '#0490d1' }]}>
                    <Text style={styles.txt}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteCard} style={[styles.btn, { backgroundColor: 'red' }]}>
                    <Text style={styles.txt} >Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        padding: 20, 
        justifyContent: 'center' , 
        backgroundColor:'FFFFFF'
    },
    headerTxt:{
        fontFamily:'bold',
        fontSize:20,
        marginBottom:10
    },
    input: { 
        borderWidth: 1, 
        marginBottom: 10, 
        padding: 10, 
        borderRadius: 5 
    },
    buttons: {
        flexDirection: 'column',
    },
    btn: {
        borderWidth:0.5,
        padding: 10,
        borderRadius: 5,
        marginVertical:5,
        
    },
    txt:{
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    }
});

export default CardModal;
