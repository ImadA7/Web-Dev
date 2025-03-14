setInterval(() => {
    let d = new Date();
    let htime = d.getHours() % 12;
    let mtime = d.getMinutes();
    let stime = d.getSeconds();
    let hrotation = 30 * htime + mtime / 2;
    let mrotation = 6 * mtime;
    let srotation = 6 * stime;

    hour.style.transition = "all 0.2s linear"; 
    minute.style.transition = "all 0.2s linear"; 
    second.style.transition = "all 2s linear"; 

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;
}, 1000);
