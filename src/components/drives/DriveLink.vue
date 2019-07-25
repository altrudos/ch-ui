<template>
  <router-link :to="{name: 'drive', params: {slug: drive.slug}}">
    {{label}}
  </router-link>
</template>

<script>
export default {
  props: ['drive'],
  computed: {
    label () {
      const { meta } = this.drive.content_meta
      if (this.drive.content_type == 'reddit_comment') {
        return `${meta.author}'s /r/${meta.subreddit} comment`
      }

      return `Drive ${drive.slug}`
    }
  }
}
</script>