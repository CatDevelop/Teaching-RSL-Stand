import confetti from "canvas-confetti";

export const getFireworks = (timeExplodes: number) => {
    let endDate = Date.now() + timeExplodes;
    let fireworksColors = ['#bb0000', '#ffffff'];
    const explode = () => {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {x: 0},
            colors: fireworksColors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {x: 1},
            colors: fireworksColors
        });

        if (Date.now() < endDate) {
            requestAnimationFrame(explode);
        }
    }
    return explode
}
