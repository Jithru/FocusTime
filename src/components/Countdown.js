import React, { useEffect, useState } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';
// 
const minsTomils=(min)=> min*60*1000;
const formatTime=(time)=> time<10 ? `0${time}`:time;

export const Coundtdown = ({
        timeInMin,
        isPaused=true,
        onProgress,
    }) =>{
        const interval=React.useRef(null);
        const[millis,setMillis]=useState(minsTomils(timeInMin));
        const coundtDown=()=>{
            setMillis((time)=>{
                if(time===0){
                    //do more stuff here
                    return time;
                }
                const timeLeft=time-1000;
                onProgress(timeLeft/minsTomils(minutes))
                return timeLeft;
            })

        }
        useEffect(()=>{
            setMillis(minsTomils(timeInMin))
        },[timeInMin])

        useEffect(()=>{ 
            if(isPaused){
                if(interval.current){clearInterval(interval.current)}
                return
            }
            interval.current=setInterval(coundtDown,1000);
            return ()=> clearInterval(interval.current)
        },[isPaused])
        const minutes=Math.floor(millis/1000/60)%60;
        const seconds=Math.floor(millis/1000)%60;
    return(
        <Text style={styles.text}>{formatTime(minutes)}:{formatTime(seconds)}</Text>
    )
}

const styles=StyleSheet.create({
    text:{
        fontSize:fontSizes.xxxl,
        fontWeight:'bold',
        color:colors.white,
        padding:spacing.lg,
        backgroundColor:'rgba(94,132,226,0.3)',
    }
})