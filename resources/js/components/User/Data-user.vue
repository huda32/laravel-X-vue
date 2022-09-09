<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data User</h3>
                        <div class="card-tools">
                            <button type="button" @click="showModal" class="btn btn-success">Tambah User</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table table-responsive">
                            <table class="table">
                                <tr>
                                    <th>Nama Pengguna</th>
                                    <th>Level</th>
                                    <th>Email</th>
                                    <th>Aksi</th>
                                </tr>
                                <tr v-for="item in users" :key="item.id">
                                    <td> {{item.name}}</td>
                                    <td> {{item.level_id}}</td>
                                    <td> {{item.email}}</td>
                                    <td>Edit | Hapus</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <!-- Modal -->
         <div class="modal fade" id="modalMuncul" tabindex="-1" role="dialog" aria-labelledby="modalMuncul" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Tambah Penggna</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="simpanData()">
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="text" v-model="form.name" class="form-control" placeholder="Nama Pengguna">
                        </div>
                        <div class="form-group">
                        <select class="form-control select2" v-model="form.level_id">
                            <option value >Pilih Level</option>
                            <option v-for="item in levels" :key="item.id" :value="item.id">{{item.namalevel}}</option>
                        </select>
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="form.email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="form.password" class="form-control" placeholder="Password">
                        </div>
                    </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Simpan</button>
                </div>
            </form>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                levels: {},
                users:{},
                form: new Form({
                    id:"",
                    name:"",
                    level_id:"",
                    email:"",
                   password:""

                })
            };
        },
        methods:{
            showModal(){
                this.form.reset();
                $("#modalMuncul").modal("show");
            },
            loadData(){
                axios.get('api/ambildatalevel').then(({data}) => (this.levels= data));
                axios.get('api/ambildatauser').then(({data}) => (this.users= data));
            },
            simpanData(){
                this.form.post('api/create_user').then(() =>{
                    $("#modalMuncul").modal("hide");
                })
                .catch();
            }
        },
        created(){
            this.loadData();
        }
    }
</script>
