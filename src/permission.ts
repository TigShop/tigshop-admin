import router, { resetRouter } from './router'
import { useAppStore } from "@/store/app";
import { setDocumentTitle } from '@/utils/domUtils'
import { useMenusStore } from "@/store/menu";
const defaultRoutePath = '/product/brand/list/'
const allowList = ['login'] // no redirect allowList
const loginRoutePath = '/login/index'
router.beforeEach((to, from, next) => {
    // 切换路由后重置标题
    to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title}`)
    const appStore = useAppStore();
    appStore.setHeaderTitle(to.meta.title as string);
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        if (to.path === loginRoutePath) {
            const store = <any>useMenusStore();
            // 跳转至第一个页面
            next({ path: store.mainMenu[0].route_link })
        } else {
            next();
        }

    } else {
        if (allowList.includes(<string>to.name)) {
            // 在免登录名单，直接进入
            next()
        } else {
            next({ path: loginRoutePath, query: { redirect: to.fullPath } })
        }
    }

})

router.afterEach(() => {
})
