<template>

</template>

<script lang="ts">
    import { router } from '../index';
    import World from '../model/World';

    export default {
        data () {
            let world: World;
            try {
                world = new World();
            } catch (e) {
                router.push('/');
            }
            return {};
        },
        components: {},
        methods: {}
    }
</script>
