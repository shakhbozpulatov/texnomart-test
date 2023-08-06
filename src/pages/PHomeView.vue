<template>
  <div class="">
    <div class="mt-4">
      <h5 class="mb-4 text-xl">Ommabop kategoriyalar</h5>
      <swiper
        :slides-per-view="6"
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :scrollbar="{ draggable: true }"
        class="p-1 pb-2"
      >
        <swiper-slide
          class="slider-card"
          v-for="(elem, index) in categories"
          :key="index"
          @click="getProductsViaCategory(index)"
          >{{ elem }}</swiper-slide
        >
      </swiper>
    </div>
    <div class="mt-7">
      <h5 class="text-xl mb-4">Mahsulotlar</h5>
      <div class="row">
        <div
          class="col-md-3 mb-5"
          v-for="(elem, index) in products.products"
          :key="index"
        >
          <router-link :to="`/product/${elem.id}`">
            <div class="product-card">
              <div class="w-[100%] h-[230px] img-wrap">
                <img
                  class="object-cover aspect-video h-100"
                  :src="elem.images[0]"
                  alt=""
                />
              </div>
              <div class="h-100 p-2 flex flex-col justify-between">
                <div class="flex justify-between items-center">
                  <p class="m-0 font-bold text-lg">{{ elem.price }}$</p>
                  <span class="text-sm px-1 rounded bg-orange-600 text-white"
                    >-{{ elem.discountPercentage }} %</span
                  >
                  <!-- <p class="m-0"></p> -->
                </div>
                <div>
                  <p class="m-0 text-lg font-semibold">{{ elem.title }}</p>
                  <!-- <p class="mb-3 text-sm">{{ elem.description }}</p> -->
                </div>
                <div>
                  <el-rate
                    disabled
                    size="large"
                    v-model="elem.rating"
                    :colors="colors"
                  />
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <el-pagination
          :current-page="currentPage"
          background
          layout="total, prev, pager, next"
          class="p-4 mb-4"
          :total="products.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../style.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
} from "../service/index";
import { useSearchResult } from "../stores/index";

const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);
const modules = [Navigation, Pagination, Autoplay];
const searchResult = useSearchResult();
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

const categories = ref([]);
const pureCategory = ref([]);
const products = ref([]);
let currentPage = ref(1);

const handleCurrentChange = (value) => {
  currentPage.value = value;
  getProducts(currentPage.value)
    .then((res) => {
      products.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProductsViaCategory = (index) => {
  getProductsByCategory(pureCategory.value.data[index])
    .then((res) => {
      products.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
};

watch(searchResult, () => {
  products.value = searchResult.searchData;
});

onMounted(async () => {
  [categories.value, pureCategory.value] = await getCategories();
  products.value = await getProducts();
  console.log("pure", pureCategory.value.data);
});
</script>

<style lang="scss" scoped>
.slider-card {
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  transition: all 0.1s;
  font-weight: 600;
}
.slider-card:hover {
  background: #fbc100;
  border: 1px solid #fbc100;
  color: #000;
  font-weight: 600;
}
.product-card {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #eee;
  cursor: pointer;
  min-height: 350px;
  .img-wrap {
    overflow: hidden;
    img {
      transition: all 0.2s;
    }
  }
}
.product-card:hover {
  img {
    transform: scale(1.1);
  }
}
</style>
