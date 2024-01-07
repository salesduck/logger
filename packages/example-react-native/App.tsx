/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { PropsWithChildren, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import { ConsoleTransport } from '@salesduck/transport-console';
import { LogStashFormat } from '@salesduck/format-logstash';
import { FetchTransport } from '@salesduck/transport-fetch';
import { DefaultLogger } from '@salesduck/logger';

const Section: React.FC<
    PropsWithChildren<{
        title: string;
    }>
> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    console.log('render');

    // NOTE: send log by console
    useEffect(() => {
        const formatter = new LogStashFormat();
        const transport = new ConsoleTransport({ formatter });
        const logger = new DefaultLogger({ transports: [transport] });

        logger.info({ message: 'Hello world' });
    }, []);

    // NOTE: send log by fetch
    useEffect(() => {
        const formatter = new LogStashFormat();

        const transport = new FetchTransport({
            formatter,
            url: '/log/push',
            init: { headers: { Authorization: 'my token' } },
            onError: console.log
        });

        const logger = new DefaultLogger({ transports: [transport] });

        logger.info({ message: 'Hello fetch' });
    }, []);

    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black
                    }
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark
                    }
                ]}
            >
                {children}
            </Text>
        </View>
    );
};

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white
                    }}
                >
                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
                    </Section>
                    <Section title="See Your Changes">
                        <ReloadInstructions />
                    </Section>
                    <Section title="Debug">
                        <DebugInstructions />
                    </Section>
                    <Section title="Learn More">Read the docs to discover what to do next:</Section>
                    <LearnMoreLinks />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400'
    },
    highlight: {
        fontWeight: '700'
    }
});

export default App;
