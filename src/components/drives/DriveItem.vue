<template>
  <div><router-link :to="{name: 'drive', params: {id: item.id}}">{{item.reddit_author}}'s reddit {{item.reddit_type}}</router-link></div>
</template>

<script>
export default {
  props: ['item']
}
</script>