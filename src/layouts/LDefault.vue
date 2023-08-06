<template>
  <div class="container">
    <div class="header">
      <div class="top-part flex items-center justify-between">
        <div class="log">
          <img
            src="https://texnomart.uz/_nuxt/img/texnomart-logo.fcda25c.svg"
            alt=""
          />
        </div>
        <div class="search-input-wrap">
          <input
            @input="searchData"
            placeholder="Search product..."
            type="text"
          />
          <el-icon class="search-icon"><Search /></el-icon>
        </div>
        <div class="header-icons flex items-center gap-2">
          <!-- <router-link :to="{ name: 'wishlist' }"> -->
          <div class="icon">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
          <!-- </router-link> -->
          <div class="icon">
            <ion-icon name="person-outline"></ion-icon>
          </div>
          <div class="icon">
            <ion-icon name="basket-outline"></ion-icon>
          </div>
          <router-link v-if="!token" to="/login">
            <button class="bg-amber-500 text-white px-3 py-1 rounded-lg">
              Kirish
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="my-3">
      <swiper
        :autoplay="true"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide>
          <img src="../assets/images/adv1.webp" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/adv2.webp" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/adv3.webp" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "../style.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useSearchResult } from "../stores/index";

const modules = [Navigation, Pagination, Autoplay];
const searchResult = useSearchResult();
const timeout = ref();
const token = localStorage.getItem("token");

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

const searchData = async (e) => {
  if (timeout.value !== undefined) {
    clearTimeout(timeout.value);
  }

  setTimeout(async () => {
    const response = await axios
      .get(`https://dummyjson.com/products/search?q=${e.target.value}`)
      .catch((err) => {
        console.log(err);
      });

    searchResult.searchData = response.data;
  }, 750);
};

onMounted(() => {
  let id = localStorage.getItem("ID");
  axios
    .get(`https://dummyjson.com/users/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
    });
});

const categories = ref([]);
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  .top-part {
    padding: 30px 0 22px;
    .search-input-wrap {
      position: relative;
      display: block;
      width: 444px;
      padding: 7px 35px 8px 15px;
      border: 1px solid #f2f2f2;
      height: 42px;
      background: #f2f2f2;
      border-radius: 25px;
      input {
        background: #f2f2f2;
        width: 100%;
        font-size: 13px;
        color: #000000;
        letter-spacing: 0.4px;
        outline: none;
      }
      .search-icon {
        position: absolute;
        right: 20px;
        top: 11px;
      }
    }
    .icon {
      transition: all 0.3s;
      padding: 3px 6px;
      font-size: 22px;
      height: 36px;
    }
    .icon:hover {
      background: #cecece;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
.navbar {
  position: relative;
  .menu-list {
    position: sticky;
    bottom: 100px;
    &_item {
      list-style-type: none;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
      margin: 0 15px;
      transition: all 0.2s;
      cursor: pointer;
      display: inline-block;
      a {
        text-decoration: none;
        color: #222;
      }
    }
    &_item::after {
      display: block;
      margin-top: 10px;
      border-bottom: 2px solid transparent;
      content: "";
      transform: scaleX(0);
      transition: transform 400ms ease-in-out;
      bottom: 10px;
    }
    &_item:hover {
      a {
        color: #a4bebf;
      }
    }
    &_item:hover::after {
      transform: scaleX(1);
      border-bottom: 2px solid #a4bebf;
    }
    .router-link-exact-active {
      color: #a4bebf !important;
      padding-bottom: 10px;
      border-bottom: 2px solid #a4bebf;
    }
  }
}
</style>
