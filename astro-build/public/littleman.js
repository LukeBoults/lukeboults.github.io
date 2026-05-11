document.addEventListener("DOMContentLoaded", () => {
    const manImage = document.getElementById("man-image");
    const speechBubble = document.getElementById("speech-bubble");
    const ufo = document.getElementById("ufo");

    // Containers that have hover stuff
    const hoverMap = {
        ".navbar a": "Ooooo New Page!",
        ".home-btn": "Home Sweet Home!",
        ".social-btn": "Follow me on my journey!",
        ".blog-btn": "Check out the blog!",
        ".project-btn": "Glory Awaits!",
        ".sample-list li": "Check out this piece of work!",
        ".my-name": "That's my name, don't wear it out!",
        ".profile-pic": "What a handsome devil!"
    };


    let isMuted = false;
    let ufoActive = false;

    // Helpers
    const showBubble = (text) => {
        if (!isMuted) {
            speechBubble.textContent = text;
            speechBubble.style.display = "block";
        }
    };

    const hideBubble = () => {
        speechBubble.style.display = "none";
    };

    const setMan = (src) => {
        manImage.src = src;
    };

    const activateMan = (text) => {
        if (!isMuted && !ufoActive) {
            setMan("Images/mantalking.gif");
            showBubble(text);
        }
    };

    const deactivateMan = () => {
        if (!isMuted && !ufoActive) {
            setMan("Images/maninactive.gif");
            hideBubble();
        }
    };

    const restoreMan = () => {
        // Called after UFO ends
        if (isMuted) {
            setMan("Images/manmuted.gif");
            hideBubble();
        } else {
            setMan("Images/maninactive.gif");
            hideBubble();
        }
    };

    const toggleMute = () => {
        isMuted = !isMuted;
        if (isMuted) {
            setMan("Images/manmuted.gif");
            hideBubble();
        } else {
            // Only show inactive if no UFO event is active
            if (!ufoActive) setMan("Images/maninactive.gif");
        }
    };

    // Hover listeners
    for (const selector in hoverMap) {
        document.querySelectorAll(selector).forEach((el) => {
            el.addEventListener("mouseenter", () => {
                if (!isMuted && !ufoActive) activateMan(hoverMap[selector]);
            });
            el.addEventListener("mouseleave", () => {
                if (!isMuted && !ufoActive) deactivateMan();
            });
        });
    }

    // Click to mute/unmute
    manImage.addEventListener("click", toggleMute);


    // UFO Fly-by Feature
    const UFO_DURATION = 2000;
    const REACTION_DURATION = 3000;

    function flyUfo() {
        if (!ufo) return;

        ufoActive = true;

        // Randomize base flight height (keeps the wave centered around this Y)
        const baseTop = Math.round(window.innerHeight * (0.10 + Math.random() * 0.40));
        ufo.style.top = `${baseTop}px`;

        // Start the flight animation (CSS keyframes handle wave and horizontal travel)
        ufo.style.opacity = '1';
        ufo.style.animation = 'ufoFly 2s linear forwards';

        // After the flight completes, do the reaction
        setTimeout(() => {
            ufo.style.opacity = '0';
            ufo.style.animation = 'none';

            setMan('Images/mansurprised.gif');
            if (!isMuted) {
                showBubble('Did you just see that?');
            }

            setTimeout(() => {
                restoreMan();
                ufoActive = false;
            }, REACTION_DURATION);

        }, UFO_DURATION);
    }

    function scheduleRandomUfo() {
        // Random delay between 30s and 60s
        const delayMs = 30000 + Math.floor(Math.random() * 30000);
        setTimeout(() => {
            flyUfo();
            scheduleRandomUfo();
        }, delayMs);
    }

    scheduleRandomUfo();
});