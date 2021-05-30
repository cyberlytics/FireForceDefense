<template>
    <div>
        <p class="text-center">{{ $t(question) }}</p>
        <div class="d-flex flex-row justify-content-between">
            <div>
                <button class="btn btn-danger btn-block btn-lg" @click="$emit('yes')">
                    {{ $t(yes) }}
                </button>
            </div>
            <div>
                <button class="btn btn-success btn-block btn-lg" @click="$emit('no')">
                    {{ $t(no) }}
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    components: {},
    props: {
        question: { type: String, required: true },
        yes: { type: String, required: true },
        no: { type: String, required: true },
    },
    data() {
        return {};
    },
    methods: {},
});
</script>
