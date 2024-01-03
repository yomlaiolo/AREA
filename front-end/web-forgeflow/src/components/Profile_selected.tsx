import React from "react";
import TextBox from "./TextBox"
import Toggle from "./Toggle";
import { modifyProfile, modifyPassword } from "../api";
export const Profile_selected = (Name: string, Email: string, Img: string, setImg: React.Dispatch<React.SetStateAction<string>>) => {

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target)
                    setImg(e.target.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div>
            <p>Name</p>
            <input type="text" value={Name} readOnly />
            <p>Email</p>
            <input type="text" value={Email} readOnly />
            <div className="selected_image">
                <p>Profile picture</p>
                <img src={Img} alt="Avatar" className='avatar' />
                <input type="file" onChange={handleImageChange} style={{ display: 'none' }} id="fileInput" />
                <button onClick={() => {
                    const fileInput = document.getElementById('fileInput');
                    if (fileInput) {
                        fileInput.click();
                    }
                }}>
                    Change Image
                </button>
            </div>
        </div>
    )
}

export const Modify_email_selected = (Email: string, NewEmail: string, setNewEmail: React.Dispatch<React.SetStateAction<string>>, setEmail: React.Dispatch<React.SetStateAction<string>>, Username: string, NewUsername: string, setNewUsername: React.Dispatch<React.SetStateAction<string>>, setUsername: React.Dispatch<React.SetStateAction<string>>, Password: string, setPassword: React.Dispatch<React.SetStateAction<string>>) => {

    const handleChangeProfile = () => {
        if (NewEmail !== "" && NewUsername === "") {
            modifyProfile(Username, NewEmail, Password).then((response) => {
                if (response === 0) {
                    alert("Profile changed");
                    setEmail(NewEmail);
                } else {
                    alert(response);
                }
            });
        } else if (NewUsername !== "" && NewEmail === "") {
            modifyProfile(NewUsername, Email, Password).then((response) => {
                if (response === 0) {
                    alert("Profile changed");
                    setUsername(NewUsername);
                } else {
                    alert(response);
                }
            });
        } else if (NewUsername !== "" && NewEmail !== "") {
            modifyProfile(NewUsername, NewEmail, Password).then((response) => {
                if (response === 0) {
                    alert("Profile changed");
                    setUsername(NewUsername);
                    setEmail(NewEmail);
                } else {
                    alert(response);
                }
            });
        }
    }

    return (
        <div>
            <p>You can change your username and your email. You can't change your password here. If you want to change your password, please go to the "Modify password" page. </p>
            <p>You can change only one of the two fields, or both.</p>
            <p>You need your password to confirm the changes.</p>
            <TextBox
                placeholder={"New username. (" + Username + ")"}
                onChangeText={(text: string) => setNewUsername(text)}
                value={NewUsername}
                hideText={false}
                autocomplete="off"
                disabled={false}
                customwidth={320}
                backgroundColor="white"
            />
            <div className="selected_change">
                <TextBox
                    placeholder={"New email. (" + Email + ")"}
                    onChangeText={(text: string) => setNewEmail(text)}
                    value={NewEmail}
                    hideText={false}
                    autocomplete="off"
                    disabled={false}
                    customwidth={320}
                    backgroundColor="white"
                />
                <TextBox
                    placeholder="Password"
                    onChangeText={(text: string) => { setPassword(text) }}
                    value={Password}
                    hideText={true}
                    autocomplete="off"
                    disabled={false}
                    customwidth={320}
                    backgroundColor="white"
                />
                <button onClick={() => handleChangeProfile()}>
                    Confirm profile change
                </button>
            </div>
        </div>
    )
}

export const modify_password_selected = (Password: string, NewPassword: string, setNewPassword: React.Dispatch<React.SetStateAction<string>>, ConfirmPassword: string, setConfirmPassword: React.Dispatch<React.SetStateAction<string>>, setPassword: React.Dispatch<React.SetStateAction<string>>) => {
    const handleChangepassword = () => {
        if (NewPassword === ConfirmPassword) {
            modifyPassword(Password, NewPassword).then((response) => {
                if (response === 0) {
                    alert("Password changed");
                    setConfirmPassword("");
                    setNewPassword("");
                    setPassword("");
                } else {
                    alert(response);
                }
            })
        } else {
            console.log("new Passwords are not the same");
            alert("new Passwords are not the same");
        }
    }

    return (
        <div className="selected_password">
            <TextBox
                placeholder="Password"
                onChangeText={(text: string) => { setPassword(text) }}
                value={Password}
                hideText={true}
                autocomplete="off"
                disabled={false}
                customwidth={320}
                backgroundColor="white"
            />
            <TextBox
                placeholder="New password"
                onChangeText={(text: string) => { setNewPassword(text) }}
                value={NewPassword}
                hideText={true}
                autocomplete="off"
                disabled={false}
                customwidth={320}
                backgroundColor="white"
            />
            <TextBox
                placeholder="Confirm new password"
                onChangeText={(text: string) => { setConfirmPassword(text) }}
                value={ConfirmPassword}
                hideText={true}
                autocomplete="off"
                disabled={false}
                customwidth={320}
                backgroundColor="white"
            />
            <button onClick={() => handleChangepassword()}>
                Confirm password change
            </button>
        </div>
    )
}

export const notifications_selected = (Notifications: boolean, setNotifications: React.Dispatch<React.SetStateAction<boolean>>) => {
    const handleToggleChange = () => {
        setNotifications(!Notifications);
    };
    return (
        <div className="selected_notif">
            <Toggle Toggle={Notifications} handleToggleChange={handleToggleChange} />
            <p>Enable notifications</p>
        </div>
    )
}
