<template>
	<div>
		<div class="alert alert-danger" v-show="errors.length > 0">
			<li v-for="error in errors" v-bind:key="error">{{ error }}</li>
		</div>

		<div class="card add-student m-2 p-2">
			<h4 class="card-title">Add new student</h4>

			<div class="form-group">
				<label for="name">Name</label>
				<!-- v-model newStudentName -->
				<input id="name" class="form-control" v-model.trim="newStudentName" />
			</div>

			<div class="form-group">
				<label for="starID">Star ID</label>
				<!-- v-model newStarID -->
				<input id="starID" class="form-control" v-model.trim="newStarID" />
			</div>
			<!-- v-on:click event handler -->
			<button class="btn btn-primary" v-on:click="addStudent">Add</button>
		</div>
	</div>
</template>

<script>
export default {
	// Create component here
	name: 'NewStudentForm',
	data() {
		return {
			newStudentName: '',
			emits: ['student-added'],
			newStarID: '',
			errors: [],
		}
	},
	methods: {
		addStudent() {
			this.errors = [] // clears errors array

			if (!this.newStudentName) {
				this.errors.push('Name required')
			}

			if (!this.newStarID) {
				this.errors.push('StarID required')
			}
			if (this.errors.length == 0) {
				let student = {
					name: this.newStudentName,
					starID: this.newStarID,
					present: false,
				}
				// emit msg to parent w/ new student
				this.$emit('student-added', student)

				this.newStudentName = ''
				this.newStarID = ''
			}
		},
	},
}
</script>

<style scoped></style>
