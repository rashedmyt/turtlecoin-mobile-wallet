// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import React from 'react';

import { Text, Platform, ToastAndroid } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import Config from './Config';

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function toastPopUp(message) {
    /* IOS doesn't have toast support */
    /* TODO */
    if (Platform.OS === 'ios') {
        return;
    }

    ToastAndroid.show(message, ToastAndroid.SHORT);
}

export function TextFixedWidth({ children }) {
    const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'

    return (
        <Text style={{fontFamily}}>{ children }</Text>
    )
}

/* Navigate to a route, resetting the stack, so the user cannot go back.
   We want to do this so when we go from the splash screen to the menu screen,
   the user can't return, and get stuck there. */
export function navigateWithDisabledBack(route, routeParams) {
    return StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ 
                routeName: route,
                params: routeParams,
            }),
        ]
    });
}

export function prettyPrintUnixTimestamp(timestamp) {
    return prettyPrintDate(new Date(timestamp * 1000));
}

export function prettyPrintDate(date) {
    const today = new Date();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateAndMonth = date.getDate().toString() + ' ' + months[date.getMonth()];

    if (today.getFullYear() === date.getFullYear()) {
        return dateAndMonth;
    }

    return dateAndMonth + ' ' + date.getFullYear();
}

/* TODO */
export function coinsToFiat(amount) {
    return '$' + amount.toString();
}

/** 
 * Gets the approximate height of the blockchain, based on the launch timestamp
 */
export function getApproximateBlockHeight() {
    const now = new Date();

    const difference = (now - Config.chainLaunchTimestamp) / 1000;

    return difference / Config.blockTargetTime;
}
