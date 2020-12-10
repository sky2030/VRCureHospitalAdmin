import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
const screenWidth = Math.round(Dimensions.get("window").width);

export default class NoDataView extends Component {
    render() {
        return (
            <Text style={{
                marginTop: 70,
                fontSize: 18,
                textAlign: 'center',
                width: screenWidth,
            }}>
                {this.props.text}
            </Text>
        )
    }
}
