<template>
	<div>
    	<h1>{{ post.title  }}</h1>
      	<p v-html="post.content"></p>
    	<!-- <nuxt-link to="/CommonCalendar" /> -->
	</div>
</template>

<script>
export default {
    middleware: 'auth',
    level: 100,
    data(){
        return{
            id: this.$route.params.id,
            posts: [
              {
                id: '1', 
                title: 'test dinamic routes',
                content: 'test page content' 
              },
              {
                id: '2', 
                title: 'test2222',
                content: '내용22' 
              }
            ],
            
        }
    },
    computed: {
      post(){
        return this.posts.find(post=>post.id===this.id)
      }
    }
}
</script>
