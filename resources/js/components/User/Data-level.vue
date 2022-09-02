<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Data Level yang ada</div>
                    <div class="card-body">
                        <div class="table table-responsive">
                            <table class="table">
                                <tr>
                                    <th>Nama Level</th>
                                    <th>Aksi</th>
                                </tr>
                                <tr v-for="item in levels" :key="item.message">
                                    <td> {{item.namalevel}}</td>
                                    <td>Edit | Hapus</td>
                                </tr>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                levels : {}
            };
        },
        methods:{
            loadData(){
                axios.get('api/ambildatalevel').then(({data}) => (this.levels= data));
            }
        },
        created(){
            this.loadData();
        }
        
    }
</script>
