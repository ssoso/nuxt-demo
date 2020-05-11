<template>
    <div>
        <h2>#S3 upload Test</h2>
        <FileUploaderSample/>
    </div>
</template>

<script>
import FileUploaderSample from '@/components/sample/FileUploaderSample';

export default {
    components: {
      FileUploaderSample
    },
    data(){
        return{
            selectDate: '',
        }
    },
    
}
</script>
