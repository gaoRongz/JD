<template>
  <aside>
    <div class="menu-left scrollbar-none" id="sidebar">
      <div style="position:relative;height:100%;width: 8.6rem;">
        <ul style="position: absolute;margin-top: 1.5rem" class="sliderul">
          <li v-for="(is,ts) in items[0].List">{{is.title}}</li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
  import products from "../../apis/data-Apis"
    export default {
      name: "shopList",
      props:["items"]
    }
</script>

<style scoped>

</style>
