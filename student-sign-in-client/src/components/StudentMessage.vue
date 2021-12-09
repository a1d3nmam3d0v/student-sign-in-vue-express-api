<template>
	<div v-if="student.name">
		<div class="alert alert-primary" v-if="student.present">
			{{ student.name }} signed in.
		</div>

		<div class="alert alert-secondary" v-else>
			{{ student.name }} signed out.
		</div>
	</div>
</template>

<script>
export default {
	name: 'StudentMessage',
	props: {
		student: Object
	}
}
</script>

<style scoped></style>
