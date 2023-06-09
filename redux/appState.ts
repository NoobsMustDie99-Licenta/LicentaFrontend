import {createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AssignedSkill, Schedule, SkatePracticeStyles, SkateProfile, Skill, User, Event, ParkTrail } from '../types';
import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AppState {
    userBackup: User | undefined,
    user: User | undefined,
    userId: string | undefined,
    JWTToken: string | undefined,
    currentRoute: string | undefined,
    currentSkateProfile: SkateProfile | undefined,
    //mySchedules: Array<Schedule> | undefined,
    addingSkateProfile:  boolean,
    initialProfileConfigured: boolean,
    allSkills: Array<Skill> | undefined,
    allParkTrails: Array<ParkTrail> | undefined
}

const initialState: AppState = {
    userBackup: undefined,
    user: undefined,
    userId: undefined,
    JWTToken: undefined,
    currentRoute: undefined,
    currentSkateProfile: undefined,
    //mySchedules: undefined,
    addingSkateProfile: false,
    initialProfileConfigured: true,
    allSkills: undefined,
    allParkTrails: undefined
}


const loadState = async () =>{
    try{
        const serializedState = await AsyncStorage.getItem("appState");
        if(serializedState === null)
            return undefined;
        return JSON.parse(serializedState);
    }
    catch(error){
        return undefined;
    }
}

export const loadAppStateAsync = createAsyncThunk("walkthrough/loadAppStateAsync",
async() => {
    const state = await loadState();
    return state || initialState;
})

export const saveAppStateAsync = async(state) => {
    try{
        await AsyncStorage.setItem("appState", JSON.stringify(state))
    }
    catch(error)
    {
        console.log(error)
    }
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        backupUser: state => {
            state.userBackup = produce(state.user, draft => {
            }); //make backup
        },
        // updateSkateProfile: (state, action: PayloadAction<SkateProfile>) => {
            
        // },
        addAggresiveEventToUser: (state, action: PayloadAction<Event>) => {
            //payload == Event
            const eventToAdd = action.payload;
            if(state.user !== undefined)
            {
                state.user = {
                    ...state.user,
                    skateProfiles: state.user.skateProfiles.map(
                        (skateProfile) => {
                            if(skateProfile.skatePracticeStyle === SkatePracticeStyles.AggresiveSkating)
                            {
                                let newEvents;
                                if(skateProfile.events === undefined || skateProfile.events === null
                                    || skateProfile.events.length === 0)
                                {
                                    newEvents = [eventToAdd];
                                }
                                else newEvents = [...skateProfile.events, eventToAdd];
                                
                                return { ...skateProfile, events: newEvents};
                            }
                            else return skateProfile;
                        }
                    )
                }
            }
            
        },
        deleteSchedule: (state, action: PayloadAction<string>) => {
            //payload == scheduleId
            const idOfScheduleToRemove = action.payload;
            if(state.user !== undefined)
            {
                state.user = {
                    ...state.user,
                    skateProfiles: state.user.skateProfiles.map(
                        (skateProfile) => {
                            if(skateProfile.schedules !== undefined && skateProfile.schedules !== null)
                            {
                                
                                const newSchedules = skateProfile.schedules.filter(schedule => schedule.id !== idOfScheduleToRemove);
                              return { ...skateProfile, schedules: newSchedules};
                            }
                            else return skateProfile;
                        }
                    )
                }
            }
            
        },
        deleteAssignedSkill: (state, action: PayloadAction<string>) => {
            //payload == assignedSkillId
            const idOfSkillToRemove = action.payload;
            if(state.user !== undefined)
            {
                state.user = {
                    ...state.user,
                    skateProfiles: state.user.skateProfiles.map(
                        (skateProfile) => {
                            if(skateProfile.assignedSkills !== undefined)
                            {
                                const newAssignedSkills = skateProfile.assignedSkills.filter(skill => skill.id !== idOfSkillToRemove);
                              return { ...skateProfile, assignedSkills: newAssignedSkills };
                            }
                            else return skateProfile;
                            
                        }
                    )
                }
            }
            
        },
        updateAssignedSkill: (state, action: PayloadAction<AssignedSkill>) => {

            //payload == assignedSkill to update
            const updatedSkill: AssignedSkill = action.payload;
            if(state.user !== undefined && state.user !== null)
            {
                state.user = {
                    ...state.user,
                    skateProfiles: state.user.skateProfiles.map(
                        (skateProfile) => {
                            if(skateProfile.id === updatedSkill.skateProfileId)
                            {
                                if(skateProfile.assignedSkills !== undefined && skateProfile.assignedSkills !== null)
                                {
                                    const newArray = skateProfile.assignedSkills.map((assignedSkill) => {
                                        if(assignedSkill.id === updatedSkill.id)
                                        {
                                            return updatedSkill;
                                        }
                                        else return assignedSkill;
                                    });
                                    return { ...skateProfile, assignedSkills: newArray};
                                }
                                   
                                else return skateProfile;
                            }
                            else return skateProfile;
                        }
                    )
                }
            }
            
        },
        addAssignedSkill: (state, action: PayloadAction<AssignedSkill>) => {

            //payload == assignedSkill to add
            const skillToAdd: AssignedSkill = action.payload;
            if(state.user !== undefined && state.user !== null)
            {
                state.user = {
                    ...state.user,
                    skateProfiles: state.user.skateProfiles.map(
                        (skateProfile) => {
                            if(skateProfile.id === skillToAdd.skateProfileId)
                            {
                                if(skateProfile.assignedSkills !== undefined && skateProfile.assignedSkills !== null)
                                    return { ...skateProfile, assignedSkills: [...skateProfile.assignedSkills, skillToAdd]};
                                else return { ...skateProfile, assignedSkills: [skillToAdd]};
                            }
                            else return skateProfile;
                        }
                    )
                }
            }
            
        },
        addSchedule: (state, action: PayloadAction<Schedule>) => {
            //payload == schedule to add
            const scheduleToAdd: Schedule = action.payload;
            if(state.user !== undefined && state.user !== null)
            {
                state.user = {
                    ...state.user,
                    skateProfiles: state.user.skateProfiles.map(
                        (skateProfile) => {
                            if(skateProfile.id === scheduleToAdd.skateProfileId)
                            {
                                if(skateProfile.schedules !== undefined && skateProfile.schedules !== null)
                                    return { ...skateProfile, schedules: [...skateProfile.schedules, scheduleToAdd]};
                                else return { ...skateProfile, schedules: [scheduleToAdd]};
                            }
                            else return skateProfile;
                        }
                    )
                }
            }
            
        },
        setAllSkills: (state, action: PayloadAction<Array<Skill> | undefined>) => {
            state.allSkills = action.payload;
        },
        setAddingSkateProfile: (state, action: PayloadAction<boolean>) => {
            state.addingSkateProfile = action.payload;
        },
        setCurrentSkateProfile: (state, action: PayloadAction<SkateProfile>) => {
            state.currentSkateProfile = action.payload;
        },
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload;
        },
        setUserId:(state, action: PayloadAction<string | undefined>) => {
            state.userId = action.payload;
        },
        setJWTToken: (state, action: PayloadAction<string | undefined>) => {
            state.JWTToken = action.payload;
        },
        setCurrentRoute: (state, action: PayloadAction<string | undefined>) => {
            state.currentRoute = action.payload;
        },
        setAllParkTrails: (state, action: PayloadAction<Array<ParkTrail> | undefined>) => { 
            state.allParkTrails = action.payload;
        },
        // setMySchedules: (state, action: PayloadAction<Array<Schedule>>) => {
        //     state.mySchedules = action.payload;
        // },
        setInitialProfileConfigured: (state, action: PayloadAction<boolean>) => {
            state.initialProfileConfigured = action.payload;
        },
        revertChangesInUser: state => {
           
            if(state.user !== undefined && state.userBackup !== undefined)
            {
                state.user = {
                    ...state.userBackup
                }
            }
            
        },
        resetAppState: state => initialState
      
    },
    extraReducers: (builder) => {
        builder.addCase(loadAppStateAsync.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export const {setCurrentRoute, setUserId, setCurrentSkateProfile, setJWTToken,
    setInitialProfileConfigured, setAddingSkateProfile, 
    resetAppState,
    setUser, 
    revertChangesInUser, backupUser,
    setAllSkills, deleteAssignedSkill, addAssignedSkill, updateAssignedSkill,
    setAllParkTrails,
    deleteSchedule, addSchedule,
    addAggresiveEventToUser
} = appStateSlice.actions

export default appStateSlice.reducer;