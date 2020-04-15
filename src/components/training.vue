<template lang="html">
  <div class="storePage">

    <div class="top" v-if="index <= 2">
			<label class="navBtn" @click="onClickTab(1)" v-bind:class="{active : index === 1}">Courses</label>
      <label class="navBtn" @click="onClickTab(2)" v-bind:class="{active : index === 2}">Media</label>
    </div>


    <div class="storeContent">
      <courses v-if="index ===1" @showCourseDetail="showCourseDetail" @hideCourseDetail="index = 1"/>
      <trainingMedia v-if="index === 2" />
      <courseDetail v-if="index === 3" :courseId="courseId" @onMembershipClick="onMembershipClick" @hideCourseDetail="hideCourseDetail"/>
      <membershipDetail v-if="index === 4" :membershipId="membershipId" @hideMembershipDetails="hideMembershipDetails"/>
    </div>



  </div>
</template>

<script>

import Courses from "./courses.vue";
import TrainingMedia from "./trainingMedia.vue";
import CourseDetail from "./courseDetail.vue";
import MembershipDetail from "./membershipDetail.vue";

  export default {
		name : 'training',
		components: {
      Courses,
      TrainingMedia,
      CourseDetail,
      MembershipDetail
	 },
		props: {},
	 data() {
		 return {
       index : 1,
       courseId: -1,
       membershipId :-1
		 };
	 },
		methods:{
      hideMembershipDetails(){
        this.showCourseDetail(this.courseId)
        console.log("hideMembershipDetails");
      },
      hideCourseDetail(){
        this.index = 1
        this.$router.push('home?lv1Tab=training&lv2Tab=courses');
        console.log("hideCourseDetail");
      },
      onClickTab(index){
        if (index ===1) {
          this.$router.push('home?lv1Tab=training&lv2Tab=courses');
        }else{
          this.$router.push('home?lv1Tab=training&lv2Tab=media');
        }
        this.index = index;
        console.log("onClickTab");
      },
      showCourseDetail(id){
        this.$router.push('home?lv1Tab=training&lv2Tab=courses&lv3Tab=course?id=' + id);
        console.log("showCourseDetail = " , id);
        this.courseId = id ;
        this.index = 3;
        console.log("showCourseDetail");
      },
      onMembershipClick(id){
        this.$router.push('home?lv1Tab=training&lv2Tab=courses&lv3Tab=course?id=' + this.courseId + "&lv4Tab=membership?id=" + id);
        console.log("onMembershipClick = " , id);
        this.membershipId = id ;
        this.index = 4;
        console.log("onMembershipClick");
      }

    },
    mounted() {
      console.log("membership mounted");
      const ctx = this;
      const params = new URLSearchParams(window.location.search);
      const lv2Tab = params.get('lv2Tab') || null;
      if (lv2Tab === null) {
        ctx.index = 1;
        return
      }
      if (lv2Tab === "courses") {
        ctx.index = 1;
        const lv3Raw = params.get('lv3Tab');
        const lv3Tab = lv3Raw.substring(0 , lv3Raw.indexOf('?')) || null;
        if (lv3Tab === 'course') {
          const lv4TabRaw = params.get('lv4Tab') || null;
          var courseId = lv3Raw.substring(lv3Raw.indexOf("=") + 1 , lv3Raw.length)
          ctx.courseId = courseId;
          if (lv4TabRaw === null) {
            ctx.showCourseDetail(courseId)
              return;
          }
          const lv4Tab = lv4TabRaw.substring(0 , lv4TabRaw.indexOf('?')) || null;
          if (lv4Tab === 'membership') {
            var membershipId = lv4TabRaw.substring(lv4TabRaw.indexOf("=") + 1 , lv4TabRaw.length)
            ctx.membershipId = membershipId;
            ctx.onMembershipClick(membershipId)
          }else{

          }
        }
      }else if (lv2Tab === "media") {
        ctx.index = 2;
      }

    }
  }
</script>

<style lang="css">

.storePage{
	width: 100%;
	height: 100%;
}

.storePage .top{
	width: 100%;
	height: 50px;
	display: inline-block;
}

.storePage .top .navBtn{
	width: auto;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	color: white;
	padding-left: 10px;
	padding-right: 10px;
	float: left;
}

.storePage .top .active{
	border-bottom: 1px solid #4E08F0;
	font-family: 'Bold'
}

.storePage .storeContent{
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
  float: left;
}


</style>
