import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
import { Avatar } from 'react-native-elements';
import styles from "./style";
import { TouchableOpacity } from 'react-native';

const turfImage = require('../../assets/images/turf.jpg')
const StatImage = require('../../assets/images/stationary.jpg')

const BookCard = (props) => {
    const url = props.image;
    var str = "../../assets/images/"
    var ImageUrl = str.concat(props.image);
    return (
        <Card style={props.style}>
            <Card.Title title={props.title} subtitle={props.subTitle} left={(props) => <Avatar rounded icon={{ name: 'alarm' }} overlayContainerStyle={{ backgroundColor: '#3897f1' }} iconStyle={{ backgroundColor: '#ffffff' }} activeOpacity={2} />} />
            <Card.Cover source={(props.image) ? turfImage : StatImage} style={{ marginTop: 10, width: '100%', height: 260 }} />
            <TouchableOpacity onPress={props.handlePress}>
                <Card.Actions style={styles.cardAction}>
                    <Text style={styles.bookText} >Book</Text>
                </Card.Actions>
            </TouchableOpacity>
        </Card>)

};

export default BookCard;