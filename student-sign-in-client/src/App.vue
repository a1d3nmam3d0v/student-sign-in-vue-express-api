<template>
	<div id="app">
		
		<new-student-form v-on:student-added="newStudentAdded"></new-student-form>

		<student-table
			v-bind:students="students"
			v-on:student-arrived-or-left="studentArrivedOrLeft"
			v-on:delete-student="studentDeleted">
		</student-table>

		<student-message v-bind:student="mostRecentStudent"></student-message>
	</div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
	name: 'app',
	data() {
		return {
			students: [],
			mostRecentStudent: {}
		}
	},
	
	components: {
		NewStudentForm,
		StudentMessage,
		StudentTable
	},

	mounted() {
		this.updateStudents() // loads all students, makes req to API
	},

	methods: {
		updateStudents() {
			this.$student_api.getAllStudents().then((students) => {
				this.students = students
			})
			.catch( () => alert('UNABLE TO FETCH STUDENT LIST'))
		},

		newStudentAdded(student) {
			this.$student_api.addStudent(student).then(() => {
				this.updateStudents()
			})
			.catch (err => {
				let msg = err.response.data.join('.')
				alert('ERROR ADDING STUDENT\n' + msg)
			})
		},

		studentArrivedOrLeft(student, present) {
			student.present=present // updates present value
			this.$student_api.updateStudent(student).then( () => {
				this.mostRecentStudent=student
				this.updateStudents()
			})
			.catch( () => alert('UNABLE TO UPDATE STUDENT'))
		}, 

		studentDeleted(student) {
			this.$student_api.deleteStudent(student.id).then( () => {
				this.updateStudents()
				this.mostRecentStudent={} // clear welcome/goodbye msg
			})
			.catch( () => alert('UNABLE TO DELETE STUDENT'))
		},
	},
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css';
</style>
