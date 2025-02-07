import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useRouter } from 'expo-router';

const MovieCatalogScreen = () => {
    const [movies, setMovies] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('http://your-api-url/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error(error));
    }, []); 

    return (
        <View>
            <FlatList
                data={movies}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        {/* <Text>{item.title}</Text> */}
                        <Button title="View Details" onPress={() => {/* Navigate to detail screen */}} />
                    </View>
                )}
            />
        </View>
    );
};

export default MovieCatalogScreen;