import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

const imageUrl =
    "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800";

const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyp7FFYRwNKbTumOgu4zGIJOQpv8y0ngkLHw&s";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#333333',  // Dark background color
        padding: 10,
        borderRadius: 5,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: 10,
        width: '100%',
    },
    image: {
        width: '100%',
        height: 150,
        objectFit: 'cover',
        borderRadius: 5,
    },
    content: {
        padding: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#ffffff',  // White text color
    },
    description: {
        fontSize: 12,
        marginBottom: 8,
        color: '#dddddd',  // Light grey text color for description
    },
    price: {
        fontSize: 12,
        color: '#e74c3c',  // Red color for price
        fontWeight: 'bold',
    },
});

function ProductCard() {
    return (
        <View wrap={false} style={styles.card}>
            <Image style={styles.image} src={imageUrl} />
            <View style={styles.content}>
                <Text style={styles.productName}>Sample Product</Text>
                <Text style={styles.description}>
                    This is a sample product description that provides details about the
                    product.
                </Text>
                <Text style={styles.price}>$29.99</Text>
            </View>
        </View>
    );
}

// Create Document Component
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} src={logoUrl} />
                <Text style={styles.companyName}>React Developer</Text>
            </View>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </Page>
    </Document>
);

export default MyDocument;