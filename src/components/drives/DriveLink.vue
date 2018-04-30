<template>
  <router-link :to="{name: 'drive', params: {id: drive.id}}">{{drive.reddit_author}}'s {{drive.reddit_type}}</router-link>
</template>

<script>
export default {
  props: ['drive']
}
</script>