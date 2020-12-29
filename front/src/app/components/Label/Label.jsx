import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
Font.register({ family: 'Roboto', src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf" });


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily:"Roboto",
    fontSize:'10pt'
  },
  section0: {
    margin: 1,
    padding: 1,
    flexGrow: 1,
    flexDirection: 'column',
    border: '1pt solid black',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: 'center',
    border: '1pt solid black',
  },
  section1: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: 'left',
    border: '1pt solid black',
    fontSize:'14pt'
  },
  section2: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: 'right',
    border: '1pt solid black',
    fontSize:'14pt'
  }
});

// Create Document Component
function Label({
    id,
    parcelType,
    sendDate,
    senderName,
    senderCity,
    senderStreet,
    senderPostalCode,
    senderHouseNumber,
    senderEmail,
    senderPhoneNumber,
    receiverName,
    receiverCity,
    receiverStreet,
    receiverPostalCode,
    receiverHouseNumber,
    receiverEmail,
    receiverPhoneNumber}){

    return(
        <Document>
            <Page size="A6" style={styles.page}>
                <View style={styles.section0}>
                  <View style={styles.section}>
                      <Text>PPD</Text>
                      <Text>{sendDate}</Text>
                      <Text>Cena: {parcelType.price/100+"PLN"} Rodzaj: {parcelType.name} Tracking: {id}</Text>
                  </View>
                  <View style={styles.section1}>
                      <Text>Nadawca:</Text>
                      <Text>{senderName}</Text>
                      <Text>{senderStreet} {senderHouseNumber}</Text>
                      <Text>{senderPostalCode} {senderCity}</Text>
                      <Text>e-mail: {senderEmail}</Text>
                      <Text>tel.: {senderPhoneNumber}</Text>
                  </View>
                  <View style={styles.section2}>
                      <Text>Odbiorca:</Text>
                      <Text>{receiverName}</Text>
                      <Text>{receiverStreet} {receiverHouseNumber}</Text>
                      <Text>{receiverPostalCode} {receiverCity}</Text>
                      <Text>e-mail: {receiverEmail}</Text>
                      <Text>tel.: {receiverPhoneNumber}</Text>
                  </View>
                </View>
            </Page>
        </Document>
    )
}

export default Label;
