<template>
    <div class="page d-flex flex-row flex-column-fluid">
        <div class="container-fluid">
            <div id="id-layer" class="row align-items-start">
                <div class="col primary-bg">
                    <form method="POST" id="id_maker" name="id_maker">
                        <div class="col-wrapper">
                            <h1 class="text-center secondary-color">Online ID Portal</h1>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="d-flex flex-column mb-8 fv-row">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span class="required tertiary-color">Student ID No.</span>
                                            <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify the student identification no"></i>
                                        </label>
                                        <!--end::Label-->
                                        <input type="text" class="form-control form-control-solid" v-model="id_number" id="id_number" />
                                        <span class="error secondary-color" v-if="!$v.id_number.required">this field is required</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex flex-column mb-8 fv-row">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span class="required tertiary-color">Gender</span>
                                            <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify the student gender"></i>
                                        </label>
                                        <span class="form-check form-check-custom form-check-solid">
                                            <input class="form-check-input" type="radio" v-model="gender" value="Male"> <span class="tertiary-color">Male</span>
                                            <input class="form-check-input" type="radio" v-model="gender" value="Female"> <span class="tertiary-color">Female</span>
                                        </span>
                                        <span class="error secondary-color mt-3" v-if="!$v.gender.required">this field is required</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="d-flex flex-column mb-8 fv-row">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span class="required tertiary-color">Firstname</span>
                                            <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify the student firstname"></i>
                                        </label>
                                        <!--end::Label-->
                                        <input type="text" class="form-control form-control-solid" v-model="firstname" id="firstname" />
                                        <span class="error secondary-color" v-if="!$v.firstname.required">this field is required</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex flex-column mb-8 fv-row">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span class="required tertiary-color">Middlename</span>
                                            <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify the student middlename"></i>
                                        </label>
                                        <!--end::Label-->
                                        <input type="text" class="form-control form-control-solid" v-model="middlename" id="middlename" />
                                        <span class="error secondary-color" v-if="!$v.middlename.required">this field is required</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="d-flex flex-column mb-8 fv-row">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                                            <span class="required tertiary-color">Lastname</span>
                                            <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify the student lastname"></i>
                                        </label>
                                        <!--end::Label-->
                                        <input type="text" class="form-control form-control-solid" v-model="lastname" id="lastname" />
                                        <span class="error secondary-color" v-if="!$v.lastname.required">this field is required</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                                        <span class="required tertiary-color">Avatar (320x378 pixels)</span>
                                        <i class="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="for better resolution image must have 320px width and 378px height"></i>
                                    </label>
                                    <div class="custom-file">
                                        <input type="file" accept="image/*" class="custom-file-input" id="customFile"  v-on:change="handleFileUpload($event)" ref="file">
                                        <label class="custom-file-label" for="customFile">
                                            Choose file
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-12 text-center">
                                    <button @click="submit" id="submitFile" type="button" class="btn mt-8 secondary-bg">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col">
                    <div class="column-holder">
                        <div class="id-layout-front">
                            <div id="avatar" class="avatar">
                                <img :src="avatarSrc" v-if="avatarSrc" class="avatar-img">
                                <span @click="showModal" class="hover">Crop Image</span>
                            </div>
                            <div class="fullname">
                                <h1 class="lastname"></h1>
                                <h2><span class="firstname"></span> <span class="middlename"></span></h2>
                            </div>
                            <div class="idnumber hidden">
                                <h3 class="id_number"></h3>
                                <h5>STUDENT ID NUMBER</h5>
                            </div>
                            <div class="validthru">
                                <h5>VALID THRU MAY 2023</h5>
                            </div>
                        </div>
                        <div class="id-layout-back">
                            <div class="qrcode" id="qrcode"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="modality" ref="my-modal" centered hide-footer title="CROP IMAGE HERE">
            <cropper 
                :default-size="{
                    width: 320,
                    height: 378
                }"
                :min-width="320" :min-height="378"
                :max-width="320" :max-height="378"
                ref="cropper" :src="imagex.src" @change="change"/>
            <button @click="saveCrop" id="savechanges" type="button" class="btn secondary-bg">Save Changes</button>
        </b-modal>
    </div>
</template>
<style lang="scss">
.upload-example {
	margin-top: 20px;
	margin-bottom: 20px;
	user-select: none;

	&__cropper {
		border: solid 1px #eee;
		min-height: 300px;
		max-height: 500px;
		width: 100%;
	}

	&__cropper-wrapper {
		position: relative;
	}

	&__reset-button {
		position: absolute;
		right: 20px;
		bottom: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 42px;
		width: 42px;
		background: rgba(#3fb37f, 0.7);
		transition: background 0.5s;
		&:hover {
			background: #3fb37f;
		}
	}

	&__buttons-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 17px;
	}

	&__button {
		border: none;
		outline: solid transparent;
		color: white;
		font-size: 16px;
		padding: 10px 20px;
		background: #3fb37f;
		cursor: pointer;
		transition: background 0.5s;
		margin: 0 16px;
		&:hover,
		&:focus {
			background: #38d890;
		}
		input {
			display: none;
		}
	}

	&__file-type {
		position: absolute;
		top: 20px;
		left: 20px;
		background: #0d0d0d;
		border-radius: 5px;
		padding: 0px 10px;
		padding-bottom: 2px;
		font-size: 12px;
		color: white;
	}
}
</style>

<script>
    import { required } from "vuelidate/lib/validators";
    import { Cropper } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';
    const axios = require('axios');
    const base_url = window.location.origin + '/' + window.location.pathname.split ('/') [1];

    function getMimeType(file, fallback = null) {
        const byteArray = new Uint8Array(file).subarray(0, 4);
        let header = '';
        for (let i = 0; i < byteArray.length; i++) {
            header += byteArray[i].toString(16);
        }
        switch (header) {
            case '89504e47':
                return 'image/png';
            case '47494638':
                return 'image/gif';
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe8':
                return 'image/jpeg';
            default:
                return fallback;
        }
    }

    export default {
        components: {
            Cropper,
        },
        props: [
            // Image object
            'image',
            // Actual coordinates of the cropped fragment
            'coordinates',
            // Stencil size desired by cropper
            'stencilCoordinates',
            // Aspect ratios
            'aspectRatio',
            'minAspectRatio',
            'maxAspectRatio',
            // Transitions:
            'transitions'
        ],
        data () {
            return {
                id_number: "",
                firstname: "",
                middlename: "",
                lastname: "",
                gender: "",
                file: "",
                imagex: {
                    src: null,
                    type: null,
                },
                avatarSrc: "",
                // limitations: {
                //     maxWidth: 320,
                //     maxHeight: 378
                // },
            }
        },

        validations: {
            id_number: {
                required
            },
            firstname: {
                required
            },
            middlename: {
                required
            },
            lastname: {
                required
            },
            gender: {
                required
            },
        },

        methods: {
            saveCrop() {
                let self = this
                const { canvas } = this.$refs.cropper.getResult();
                // const newTab = window.open();
                console.log(canvas);
                self.avatarSrc = canvas.toDataURL();
                canvas.toBlob((blob) => {
                    self.file = blob;
                    console.log('>>>> 1st element in files array >>>> ', self.file);
                }, 'image/jpeg');
                self.$refs['my-modal'].hide()
            },

            change({ coordinates, canvas }) {
                console.log(coordinates, canvas);
            },

            showModal() {
                let self = this
                self.$refs['my-modal'].show()
            },

            showAlert($fn) {
                if ($fn == 'error') {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please fill in all the required fields first.',
                        confirmButtonColor: '#f27474'
                    });
                } else {
                    this.$swal({
                        icon: 'success',
                        title: 'Well done!',
                        text: 'Your information has been successfully submitted.'
                    });
                }
            },

            submit() {
                let self = this
                let formData = new FormData();
                formData.append('identification_no', self.id_number);
                formData.append('firstname', self.firstname);
                formData.append('middlename', self.middlename);
                formData.append('lastname', self.lastname);
                formData.append('gender', self.gender);
                formData.append('file', this.file);

                this.$v.$touch()
                if (this.$v.$invalid) {
                    self.showAlert('error');
                } else {
                    axios.post(base_url + '/store',
                    formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(function (response) {
                        console.log(response);
                        self.showAlert('success');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },

            handleFileUpload(event) {
                let self = this
                self.file = this.$refs.file.files[0];
                self.avatarSrc = URL.createObjectURL(this.$refs.file.files[0]);
                console.log('>>>> 1st element in files array >>>> ', self.file);

                const { files } = event.target;
                // Ensure that you have a file before attempting to read it
                if (files && files[0]) {
                    // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
                    if (this.imagex.src) {
                        URL.revokeObjectURL(this.imagex.src);
                    }
                    // 2. Create the blob link to the file to optimize performance:
                    const blob = URL.createObjectURL(files[0]);
                    // 3. The steps below are designated to determine a file mime type to use it during the
                    // getting of a cropped image from the canvas. You can replace it them by the following string,
                    // but the type will be derived from the extension and it can lead to an incorrect result:
                    //
                    // this.image = {
                    //    src: blob;
                    //    type: files[0].type
                    // }
                    // Create a new FileReader to read this image binary data
                    const reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.image" refers to the image of Vue component
                        this.imagex = {
                            // Read image as base64 and set it as src:
                            src: blob,
                            height: 378,
                            // Determine the image type to preserve it during the extracting the image from canvas:
                            type: getMimeType(e.target.result, files[0].type),
                        };
                    };
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsArrayBuffer(files[0]);
                }
            }
        },

        mounted() {
            console.log('this is the default component!');
        }
    }
</script>