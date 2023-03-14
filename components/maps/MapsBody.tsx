import React, {useEffect, useState} from 'react'
import { View } from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import { useTheme } from 'react-native-paper';
import * as Location from 'expo-location';

const MapsBody = () => {

    const theme = useTheme();

    const [initialRegion, setInitialRegion] = useState({
        latitude:  46.771069, 
        longitude: 23.596883,
    });
    const [myLocation, setMyLocation] = useState<Location.LocationObject>();

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setMyLocation(location);
        })();
    }, []);
    
    useEffect(() => {
        if(myLocation != undefined)
            console.log("LOCATION lat: " + myLocation.coords.latitude + "; long: " + myLocation.coords.longitude );
    }, [myLocation])

    return(
        <View>
            {
                myLocation == undefined ? (
                    <MapView style={{width: '100%', height: '100%'}}
                        initialRegion={{
                        latitude: initialRegion.latitude,
                        longitude: initialRegion.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    />
                ):
                (
                    <MapView style={{width: '100%', height: '100%'}}
                        initialRegion={{
                        latitude: myLocation.coords.latitude,
                        longitude: myLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    >
                    <Marker
                        key={1}
                        coordinate={myLocation.coords}
                        title={'Your location'}
                    />
                    </MapView>
                )

            }
           
        </View>
      
    );
};

export default MapsBody;

