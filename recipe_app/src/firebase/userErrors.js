const errorCodes = (code) => {
    let msg = 'Sorry, try again later'

    switch(code){
        case 'auth/user-not-found':
            msg = 'User not found. Check your e-mail!'
            break;
        case 'auth/email-already-in-use':
            msg = 'Sorry, email already in use'
            break;
        case 'auth/wrong-password':
            msg = 'The password is incorrect!'
            break;
        case 'auth/invalid-credential':
            msg = 'Sorry, invalid credential.'
            break;
        default:
            msg = code;
    }

    return msg;
}

export default errorCodes;