<template>
  <section>
        <div v-if="accessToken == null">
          <b-collapse
            v-if="checkHome == false && !phone_pickup"
            class="card"
            animation="slide"
            aria-id="Information"
            style="margin-top: 21px"
          >
            <div
              slot="trigger"
              slot-scope="props5"
              role="button"
              aria-controls="Information"
            >
              <div class="title_store">Thông tin người đặt</div>
              <a class="icon_card">
                <i v-if="props5.open" class="fas fa-angle-up"></i>
                <i v-else class="fas fa-angle-down"></i>
              </a>
            </div>
            <div class="content_formation">
              <b-field label="Họ và tên">
                <b-input
                  v-model="name_new"
                  placeholder="Nhập họ và tên người đặt"
                ></b-input>
              </b-field>
              <b-field label="Số điện thoại">
                <b-input
                  v-model="phone_new"
                  placeholder="Nhập số điện thoại người đặt"
                  @input="phoneValidator3"
                ></b-input>
              </b-field>
              <div v-if="checkPhone3 == true" style="margin-bottom: 10px">
                <span style="color: #ff0c00">{{ checkPhoneText3 }}</span>
              </div>
            </div>
          </b-collapse>
        </div>
        <div v-else>
          <b-collapse
            v-if="checkHome == false"
            class="card"
            animation="slide"
            aria-id="Information"
            style="margin-top: 21px"
          >
            <div
              slot="trigger"
              slot-scope="props6"
              role="button"
              aria-controls="Information"
            >
              <div class="title_store">Thông tin người đặt</div>
              <a class="icon_card">
                <i v-if="props6.open" class="fas fa-angle-up"></i>
                <i v-else class="fas fa-angle-down"></i>
              </a>
            </div>
            <div class="content_formation shipping">
              <div>
                <b-field label="Họ và tên">
                  <b-input
                    v-model="adress_add.name"
                    placeholder="Nhập họ và tên người đặt"
                    disabled
                  ></b-input>
                </b-field>
                <b-field label="Số điện thoại" v-if="adress_add.phoneNumber">
                  <b-input
                    :value="formatPhone(adress_add.phoneNumber)"
                    placeholder="Nhập số điện thoại người đặt"
                    disabled
                  ></b-input>
                </b-field>
              </div>
              <div class="add_new">
                <a href="javascript:void(0)" @click="showListAdress()">
                  <img :src="SvgRight" />
                </a>
              </div>
            </div>
          </b-collapse>
        </div>
         <div class="bottom_check">
          <b-checkbox type="is-danger" v-model="bottom_check">
            Tôi đồng ý nhận thông tin liên lạc từ bộ phận CSKH {{ shopname }}
          </b-checkbox>
        </div>

        

  </section>
</template>

<script>
export default {
name:"infoUser",
data() {
    return {
        shopname:"Suplo-booking",
         //----------------------Sổ địa chỉ------------------//
      accessToken: null,
      domain: null,
      listAdress: null,
      adress_add: "",
      activeItem: null,
      active__: 1,
      //
      bottom_check: false,
      //-------------------Làm việc tại nhà--------------------//
      checkHome: false,
      checkPhone1: false,
      checkPhoneText1: "",
      checkPhone2: false,
      checkPhoneText2: "",
      checkPhone3: false,
      checkPhoneText3: "",
       phone_pickup: "",
       //-------------------Thông tin đặt hàng-------------------//
      name_new: "",
      phone_new: "",
      note: null,
      lastName:null,
      review_note: "",
      windowWidth: 0,
      windowHeight: 0,
      //-----------------GIỏ hàng------------------------//
      cartToken: null,
      sum_price: 0,
      quantity: 0,
    }
},
methods: {
    phoneValidator1() {
      var phoneno = /^([0][1-9]\d+)$/g;
      if (this.phone_CreaterAdress && !phoneno.test(this.phone_CreaterAdress)) {
        this.checkPhone1 = true;
        this.checkPhoneText1 = "* Số điện thoại không hợp lệ";
      } else if (
        (this.phone_CreaterAdress && this.phone_CreaterAdress.length > 10) ||
        (this.phone_CreaterAdress && this.phone_CreaterAdress.length < 10)
      ) {
        this.checkPhone1 = true;
        this.checkPhoneText1 = "* Số điện thoại phải có 10 số";
      } else {
        this.checkPhone1 = false;
      }
    },
    phoneValidator3() {
      var phoneno = /^([0][1-9]\d+)$/g;
      if (!phoneno.test(this.phone_new)) {
        this.checkPhone3 = true;
        this.checkPhoneText3 = "* Số điện thoại không hợp lệ";
      } else if (this.phone_new.length > 10 || this.phone_new.length < 10) {
        this.checkPhone3 = true;
        this.checkPhoneText3 = "* Số điện thoại phải có 10 số";
      } else {
        this.checkPhone3 = false;
      }
    },
},
}
</script>

<style lang="scss">
.content_formation{
    label{
        text-align: left;
        padding-left: 10px;
    }
}
.bottom_check{
    float: left;
}
</style>