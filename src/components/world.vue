<template>
    <div style="height: 100vh;">
        <l-map
            ref="map"
            style="height: 100%; width: 100%; margin: 0"
            :zoom="zoom"
            :center="center"
            :maxBounds="maxBounds"
            :maxBoundsViscosity=1.0
            :options="mapOptions"
            @ready="centerMapToCurrentLevel"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
        >
            <l-tile-layer
                :url="url"
                :options="layerOptions">
            </l-tile-layer>
            <l-marker
                v-for="marker in markers"
                :key="marker.id"
                :lat-lng="marker.coordinates"
                @click="goToLevel(marker.level)"
            >
                <l-icon v-if="marker.score === Score.UNLOCKED" :icon-anchor="iconAnchor">
                    <div>
                        <svg v-if="marker.score === Score.ONE_STAR" width="64" height="64"
                             xmlns="http://www.w3.org/2000/svg">
                            <image href="assets/stars/stars_1.svg" height="64" width="64"/>
                        </svg>
                        <svg v-else-if="marker.score === Score.TWO_STARS" width="64" height="64"
                             xmlns="http://www.w3.org/2000/svg" >
                            <image href="assets/stars/stars_2.svg" height="64" width="64"/>
                        </svg>
                        <svg v-else-if="marker.score === Score.THREE_STARS" width="64" height="64"
                             xmlns="http://www.w3.org/2000/svg">
                            <image href="assets/stars/stars_3.svg" height="64" width="64"/>
                        </svg>
                        <svg v-else width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <image href="assets/stars/stars_0.svg" height="64" width="64"/>
                        </svg>
                        <img src="assets/markers/enabled.png" width="64" height="64" alt="Enabled marker">
                    </div>
                </l-icon>
                <l-icon v-else :icon-anchor="iconAnchor">
                    <div>
                        <img src="assets/markers/disabled.png" width="64" height="64" alt="Disabled marker">
                    </div>
                </l-icon>
            </l-marker>
            <l-control position="topleft">
                <button @click="goToStartMenu" class="btn btn-primary">
                    Zum Menü
                </button>
            </l-control>
        </l-map>
    </div>
</template>

<script lang="ts">
    import { router } from '../index';
    import L from 'leaflet';
    import { LMap, LTileLayer, LMarker, LControl, LIcon } from 'vue2-leaflet';
    import World from '../model/World';
    import Score from "../model/Score";

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

            const coordinates = [
                L.latLng(35, -130),
                L.latLng(0, 5),
                L.latLng(-29, 90),
                L.latLng(50.5, 110),
            ];

            let index = 0;
            const markers = []
            for(const [level, score] of Object.entries(world.getLevelData())){
                markers.push({
                    id: index,
                    level: level,
                    score: score,
                    coordinates: coordinates[index],
                });
                index++;
            }

            let currentLevel = markers.find(element => element.score === Score.UNLOCKED);
            if (currentLevel === undefined) {
                currentLevel = markers[markers.length - 1];
            }

            return {
                url: '../../assets/world/{z}/{x}/{y}.png',
                zoom: 3,
                noWrap: true,
                center: bounds.getCenter(),
                maxBounds: bounds,
                iconAnchor: [32, 80],
                markers: markers,
                mapOptions: {
                    zoomControl: false,
                    attributionControl: false,
                },
                layerOptions: {
                    minZoom: 3,
                    maxZoom: 5,
                },
                world,
                Score,
                currentLevel
            };
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LControl,
            LIcon
        },
        methods: {
            zoomUpdated (zoom: any) {
                this.zoom = zoom;
            },
            centerUpdated (center: any) {
                this.center = center;
            },
            goToLevel (levelId: String) {
                this.$router.push(`/level/${levelId}`);
            },
            goToStartMenu () {
                this.world.leaveWorld();
                this.$router.push('/');
            },
            centerMapToCurrentLevel () {
                this.$refs.map.mapObject.flyTo(this.currentLevel.coordinates,4)
            }
        }
    }
</script>
