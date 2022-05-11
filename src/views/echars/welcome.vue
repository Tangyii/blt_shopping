<template>
  <div class="back">
    <chart4
      :width="400"
      :height="220"
      :xAxisText="xAxisText1"
      :xFontColor="'#FFFFFF'"
      :digitalData="digitalData1"
    ></chart4>
  </div>
</template>

<script>
import chart4 from "@/components/chart4";
export default {
  components: {
    chart4,
  },
};
</script>
 
<style lang="scss" scoped>
</style>