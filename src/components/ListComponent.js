import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListComponent = ({ list, deleteList, updateList }) => {
    const [newCardTitle, setNewCardTitle] = useState('');
    const navigation = useNavigation();

    const addCard = () => {
        if (newCardTitle.trim()) {
            const updatedCards = [...list.cards, { id: Date.now().toString(), title: newCardTitle, description: '', dueDate: '' }];
            updateList(list.id, updatedCards);
            setNewCardTitle('');
        }
    };

    const openCard = (card) => {
        navigation.navigate('CardModal', { card, listId: list.id, updateList });
    };

    const deleteListHandler = () => {
        deleteList(list.id);
    };

    return (
        <View style={styles.listContainer}>
            <Text style={styles.title}>{list.title}</Text>
            <FlatList
                data={list.cards}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openCard(item)}>
                        <Text style={styles.card}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="New Card Title"
                value={newCardTitle}
                onChangeText={setNewCardTitle}
            />
            <View style={styles.buttons}>
                <TouchableOpacity onPress={addCard} style={[styles.btn, { backgroundColor: '#0490d1' }]}>
                    <Text style={styles.txt}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteListHandler} style={[styles.btn, { backgroundColor: 'red' }]}>
                    <Text style={styles.txt} >Delete List</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
        backgroundColor: '#EBECF0',
        marginRight: 10,
        borderRadius: 8,
        width: 200
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        borderWidth: 0.5,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF'
    },
    card: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 5,
    },
    txt: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default ListComponent;