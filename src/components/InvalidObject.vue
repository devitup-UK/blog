<template>
  <b-container class="invalid-post">
    <b-row>
      <b-col cols="12" class="invalid-post__content">
        <font-awesome-icon icon="question-circle" size="7x"></font-awesome-icon>
        <p>
          Unfortunately, this {{ item }} does not exist.
          <br />If you followed a link, it may have been removed.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "invalid-post",
  props: [
      'item'
  ]
};
</script>