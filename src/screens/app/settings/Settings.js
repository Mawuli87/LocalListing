import React, { useContext, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/header/Header';
import EditableBox from '../../../components/editableBox/EditableBox';
import ListItem from '../../../components/listItem/ListItem';
import Button from '../../../components/button';
//import { ProfileContext } from '../../../../App';
//import { updateProfile } from '../../../utils/backendCalls';

const Settings = ({ navigation }) => {
    const [editing, setEditing] = useState(false);
   // const { profile, setProfile } = useContext(ProfileContext);
    const [values, setValues] = useState({ name:'user', email:'user@gmail.com' });

    const onEditPress = () => {
        setEditing(true);
    };

    const onSave = async () => {
        //const updatedProfile = await updateProfile(values);
        //setProfile(updatedProfile);
        setEditing(false);
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onItemPress = () => {
        Linking.openURL('https://google.com');
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView>
            <Header showBack onBackPress={goBack} title='Settings' />
            <ScrollView style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('../../../assets/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox label="Name" onChangeText={(v) => onChange('name', v)} value={values.name} editable={editing} />
                <EditableBox label="Email" onChangeText={(v) => onChange('email', v)} value={values.email} editable={editing} />
                {editing ? (
                    <Button style={styles.button} onPress={onSave} title='Save' />
                ) : null}

                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Help Center</Text>
                <ListItem onPress={onItemPress} style={styles.item} title='FAQ' />
                <ListItem onPress={onItemPress} style={styles.item} title='Contact Us' />
                <ListItem onPress={onItemPress} style={styles.item} title='Privacy & Terms' />
            </ScrollView>
        </SafeAreaView>
    );
};

export default React.memo(Settings);
