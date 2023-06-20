import React, {useState, useEffect} from "react";
import { ScrollView, View } from 'react-native'

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Text } from 'react-native-paper'

import { AggresiveEventCard, EventCard, GeneralHeader, InformationalSvgComponent, LoadingComponent, PrimaryContainer } from "../../../components/general";
import { SkateProfiles } from "../../../components/profile";
import { setCurrentSkateProfile } from "../../../redux/appState";
import { RootState } from "../../../redux/store";
import { Layout2PieceForNavigator } from "../../layouts";
import { scale, verticalScale } from "react-native-size-matters";
import { EmptyBoxSvg } from "../../../components/svg/general";
import { Fetch } from "../../../services";
import { uiUtils } from "../../../utils";
import { Event, SkatePracticeStyles } from "../../../types";
import { SpacingStyles } from "../../../styles";

const MyEvents = () => {

  const {currentSkateProfile, user} = useSelector((state: RootState) => state.appState)
  const [events, setEvents] = useState<Array<Event>>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("\n\nCHNAGED\n\n")
    
    getAndSetMyEvents();

  }, [currentSkateProfile])  

  const getAndSetMyEvents = () => {
    setLoading(true);

    if(currentSkateProfile !== undefined)
      {
      // setLoading(true);
        console.log("Getting for skateProfile with id: " + currentSkateProfile.id);
        Fetch.getEventsForSkateProfile(currentSkateProfile.id,
            (joinedEvents) => {setEvents(joinedEvents), setLoading(false);},
            () => {setEvents([]);  uiUtils.showPopUp("Error", "Database is not working\nWe couldn't load user events"); setLoading(false);}
        );
      }
      else setLoading(false);
  }



  // const getEvents = () => {
  //   if(currentSkateProfile !== undefined && currentSkateProfile !== null &&
  //     events !==  null && events !== undefined && events.length > 0)
  //     {   
  //     //console.log("current skateProfile with id: " + currentSkateProfile.id);

  //       //console.log("MY EVENT AGGRESIVE:  " + JSON.stringify(events));
  //       return events.map((evnt, index) => {
  //           if(currentSkateProfile !== undefined && currentSkateProfile !== null && currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
  //           {
  //               return(
  //                   <AggresiveEventCard key={index} event={evnt} joined={true}
  //                   onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></AggresiveEventCard>
                   
  //               )
  //           }
  //           else
  //           {
  //             return(
  //                 <EventCard key={index} event={evnt} joined={true}
  //                 onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></EventCard>
  //             );
  //           } 
  //       });
  //     }
  //     else {
  //       return <InformationalSvgComponent
  //                   headline="You are not attending any event"
  //                   body="Check out the event section. If there are events available, select something appealing to you"
  //                   svgElement={<EmptyBoxSvg></EmptyBoxSvg>}
  //               />
  //     }
  // }

  const getBody = () => {
    return(
      <View style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
         {
        user !== undefined &&
        <SkateProfiles style={{margin: scale(20)}} profiles={user?.skateProfiles} value={currentSkateProfile}
        onValueChange={(profile) => {setLoading(true); dispatch(setCurrentSkateProfile(profile))}}></SkateProfiles>
        }
        {
          loading === true ?
          (
            <PrimaryContainer styleInput={SpacingStyles.eventCard}>
              <LoadingComponent height={SpacingStyles.eventCard.height} width={SpacingStyles.eventCard.width}></LoadingComponent>
            </PrimaryContainer>
          ):
          (
            events !==  null && events !== undefined && events.length > 0 ? 
            (
              <ScrollView style={{width: "98%"}}>
                {
                  events.map((evnt, index) => {
                    if(currentSkateProfile !== undefined && currentSkateProfile !== null
                      && currentSkateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
                    {
                        return(
                            <AggresiveEventCard key={index} event={evnt} joined={true}
                            onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></AggresiveEventCard>
                          
                        )
                    }
                    else
                    {
                      return(
                          <EventCard key={index} event={evnt} joined={true}
                          onPress={() => navigation.navigate('EventDisplay' as never, {event: evnt} as never)}></EventCard>
                      );
                    } 
                  })
                }
              </ScrollView>
              
            ):(
                <InformationalSvgComponent
                    headline="You are not attending any event"
                    body="Check out the event section. If there are events available, select something appealing to you"
                    svgElement={<EmptyBoxSvg></EmptyBoxSvg>}
                />
            )
          )
        }
      </View>
    );
  };
  
  return (
    <Layout2PieceForNavigator 
            header={ <GeneralHeader title="Your events" onChat={() => console.log("[MyEvents]: open chat")}></GeneralHeader>}
            body={getBody()}
    ></Layout2PieceForNavigator>
  );
};

export default MyEvents;