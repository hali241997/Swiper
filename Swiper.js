import React, { useState, useEffect } from 'react';
import { FlatList, Dimensions, View, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');

const Swiper = ({ dotColor, children }) => {
    const [totalScreen, setTotalScreen] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const list = React.createRef();

    useEffect(() => {
        let array = [];
        React.Children.forEach(children, (child, index) => {
            array.push(child);
        })
        setTotalScreen(array);
    }, [])

    function pageChange (event) {
        let offset = event.nativeEvent.contentOffset;
        if(offset) {
            let page = Math.round(offset.x / width) + 1;
            setCurrentPage(page);
        }
    }

    function rightClick(index) {
        list.current.scrollToIndex({ index: index - 1 });
        setCurrentPage(currentPage - 1);
    }

    function leftClick(index) {
        list.current.scrollToIndex({ index: index + 1 });
        setCurrentPage(currentPage + 1);
    }

    if(totalScreen.length > 1) {
        return (
            <>
                <FlatList
                    ref={list}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    data={totalScreen}
                    keyExtractor={(item, index) => index.toString()}
                    onMomentumScrollEnd={(event) => pageChange(event)}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width }}>
                                {index !== 0 && (
                                    <TouchableOpacity
                                        style={styles.leftButtonStyle}
                                        onPress={() => rightClick(index)}
                                    >
                                        <Entypo name='chevron-thin-left' size={40} color='red' />
                                    </TouchableOpacity>
                                )}

                                {totalScreen[index]}
    
                                {index !== totalScreen.length - 1 && (
                                    <TouchableOpacity
                                        style={styles.rightButtonStyle}
                                        onPress={() => leftClick(index)}
                                    >
                                        <Entypo name='chevron-thin-right' size={40} color='red' />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )
                    }}
                />
                <View style={styles.dotContainerStyle}>
                    <FlatList
                        horizontal
                        data={totalScreen}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.dotStyle, { backgroundColor: currentPage - 1 === index ? dotColor : 'transparent', borderColor: dotColor }]} />
                            );
                        }}
                    />
                </View>
            </>
        );
    }

    return null;
    
};

const styles = StyleSheet.create({
    leftButtonStyle: {
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        margin: 10
    },
    rightButtonStyle: {
        position: 'absolute',
        justifyContent: 'center',
        right: 0,
        top: 0,
        bottom: 0,
        margin: 10
    },
    dotContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginBottom: 5
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        borderWidth: 1,
        margin: 5
    }
});

export default Swiper;