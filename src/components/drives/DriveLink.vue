<template>
  <router-link :to="{name: 'drive', params: {id: drive.id, author: drive.reddit_author}}">{{drive.reddit_author}}'s {{drive.reddit_type}}</router-link>
</template>

<script>
export default {
  props: ['drive']
}
</script>