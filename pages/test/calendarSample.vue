<template>
    <div>
        <h2>#Calendar Test</h2>
        <common-calendar
          id="selectDate"
          :placeholder="'date click'"
          :value.sync="selectDate"
	    />
        <!-- 오늘 날짜 이전 선택 :maxDate="new Date()" -->
    </div>
</template>

<script>
import CommonCalendar from '@/components/common/Calendar';

export default {
    components: {
      CommonCalendar,
    },
    data(){
        return{
            selectDate: '',
        }
    },
    
}
</script>
