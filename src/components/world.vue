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
                @click="goToLevel(marker.level, marker.score)"
            >
                <l-icon v-if="marker.score === Score.UNLOCKED" :icon-anchor="iconAnchor">
                    <svg width="105" height="137" xmlns="http://www.w3.org/2000/svg">
                        <image v-if="marker.score === Score.ONE_STAR"
                               href="assets/one_star.svg" width="105" height="137"/>
                        <image v-else-if="marker.score === Score.TWO_STARS"
                               href="assets/two_stars.svg" width="105" height="137"/>
                        <image v-else-if="marker.score === Score.THREE_STARS"
                               href="assets/three_stars.svg" width="105" height="137"/>
                        <image v-else
                               href="assets/unlocked.svg" width="105" height="137"/>
                    </svg>
                </l-icon>
                <l-icon v-else :icon-anchor="iconAnchor">
                    <svg width="105" height="135" xmlns="http://www.w3.org/2000/svg">
                        <image href="assets/locked.svg" width="105" height="137"/>
                    </svg>
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
    import { LControl, LIcon, LMap, LMarker, LTileLayer } from 'vue2-leaflet';
    import World from '../model/World';
    import Score from "../model/Score";

    export default {
        data () {
            let world: World;
            try {
                world = World.getInstance();
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

            const markers: { id: number, level: string, score: Score, coordinates: L.LatLng }[] = []
            world.getLevelData().forEach((element, index) => {
                markers.push({
                    id: index,
                    level: element.levelID,
                    score: element.score,
                    coordinates: coordinates[index],
                });
            });

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
                iconAnchor: [40, 70],
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
            goToLevel (levelId: String, score: Score) {
                if (score === Score.LOCKED) {
                    // TODO Maybe show feedback to the user
                    return;
                }
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
