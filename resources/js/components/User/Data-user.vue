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
                                    <td><a href="#" @click="showModalEdit(item)"> <i class="fas fa-edit blue"></i> </a>
                                        | <a href="#" @click="hapusData(item.id)"> <i class="fas fa-trash-alt red"></i> </a> 
                                    </td>
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
                    <h5 class="modal-title" id="exampleModalLongTitle" v-show="!statusModal">Tambah Pengguna</h5>
                    <h5 class="modal-title" id="exampleModalLongTitle" v-show="statusModal">Ubah User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="statusModal ? ubahData() : simpanData()">
                    <!-- jika ? maka false jika : maka true -->
                    <div class="modal-body">
                        <div class="form-group">
                            <input type="text" v-model="form.name" class="form-control" placeholder="Nama Pengguna"
                            :class="{ 'is-invalid' : form.errors.has('name')}" />
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                        <select class="form-control select2" v-model="form.level_id" 
                            :class="{ 'is-invalid' : form.errors.has('level_id') }" >
                            <option value >Pilih Level</option>
                            <option v-for="item in levels" :key="item.id" :value="item.id">{{item.namalevel}}</option>
                        </select>
                        <has-error :form="form" field="level_id"></has-error>
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="form.email" class="form-control" placeholder="Email"
                            :class="{ 'is-invalid' : form.errors.has('email')}"/>
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="form.password" class="form-control" placeholder="Password"
                            :class="{ 'is-invalid' : form.errors.has('password')}"/>
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button 
                        type="submit" 
                        class="btn btn-primary" 
                        :disabled="disable" v-show="!statusModal">
                        <i v-show="loading" class="fa fa-spinner fa-spin"></i> Simpan</button>

                        <button 
                        type="submit" 
                        class="btn btn-success" 
                        :disabled="disable" v-show="statusModal">
                        <i v-show="loading" class="fa fa-spinner fa-spin"></i> Simpan</button>
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
                    loading:false,
                    disable:false,
                levels: {},
                users:{},
                //untuk mendeteksi modal yang digunakan
                statusModal:false,
                form: new Form({
                    id:"",
                    name:"",
                    level_id:"",
                    email:"",
                   password:""

                })
            };
        },
        //jika akan membuat fungsi baru harus di dalam methods
        methods:{
            showModal(){
                this.statusModal = false;
                this.form.reset();//mengkosongkan modal ketika modal akan ditampilan
                $("#modalMuncul").modal("show");
            },
            showModalEdit(item){
                this.statusModal = true;
                this.form.reset();//mengkosongkan modal ketika modal akan ditampilan
                $("#modalMuncul").modal("show");
                this.form.fill(item);
            },
            loadData(){
                this.$Progress.start();
                axios.get('api/ambildatalevel').then(({data}) => (this.levels= data));
                axios.get('api/ambildatauser').then(({data}) => (this.users= data));
                this.$Progress.finish();
            },
            simpanData(){
                this.$Progress.start();
                    this.loading = true;
                    this.disable = true;
                this.form
                    .post('api/create_user').then(() =>{
                    Fire.$emit("refreshData");
                    $("#modalMuncul").modal("hide");
                    Toast.fire({
                    icon: 'success',
                    title: 'Data Sukses Terinput'
                });
                this.$Progress.start();
                    this.loading = false;
                    this.disable = false;

                })
                .catch(() =>{
                    this.$Progress.fail();
                    this.loading = false;
                    this.disable = false;
                });
            },
            ubahData(){
                this.$Progress.start();
                    this.loading = true;
                    this.disable = true;
                this.form
                    .put("api/edit_user/" + this.form.id)
                    .then(() =>{
                    Fire.$emit("refreshData");
                    $("#modalMuncul").modal("hide");
                    Toast.fire({
                    icon: 'success',
                    title: 'Data Sukses Ter Update'
                });
                this.$Progress.start();
                    this.loading = false;
                    this.disable = false;

                })
                .catch(() =>{
                    this.$Progress.fail();
                    this.loading = false;
                    this.disable = false;
                });
            },
            hapusData(id){
                Swal.fire({
                    title:"Anda yakin akan melakukan hapus pada data ini" ,
                    text: " Klik Batal untuk melakukan penghapusan data",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor:"#3085d6",
                    cancelButtonColor: "d33",
                    confirmButtonText:"Hapus"
                }).then(result => {
                    if (result.value) {
                    this.form
                        .delete("api/hapus_user/" + id)
                        .then(() => {
                            Swal.fire(
                                "Terhapus",
                                "Data Anda Sudah Terhapus",
                                "success"
                            );
                            Fire.$emit("refreshData");
                        })
                        .catch(() => {
                            Swal.fire(
                                "Gagal",
                                "Data Gagal Terhapus",
                                "Warning"
                            );
                    
                        });
                    }
                });
             
            }
        },
        
        created(){ //New Index Data
            this.loadData();
            Fire.$on("refreshData", () => {
                this.loadData();
            });
        }
    }

</script>
