let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://peliplatmanageapi.inner011.xyz'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = ''
} else {
    // test环境
    BASE_URL = ''
}

const TIMEOUT = 10000

const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}


export { BASE_URL, TIMEOUT, HEADERS }
