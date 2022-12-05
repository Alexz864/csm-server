import axios from 'axios';

import {sessionService} from 'redux-react-session';

export const loginAdmin = (credentials, navigate, setFieldError, setSubmitting) => {
    // Make some checks and get some data

    axios.post("https://csm-test-server.onrender.com/admin/signin", credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((response) => {
        const {data} = response;

        if(data.status === "FAILED") {
            const {message} = data;

            // check for specific error
            if(message.includes("credentials")) {
                setFieldError("email", message);
                setFieldError("password", message);
            }else if(message.includes("password")) {
                setFieldError("password", message);
            }
        }else if(data.status === "SUCCESS"){
            const adminData = data.data[0];

            const token = adminData._id;

            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(adminData).then(() => {
                    navigate('/admin-dashboard');
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }

        // complete submission
        setSubmitting(false);

    }).catch(err => console.error(err))
}

export const logoutAdmin = (navigate) => {
    return() => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        navigate('/home');
    };
}