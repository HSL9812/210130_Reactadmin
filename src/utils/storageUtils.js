/*
进行local数据存储管理的工具模块
 */
// 使用第三方库是因为兼容低版本浏览器和语法更加简洁
import store from 'store'
const USER_KEY = 'user_key'
/*
保存user
*/
const saveUser = (user) => {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
}

/*
读取user
*/
const getUser = () => {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
}

/*
删除user
*/
const removeUser = () => {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
}

const storage = {
   saveUser,
   getUser,
   removeUser
}
export default storage