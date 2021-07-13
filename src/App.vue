<template>
  <div id="app">
     <router-view />
    <div
      class="floatball iconfont icon-xinfeng"
      id="floatball"
      @mousedown.stop="down"
      @touchstart.stop="down"
      @mousemove.stop="move"
      @touchmove.stop="move"
      :style="{top:position.y+'px', left:position.x+'px'}"
    ></div>
  </div>
</template>

<script>
var dx, dy;
var screenWidth = window.screen.width - 60;
var screenHeight = window.screen.height - 60;
export default {
  data() {
    return {
      flags: false,
      position: {
        x: 300,
        y: 500,
      },
    };
  },
  methods: {
    // 实现移动端拖拽
    down(event) {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      dx = touch.clientX - event.target.offsetLeft;
      dy = touch.clientY - event.target.offsetTop;
    },
    move(event) {
      event.preventDefault()
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        // 定位滑块的位置
        this.position.x = touch.clientX - dx;
        this.position.y = touch.clientY - dy;
        // // 限制滑块超出页面
        if (this.position.x < 0) {
          this.position.x = 0;
        } else if (this.position.x > screenWidth) {
          this.position.x = screenWidth
        }
        if (this.position.y <0) {
          this.position.y = 0;
        } else if (this.position.y > screenHeight) {
          this.position.y = screenHeight
        }
      }
    },
    //鼠标释放时候的函数
    // end() {
    //   this.flags = false;
    // },
  },
};
</script>

<style lang="scss">
#app,
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
}
.floatball {
  color: white;
  height: 50px;
  width: 50px;
  padding: 5px;
  z-index: 999;
  position: fixed;
  border-radius: 50%;
  background-color: rgb(29, 157, 237);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 580;
  color: #fff;
  margin-bottom: 50px;
}
</style>
