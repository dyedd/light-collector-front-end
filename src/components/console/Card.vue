<script setup>
const props = defineProps({
    // 传递的card信息
    cardTitle: {
        type: String,
    },
})
</script>
<template>
    <div class="card">
        <span class="info-d-icon"></span>
        <h3 class="title">{{ props.cardTitle }}</h3>
        <div class="card-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card {
    background-color: var(--background);
    color: var(--main);
    border-radius: var(--radiusB);
    box-shadow: var(--box-shadowB);
    padding: 2rem;
    margin-bottom: 2rem;
    .title {
        &::before {
            content: '';
            display: inline-block;
            width: 3rem;
            height: 3rem;
            vertical-align: bottom;
            background-size: cover;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgY2xhc3M9ImRlc2lnbi1pY29uZm9udCI+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxwYXRoIGZpbGw9IiMwMDUwRjAiIGQ9Ik00LjAwMjA2Mzk1IDBMMTQgMCA5Ljk5NzkzNjA1IDE5IDAgMTl6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDYpIiAvPgogICAgPHBhdGggZmlsbD0iIzAwRDJGQSIgZD0iTTEzLjAwMjA2MzkgNEwyMyA0IDE4Ljk5NzkzNjEgMjMgOSAyM3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNikiIC8+CiAgICA8cGF0aCBmaWxsPSIjMDBGMERDIiBkPSJNMjIuMDAyMDYzOSA5TDMyIDkgMjcuOTk3OTM2MSAyOCAxOCAyOHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgNikiIC8+CiAgPC9nPgo8L3N2Zz4K);
        }
    }
}
</style>