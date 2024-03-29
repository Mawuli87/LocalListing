import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../../components/authHeader/AuthHeader';
import Button from '../../../components/button';
import Checkbox from '../../../components/checkbox';
import Input from '../../../components/input/Input';
import Seperator from '../../../components/seperator';
import GoogleLogin from '../../../components/googleLogin';
import { styles } from './styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { request } from '../../../utils/request';


const SignUp = ({navigation}) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});
  const onSignIn = () => {
        navigation.navigate('Signin');
    };

    const onBack = () => {
        navigation.goBack();
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onSubmit = async () => {
        try {
            if (!values?.fullName || !values?.email || !values?.password || !values?.confirmPassword) {
                Alert.alert('All fields are required');
                return;
            }
    
            if (values?.password !== values?.confirmPassword) {
                Alert.alert('Passwords do not match');
                return;
            }
    
            if (!checked) {
                Alert.alert('Please agree to the terms');
                return;
            }
    
            const response = await request({
                url: '/user/register',
                method: 'post',
                data: values,
            });
            console.log('response :>> ', response);
        } catch(error) {
            console.log('error :>> ', error);
        }
    } 

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <AuthHeader onBackPress={onBack} title='Sign Up' />

                <Input value={values.fullName} onChangeText={v => onChange('fullName', v)} label='Name' placeholder='John Doe' />
                <Input value={values.email} onChangeText={v => onChange('email', v)} label='E-mail' placeholder='example@gmail.com' />
                <Input value={values.password} onChangeText={v => onChange('password', v)} isPassword label='Password' placeholder='*******' />
                <Input value={values.confirmPassword} onChangeText={v => onChange('confirmPassword', v)} isPassword label='Confirm Password' placeholder='*******' />

                <View style={styles.agreeRow}>
                    <Checkbox checked={checked} onCheck={setChecked} />
                    <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
                </View>

                <Button onPress={onSubmit} style={styles.button} title='Sign Up' />

                <Seperator text='Or sign up with' />

                <GoogleLogin />

                <Text style={styles.footerText}>
                    Already have an account?
                    <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default React.memo(SignUp);