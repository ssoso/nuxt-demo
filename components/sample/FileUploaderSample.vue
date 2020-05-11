<template>
	<div class="main-container">
		<h3>S3 파일업로드List sample</h3>
		<div v-for="(file, index) in fileList" :key="file.Key">
			#{{ index }} {{ file.Key }}
			<!-- .split('/')[2]-->
			<span
				v-if="file.Key.split('.')[1] != '' && file.Key.split('.')[1] != null"
			>
				<button
					@click="
						deleteFile(
							'https://s3.ap-southeast-1.amazonaws.com/dev.schools.vn/' +
								file.Key,
						)
					"
				>
					[X]
				</button>
				<button
					@click="
						downloadFile(
							'https://s3.ap-southeast-1.amazonaws.com/dev.schools.vn/' +
								file.Key,
							file.Key,
						)
					"
				>
					[download]
				</button>
				<button
					@click="
						copyFile(
							'https://s3.ap-southeast-1.amazonaws.com/dev.schools.vn/' +
								file.Key,
							file.Key,
							'report/R',
						)
					"
				>
					[copy]
				</button>
			</span>

			<!-- 
		<span v-if="file.Key.split('/')[2] != '' && file.Key.split('/')[2] != null">
			<button @click="deleteFile(file.Key)" >[X]</button>
			<button @click="downloadFile(file.Key)" >download</button>
		</span>
      <img :src="'https://s3.ap-southeast-1.amazonaws.com/dev.schools.vn/'+file.Key">-->
		</div>
		<br />
		<br />

		<h3>S3 img upload sample</h3>
		<input
			id="file-selector-img"
			ref="file"
			type="file"
			@change="fileImgUpload()"
		/>
		<br />
		<br />
		<!--
	<h1>s3 report upload sample</h1>
    <input id="file-selector-rep" ref="file" type="file" @change="reportFileUpload('S')">
	<br/>
	<br/>
	<h1>s3 announcement upload sample</h1>
    <input id="file-selector-ann" ref="file" type="file" @change="announceFileUpload()">
    -->
		<!-- <div class="btn-default" @click="upload">upload</div> -->
	</div>
</template>

<script>
import AWS from 'aws-sdk';
//import moment from 'moment';

export default {
	data() {
		return {
			//profileImgUpload case Type: M/S/T
			//reportFileUpload case Type : R/S
			//downloadFile case( fileurl, fileName)
			alBumBucketName: 'dev.schools.vn',//process.env.VUE_APP_S3_BUCKET_NAME,
			bucketRegion: 'ap-southeast-1', //process.env.VUE_APP_S3_BUCKET_REGION,
			IdentityPoolId: 'ap-southeast-1:d0c984d4-6c6b-4ab1-bcc9-296ec5266083',//process.env.VUE_APP_S3_BUCKET_ID,
			s3: null,
			file: null,
			fileList: [],
			profileImgInfo:
				'최대 5Mb 용량의 JPG,PNG 이미지 파일을 등록할 수 있습니다.',
			uploadFileInfo: '최대 5Mb 용량의 파일을 5개까지 등록가능합니다.',
			upErrMsg: '파일을 등록 할 수 없습니다.',
			fileUrl: '',
			fileName: '',
			uploadMaxSize: 5 * 1024 * 1024,
		};
	},
	methods: {
		initAwsSetting(type) {
			AWS.config.update({
				region: this.bucketRegion,
				credentials: new AWS.CognitoIdentityCredentials({
					IdentityPoolId: this.IdentityPoolId,
				}),
			});

			this.s3 = new AWS.S3({
				//apiVersion: '2019-07-16',
				params: {
					Bucket: this.alBumBucketName,
				},
			});
		},
		genUploadFileName(fileName, ext) {
			const strIdx = fileName.lastIndexOf('.');
			const upName = strIdx > 0 ? fileName.substring(0, strIdx) : fileName;
			return upName + '_' + this.$moment().format('YYYYMMDDhhmmssSSS') + '.' + ext;
		},
		geFileKey(fileUrl) {
			const strIdx =
				fileUrl.indexOf(this.alBumBucketName) + this.alBumBucketName.length + 1;
			return fileUrl.substring(strIdx);
		},
		reportFileUpload(type) {
			this.file = this.$refs.file.files[0];

			//check file
			if (this.file.size > this.uploadMaxSize) {
				this.$popup({
					message: this.uploadFileInfo,
				});
				return;
			}

			if ($.inArray(type, ['R', 'S']) == -1) {
				this.$popup({
					message: this.upErrMsg,
				});
				return;
			}

			let fileName = this.file.name;
			let ext = fileName.split('.').pop();

			const upDir = 'report/' + type;
			this.upload(upDir, this.genUploadFileName(fileName, ext));
		},
		announceFileUpload() {
			this.file = this.$refs.file.files[0];

			//check file
			if (this.file.size > this.uploadMaxSize) {
				this.$popup({
					message: this.uploadFileInfo,
				});
				return;
			}

			let fileName = this.file.name;
			let ext = fileName.split('.').pop();

			const upDir = 'announce/R';
			this.upload(type, this.genUploadFileName(fileName, ext));
		},
		fileImgUpload(type) {
			this.file = this.$refs.file.files[0];
			let fileName = this.file.name;
			let ext = fileName
				.split('.')
				.pop()
				.toLowerCase();

			//check file
			if (
				this.file.size > this.uploadMaxSize ||
				$.inArray(ext, ['jpg', 'png', 'gif']) == -1
			) {
				// this.$popup({
				// 	message: this.profileImgInfo,
				// });
				console.log('이미지 파일 아님')
				return;
			}

			//file upload
			this.profileImgInfo = fileName;
			this.fileName = fileName;

			// if ($.inArray(type, ['M', 'S', 'T']) == -1) {
			// 	this.$popup({
			// 		message: this.upErrMsg,
			// 	});
			// 	return;
			// }

			const upDir = 'img' // + type;
			this.upload(upDir, this.genUploadFileName(fileName, ext));
		},
		upload(upDir, upFileName) {
			//실제 s3 bucket으로 파일업로드
			let photoKey = upDir.length > 0 ? upDir + '/' + upFileName : upFileName;

			this.s3.upload(
				{
					Key: photoKey,
					Body: this.file,
					ACL: 'public-read',
				},
				(err, data) => {
					if (err) {
						console.log(err);
						//return alert('uploading error: ', err.message);
					}
					console.log('Successfully uploaded', data);
					//this.filePath = data.Location;
					//location.reload();
				},
			);
		},
		getFiles(type) {
			//등록된 파일리스트
			this.s3.listObjects(
				{
					Delimiter: '/', //s3 root 파일들
					Prefix:'img/',
					//Prefix: type + '/', // ex)'img/S/' 해당 하위directory
				},
				(err, data) => {
					console.log('list', data)
					if (err) {
						//return alert('getAlbums error: ', err.message);
					} else {
						this.fileList = data.Contents;
					}
				},
			);
		},
		deleteFile(fileUrl, btn) {
			alert(fileUrl);
			const fileKey = this.geFileKey(fileUrl);
			this.s3.deleteObject(
				{
					Key: fileKey,
				},
				(err, data) => {
					if (err) {
						//return alert('delete error: ', err.message);
					}
					console.log('Successfully delete');
					//location.reload();
					if (btn == 'back') this.$router.go(-1);
					location.reload();
				},
			);
		},
		async downloadFile(fileUrl, fileName) {
			const fileKey = decodeURI(this.geFileKey(fileUrl));
			console.log('downloadFile fileUrl:', fileUrl);
			console.log('downloadFile key:', fileKey);
			await this.s3.getObject(
				{
					Key: fileKey,
				},
				(err, data) => {
					if (err) {
						//return alert('Down Failed error: ', err.message);
					}
					//console.log('Successfully download',data.Body);
					let blob = new Blob([data.Body], { type: data.ContentType });
					let link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					link.download = fileName;
					link.click();
				},
			);
		},

		getFileExt(fileName) {
			return fileName.split('.').pop();
		},
		genS3FileUrl(fileKey) {
			return encodeURI(
				'https://s3.' +
					this.bucketRegion +
					+'.amazonaws.com/' +
					this.alBumBucketName +
					'/' +
					fileKey,
			);
		},
		async copyFile(fUrl, fileName, fDir) {
			const orgKey = encodeURI(
				'/' + this.alBumBucketName + '/' + this.geFileKey(fUrl),
			);
			const copyFile = this.genUploadFileName(
				fileName,
				this.getFileExt(fileName),
			);
			const copyFKey = fDir.length > 0 ? fDir + '/' + copyFile : copyFile;
			console.log('orgKey', orgKey);
			console.log('copyFile', copyFile);
			console.log('copyFKey', copyFKey);

			await this.s3.copyObject(
				{
					Bucket: this.alBumBucketName,
					CopySource: orgKey,
					Key: copyFKey,
				},
				(err, data) => {
					if (err) {
						console.log('File Copy error: ', err);
						return false;
					}
					console.log('Successfully copy');
					const copyUrl = this.genS3FileUrl(copyFKey);
					location.reload();
				},
			);
			/*
			var params = {
				Bucket: this.alBumBucketName, 
				CopySource: orgKey, 
				Key: copyFKey
			};
			this.s3.copyObject(params, function(err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else     console.log(data);           // successful response
			});
			*/
			return true;
		},
	},
	created() {
		this.initAwsSetting();
		this.getFiles();
	},
};
</script>
