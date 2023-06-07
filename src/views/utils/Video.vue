<template>
    <div>
        <input type="file" @change="onFileChange" />
        <button @click="compressVideo">压缩视频</button>
        <video :src="videoFile"></video>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videoFile: null,
            compressedVideo: null,
        };
    },
    methods: {
        onFileChange(event) {
            this.videoFile = event.target.files[0];
        },
        async compressVideo() {
            const video = document.createElement("video");
            video.src = URL.createObjectURL(this.videoFile);
            await video.play();
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                this.compressedVideo = new File([blob], "compressed.mp4", {
                    type: "video/mp4",
                    lastModified: Date.now()
                });
            }, "video/mp4", 0.5);
            console.log(this.videoFile, '压缩前');
            console.log(this.compressedVideo, '压缩后');
        }
    }
};
</script>