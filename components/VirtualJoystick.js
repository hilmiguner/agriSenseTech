import { useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

function VirtualJoystick({ padBackgroundColor, padBackgroundOpacity, padPointColor, padOuterCircleSize, padInnerCircleSize }) {
    const centerPointPos = (padOuterCircleSize-padInnerCircleSize)/2;
    const [xPos, setX_Pos] = useState(centerPointPos);
    const [yPos, setY_Pos] = useState(centerPointPos);

    let bgColor = padBackgroundColor;
    if(padBackgroundOpacity != 1) {
        bgColor = padBackgroundColor + (100*padBackgroundOpacity).toString().slice(0, 2);
    }
    const pan = Gesture.Pan()
    .onUpdate((event) => {
        let newX;
        let newY;
        let degree = Math.atan(event.translationY/event.translationX);
        if(isNaN(degree)) {
            if(event.translationY < 0) {
                degree = 1.57079633;
            }
            else {
                degree = -1.57079633
            }
        }
        let yDelta = (padOuterCircleSize/2)*Math.sin(degree);
        let xDelta = (padOuterCircleSize/2)*Math.cos(degree);
        if(
            (event.translationX < 0 && event.translationY < 0) 
            || 
            (event.translationX < 0 && event.translationY > 0) 
        ) {
            xDelta = -xDelta;
            yDelta = -yDelta;
        }
        if(event.translationY == 0) {
            if(event.translationX > 0) {
                xDelta = Math.abs(xDelta);
            }
            else {
                xDelta = -Math.abs(xDelta);
            }
        }
        if(event.translationX == 0) {
            if(event.translationY > 0) {
                yDelta = Math.abs(yDelta);
            }
            else {
                yDelta = -Math.abs(yDelta);
            }
        }
        newX = (centerPointPos + xDelta);
        newY = (centerPointPos + yDelta);
        if(Math.abs(event.translationX) < Math.abs(xDelta)) {
            newX = (centerPointPos + event.translationX);
        }
        if(Math.abs(event.translationY) < Math.abs(yDelta)) {
            newY = (centerPointPos + event.translationY);
        }

        setX_Pos(Math.floor(newX));
        setY_Pos(Math.floor(newY));
        // console.log(`x force: ${event.translationX}, y force: ${-event.translationY}`);
        console.log(`x force: ${xPos-centerPointPos}, y force: ${-yPos+centerPointPos}`);
    })
    .onEnd((_) => {
        setX_Pos(centerPointPos);
        setY_Pos(centerPointPos);
        console.log(`x force: 0, y force: 0`);
    });
    return(
        <View style={[styles.padBoundary, {
            backgroundColor: bgColor,
            width: padOuterCircleSize, 
            height: padOuterCircleSize, 
            borderRadius: (padOuterCircleSize/2)
        }]}>
            <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.padPoint, {
                        backgroundColor: padPointColor,
                        width: padInnerCircleSize,
                        height: padInnerCircleSize,
                        borderRadius: (padInnerCircleSize/2),
                        top: yPos,
                        left: xPos,
                    }]}>
                    </Animated.View>
            </GestureDetector>
        </View>
    );
}

export default VirtualJoystick;

const styles = StyleSheet.create({
    rootContainer: {},
    padBoundary: {},
    padPoint: {
        position: "relative",
    },
});