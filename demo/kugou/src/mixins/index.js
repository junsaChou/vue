import utils from '../assets/js/utils'
export default {
  data() {
    return {
      imgSize: 400,
      isLoaded: false
    }
  },
  methods: {
    ...utils,
    $_xsl__replaceImgUrlSize(str = '', size = this.imgSize) {
      return str.replace(/\{\s*size\s*\}/, size)
    },
    $_xsl__watchRefs(targetNode, refsSelector) {
      return new Promise(function(resolve) {
        let observer = new MutationObserver(callback)
        let config = { childList: true, subtree: true }
        observer.observe(targetNode, config)

        function callback(mutationsList, observer) {
          mutationsList.forEach(mutation => {
            if (mutation.type == 'childList') {
              let refs = targetNode.querySelectorAll(refsSelector)
              if (refs.length !== 0) {
                observer.disconnect()
                resolve(Array.from(refs))
              }
            }
          })
        }
      })
    },
    $_xsl__loadImgLazy(els = this.$refs.lazyImages) {
      let unloadedImages = els.filter(img => !img.dataset.isLoaded)
      unloadedImages.forEach(img => {
        let top = img.getBoundingClientRect().top
        if (top < this.$store.state.device.vh) {
          img.src = img.dataset.src
          img.dataset.isLoaded = true
        }
      })
    }
  }
}