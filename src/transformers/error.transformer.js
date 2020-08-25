function transformErrorCodeToMessage(code) {
    switch(code) {
        case 100:
            return "Unfortunately, we are unable to connect to the DevItUp blog right now, please check back later."
            default:
                return "An unknown error occurred.";
    }
}

export { transformErrorCodeToMessage };