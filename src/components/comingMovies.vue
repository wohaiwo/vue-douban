<template>
    <div>
        <v-header></v-header>
        <movie-list :message="movieListTitle" :items="movieListData"></movie-list>
        <loading :show="done"></loading>
    </div>
</template>

<script>
    import vHeader from './header.vue';
    import movieList from './movieListTpl.vue';
    import loading from './loading.vue'; 
      
    export default {
      data() {
        return {
            done: false,
            movieListData: [],
            movieListTitle: ''
        }
      },
      components: {
        vHeader, movieList, loading
      },
      mounted() {
        // 页面初始化时加载数据
        this.getHotMovieData();
      },
      methods: {
        getHotMovieData() {
            this.done = true;
            let hotMovieUrl = 'https://api.douban.com/v2/movie/coming_soon';
            this.$http.jsonp(hotMovieUrl).then(function(response) {
                this.$data.movieListTitle = response.data.title;
                this.$data.movieListData = response.data.subjects;
                this.$data.done = false;
            }, function(response) {
                console.log('Opps Is Error: ' + response);
                this.$data.done = false;
            })
        }
      }
    }
  </script>