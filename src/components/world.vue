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
                :lat-lng="marker.latlng"
                @click="goToLevel(marker.level)"
            >
                <l-icon
                    v-if="marker.levelUnlocked"
                    :icon-url=enabledIcon
                    :icon-size="iconSize"
                    :icon-anchor="iconAnchor">
                </l-icon>
                <l-icon
                    v-else
                    :icon-url=disabledIcon
                    :icon-size="iconSize"
                    :icon-anchor="iconAnchor">
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

            const enabledIcon: String = "../../assets/markers/enabled.png";
            const disabledIcon: String = "../../assets/markers/disabled.png";

            const markers = [
                {
                    id: 1,
                    level: 'lvl001',
                    levelUnlocked: true,
                    latlng: L.latLng(35, -130)
                }, {
                    id: 2,
                    level: 'lvl002',
                    levelUnlocked: true,
                    latlng: L.latLng(0, 5)
                }, {
                    id: 3,
                    level: 'lvl003',
                    levelUnlocked: false,
                    latlng: L.latLng(-29, 90)
                }, {
                    id: 4,
                    level: 'lvl004',
                    levelUnlocked: false,
                    latlng: L.latLng(50.5, 110)
                }
            ]

            return {
                url: '../../assets/world/{z}/{x}/{y}.png',
                zoom: 3,
                noWrap: true,
                center: bounds.getCenter(),
                maxBounds: bounds,
                enabledIcon: enabledIcon,
                disabledIcon: disabledIcon,
                iconSize: [154, 142],
                iconAnchor: [77, 71],
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
                this.$refs.map.mapObject.flyTo([0, 5],4) // TODO: Change this to current level.
            }
        }
    }
</script>
