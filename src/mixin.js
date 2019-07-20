export default {
  methods: {
    getParent(targetName) {
      let parent = this.$parent
      let parentName = parent.$options.name
      while(parentName !== targetName) {
        parent = parent.$parent
        parentName = parent.$options.name
      }
      return parent
    },
  }
};
