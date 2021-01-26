<template>
  <section>
      <b-collapse
          class="card"
          animation="slide"
          aria-id="Staff"
          style="margin-top: 21px"
        >
          <div
            slot="trigger"
            slot-scope="props4"
            role="button"
            aria-controls="Staff"
          >
            <div class="title_store">Nhân viên</div>
            <a class="icon_card">
              <i v-if="props4.open" class="fas fa-angle-up"></i>
              <i v-else class="fas fa-angle-down"></i>
            </a>
          </div>
          <carousel
            v-if="ListStaff && ListStaff.length > 0"
            :per-page="4"
            :has-drag="true"
          >
            <slide>
              <button
                class="content_staff"
                :class="{ active: active__ === 1 }"
                @click="setnostaff()"
              >
                <div class="staff_img">
                  <img src="../assets/user_6.png" />
                </div>
                <div class="check_active">
                  <img src="../assets/select-pro.png" />
                </div>
                <span class="name_staff">Tùy chọn</span>
              </button>
            </slide>
            <slide v-for="(staff, index) in ListStaff" v-bind:key="staff.id">
              <button
                @click="setActive(staff, index)"
                class="content_staff"
                :class="{
                  active:
                    activeIndex === index &&
                    staff.available == true &&
                    active__ == 0,
                }"
                :disabled="staff.available == false"
              >
                <div v-if="staff.photoUrl" class="staff_img">
                  <img :src="staff.photoUrl" />
                </div>

                <div v-else class="staff_img">
                  <img src="../assets/user_6.png" />
                </div>
                <div class="check_active">
                  <img src="../assets/select-pro.png" />
                </div>
                <span class="name_staff">{{ staff.name }}</span>
                <div v-if="staff.available == true" class="staff_available">
                  kín lịch
                </div>
              </button>
            </slide>
          </carousel>
          <div v-else>
            <span
              >Rất tiếc ko có nhân viên nào còn trống lịch vào giờ này! Bạn chọn
              lại thời gian hoặc chi nhánh khác nhé!</span
            >
          </div>
        </b-collapse>
        
  </section>
</template>

<script>
import { HTTP } from "@/httpService/http-common";
export default {
name:"staff",
data() {
    return {
         ListStaff:[],
    }
},
methods: {
     //Danh sách nhân viên
    async getListStaff(branchID) {
      await this.addd();
      await HTTP.get(
        "/branches/" +
        this.profileImg.id +
        "/staffs" +
        "?appointmentTime=" +
        this.DateTime
      ).then(data => {
        this.ListStaff = data.data.staffs;
        console.log("listStaff :",this.ListStaff)
      });
      return branchID;
    },
},
}
</script>

<style>

</style>