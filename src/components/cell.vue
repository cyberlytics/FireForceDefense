<template>
    <g v-bind:transform="'translate(' + x + ',' + y + ')'" @click="log(cell.position.toString())">
        <polygon class="hex" v-bind:points="pathString" v-bind:fill="'url(#cell-' + cell.id + ')'" stroke="#000" />
        <text text-anchor="middle" dominant-baseline="middle" font-size="28" font-weight="bold"
              style="text-shadow: 0 0 1px white,  0 0 2px white, 0 0 3px white;">
            {{ cell.position }}
        </text>
    </g>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {}
        },
        methods: {
            log: console.log,
        },
        components: {},
        computed: {
            pathString: function () {
                const s = parseFloat(this.size.toString());
                const xOff = s * 0.8660254038;
                const halfSize = s * 0.5;
                return (+xOff) + ',' + (-halfSize) + ' '
                    + (+xOff) + ',' + (+halfSize) + ' '
                    + (0    ) + ',' + (+s       ) + ' '
                    + (-xOff) + ',' + (+halfSize) + ' '
                    + (-xOff) + ',' + (-halfSize) + ' '
                    + (0    ) + ',' + (-s       );
            },
            x: function () {
                return this.size * (1.732050808 * this.cell.position.q + 0.8660254038 * this.cell.position.r);
            },
            y: function () {
                return this.size * (1.5 * this.cell.position.r);
            }
        },
        props: ['cell', 'size']
    })
</script>
