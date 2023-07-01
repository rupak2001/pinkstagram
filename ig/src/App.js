import React from "react";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import { useCookies } from "react-cookie";
import serverURL from "./utils/url";

function App() {
    //main hook for changing components between log-in page and sign-up page

    var [log, success] = useState(
        <Login
            login_func={() => {
                check_login();
            }}
            change_to_sign={() => {
                change_sign();
            }}
        />
    );
    var [cookies, setCookie] = useCookies(["user_inf"]);
    var [netError, setNetError] = useState();

    //functions for  changing to signup or login page
    var change_sign = () => {
        success(
            <Signup
                change_to_log={() => {
                    change_log();
                }}
                logf={() => {
                    add_user();
                }}
            />
        );
    };
    var change_log = () => {
        success(
            <Login
                login_func={() => {
                    check_login();
                }}
                change_to_sign={() => {
                    change_sign();
                }}
            />
        );
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setNetError(false);
    };

    //login logic (depends on db for auth)
    var check_login = async () => {
        var email = document.getElementById("logip1").value;
        var password = document.getElementById("logip2").value;
        var epass = { email: email, password: password };

        await fetch(`${serverURL}/login_post`, {
            method: "POST",
            body: JSON.stringify(epass),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.status == 404) {
                    success(
                        <Login
                            login_func={() => {
                                check_login();
                            }}
                            errmsg={
                                "The email you entered doesn't belong to an account.Please check your email and try again."
                            }
                            change_to_sign={() => {
                                change_sign();
                            }}
                        />
                    );
                } else if (res.status == 401) {
                    success(
                        <Login
                            login_func={() => {
                                check_login();
                            }}
                            errmsg={
                                "Sorry, your password was incorrect.Please double-check your password."
                            }
                            change_to_sign={() => {
                                change_sign();
                            }}
                        />
                    );
                } else if (res.status == 200) {
                    setCookie("email", email, { path: "/" });
                    success(<Home />);
                }
            })
            .catch((err) => {
                setNetError(true);
            });
    };

    var add_user = () => {
        var user_data = {
            name: document.getElementById("logip2").value.toLowerCase(),
            email: document.getElementById("logip1").value,
            password: document.getElementById("logip3").value,
        };

        fetch(`${serverURL}/new_user_add`, {
            method: "POST",
            body: JSON.stringify(user_data),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                if (res.status === 403) {
                    success(
                        <Signup
                            logf={() => {
                                add_user();
                            }}
                            change_to_sign={() => {
                                change_log();
                            }}
                            errmsg="user with same email-id already exists"
                        />
                    );
                } else if (res.status === 200) {
                    success(
                        <Signup
                            logf={() => {
                                add_user();
                            }}
                            change_to_sign={() => {
                                change_log();
                            }}
                            errmsg="user added successfully."
                        />
                    );
                    setTimeout(() => {
                        success(
                            <Login
                                login_func={() => {
                                    check_login();
                                }}
                                change_to_sign={() => {
                                    change_sign();
                                }}
                            />
                        );
                    }, 2000);
                }
            })
            .catch(() => {
                setNetError(true);
            });
    };

    if (cookies.email) {
        return (
            <div className="w-screen h-screen border-0">
                <Home />
            </div>
        );
    } else {
        return (
            <div className="w-screen h-screen border-0">
                {log}
                <Snackbar open={netError} autoHideDuration={1000} onClose={handleClose}>
                    <Alert
                        variant="filled"
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        Error! Please Try Again
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default App;
