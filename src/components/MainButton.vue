<template>
    <v-btn color="black">
        <span style="color: white;"></span>
        <slot></slot>

    </v-btn>

</template>


<script>
export default {
  methods: {
    buttonClick() {
      alert('Button clicked!');
    },
  },
};
</script>
