export function preloadVideos(videoUrls: string[]) {
    videoUrls.forEach(url => {
        const video = document.createElement('video');
        video.src = url;
        video.preload = 'auto';
    });
}
