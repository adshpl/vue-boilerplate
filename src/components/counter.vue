<template>
  <section :class="$style.a">
    <p>
      Language: {{ $t('language') }}
      Count: {{ count }}
    </p>
    <button @click="increment">Increment</button>
  </section>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    methods: {
      ...mapMutations('counter', [
        'increment',
      ]),
    },
    computed: {
      ...mapState('counter', [
        'count',
      ]),
    },
  };
</script>

<style lang="css" module>
  .a {
    color: red;
    margin: 20px 20px 20px 20px;
  }
</style>
