const checkPassword = (password) => {
    const passwordReg = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()\-_+=/\[\{\]\}\\|;:'",<.>?]{1,50})(?=.*[a-zA-Z_]{1,50}).{3,50}/g;

    console.log("input password : " + password);

    return passwordReg.test(password);
}

export { checkPassword };