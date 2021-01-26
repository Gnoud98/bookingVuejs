<template>
  <section>
    <b-collapse
      id="modalview"
      class="card"
      animation="slide"
      aria-id="Store_Time"
      style="margin-top: 21px"
      ref="modalview"
    >
      <div
        slot="trigger"
        slot-scope="props1"
        role="button"
        aria-controls="Store_Time"
      >
        <div class="title_store name_new">Thời gian</div>
        <a class="icon_card">
          <i v-if="props1.open" class="fas fa-angle-up"></i>
          <i v-else class="fas fa-angle-down"></i>
        </a>
      </div>
      <div class="content_time">
        <div class="day_time">
          <div v-if="time.getDay() > 0" class="day_title">
            Thứ {{ time.getDay() + 1 }} ,
          </div>
          <div v-else class="day_title">C.Nhật ,</div>
          <b-datepicker
            v-model="time"
            placeholder="Chọn ngày"
            @input="getHouropen()"
            icon="calendar-today"
            :min-date="minDate"
            :mobile-native="false"
            :locale="currentLocale"
          >
          </b-datepicker>
        </div>
        <div class="sp_">
          <span>Vào lúc</span>
        </div>
        <div class="mobile_clock">
          <b-timepicker
            placeholder="Type or select a date..."
            icon="clock"
            v-model="day"
            v-on:input="getHouropen()"
            @input="getListStaff()"
            :min-time="minDate1"
            :mobile-native="false"
            :locale="currentLocale"
          >
          </b-timepicker>
        </div>
        <div class="desktop_clock">
          <b-clockpicker
            placeholder="Chọn giờ"
            hour-format="24"
            v-model="day"
            v-on:input="getHouropen()"
            :min-time="minDate1"
            @input="getListStaff()"
            :mobile-native="false"
            :locale="currentLocale"
          >
          </b-clockpicker>
        </div>
      </div>

      <div
        v-if="checkTime == true"
        style="margin-top: 10px; color: rgb(236, 6, 38); font-size: 12px"
      >
        <p>Thời gian không hợp lệ</p>
        <span>( Giờ mở cửa từ : {{ minTime }} đến : {{ maxTime }})</span>
      </div>

      <div
        v-if="textError == 'Thời gian đặt lịch không hợp lệ'"
        style="margin-top: 10px; color: rgb(236, 6, 38); font-size: 12px"
      >
        <p>Thời gian không hợp lệ</p>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import moment from "moment";
export default {
  name: "date",
  data() {
    const today = new Date();
    return {
      checkTime: false,

      //------------Time-----------------//
      time: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getUTCHours() + 1
      ),
      time2: new Date(),
      time_: null,
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      minDate1: new Date(),
      day: new Date(),
      minTime: new Date(),
      maxTime: new Date(),
      DateTime: null,
      openHour: null,
      currentLocale: "vi",
      //order
      textError: "",
    };
  },
  methods: {
    callDate(date, dateType) {
      const date1 = new Date(date);
      if (dateType === "fullDate") {
        return moment(date1).format("DD/MM/YYYY");
      } else if (dateType === "time") {
        return moment(date1).format("HH:mm");
      } else {
        return date1.getDay();
      }
    },
    getHouropen() {
      if (this.minDate1 && this.time.getDate() != this.minDate1.getDate()) {
        this.minDate1 = null;
      }
      for (var i = 0; i < this.profileImg.openingHours.length; i++) {
        if (this.profileImg.openingHours[i].weekday == this.time.getDay()) {
          this.minTime = this.profileImg.openingHours[i].openTime;
          this.minTime = this.minTime.slice(0, 5);

          this.maxTime = this.profileImg.openingHours[i].closeTime;

          this.maxTime = new Date(this.maxTime);
          console.log(this.callDate(this.maxTime, "time"));
          if (
            this.callDate(this.day, "time") > this.maxTime ||
            this.callDate(this.day, "time") < this.minTime
          ) {
            this.checkTime = true;
          } else {
            this.checkTime = false;
          }
        }
      }
    },
    addd() {
      const today = new Date();
      var b = this.day.toISOString();
      var convertdLocalTime = new Date(this.time);
      convertdLocalTime.setMinutes(
        this.time.getMinutes() - this.time.getTimezoneOffset()
      );
      var a = convertdLocalTime.toISOString();
      var c = a.slice(0, 10);
      var d = b.slice(10, 24);
      this.DateTime = c + d;
      return today;
    },
  },
};
</script>

<style lang="scss">
$primarycolor:#e72870;
.b-clockpicker-body {
  margin: auto;
}
.title_store {
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
}
.datepicker-header {
  .control {
    select:active,
    select:focus {
      border-color:$primarycolor !important;
      box-shadow: none !important;
    }
    .select:not(.is-multiple):not(.is-loading)::after {
      border-color:$primarycolor !important;
    }
  }
  .has-text-primary {
    color:$primarycolor !important;
  }
  .pagination-next:focus,
  .pagination-previous:focus {
    border-color:$primarycolor !important;
  }
}
.b-clockpicker.is-primary .b-clockpicker-face-number.active {
  background-color:$primarycolor !important;
}
.b-clockpicker.is-primary .b-clockpicker-face-hand {
  background-color:$primarycolor !important;
  border-color:$primarycolor !important;
}
.b-clockpicker.is-primary .b-clockpicker-face:after {
  background-color:$primarycolor !important;
}
.b-clockpicker-body .b-clockpicker-btn.active {
  background-color:$primarycolor !important;
}
</style>
