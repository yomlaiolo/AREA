import React from 'react';
import './Profilepage.css';
import NavigationBar from '../components/NavigationBar';
import profile_icon from '../assets/profile.svg';
import mail_icon from '../assets/mail.svg';
import notif_icon from '../assets/bell.svg';
import modif_icon from '../assets/modif.svg';
import { Profile_selected, Modify_email_selected, modify_password_selected, notifications_selected } from '../components/Profile_selected';

export const Profilepage = () => {
    const [name, setName] = React.useState('Name');
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

    React.useEffect(() => {
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

    return (
        <div className="App">
            <header className="Profile-header">
                <NavigationBar name="Profile" notifications={true} />
                <div className='profile-image'>
                    <img src={Img} alt="Avatar" className='avatar' />
                    <p>{name}</p>
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
                </div>
                <div className='profile-menu-selected'>
                    <p>{profile_menu_selected}</p>
                    <div className='profile-menu-selected-seperateur' />
                    {profile_menu_selected === 'Profile' && Profile_selected("Name_perso", "Email_perso", Img, setImg)}
                    {profile_menu_selected === 'Change profile' && Modify_email_selected(Email, NewEmail, setNewEmail, setEmail, Username, NewUsername, setNewUsername, setUsername, password, setPassword)}
                    {profile_menu_selected === 'Modify password' && modify_password_selected(password, newPassword, setNewPassword, confirmPassword, setConfirmPassword, setPassword)}
                    {profile_menu_selected === 'Notifications' && notifications_selected(Notifications, setNotifications)}
                </div>
            </header>
        </div>
    );
}
