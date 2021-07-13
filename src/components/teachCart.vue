<template>
    <div class="teachCart" @click="toDetail(elem.teacher_id)">
        <img :src="elem.teacher_avatar" class="cart_img">
        <div class="right">
            <p class="teacher_name">{{elem.teacher_name}}</p>
            <p>{{elem.introduction}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['elem'],
        methods: {
            toDetail(id) {
                this.$emit('toDetail',id)
            }
        },
    }
</script>

<style lang="scss" scoped>
*{
    padding:0;
    margin: 0;
}
  .teachCart {
      background: #fff;
      padding: 25px 10px;
      margin-bottom: 6px;
      display: flex;
      img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
      }
      .right{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .teacher_name{
              font-size: 14px;
          }
      }
    }
</style>