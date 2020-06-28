export class Api {
    constructor(url) {
        this.url = url;
    }

    async requestLyrics(artist, song) {
        const lyricsResponse = await fetch(`${this.url}/${artist}/${song}`);
        return lyricsResponse;
    }
}