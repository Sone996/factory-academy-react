import { ERROR_CODES, SUCCESS_CODES } from '../constants/messages'

export const notificationMsg = (response, codeKey) => {

    console.log('SERVICE: ', response)
    if (response && response.status === 200) {
        if (!codeKey) {
            return 'Success!'
        }
        return SUCCESS_CODES[codeKey];
    }
    if(response && response.response && response.response.data.errors) {
        return ERROR_CODES[response.response.data.errors]
    } else {
        return "Something's Wrong!";
    }
};