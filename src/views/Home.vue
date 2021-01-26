<template>
  <div class="home">
    <fixed-header>
      <div class="header navbar shadow pt-6 pb-1 d-block">
        <h3>Đặt lịch hẹn</h3>
      </div>
    </fixed-header>

    <div class="container">
      <addressUser class="pt-5" />
      <date />
      <service />
      <staff />
      <infoUser />
    </div>
  </div>
</template>

<script>
import addressUser from "../components/Address-user";
import date from "../components/Date-time";
import service from "../components/Services";
import staff from "../components/Staff";
import infoUser from "../components/info-user";
import FixedHeader from "vue-fixed-header";
export default {
  name: "Home",
  components: {
    addressUser,
    date,
    service,
    staff,
    infoUser,
    FixedHeader,
  },
};
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}
.header {
  color: #e72870;
}
.header.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
}
.container {
  max-width: 700px !important;
}
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #e72870;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>