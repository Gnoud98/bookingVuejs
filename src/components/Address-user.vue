<template>
  <section>
    <b-collapse
      class="card"
      animation="slide"
      aria-id="Store"
      style="margin-top: 21px"
    >
      <div
        slot="trigger"
        slot-scope="props"
        role="button"
        aria-controls="Store"
      >
        <a class="icon_card">
          <i v-if="props.open" class="fas fa-angle-up"></i>
          <i v-else class="fas fa-angle-down"></i>
        </a>
      </div>
      <div class="content_store">
        <div class="store_render1">
          <b-checkbox
            type="is-danger"
            v-model="checkHome"
            v-if="!accessToken"
            @click.native="getStore1()"
          >
            Tôi muốn làm dịch vụ tại nhà
          </b-checkbox>
          <b-checkbox
            class="abc"
            type="is-danger"
            v-model="checkHome"
            v-else
            @input="getStore()"
          >
            Tôi muốn làm dịch vụ tại nhà
          </b-checkbox>
          <div
            v-if="
              checkHome == true &&
              !accessToken &&
              !phone_pickup &&
              !name_pickup &&
              !address_pickup
            "
            class="add_service_home"
          >
            <button
              class="add_btn"
              @click="addAddress_shipping = true"
              v-on:click="getListCity()"
            >
              + Thêm địa chỉ làm dịch vụ
            </button>
          </div>
        </div>
        <div v-if="!accessToken">
          <div v-if="checkHome == true && phone_pickup" class="pickup_info">
            <div>
              <h3>Nhân viên đến địa chỉ:</h3>
              <span
                style="display: inline-block; font-weight: 500; font-size: 15px"
              >
                {{ name_pickup }}
              </span>
              <span class="sp2" style="padding: 0 3px">|</span>
              <span style="color: #333; font-weight: 500; font-size: 15px">{{
                phone_pickup
              }}</span>
              <span
                style="
                  display: block;
                  font-weight: 300;
                  font-size: 13px;
                  margin-top: 3px;
                "
                >{{ address_pickup }} , {{ district.name }},
                {{ city.name }}</span
              >
            </div>
            <a
              class="infoLocation_pickup"
              href="javascript:void(0)"
              v-on:click="addData()"
              @click="addAddress_shipping = true"
              >Thay đổi</a
            >
          </div>
        </div>
        <div v-else>
          <div v-if="checkHome == true" class="pickup_info">
            <div>
              <h3>Nhân viên đến địa chỉ:</h3>
              <span
                style="display: inline-block; font-weight: 500; font-size: 15px"
              >
                {{ adress_add.name }}
              </span>
              <span class="sp2">|</span>
              <span style="color: #333; font-weight: 500; font-size: 15px">{{
                formatPhone(adress_add.phoneNumber)
              }}</span>
              <span style="display: block; font-weight: 300; font-size: 13px"
                >{{ adress_add.address1 }} , {{ adress_add.district.name }},
                {{ adress_add.city.name }}</span
              >
            </div>
            <a
              class="infoLocation_pickup"
              href="javascript:void(0)"
              @click="showListAdress()"
              >Thay đổi</a
            >
          </div>
        </div>
        <div class="title_store">Cửa hàng</div>
        <div v-if="stores && stores.length > 0" class="store_select">
          <h4 class="store_name" v-if="profileImg">
            {{ profileImg.name }}
          </h4>
          <span class="city_des">{{ profileImg.address }}</span>
          <div class="btn_">
            <a
              title="chỉ đường"
              class="infoLocation"
              target="_blank"
              href="javascript:void(0)"
              @click="openMap(profileImg.address)"
            >
              Xem bản đồ
            </a>
            <a
              class="infoLocation"
              href="javascript:void(0)"
              @click="showStore()"
              >Thay đổi</a
            >
            <div id="store_modal" class="modal">
              <div class="modal-background"></div>
              <div id="store" class="snackbar">
                <div class="search_data">
                  <a href="javascript:void(0)" @click="CloseStore()"
                    ><i class="fas fa-times"></i
                  ></a>
                  <input
                    class="form-control"
                    type="text"
                    v-model="searchQuery"
                    placeholder=" Tìm kiếm cửa hàng"
                  />
                </div>
                <div v-if="stores != ''" class="popup_store">
                  <div
                    class="store_render"
                    v-for="store in listStore"
                    v-bind:key="store.id"
                  >
                    <h3 v-if="store" style="display: block">
                      {{ store.name }}
                    </h3>
                    <span
                      class="sp1"
                      style="display: block; color: #333; font-weight: 300"
                      >{{ store.address }}</span
                    >

                    <label class="container1">
                      <input
                        type="radio"
                        v-model="profileImg"
                        name="profileImg"
                        :value="store"
                        @change="getListStaff(profileImg.id)"
                        @click="CloseStore()"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                </div>
                <div v-else>
                  <h3 style="text-align: center">
                    Xin lỗi khu vực của bạn hiện không có cửa hàng nào
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="store_select">
          <span>{{ textStore }}</span>
        </div>
      </div>
    </b-collapse>
    <div class="content_add">
      <b-modal :active.sync="addAddress_shipping" :full-screen="fullcreen">
        <div class="content_address">
          <div class="search_data no-data">
            <a href="javascript:void(0)" @click="addAddress_shipping = false"
              ><i class="fas fa-times"></i
            ></a>
            <h4>Thêm địa chỉ</h4>
          </div>
          <b-field label="Họ và tên">
            <b-input
              v-model="name_pickup1"
              placeholder="Nhập họ và tên người đặt"
            ></b-input>
          </b-field>
          <b-field label="Số điện thoại">
            <b-input
              v-model="phone_pickup1"
              @input="phoneValidator"
              placeholder="Nhập số điện thoại người đặt"
            ></b-input>
          </b-field>
          <div
            v-if="checkPhone == true"
            style="margin-bottom: 10px"
            class="text-left"
          >
            <span style="color: #ff0c00">{{ checkPhoneText }}</span>
          </div>
          <div class="select_city">
            <label class="btn_adrress"> Tỉnh / Thành phố </label>
            <select
              class="eda-form-input"
              v-model="city"
              @change="getdistrict(city.id)"
            >
              <option disabled value="">Lựa chọn</option>
              <option v-for="city in listCity" :value="city" :key="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
          <div class="select_city">
            <label class="btn_adrress"> Quận / Huyện </label>
            <select class="eda-form-input" v-model="district">
              <option disabled value="">Lựa chọn</option>
              <option
                v-for="district in listDistricts"
                :value="district"
                :key="district.id"
              >
                {{ district.name }}
              </option>
            </select>
          </div>
          <b-field label="Địa chỉ">
            <b-input
              v-model="address_pickup1"
              placeholder="Nhập địa chỉ của bạn"
            ></b-input>
          </b-field>
          <div
            v-if="
              checkPhone == false &&
              name_pickup1 != '' &&
              city &&
              district &&
              address_pickup1
            "
            class="bottom_fixed_4"
            @click="CloseStore1()"
            v-on:click="addAddress_shipping = false"
          >
            <a href="javascript:void(0)">Lưu</a>
          </div>

          <div v-else class="disibale_pickup">
            <a href="javascript:void(0)">Lưu</a>
          </div>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { HTTP } from "@/httpService/http-common";
export default {
  data() {
    return {
      isOpen: false,
      titleAtHome: "Tôi muốn làm dịch vụ tại nhà",
      //-------------------Làm việc tại nhà--------------------//
      checkHome: false,
      phone_pickup: "",
      district: "",
      city: "",
      district_new: "",
      city_new: "",
      address_pickup: "",
      name_pickup: "",
      phone_pickup1: "",
      address_pickup1: "",
      name_pickup1: "",
      address_CreaterAdress: "",
      name_CreaterAdress: "",
      phone_CreaterAdress: "",
      listCity: [],
      listDistricts: [],
      listCity_new: null,
      listDistricts_new: null,
      searchQuery: null,
      fullcreen: false,
      //------------------validatePhone--------------//
      checkTime: false,
      checkPhone: false,
      checkPhoneText: "",
      ListStaff:[],     
       //----------------------Sổ địa chỉ------------------//
      accessToken: null,
      //-----------------popup-----------------//
      addAddress_shipping: false,

      ////-----------Hệ thống cửa hàng--------------//
      stores: [
        {
          id:1,
          name:"HÀ Nội",
          address:"HÀ Nội",
        }
      ],
      listStore: [],
      profileImg: "",
      profileImg1: "",
      textStore: "Chưa có cửa hàng nào được chọn",
      shopId: `f89c66c0-0c0e-492d-9667-aaa568e325fc`,
    };
  },
  async mounted() {
    axios
      .get(`https://stag.api.be.suplo.vn/v1/branches?shop=${this.shopId}`)
      .then((res) => {
        console.log(res);
        this.listStore = res.data.branches;
        //this.stores=this.listStore[0];
        console.warn("branchess:", this.listStore);        
        //this.stores = this.listStore.map((store, index, stores) => {
        //return store[0]
        //console.log("store :", stores);
//})
      });
  },
  //created() {
    //this.getStore();
    //this.getListProducts();
    //this.addPayMethod();
   // this.getlistAddres();
    //this.listOrder();
 // },
  methods: {
    addData() {
      this.name_pickup1 = this.name_pickup;
      this.phone_pickup1 = this.phone_pickup;
      this.address_pickup1 = this.address_pickup;
    },
 showStore() {
      var x = (document.getElementById("store_modal").style.display = "block");

      var y = document.getElementById("store");
      y.classList.add("show");
      return x
    },
     CloseStore() {
      var x = (document.getElementById("store_modal").style.display = "none");
      var y = document.getElementById("store");
      y.classList.remove("show");
      return x
    },
      openMap(href) {
      window.open("https://www.google.com/maps/dir//" + href, "_blank");
    },
     CloseStore1() {
      this.name_pickup = this.name_pickup1;
      this.phone_pickup = this.phone_pickup1;
      this.address_pickup = this.address_pickup1;
      this.getStore()
    },
    //-------------------------vali Phone---------------------//
    phoneValidator() {
      var phoneno = /^([0][1-9]\d+)$/g;
      if (this.phone_pickup1 && !phoneno.test(this.phone_pickup1)) {
        this.checkPhone = true;
        this.checkPhoneText = "* Số điện thoại không hợp lệ";
      } else if (
        (this.phone_pickup1 && this.phone_pickup1.length > 10) ||
        (this.phone_pickup1 && this.phone_pickup1.length < 10)
      ) {
        this.checkPhone = true;
        this.checkPhoneText = "* Số điện thoại phải có 10 số";
      } else {
        this.checkPhone = false;
      }
    },
  
    //---------------Danh sách cửa hàng--------------------//

    async getStore1() {
      this.city = "";
      this.district = "";
      this.name_pickup = "";
      this.phone_pickup = "";
      this.address_pickup = "";
      await this.getStore();
    },
     async getStore() {
      var searchParams3 = new URLSearchParams(window.location.search);
      var shopId = searchParams3.get(`${shopId}`);
      //console.log(this.city.id)
      if (this.checkHome == true && this.city.id && this.district && !this.accessToken) {
        await HTTP.get("/branches" + "?shop=" + `${shopId}` + "&cityId=" + this.city.id).then(data => {
          this.stores = data.data.branches;
          console.log("store :",this.stores)
          if (this.stores.length > 0) {
            this.profileImg = data.data.branches[0];
            this.getHouropen();
            console.log('profile:',this.profileImg)
            this.getListStaff(this.profileImg.id);
          }
        });
        return;
      } else if (this.checkHome == true && this.accessToken && this.adress_add.city.id) {
        //console.log(this.adress_add.city.name)
        await HTTP.get("/branches" + "?shop=" + `${shopId}` + "&cityId=" + this.adress_add.city.id).then(data => {
          this.stores = data.data.branches;
          if (this.stores.length > 0) {
            this.profileImg = data.data.branches[0];
            console.log(this.profileImg)
            this.getHouropen();
            this.getListStaff(this.profileImg.id);
          }
        });
        return;
      } else {
        await HTTP.get("/branches" + "?shop=" + shopId).then(data => {
          this.stores = data.data.branches;
          console.log(this.stores)
          if (this.stores.length > 0) {
            this.profileImg = data.data.branches[0];
            console.log(this.profileImg)
            this.getHouropen();
            this.getListStaff(this.profileImg.id);
          }
        });
        return;
      }

    },
    //---Danh sách thành phố---///
    async getListCity() {
      await HTTP.get("/cities").then((data) => {
        this.listCity = data.data.cities;
      });
      return;
    },
    async getdistrict() {
      await HTTP.get("/cities/" + this.city.id + "/districts").then((data) => {
        this.listDistricts = data.data.districts;
      });
      return;
    },

  },
  name: "addressUser",
};
</script>
<style lang="scss">
$primarycolor: #e72870;
.collapse {
  display: block !important;
  position: relative;
  overflow: unset !important;
  .card-header {
    padding: 20px;
  }

  .store_render1 {
    position: relative;
    padding-top: 16px;
    padding-bottom: 5px;
    .b-checkbox.checkbox:not(.button) {
      margin-right: 0.5em;
      display: flex;
      padding-left: 10px;
    }
  }
  .icon_card {
    position: absolute;
    top: -10px;
    right: 8px;
    width: 20px;
    height: 20px;
    color: #fff;
    background: $primarycolor;
    border-radius: 50%;
  }
  .add_service_home button {
    width: 100%;
    border: 1px solid #bdbdbd;
    border-radius: 61px;
    font-weight: 300;
    font-size: 15px;
    text-align: center;
    background: #fff;
    letter-spacing: 0.05em;
    padding: 8px 0;
    color: #4f4f4f;
    &:focus {
      outline: none;
    }
    &:hover {
      color: $primarycolor;
      transition: 0.3s;
      border: 1px solid $primarycolor;
    }
  }
}
.modal-content {
  max-width: 700px !important;
  .content_address {
    margin: 25px 0;
    .fas.fa-times {
      position: absolute;
      top: -30px;
      right: 0;
      font-size: 20px;
    }
    label {
      text-align: left;
      padding-left: 10px;
    }
    .control {
      margin: 0 10px;
      input:active,
      input:focus {
        border-color: $primarycolor !important;
        box-shadow: none;
      }
    }
    .select_city {
      margin-bottom: 20px;
      label {
        display: block;
        margin-bottom: 0.5em;
        font-weight: bold;
        font-size: 15px;
      }
      select {
        width: 97%;
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
        border-radius: 8px;
        outline: none;
        padding: 10px;
        -webkit-appearance: menulist;
        padding-right: 0;
        background: #fff;
      }
    }
    .bottom_fixed_4 {
      a {
        opacity: 1;
        color: #fff !important;
        text-decoration: none;
      }
    }
    .disibale_pickup {
      background: $primarycolor;
      padding: 10px 15px;
      border-radius: 10px;
      a {
        opacity: 0.5;
        color: #fff !important;
        text-decoration: none;
      }
    }
  }
}
.content_store {
  .title_store {
    border-top: 1px solid #e7e7e7;
    padding-top: 16px;
    text-align: left;
    padding-left: 10px;
    padding: 16px 10px 0 10px;
    font-weight: 550;
  }
  .store_select {
    font-size: 16px;
    text-align: left;
    padding: 0 10px;
    .btn_ {
      display: flex;
      justify-content: space-between;
      a {
        color: $primarycolor;
        text-decoration: none;
      }
    }
  }
}
</style>
