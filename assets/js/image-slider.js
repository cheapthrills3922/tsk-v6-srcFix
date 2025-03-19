const carousel = document.querySelector(".carousel"),
        firstImg = carousel.querySelectorAll("img")[0],
        arrowIcons = document.querySelectorAll(".wrapper .arrow");
    
    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    let autoScrollInterval;
    
    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "block" : "flex";
        arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "block" : "flex";
    };
    
    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            let firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += firstImgWidth;
    
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                carousel.scrollLeft = 0; 
            }
            showHideIcons();
        }, 5000); 
    };
    
    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };
    
    // Call the startAutoScroll function
    startAutoScroll();
    
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            stopAutoScroll();
            let firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.classList.contains("prev") ? -firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcons(), 60);
            startAutoScroll(); // Resume auto-scroll after manual scroll
        });
    });
    
    const autoSlide = () => {
        if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
        positionDiff = Math.abs(positionDiff);
        let firstImgWidth = firstImg.clientWidth + 14;
        let valDifference = firstImgWidth - positionDiff;
    
        if (carousel.scrollLeft > prevScrollLeft) {
            carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        } else {
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
    };
    
    // const dragStart = (e) => {
    //     stopAutoScroll();
    //     isDragStart = true;
    //     prevPageX = e.pageX || e.touches[0].pageX;
    //     prevScrollLeft = carousel.scrollLeft;
    // };
    
    // const dragging = (e) => {
    //     if (!isDragStart) return;
    //     e.preventDefault();
    //     isDragging = true;
    //     carousel.classList.add("dragging");
    //     positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    //     carousel.scrollLeft = prevScrollLeft - positionDiff;
    //     showHideIcons();
    // };
    
    // const dragStop = () => {
    //     isDragStart = false;
    //     carousel.classList.remove("dragging");
    //     if (!isDragging) return;
    //     isDragging = false;
    //     autoSlide();
    //     startAutoScroll(); 
    // };
    
    // carousel.addEventListener("mousedown", dragStart);
    // carousel.addEventListener("touchstart", dragStart);
    
    // document.addEventListener("mousemove", dragging);
    // carousel.addEventListener("touchmove", dragging);
    
    // document.addEventListener("mouseup", dragStop);
    // carousel.addEventListener("touchend", dragStop);
    
    showHideIcons();