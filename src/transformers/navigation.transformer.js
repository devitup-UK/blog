function transformRawNavigationItemToVueNavigationItem(item) {
    return {
        to: item.title == "Home" ? '/home' : (item.url.replace(process.env.VUE_APP_API_ENDPOINT, "/")).replace("//", "/").slice(0, -1),
        label: item.title == "Home" ? item.title.toUpperCase() : '#' + item.title.toUpperCase()
    }
}

export { transformRawNavigationItemToVueNavigationItem }