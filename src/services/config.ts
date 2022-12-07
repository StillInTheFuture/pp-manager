let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://peliplatmanageapi.inner011.xyz'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = ''
} else {
    BASE_URL = ''
}


const TIME_OUT = 10000


export { BASE_URL, TIME_OUT }
