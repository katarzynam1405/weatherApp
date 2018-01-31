export default function geolocation(){
    return new Promise((resolve, reject)=> {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }
 })
};
