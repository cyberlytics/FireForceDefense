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
            <l-marker :lat-lng="[35, -130]" :icon="enabledMarker" @click="goToLevel()"></l-marker>
            <l-control position="bottomleft" >
                <button @click="back">
                    Zum Menü
                </button>
            </l-control>
        </l-map>
    </div>
</template>

<script lang="ts">
    import { router } from '../index';
    import L from 'leaflet';
    import {LMap, LTileLayer, LMarker, LControl} from 'vue2-leaflet';
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

            const enabledMarker = L.icon({
                iconUrl: '../../assets/markers/enabled.png',
                iconSize: [154, 142],
                iconAnchor: [77, 71],
            });

            return {
                url: '../../assets/world/{z}/{x}/{y}.png',
                zoom: 3,
                noWrap: true,
                center: bounds.getCenter(),
                maxBounds: bounds,
                maxBoundsViscosity: 1.0,
                enabledMarker: enabledMarker,
                mapOptions: {
                    zoomControl: false,
                    attributionControl: false,
                },
            };
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LControl
        },
        methods: {
            zoomUpdated (zoom: any) {
                this.zoom = zoom;
            },
            centerUpdated (center: any) {
                this.center = center;
            },
            goToLevel () {
                this.$router.push(`/level/lvl001`); // TODO: Change this to any level.
            },
            back () {
                this.$router.push('/');
            }
        }
    }
</script>
