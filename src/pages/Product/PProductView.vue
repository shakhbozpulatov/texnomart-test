<template>
  <div class="pb-4">
    <div class="card-wrap" v-if="product">
      <div class="row">
        <div class="col-md-6">
          <swiper
            :effect="'coverflow'"
            :grabCursor="true"
            :centeredSlides="true"
            :slidesPerView="'auto'"
            :coverflowEffect="{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }"
            :pagination="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide v-for="(elem, index) in product.images" :key="index">
              <img :src="elem" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="col-md-6">
          <div class="flex items-center justify-between">
            <p class="font-bold text-xl mb-0">
              {{ product.title }}
            </p>
            <span class="bg-red-500 text-white p-1 rounded-lg"
              >-{{ product.discountPercentage }}%</span
            >
          </div>
          <p class="text-neutral-700">{{ product.brand }}</p>
          <p class="text">{{ product.description }}</p>
          <p class="font-semibold text-2xl text-right">{{ product.price }}$</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { getProductById } from "../../service/index";

let modules = [EffectCoverflow, Pagination];
const route = useRoute();
let product = ref(null);

onMounted(async () => {
  product.value = await getProductById(route.params.id);
});
</script>

<style lang="scss" scoped>
.card-wrap {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  padding: 20px;
  margin: 60px 0 100px;
}
#app {
  height: 100%;
}
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 182px;
  height: 200px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
</style>
