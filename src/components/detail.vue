<style  scoped  lang="scss">
  .detail {
    text-align: left;
    .goback  {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      color: rgb(35, 132, 232);
      background: #efefef;
      text-align: left;
      padding-left: 20px;
      margin-bottom:  10px;
    }
    .detail-body {
      padding: 10px;
      h2 { margin-bottom: 10px; }
      section { 
        margin: 10px auto;
        p {
          padding: 5px;
        }
        button {
            display: inline-block;
            border-radius: 3px;
            padding: 5px;
            margin-right: 10px;
            font-size: 15px;
            color: rgb(35, 132, 232);
            border: 1px solid rgb(35, 132, 232);
            text-align: center;
            background: #fff;
          }
      }
      .summary {
        margin: 30px auto 10px;
        h4 {
          padding: 8px 12px;
          text-align: justify;
        }
        p { text-indent: 20px; }
      }
    }
  }
</style>

<template>
<div class="detail">
  <a class="goback" @click="goBack">返回</a>
  <div class="detail-body" v-show="isShow">
    <h2>{{ movieDetail.title }} {{ movieDetail.year }}</h2>
    <img :src="movieDetail.images && movieDetail.images.large" :alt="movieDetail.title" :title="movieDetail.original_title">
    <section>
      <p>导演:&nbsp;&nbsp;<a v-for="(director, index) in movieDetail.directors" :href="director.alt">{{ director.name }} {{ index == (movieDetail.directors.length - 1) ? '' : '/' }}</a></p>
      <p>主演:&nbsp;&nbsp;<a v-for="(cast, index) in movieDetail.casts" :href="cast.alt">{{ cast.name }} {{ index == (movieDetail.casts.length - 1) ? '' : '/ ' }}</a></p>
      <p>类型:&nbsp;&nbsp;<span v-for="(genre, index) in movieDetail.genres">{{ genre }} {{ index == (movieDetail.genres.length - 1) ? '' : '/' }}</span></p>
    </section>
    <section>
      <button>想看{{ movieDetail.wish_count }}</button>
      <button>看过{{ movieDetail.collect_count }}</button>
    </section>
    <section class="summary">
      <h4>剧情介绍</h4>
      <p>{{ movieDetail.summary }}</p>  
    </section>
  </div>
  <loading :show="done"></loading>
</div>
</template>

<script>
  import loading from './loading.vue';
  export default {
    data() {
      return {
        done: false,
        isShow: false,
        movieDetail: {}
      }
    },
    components: {
      loading
    },
    mounted() {
      this.getMovieDetail();
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      getMovieDetail() {
        this.$data.done = true;
        let movieId = this.$route.params.id;
        let movieDetailUrl = `https://api.douban.com/v2/movie/subject/${movieId}`;
        this.$http.jsonp(movieDetailUrl).then(function(response) {
          this.done = false;
          this.isShow = true;
          this.movieDetail = response.body;
        }, function(response) {
          console.log('opps Is Error: ' + response);
          this.done = false;;
        })
      }
    }
  }
</script>