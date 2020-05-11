export default async function({ app, route, redirect }) {
    // 접속한 사용자의 권한 레벨
    let level = 10//app.$auth.user.level
    let pageLevel = route.matched[0].components.default.options.level
    
    // 접속하려는 페이지의 레벨보다 낮은 레벨을 가지고 있는 경우
    if (level < pageLevel) {
        // 페이지 접속 불가
        console.log("gg")
        return redirect('/login')
    }
}