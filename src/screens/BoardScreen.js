import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, ScrollView , TouchableOpacity} from 'react-native';
import ListComponent from '../components/ListComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoardScreen = () => {
    const [lists, setLists] = useState([]);
    const [newListTitle, setNewListTitle] = useState('');

    useEffect(() => {
        loadBoard();
    }, []);

    useEffect(() => {
        saveBoard();
    }, [lists]);

    const loadBoard = async () => {
        const data = await AsyncStorage.getItem('board');
        if (data) setLists(JSON.parse(data));
    };

    const saveBoard = async () => {
        await AsyncStorage.setItem('board', JSON.stringify(lists));
    };

    const addList = () => {
        if (newListTitle.trim()) {
            setLists([...lists, { id: Date.now().toString(), title: newListTitle, cards: [] }]);
            setNewListTitle('');
        }
    };

    const deleteList = (listId) => {
        setLists(lists.filter(list => list.id !== listId));
    };

    const updateList = (listId, updateFn) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? { ...list, cards: typeof updateFn === 'function' ? updateFn(list.cards) : updateFn }
                    : list
            )
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Trello Board</Text>
            <TextInput
                style={styles.input}
                placeholder="New List Title"
                value={newListTitle}
                onChangeText={setNewListTitle}
            />
            <TouchableOpacity onPress={addList} style={[styles.btn, { backgroundColor: '#0490d1' }]}>
                <Text style={styles.txt}>Add List</Text>
            </TouchableOpacity>
            <ScrollView horizontal>
                {lists.map(list => (
                    <ListComponent
                        key={list.id}
                        list={list}
                        deleteList={deleteList}
                        updateList={updateList}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setLists([])} style={[styles.btn, { backgroundColor: 'red' }]}>
                <Text style={styles.txt}>Reset Board</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 10 
    },
    header: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    input: { 
        borderWidth: 0.5, 
        marginBottom: 10, 
        padding: 10, 
        borderRadius: 5 
    },
    btn: {
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 5,
    },
    txt: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default BoardScreen;