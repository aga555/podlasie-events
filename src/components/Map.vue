<template>
    <div id="mapid">

            <l-map ref="myMap" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="marker"></l-marker>
            </l-map>

    </div>
</template>

<style scoped>
    #mapid { height: 180px; }
</style>
<script>
    import L from 'leaflet';
    import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
    export default {
        name: "Map",
        data() {
            return {
                zoom:13,
                center: L.latLng(47.413220, -1.219482),
                url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                marker: L.latLng(47.413220, -1.219482),
            }
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
        },
    }
</script>

