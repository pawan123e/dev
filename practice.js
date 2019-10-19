const usersInfo = [{id: '1', user: '221212121'}, {id: '2', user: '3232323232'}, {id: '3', user: '100011'}];

const ids = '10001';
const finds = usersInfo.find(userinfo => userinfo.user === ids);
if(finds) {
    console.log('hello we find the match');
}
