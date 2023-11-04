<template>
    <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900">
        {{ title }}
    </h1>
    <div class="p-10">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'LayautPage2',
    props: {
        title: String
    }
}
</script>