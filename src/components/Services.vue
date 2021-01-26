<template>
  <section>
    <b-collapse
      class="card"
      animation="slide"
      aria-id="Service"
      style="margin-top: 21px"
    >
      <div
        slot="trigger"
        slot-scope="props2"
        role="button"
        aria-controls="Service"
      >
        <div class="title_store name_new">Dịch vụ</div>
        <a class="icon_card">
          <i v-if="props2.open" class="fas fa-angle-up"></i>
          <i v-else class="fas fa-angle-down"></i>
        </a>
      </div>
      <div
        v-if="listCart_new && listCart_new.length > 0"
        class="content_product"
      >
        <div
          v-for="items in listCart_new"
          v-bind:key="items.id"
          class="product-item"
        >
          <div class="product-img">
            <img :src="items.variant.product.images[0].source" />
          </div>
          <div class="name_service">
            <h3>{{ items.variant.product.name }}</h3>
            <span class="product-name">{{ items.variant.name }}</span>

            <div class="price-product">
              <span class="price_"
                >{{ formatPrice(items.variant.price) }} đ</span
              >
              <span
                class="compareAtPrice_"
                v-if="items.variant.compareAtPrice > 0"
                ><s>{{ formatPrice(items.variant.compareAtPrice) }} đ</s></span
              >
            </div>
          </div>
          <div class="delete_service">
            <a
              href="javascript:void(0)"
              @click="
                deleteCart2(items.variant.id, items, items.variant.product)
              "
              ><i class="fas fa-trash-alt"></i
            ></a>
          </div>
        </div>
      </div>
      <div
        v-else
        style="margin-bottom: 16px; color: #ec0626; font-size: 12px"
        class="text-left"
      >
        Giỏ hàng không được để trống
      </div>
      <div class="content_service">
        <div class="creat_service">
          <a href="javascript:void(0)" @click="addService = true "
            >+ Thêm dịch vụ</a
          >
          <b-modal :active.sync="addService" :full-screen="fullcreen">
            <div class="popup_new1">
              <div class="search_data">
                <a href="javascript:void(0)" @click="addService = false"
                  ><i class="fas fa-times"></i
                ></a>
                <input
                  class="form-control"
                  type="text"
                  v-model="searchQueryService"
                  placeholder=" Tìm kiếm dịch vụ"
                />
                <div>
                  <a
                    v-if="setgrid == false"
                    class="icon"
                    href="javascript:void(0)"
                    @click="activeGrid()"
                    ><i class="fas fa-th-large"></i
                  ></a>
                  <a
                    v-else
                    class="icon"
                    href="javascript:void(0)"
                    @click="activeGrid()"
                  >
                    <i class="fas fa-list"></i>
                  </a>
                </div>
              </div>
              <div class="popup_service">
                <div class="grid-uniform">
                  <div
                    v-for="product in listProductsService"
                    v-bind:key="product.id"
                    class="grid__item small--six-twelfths"
                    :class="{ grid_item_100: setgrid == true }"
                  >
                    <div class="product--loop">
                      <div
                        v-if="product.images && product.images.length > 0"
                        class="product-img"
                      >
                        <a
                          @click="getaProduct(product.id, product)"
                          href="javascript:void(0)"
                          ><img
                            v-if="product.images[0].source"
                            :src="product.images[0].source"
                          />
                          <img v-else :src="testPro.images[0].source" />
                        </a>
                      </div>

                      <div class="product-content">
                        <div class="product-price">
                          <a
                            href="javascript:void(0)"
                            @click="getaProduct(product.id, product)"
                          >
                            <h3 style="color: #393939">
                              {{ product.name }}
                            </h3>
                          </a>
                          <span class="ProductPrice"
                            >{{ formatPrice(product.maxPrice) }} đ</span
                          >
                          <span
                            v-if="product.compareAtMaxPrice > 0"
                            class="ComparePrice"
                            ><s
                              >{{ formatPrice(product.compareAtMaxPrice) }} đ</s
                            ></span
                          >
                        </div>

                        <div class="btn_service 4">
                          <button
                            v-if="
                              !product.hidden && product.variants.length < 2
                            "
                            @click="addCart(product.variants[0].id, product)"
                            class="btn_add"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                          <button
                            v-if="
                              !product.hidden && product.variants.length > 1
                            "
                            @click="showdetailProduct()"
                            v-on:click="getaProduct(product.id, product)"
                            class="btn_add"
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                          <button
                            v-if="product.hidden"
                            @click="deleteCart(product.variants[0].id, product)"
                            class="btn_remove"
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </div>
                      </div>

                      <div id="detailproduct_modal" class="modal">
                        <div class="modal-background"></div>
                        <div id="Product" class="snackbar">
                          <div class="search_data no-data">
                            <div>
                              <a
                                href="javascript:void(0)"
                                @click="closedetailProduct()"
                                ><i class="fas fa-times"></i
                              ></a>
                            </div>
                          </div>
                          <div v-if="DetailProduct" class="detail_product">
                            <div class="product__img">
                              <img :src="testPro.images[0].source" />
                            </div>
                            <div style="margin-left: 15px">
                              <div class="title_prd">
                                <h3>{{ DetailProduct.name }}</h3>
                              </div>
                              <div class="price_prd">
                                <span v-if="variantProduct" class="price_new"
                                  >{{
                                    formatPrice(variantProduct.price)
                                  }}
                                  đ</span
                                >
                                <span
                                  v-if="
                                    variantProduct &&
                                    variantProduct.compareAtPrice > 0
                                  "
                                  class="compare_price"
                                  ><s
                                    >{{
                                      formatPrice(variantProduct.compareAtPrice)
                                    }}
                                    đ</s
                                  ></span
                                >
                                <span
                                  v-if="
                                    variantProduct &&
                                    variantProduct.compareAtPrice > 0
                                  "
                                  class="sale"
                                  >-
                                  {{
                                    formatPrice(
                                      100 -
                                        (variantProduct.price /
                                          variantProduct.compareAtPrice) *
                                          100
                                    )
                                  }}
                                  %</span
                                >
                              </div>
                            </div>
                          </div>
                          <div v-if="DetailProduct" class="variant_product">
                            <div style="margin-bottom: 14px; margin-top: 14px">
                              <span style="font-weight: bold; font-size: 15px"
                                >Thời gian</span
                              >
                            </div>
                            <div
                              style="
                                margin-bottom: 10px;
                                padding-bottom: 18px;
                                border-bottom: 1px solid #f2f2f2;
                              "
                            >
                              <div
                                style="display: inline-block"
                                v-for="(variant, i) in DetailProduct.variants"
                                :key="variant.id"
                              >
                                <a
                                  class="variant_1"
                                  @click="selectVariant(variant, i)"
                                  href="javascript:void(0)"
                                  :class="{ active: i === activeVariant }"
                                >
                                  <label>
                                    {{ variant.name }}
                                  </label>
                                </a>
                              </div>
                            </div>
                            <div
                              v-if="DetailProduct.description"
                              class="des_product"
                            >
                              <b-collapse animation="slide" aria-id="Des_">
                                <div
                                  slot="trigger"
                                  slot-scope="props8"
                                  role="button"
                                  aria-controls="Des_"
                                >
                                  <div class="title_store">Mô tả</div>
                                  <a class="icon_card">
                                    <i
                                      v-if="props8.open"
                                      class="fas fa-angle-down"
                                    ></i>
                                    <i v-else class="fas fa-angle-up"></i>
                                  </a>
                                </div>
                                <div
                                  :inner-html.prop="
                                    DetailProduct.description
                                      | truncate(250, '...')
                                  "
                                ></div>
                                <div class="btn_">
                                  <a
                                    href="javascript:void(0)"
                                    @click="showaProduct = true"
                                  >
                                    Mô tả dịch vụ
                                  </a>
                                  <b-modal
                                    :active.sync="showaProduct"
                                    :full-screen="fullcreen"
                                  >
                                    <div class="search_data no-data">
                                      <a
                                        href="javascript:void(0)"
                                        @click="showaProduct = false"
                                        ><i class="fas fa-times"></i
                                      ></a>
                                      <h4>Mô tả dịch vụ</h4>
                                    </div>
                                    <div
                                      v-html="DetailProduct.description"
                                    ></div>
                                  </b-modal>
                                </div>
                              </b-collapse>
                            </div>
                          </div>
                          <div class="bottom_fixed_2">
                            <a
                              v-if="testPro && !testPro.hidden"
                              class="a1"
                              href="javascript:void(0)"
                              @click="
                                addCart1(variantProduct.id, testPro, checkI)
                              "
                              v-on:click="closedetailProduct()"
                              >Lựa chọn</a
                            >
                            <a
                              v-else
                              class="a2"
                              href="javascript:void(0)"
                              @click="
                                deleteCart1(variantProduct.id, testPro, checkI)
                              "
                              v-on:click="closedetailProduct()"
                              >Bỏ chọn</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom_fixed_1">
                <div class="btn_checkout_bottom">
                  <div class="quantity_bottom">
                    <span>{{ quantity }}</span>
                  </div>
                  <div class="btn_">
                    <button
                      @click="addListCart()"
                      v-on:click="addService = false"
                      class="btn_new 01"
                    >
                      Xác nhận
                    </button>
                  </div>
                  <div v-if="promotion_add.price" class="total_price">
                    {{ formatPrice(sum_price - promotion_add.price) }} đ
                  </div>
                  <div v-else class="total_price">
                    {{ formatPrice(sum_price) }} đ
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <div class="service_price">
          <p>
            Tạm tính: <span>{{ formatPrice(sum_price) }} đ</span>
          </p>
        </div>
      </div>
      <div class="address_btn_pickup" style="position: relative">
        <a
          style="color: #000 !important; font-weight: bold"
          href="javascript:void(0)"
          class="btn_adrress md-raised"
          @click="showPromotion()"
          >Khuyến mãi
          <span v-if="promotion_add" class="default">{{
            promotion_add.code
          }}</span>
        </a>
        <div class="field_new">
          <div v-if="promotion_add">
            <b-tag
              v-if="isTagActive"
              closable
              aria-close-label="Close tag"
              @close="deletePromotion()"
            >
              - {{ formatPrice(promotion_add.price) }}đ
            </b-tag>
          </div>
          <div v-else>
            <span
              @click="showPromotion()"
              style="color: #bdbdbd"
              v-if="!promotion_add"
              >Nhập mã khuyến mãi</span
            >
          </div>
          <img @click="showPromotion()" v-if="!promotion_add" :src="SvgRight" />
        </div>
        <div id="promotion_modal" class="modal">
          <div class="modal-background"></div>
          <div id="promotion" class="snackbar">
            <a
              class="close_promotion"
              href="javascript:void(0)"
              @click="ClosePromotion()"
              ><img style="margin-left: 15px; margin-top: 10px" :src="Close"
            /></a>
            <div class="search_data">
              <input
                class="form-control"
                type="text"
                v-model="Promotion_value"
                placeholder="Nhập mã khuyến mại"
              />
              <a
                style="
                  padding: 10px 20px;
                  white-space: nowrap;
                  background: #ccc;
                  font-weight: 300;
                  color: #666;
                  border-radius: 5px;
                "
                href="javascript:void(0)"
                @click="addPromotion()"
                v-on:click="ClosePromotion()"
                >Áp dụng
              </a>
            </div>
            <div class="promotion_content">
              <div
                class="store_render"
                v-for="promotion in listPromotion"
                v-bind:key="promotion.id"
              >
                <div
                  @click="addpromotion_(promotion)"
                  class="content_des"
                  style="display: flex; align-items: center; width: 100%"
                >
                  <div>
                    <a href="#">{{ promotion.code }}</a>
                  </div>
                  <div
                    style="
                      margin-left: 15px;
                      border-left: 1px dashed #ccc;
                      padding-left: 20px;
                    "
                  >
                    <h3 v-if="promotion">{{ promotion.name }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="address_btn">
        <h3>Hình thức thanh toán</h3>
        <a
          @click="showPayMethod()"
          href="javascript:void(0)"
          class="btn_adrress md-raised"
        >
          <div
            class="add_payMethod"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <span v-if="Pay_Method">{{ Pay_Method.name }}</span
            ><img :src="SvgRight" /></div
        ></a>
        <div id="payment_modal" class="modal">
          <div class="modal-background"></div>
          <div id="payment" class="snackbar">
            <div class="search_data no-data">
              <h4>Phương thức thanh toán</h4>
              <a href="javascript:void(0)" @click="ClosePayMethod()"
                ><i class="fas fa-times"></i
              ></a>
            </div>
            <div
              class="store_render"
              v-for="payment in payment_Method"
              v-bind:key="payment.id"
            >
              <span v-if="payment">
                {{ payment.name }}
              </span>
              <label class="container1">
                <input
                  type="radio"
                  v-model="Pay_Method"
                  name="pay_add"
                  :value="payment"
                  @click="ClosePayMethod()"
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="note_service">
        <b-field>
          <b-input
            :value="note"
            placeholder="Thêm ghi chú"
            type="search"
            icon-pack="fas"
            icon="pen"
          >
          </b-input>
        </b-field>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import SvgRight from "@/assets/chevron-right.svg";
import Close from "@/assets/x.svg";
import { HTTP } from "@/httpService/http-common";
export default {
  name: "service",
  data() {
    return {
      shopId: `f89c66c0-0c0e-492d-9667-aaa568e325fc`,
      //List dịch vụ
      listProducts: [],
      DetailProduct: null,
      DetailProduct1: null,
      detail_product: null,
      //
      addService: false,
      searchQueryService: null,
      setgrid: false,
      listProductsService: [],
      showaProduct: false,
      listCart_new: [],
      fullcreen: false,
      Close: Close,
      testPro: null,
      //-----------------GIỏ hàng------------------------//
      cartToken: null,
      sum_price: 0,
      quantity: 0,
      //-----------------Khuyến mãi----------------/
      promotion_add: "",
      Promotion_value: "",
      isTagActive: true,
      //img
      SvgRight: SvgRight,
      listPromotion: [
        {
          name: "Khuyến mãi 20% cho đơn hàng trên 100,000đ",
          price: 32000,
          code: "DHRK001",
          content: "Không áp dụng cùng chương trình 01",
        },
        {
          name: "Khuyến mãi 20% cho đơn hàng trên 100,000đ",
          price: 15000,
          code: "DHRK002",
          content: "Không áp dụng cùng chương trình 02",
        },
        {
          name: "Khuyến mãi 20% cho đơn hàng trên 100,000đ",
          price: 10000,
          code: "DHRK003",
          content: "Không áp dụng cùng chương trình 03",
        },
      ],
      //--------------Phương thức thanh toán---------------------//
      Pay_Method: "",
      payment_Method: [
        {
          name: "Thanh toán COD",
          price: 32000,
          code: "DHRK001",
          content: "Không áp dụng cùng chương trình 01",
        },
        {
          name: "Thanh toán qua Tk Ngân hàng",
          price: 15000,
          code: "DHRK002",
          content: "Không áp dụng cùng chương trình 01",
        },
        {
          name: "Thanh toán qua Ví MOMO",
          price: 50000,
          code: "DHRK002",
          content: "Không áp dụng cùng chương trình 01",
        },
      ],
      note: null,
    };
  },
  methods: {
    //List Dịch vụ//
    async getListProducts() {
      var shopId = `f89c66c0-0c0e-492d-9667-aaa568e325fc`;
      await HTTP.get("/services", {
        headers: {
          "X-Suplo-Shop-Id":shopId,
        },
      }).then((data) => {
        this.listProducts = data.data.services;
        console.log("listproduct :", this.listProducts);
      });
      return;
    },
    
    
    ///popup
    activeGrid() {
      this.setgrid = !this.setgrid;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showPayMethod() {
      var modal = (document.getElementById("payment_modal").style.display =
        "block");

      var payment = document.getElementById("payment");
      payment.classList.add("show");
      return modal;
    },
    addListCart() {
      this.listCart_new = this.listCart;
    },
    ClosePayMethod() {
      var modal = (document.getElementById("payment_modal").style.display =
        "none");
      var payment = document.getElementById("payment");
      payment.classList.remove("show");
      return modal;
    },
    showPromotion() {
      var modal = (document.getElementById("promotion_modal").style.display =
        "block");

      var promotion = document.getElementById("promotion");
      promotion.classList.add("show");
      return modal;
    },
    ClosePromotion() {
      var modal = (document.getElementById("promotion_modal").style.display =
        "none");
      var promotion = document.getElementById("promotion");
      promotion.classList.remove("show");
      return modal;
    },
    addPromotion() {
      this.Promotion_value = this.promotion_add.code;
    },
    deletePromotion() {
      this.promotion_add = "";
    },
    addpromotion_(value) {
      this.promotion_add = value;

      this.ClosePromotion();
    },
  },
   created() {
     this.getListProducts();
  },
};
</script>

<style lang="scss">
.address_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 16px;
    text-align: left;
    color: #4a4a4a;
  }
}
.store_render {
  span {
    text-align: left;
    display: flex;
  }
}
#Service {
  .creat_service {
    a {
      text-align: left;
      display: flex;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
