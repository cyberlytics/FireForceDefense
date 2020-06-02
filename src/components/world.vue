<template>
    <div style="height: 1000px;">
        <l-map
            style="height: 100%; width: 100%; margin: 0"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
        >
            <l-tile-layer :url="url" :noWrap="noWrap"></l-tile-layer>
        </l-map>
    </div>
</template>

<script lang="ts">
    import { router } from '../index';
    import L from 'leaflet';
    import {LMap, LTileLayer} from 'vue2-leaflet';
    import World from '../model/World';

    export default {
        data () {
            let world: World;
            try {
                world = new World();
            } catch (e) {
                router.push('/');
            }

            const bounds = new L.LatLngBounds(
                new L.LatLng(-70, -150),
                new L.LatLng(70, 150)
            );

            return {
                url: '../../assets/world/{z}/{x}/{y}.png',
                zoom: 3,
                center: [0,0],
                noWrap: true,
                maxBounds: bounds,
                maxBoundsViscosity: 1.0,
                mapOptions: {
                    zoomControl: false,
                    attributionControl: false,
                },
            };
        },
        components: {
            LMap,
            LTileLayer,
        },
        methods: {
            zoomUpdated (zoom: any) {
                this.zoom = zoom;
            },
            centerUpdated (center: any) {
                this.center = center;
            },
        }
    }
</script>
