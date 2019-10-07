import React, {useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView,  AsyncStorage, Image, StyleSheet, Text,  TouchableOpacity } from 'react-native';

import logo from '../assets/logo1.png'

import SpotList from '../components/SpotList';

export default function List({ navigation }){

    const [techs, setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio('http://192.168.25.46:3333',{
                query: {user_id},
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'aprovada' : 'negada' }`)
            })
        });

    },[]);

    useEffect(()=>{
            AsyncStorage.getItem('techs').then(storagedTechs =>{
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, []);

    async function handleLogOut(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}> 
                <Image style={styles.logo}source={logo} />
                
                <ScrollView>
                    {techs.map(tech => <SpotList key={tech} tech={tech} /> )}
                </ScrollView>

                <TouchableOpacity onPress={handleLogOut} style={styles.buttonLogOut}>
                   <Text style={styles.textLogOut}>Sair</Text>
                </TouchableOpacity>
        </SafeAreaView>
    )
           
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo:{
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    },
    buttonLogOut:{
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,

    },
    textLogOut:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }

});

