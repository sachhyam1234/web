/* =========================================================
   DIYA BIRTHDAY WEBSITE
   haha.js
========================================================= */


/* =========================================================
   BASIC SCENE SYSTEM
========================================================= */

const scenes = document.querySelectorAll(".scene");


function goToScene(sceneId) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const target = document.getElementById(sceneId);

    if (target) {
        target.classList.add("active");
    }

    createAmbientHeart();
}


/* =========================================================
   GLOBAL BUTTON NAVIGATION
========================================================= */

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        const target = button.dataset.next;

        goToScene(target);

    });

});


/* =========================================================
   AMBIENT FLOATING HEARTS
========================================================= */

const floatingHearts = document.getElementById("floatingHearts");

function createAmbientHeart() {

    if (!floatingHearts) return;

    const heart = document.createElement("span");

    heart.className = "ambient-heart";

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "✨",
        "🦋"
    ];

    heart.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.bottom =
        Math.random() * 10 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}


setInterval(createAmbientHeart, 1000);


/* =========================================================
   SCENE 1 — PASSCODE
========================================================= */

const correctPasscode = "1019";

let enteredCode = "";

const keys = document.querySelectorAll(".key[data-key]");
const passwordDots =
    document.querySelectorAll("#passwordDisplay span");

const clearKey =
    document.getElementById("clearKey");

const backKey =
    document.getElementById("backKey");

const wrongMessage =
    document.getElementById("wrongMessage");

const passHint =
    document.getElementById("passHint");


function updatePasswordDisplay() {

    passwordDots.forEach((dot, index) => {

        if (index < enteredCode.length) {
            dot.textContent = "●";
            dot.classList.add("filled");
        } else {
            dot.textContent = "○";
            dot.classList.remove("filled");
        }

    });
}


function resetPassword() {

    enteredCode = "";

    updatePasswordDisplay();

    wrongMessage.textContent = "";

    passHint.textContent =
        "only my special girl knows it 💗";
}


function checkPassword() {

    if (enteredCode.length !== 4) {
        return;
    }

    if (enteredCode === correctPasscode) {

        wrongMessage.textContent =
            "Correct... I knew you knew it 🥺❤️";

        passHint.textContent =
            "Welcome, my love ❤️";

        createBigHeartBurst();

        setTimeout(() => {

            goToScene("scene-game");

            resetPassword();

        }, 900);

    } else {

        wrongMessage.textContent =
            "Hmmmm... wrong code baby 😭💕";

        passHint.textContent =
            "Try again, my love.";

        document
            .getElementById("passwordDisplay")
            .animate(
                [
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(5px)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 300
                }
            );

        setTimeout(resetPassword, 700);
    }
}


keys.forEach(key => {

    key.addEventListener("click", () => {

        if (enteredCode.length >= 4) return;

        enteredCode += key.dataset.key;

        updatePasswordDisplay();

        if (enteredCode.length === 4) {
            setTimeout(checkPassword, 200);
        }

    });

});


clearKey.addEventListener("click", resetPassword);


backKey.addEventListener("click", () => {

    enteredCode =
        enteredCode.slice(0, -1);

    updatePasswordDisplay();

});


/* =========================================================
   HEART BURST
========================================================= */

function createBigHeartBurst() {

    for (let i = 0; i < 20; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "❤️";

        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.zIndex = "9999";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        heart.style.pointerEvents = "none";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 250;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },
                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: 0.2
                },
                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.6)`,
                    opacity: 0
                }
            ],
            {
                duration: 900 + Math.random() * 600,
                easing: "ease-out"
            }
        );

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }
}


/* =========================================================
   SCENE 2 — CATCH THE HEART GAME
========================================================= */

const gameArea =
    document.getElementById("heartGameArea");

const heartScore =
    document.getElementById("heartScore");

const gameMessage =
    document.getElementById("gameMessage");

const gameNextBtn =
    document.getElementById("gameNextBtn");

let score = 0;

let gameRunning = false;

let heartSpawner = null;


function createGameHeart() {

    if (!gameRunning) return;

    const heart =
        document.createElement("div");

    heart.className = "catch-heart";

    const heartTypes = [
        "❤️",
        "💗",
        "💕",
        "💖"
    ];

    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() * heartTypes.length
            )
        ];

    const maxX =
        Math.max(
            20,
            gameArea.clientWidth - 45
        );

    const maxY =
        Math.max(
            30,
            gameArea.clientHeight - 55
        );

    heart.style.left =
        Math.random() * maxX + "px";

    heart.style.top =
        Math.random() * maxY + "px";

    heart.addEventListener("pointerdown", () => {

        if (!gameRunning) return;

        score++;

        heartScore.textContent = score;

        heart.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 1
                },
                {
                    transform: "scale(1.8)",
                    opacity: 0
                }
            ],
            {
                duration: 250
            }
        );

        setTimeout(() => heart.remove(), 250);

        if (score >= 5) {
            finishHeartGame();
        }

    });

    gameArea.appendChild(heart);

    setTimeout(() => {

        if (heart.isConnected) {
            heart.remove();
        }

    }, 1600);
}


function startHeartGame() {

    score = 0;

    heartScore.textContent = "0";

    gameRunning = true;

    gameNextBtn.classList.add("hidden");

    gameMessage.textContent =
        "Catch them, birthday girl! 💕";

    if (heartSpawner) {
        clearInterval(heartSpawner);
    }

    heartSpawner =
        setInterval(
            createGameHeart,
            650
        );

    for (let i = 0; i < 3; i++) {
        setTimeout(
            createGameHeart,
            i * 200
        );
    }
}


function finishHeartGame() {

    gameRunning = false;

    clearInterval(heartSpawner);

    gameMessage.textContent =
        "You caught them all! You win my next surprise 🥺❤️";

    gameNextBtn.classList.remove("hidden");

    createBigHeartBurst();
}


gameNextBtn.addEventListener(
    "click",
    () => goToScene("scene-bouquet")
);


/* Start game when scene becomes available */
setTimeout(startHeartGame, 1000);


/* =========================================================
   SCENE 3 — BOUQUET GIFT
========================================================= */

const bouquetGift =
    document.getElementById("bouquetGift");

const bouquetReveal =
    document.getElementById("bouquetReveal");

const bouquetTapText =
    document.getElementById("bouquetTapText");

const flowerPlayBtn =
    document.getElementById("flowerPlayBtn");

const flowerRain =
    document.getElementById("flowerRain");

const flowerNextBtn =
    document.getElementById("flowerNextBtn");


bouquetGift.addEventListener("click", openBouquet);


function openBouquet() {

    if (bouquetGift.classList.contains("open")) {
        return;
    }

    bouquetGift.classList.add("open");

    bouquetTapText.textContent =
        "Wait... 🌷";

    setTimeout(() => {

        bouquetReveal.classList.add("show");

        bouquetTapText.style.opacity = "0";

    }, 500);

}


flowerPlayBtn.addEventListener(
    "click",
    startFlowerRain
);


function startFlowerRain() {

    flowerPlayBtn.disabled = true;

    flowerPlayBtn.textContent =
        "Flowers everywhere 🌷";

    const flowerImages = [

        "https://cdn.avasflowers.net/img/prod_img/avasflowers-spring-tulips-20-stems-16531.png",

        "https://storage.googleapis.com/regalflowers-cdn/products/imgregal-red-roses-and-million-stars-30roses-po044edsyh0cev86l9rjz9.jpg"

    ];

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {

            const flower =
                document.createElement("img");

            flower.className =
                "falling-flower";

            flower.src =
                flowerImages[
                    Math.floor(
                        Math.random() *
                        flowerImages.length
                    )
                ];

            flower.style.left =
                Math.random() * 100 + "%";

            const size =
                25 + Math.random() * 45;

            flower.style.width =
                size + "px";

            flower.style.height =
                size + "px";

            flower.style.animationDuration =
                (2.5 + Math.random() * 3) + "s";

            flower.style.animationDelay =
                Math.random() * 0.8 + "s";

            flower.style.opacity =
                0.55 + Math.random() * 0.45;

            flowerRain.appendChild(flower);

            setTimeout(() => {
                flower.remove();
            }, 6000);

        }, i * 100);

    }

    setTimeout(() => {

        flowerNextBtn.classList.remove("hidden");

    }, 3200);

}


flowerNextBtn.addEventListener(
    "click",
    () => goToScene("scene-cake")
);


/* =========================================================
   SCENE 4 — CAKE
========================================================= */

const cakeGift =
    document.getElementById("cakeGift");

const cakeTapText =
    document.getElementById("cakeTapText");

const cakeArea =
    document.getElementById("cakeArea");

const cakeCountdown =
    document.getElementById("cakeCountdown");

const blowText =
    document.getElementById("blowText");

const cutCakeBtn =
    document.getElementById("cutCakeBtn");

const waitingBtn =
    document.getElementById("waitingBtn");

const cakeConfetti =
    document.getElementById("cakeConfetti");


let cakeOpened = false;


cakeGift.addEventListener("click", openCake);


function openCake() {

    if (cakeOpened) return;

    cakeOpened = true;

    cakeGift.classList.add("open");

    cakeTapText.textContent =
        "Look what was hiding inside... 🎂";

    createConfetti(45);

    setTimeout(() => {

        cakeArea.classList.add("show");

        startCakeCountdown();

    }, 700);

}


function startCakeCountdown() {

    let count = 5;

    cakeCountdown.textContent = count;

    const interval =
        setInterval(() => {

            count--;

            cakeCountdown.textContent =
                count;

            if (count <= 0) {

                clearInterval(interval);

                finishCountdown();

            }

        }, 1000);

}


function finishCountdown() {

    const cake =
        document.querySelector(".cake");

    cake.classList.add("blown");

    cakeCountdown.textContent =
        "💨";

    blowText.textContent =
        "Perfect! Candles are gone 🥺❤️";

    cutCakeBtn.classList.remove("hidden");

    createConfetti(60);
}


cutCakeBtn.addEventListener(
    "click",
    () => {

        const cake =
            document.querySelector(".cake");

        cake.classList.add("cake-cut");

        cutCakeBtn.textContent =
            "Cake cut! 🎂❤️";

        createConfetti(100);

        setTimeout(() => {

            cutCakeBtn.classList.add("hidden");

            waitingBtn.classList.remove("hidden");

        }, 1200);

    }
);


function createConfetti(amount) {

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            randomConfettiColor();

        piece.style.animationDelay =
            Math.random() * 0.5 + "s";

        piece.style.animationDuration =
            (1.5 + Math.random() * 2) + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        cakeConfetti.appendChild(piece);

        setTimeout(
            () => piece.remove(),
            4000
        );

    }
}


function randomConfettiColor() {

    const colors = [
        "#ff6bbd",
        "#ffb3df",
        "#a866ff",
        "#fff",
        "#ffd45e",
        "#ff709d"
    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];
}


waitingBtn.addEventListener(
    "click",
    () => {

        goToScene("scene-video");

        playBirthdayVideo();

    }
);


/* =========================================================
   SCENE 5 — VIDEO
========================================================= */

const birthdayVideo =
    document.getElementById("birthdayVideo");

const videoNextBtn =
    document.getElementById("videoNextBtn");

const videoHint =
    document.getElementById("videoHint");


function playBirthdayVideo() {

    if (!birthdayVideo) return;

    birthdayVideo.currentTime = 0;

    const playPromise =
        birthdayVideo.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            videoHint.textContent =
                "Tap ▶ on the video to start ❤️";

        });

    }

}


birthdayVideo.addEventListener(
    "ended",
    () => {

        videoHint.textContent =
            "That was for you, my love ❤️";

        videoNextBtn.classList.remove("hidden");

        createBigHeartBurst();

    }
);


videoNextBtn.addEventListener(
    "click",
    () => {

        goToScene("scene-promises");

    }
);


/* =========================================================
   SCENE 6 — PROMISE CARDS
========================================================= */

const promiseCards =
    document.querySelectorAll(".promise-card");

const loveEnding =
    document.getElementById("loveEnding");

const promiseNextBtn =
    document.getElementById("promiseNextBtn");

let openedCards = 0;


promiseCards.forEach(card => {

    card.addEventListener("click", () => {

        if (card.classList.contains("flipped")) {
            return;
        }

        card.classList.add("flipped");

        openedCards++;

        if (openedCards === 7) {

            setTimeout(
                completePromises,
                1100
            );

        }

    });

});


function completePromises() {

    promiseCards.forEach((card, index) => {

        const angle =
            (index % 2 === 0 ? -1 : 1);

        card.style.setProperty(
            "--fly-x",
            `${angle * (100 + Math.random() * 200)}px`
        );

        card.style.setProperty(
            "--fly-y",
            `${-100 - Math.random() * 250}px`
        );

        card.classList.add("fly-away");

    });

    setTimeout(() => {

        loveEnding.classList.add("show");

        createBigHeartBurst();

    }, 800);

}


promiseNextBtn.addEventListener(
    "click",
    () => {

        loveEnding.classList.remove("show");

        setTimeout(() => {
            goToScene("scene-rose");
        }, 400);

    }
);


/* =========================================================
   SCENE 10 — LETTER
========================================================= */

const letterWrapper =
    document.getElementById("letterWrapper");

const finalMessage =
    document.getElementById("finalMessage");


let letterOpened = false;


letterWrapper.addEventListener(
    "click",
    () => {

        if (letterOpened) return;

        letterOpened = true;

        letterWrapper.classList.add("open");

        setTimeout(() => {

            finalMessage.classList.add("show");

            createBigHeartBurst();

        }, 2800);

    }
);


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key >= "0" &&
            event.key <= "9"
        ) {

            if (
                document
                    .getElementById("scene-passcode")
                    .classList.contains("active")
            ) {

                if (enteredCode.length < 4) {

                    enteredCode += event.key;

                    updatePasswordDisplay();

                    if (enteredCode.length === 4) {
                        setTimeout(checkPassword, 200);
                    }

                }

            }

        }

        if (
            event.key === "Backspace" &&
            document
                .getElementById("scene-passcode")
                .classList.contains("active")
        ) {

            enteredCode =
                enteredCode.slice(0, -1);

            updatePasswordDisplay();

        }

        if (
            event.key === "Escape" &&
            document
                .getElementById("scene-passcode")
                .classList.contains("active")
        ) {

            resetPassword();

        }

    }
);


/* =========================================================
   PRELOAD IMPORTANT IMAGES
========================================================= */

const preloadImages = [

    "https://hi52toys.com/cdn/shop/files/crayon-shin-chan-minime-series-lazy-chill-series.webp?v=1786116166",

    "https://i.pinimg.com/564x/6a/42/69/6a4269b6b161235329382215c7a6c829.jpg",

    "https://cdn.avasflowers.net/img/prod_img/avasflowers-spring-tulips-20-stems-16531.png",

    "https://storage.googleapis.com/regalflowers-cdn/products/imgregal-red-roses-and-million-stars-30roses-po044edsyh0cev86l9rjz9.jpg",

    "https://www.surprose.com/media/catalog/product/cache/a003019ba7fcb54fff9e7f7465db6631/s/i/single-red-rose-in-a-matching-bouquet-8720174082382-bb.jpg"

];


preloadImages.forEach(src => {

    const img =
        new Image();

    img.src = src;

});


/* =========================================================
   STARTUP
========================================================= */

updatePasswordDisplay();

console.log(
    "Diya's birthday website loaded ❤️"
);