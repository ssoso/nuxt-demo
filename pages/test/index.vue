<template>
    <div>
        <h2>Test Page</h2>

        <h3>
            {{ $t('common_kotest') }}
        </h3>
        <div class='div-contents'>
            <ul v-for="item in items" :key="item.id">
                <li>NO : {{ item.id }}</li>
                <li>제목 : {{ item.title }}</li>
                <li>내용 : {{ item.body }}</li>
            </ul>
        </div>

        <br/>
        <div class='div-btn'>
            <nuxt-link to='/' class='button--grey'>index</nuxt-link>
        </div>

    </div>
</template>

<script>
import CommonApi from "@/api/common";
import PermissionApi from "@/api/permission";

export default {
    components: {
    },
    data(){
        return{
        }
    },
    // validate ({ params }) {
    //     // 숫자만 가능합니다.
    //     return /^\d+$/.test(params.id)
    // },
    // validate ({ params, store }) {
    //     // `params.id` 항목이 존재한다면 검사합니다.
    //     return store.state.categories.some(category => category.id === params.id)
    // }

    async asyncData () {
      //return CommonApi.test()
      return CommonApi.reqTest()
      .then((res) => {
        return { items: res }
      })
 
    
    },

  
    
}
</script>
