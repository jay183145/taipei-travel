<template>
    <div class="spin"></div>
</template>

<script>
  export default {
    
  }
</script>

<style>
.spin {
  display: block;
  width: 60px;
  height: 60px;
  margin: 30px auto;
  border: 10px solid rgb(239, 239, 239);
  border-radius: 50%;
  border-top-color: #00ff4c;
  animation: spin 1.5s  infinite cubic-bezier(0.3,0.8,0.7,0.3);
}

@keyframes spin {
  0%{ transform:rotate(0deg); }
  100%{ transform:rotate(360deg); }
}
</style>