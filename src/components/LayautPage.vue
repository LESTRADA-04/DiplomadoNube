<template>
    <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900">
        {{ title }}
    </h1>
    <div class="p-10">
        <div class="container ml-auto mr-auto flex items-center justify-center shadow-2xl bg-blue-50 rounded">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LayautPage',
    props: {
        title: String
    }
}
</script>