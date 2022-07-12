export class Util {
    static selectMusic(data){
        window.sessionStorage.setItem('select', JSON.stringify(data));
    }
    static getMusic(){
        const data = window.sessionStorage.getItem('select');
        return JSON.parse(data)
    }
}