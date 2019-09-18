//media-query points
let desktopPoint = 1200;
let tabletPoint = 960;
let mobilePoint = 710;

//banner text changer
let longBannerText = "We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck!"
let shortBannerText = "We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository.";
let isLongBannerText = true;

function mediaTextChanger (mediaQuery, element) {
    console.log("q");
    let isMobileSize = window.matchMedia(mediaQuery).matches;

    if ( isMobileSize && isLongBannerText === true ) {
        element.innerHTML = shortBannerText;
        isLongBannerText = !isLongBannerText;
    } else if ( !isMobileSize && isLongBannerText === false ) {
        element.innerHTML = longBannerText;
        isLongBannerText = !isLongBannerText;
    }
}

document.addEventListener("DOMContentLoaded", mediaTextChanger.bind(this, `(max-width: ${mobilePoint}px)`,document.querySelector(".banner__text")));
window.addEventListener("resize", mediaTextChanger.bind(this, `(max-width: ${mobilePoint}px)`,document.querySelector(".banner__text")));