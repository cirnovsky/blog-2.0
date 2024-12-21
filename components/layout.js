document.addEventListener('DOMContentLoaded', async () => {
    try {
        const hdr = await fetch("../components/header.html");
        const hdr_ = await hdr.text();
        const ftr = await fetch("../components/footer.html");
        const ftr_ = await ftr.text();
        const body = document.querySelector('body');
        body.innerHTML = hdr_ + body.innerHTML + ftr_;
    } catch(error) {
        console.log("Your fucking layout.js is shoven.");
    }
})