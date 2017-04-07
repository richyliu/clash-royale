window.Helper = {
    loop: (func, time, total) => {
        let interval = setInterval(func, time);
        setTimeout(() => {
            clearInterval(interval);
        }, total);
    }
};