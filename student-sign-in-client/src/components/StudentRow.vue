<template>
	<tr v-bind:class="{ present: student.present, absent: !student.present }">
		<td>{{ student.name }}</td>
		<td>{{ student.starID }}</td>
		<td>
			<input
				type="checkbox"
				v-bind:checked="student.present"
				v-on:change="arrivedOrLeft(student, $event.target.checked)"/>
		</td>
		<td v-show="edit">
			<img v-on:click="deleteStudent" src="@/assets/delete8.png"/>
		</td>
	</tr>
</template>

<script>
export default {
	name: 'StudentRow',
	emits: ['student-arrived-or-left', 'delete-student'],
	props: {
		student: Object,
		edit: Boolean,
	},

	methods: {
		arrivedOrLeft(student, present) {
			this.$emit('student-arrived-or-left', student, present)
		},

		deleteStudent() {
			if (confirm(`Delete ${this.student.name}?`)) {
				this.$emit('delete-student', this.student)
			}
		},
	},
}
</script>

<style>
.present {
	font-weight: bold;
	background-color: rgb(255, 194, 245);
	text-decoration: 3px rgb(255, 70, 162) wavy line-through;
}

.absent {
	color: black;
	font-weight: bold;
	background-color: rgb(255, 149, 237);
	text-decoration: underline;
	text-decoration-color: rgb(255, 70, 162);
	text-decoration-thickness: 10px;
}

#name {
	color: blue;
	background-color: rgb(215, 237, 239);
}

#starID {
	color: blue;
	background-color: rgb(215, 237, 239);
}

img {
	height: 20px;
}

td {
	font-variant: small-caps;
	font-family: monospace;
}

th {
	color: blue;
}

label {
	color: rgb(255, 70, 162);
	font-weight: bold;
}

div {
	font-family: monospace;
}
</style>
