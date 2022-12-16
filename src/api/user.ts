import request from '@/services/request';
import qs from 'qs'
import type { loginData } from './dataTypes'


export function login (data: loginData)  {
    // return request.post('/sys/login', qs.stringify(data))
    const res = {
        retCode: 200,
        message: 'ok',
        result: 'tokentoken123'
    }
    return new Promise((resolve, reject) => {
        resolve(res)
    })
}

export function getUserInfo(){
    // return request.get('/sys/user/myinfo')
    const res = {
        retCode: 200,
        message: 'ok',
        result: {
            emial: '2366060971@qq.com',
            name: 'kate'
        }
    }
    return new Promise((resolve, reject) => {
        resolve(res)
    })
}

export function getUserMenu () {
    // return request.get('/sys/menu/nav')
    const res = {
        message: 'ok',
        retCode: 200,
        result: [{
            'path': '/library',
            'component': 'Layout',
            'name': 'Library',
            'meta': {
                'title': 'Library',
                'icon': ''
            },
            'children': [{
                'path': '/library/info',
                'component': 'library/info/index',
                'name': 'Info',
                'meta': {
                    'title': 'Info',
                    'icon': ''
                },
                'children': [
                    {
                        'path': '/library/info/movie',
                        'component': 'library/info/movie',
                        'name': 'Movie',
                        'meta': {
                            'title': 'Movies',
                            'icon': ''
                        }
                    },
                    {
                        'path': '/library/info/tv',
                        'component': 'library/info/tv',
                        'name': 'TV',
                        'meta': {
                            'title': 'TV Series',
                            'icon': ''
                        }
                    },
                    {
                        'path': '/library/info/celeb',
                        'component': 'library/info/celeb',
                        'name': 'Celeb',
                        'meta': {
                            'title': 'Celebs',
                            'icon': ''
                        }
                    }
                ]
            },
            {
                'path': '/library/setting',
                'component': 'library/setting/index',
                'name': 'Setting',
                'meta': {
                    'title': 'Setting',
                    'icon': ''
                },
                'children': [
                    {
                        'path': '/library/setting/relevancy',
                        'component': 'library/setting/relevancy',
                        'name': 'Relevancy',
                        'meta': {
                            'title': 'PP Relevancy',
                            'icon': ''
                        }
                    },
                    {
                        'path': '/library/setting/media-filter',
                        'component': 'library/setting/mediaFilter',
                        'name': 'MediaFilter',
                        'meta': {
                            'title': 'Media info Filter',
                            'icon': ''
                        }
                    },
                    {
                        'path': '/library/setting/advanced-search',
                        'component': 'library/setting/advancedSearch',
                        'name': 'AdvancedSearch',
                        'meta': {
                            'title': 'Advanced Search',
                            'icon': ''
                        }
                    }
                ]
            }]
        }]
    }
    return new Promise((resolve, reject) => {
        resolve(res)
    })
}