<template>
    <div class="app">
        <article>{{sentences[index].text}}</article>
    </div>
</template>

<script>

export default {
    components: {

    },
    data() {
        return {
            sentences: [{
                text: '没有什么东西的价格可以涨到天上去，房子除外。',
                author: '屈尼·达野'
            }, {
                text: '榴莲是挺好吃的，就是皮有点扎嘴。',
                author: ''
            }],
            index: 0
        }
    },
    methods: {
        onHashchange() {
            var index = +location.hash.slice(1);
            if(!index) {
                location.hash = 0;
                return;
            }
            if(index > this.sentences.length) {
                index = this.sentences.length;
            }
            if(index < 1) {
                index = 1;
            }
            location.hash = index;
            this.index = index - 1;
        }
    },
    mounted() {
        this.index = +location.hash.slice(1) || 0;
        window.addEventListener('hashchange', () => {
            this.onHashchange();
        });
    }
}
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
}
body {
    background: #FED24B;
    font-size: 32px;
    font-family: "Helvetica Neue", HelveticaNeue, "Helvetica", "Microsoft YaHei", "PingFang SC", "roboto", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
}
.app {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 32px;
}
</style>
