import React, { useEffect, useState } from "react";
import './Profilepage.css';
import NavigationBar from '../components/NavigationBar';
import profile_icon from '../assets/profile.svg';
import mail_icon from '../assets/mail.svg';
import notif_icon from '../assets/bell.svg';
import modif_icon from '../assets/modif.svg';
import github_icon from '../assets/github-white.svg';
import { userInfo, getVar, setVar, signInWithGithub, removeVar } from '../api';
import { Profile_selected, Modify_email_selected, modify_password_selected, notifications_selected } from '../components/Profile_selected';

export const Profilepage = () => {
    const [Email, setEmail] = React.useState('Email');
    const [NewEmail, setNewEmail] = React.useState(Email);
    const [Username, setUsername] = React.useState('Username');
    const [NewUsername, setNewUsername] = React.useState(Username);
    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [profile_menu_selected, setProfile_menu_selected] = React.useState('Profile');
    const [Notifications, setNotifications] = React.useState(true);
    const [Img, setImg] = React.useState('https://www.w3schools.com/howto/img_avatar.png');
    const [accessTokenGithub, setAccessTokenGithub] = React.useState<string | null>(null);

    setVar('code', '');

    const fetchData = async () => {
        userInfo().then(() => {
            getVar('username').then(usernameValue => { setUsername(usernameValue ?? 'Default username'); })
            getVar('email').then(emailValue => { setEmail(emailValue ?? 'Default email'); })
        });
    };

    function loginwithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID);
    }

    function logoutGithub() {
        removeVar('access_token_github');
        setAccessTokenGithub(null);
    }

    fetchData();

    useEffect(() => {
        if (profile_menu_selected !== 'Change profile') {
            setNewEmail("");
            setNewUsername("");
            setPassword("");
        }
        if (profile_menu_selected !== 'Modify password') {
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }

    }, [profile_menu_selected]);

    React.useEffect(() => {
        const fetchgithub = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const code = urlParams.get('code');
            console.log("code for github: " + code);
            const storedCode = await getVar('code'); // Use await to handle the Promise
            if (code !== null && code !== storedCode) {
                console.log("code for github: " + code);
                setVar('code', code);
                console.log("code for github on localstorage: " + await getVar('code'));
                const param = "?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID + "&client_secret=" + process.env.REACT_APP_GITHUB_CLIENT_SECRET + "&code=" + code;
                console.log("param: " + param);
                await fetch('https://github.com/login/oauth/access_token' + param, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(response => response.text())
                    .then(data => {
                        console.log('Success:', data);
                        const params = new URLSearchParams(data);
                        const accessToken = params.get('access_token');
                        console.log('Access Token:', accessToken);
                        if (accessToken !== null) {
                            setVar('access_token_github', accessToken);
                            setAccessTokenGithub(accessToken);
                            signInWithGithub(accessToken);
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        };

        fetchgithub();
    }, []);

    return (
        <div className="App">
            <header className="Profile-header">
                <NavigationBar name="Profile" notifications={true} />
                <div className='profile-image'>
                    <img src={Img} alt="Avatar" className='avatar' />
                    <p>{Username}</p>
                </div>
                <div className='profile-menu'>
                    <button
                        className='profile-menu-item'
                        style={{ backgroundColor: profile_menu_selected === 'Profile' ? '#E2E2E2' : '#F5F5F5' }}
                        onClick={() => setProfile_menu_selected('Profile')}>
                        <img src={profile_icon} alt="" />
                        <p>Profile</p>
                    </button>
                    <button className='profile-menu-item'
                        style={{ backgroundColor: profile_menu_selected === 'Modify email' ? '#E2E2E2' : '#F5F5F5' }}
                        onClick={() => setProfile_menu_selected('Change profile')}>
                        <img src={mail_icon} alt="" />
                        <p>Change profile</p>
                    </button>
                    <button className='profile-menu-item'
                        style={{ backgroundColor: profile_menu_selected === 'Modify password' ? '#E2E2E2' : '#F5F5F5' }}
                        onClick={() => setProfile_menu_selected('Modify password')}>
                        <img src={modif_icon} alt="" />
                        <p>Modify password</p>
                    </button>
                    <button className='profile-menu-item'
                        style={{ backgroundColor: profile_menu_selected === 'Notifications' ? '#E2E2E2' : '#F5F5F5' }}
                        onClick={() => setProfile_menu_selected('Notifications')}>
                        <img src={notif_icon} alt="" />
                        <p>Notifications</p>
                    </button>
                    <button className='profile-menu-item'
                        style={{ backgroundColor: '#000000', borderRadius: 10 }}
                        onClick={accessTokenGithub? logoutGithub : loginwithGithub}>
                        <img src={github_icon} alt="" style={{height:30, width: 30}}/>
                        <p style={{ color: '#FFFFFF' }}>{accessTokenGithub ? 'Log out'  : 'Loging with github'}</p>
                    </button>
                </div>
                <div className='profile-menu-selected'>
                    <p>{profile_menu_selected}</p>
                    <div className='profile-menu-selected-seperateur' />
                    {profile_menu_selected === 'Profile' && Profile_selected(Username, Email, Img, setImg)}
                    {profile_menu_selected === 'Change profile' && Modify_email_selected(Email, NewEmail, setNewEmail, setEmail, Username, NewUsername, setNewUsername, setUsername, password, setPassword)}
                    {profile_menu_selected === 'Modify password' && modify_password_selected(password, newPassword, setNewPassword, confirmPassword, setConfirmPassword, setPassword)}
                    {profile_menu_selected === 'Notifications' && notifications_selected(Notifications, setNotifications)}
                </div>
            </header>
        </div>
    );
}
