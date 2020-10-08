let t = "09:00"; // hh:mm
let ms = Number(t.split(':')[0]) * 60 * 60 * 1000 + Number(t.split(':')[1]) * 60 * 1000;
console.log(ms);