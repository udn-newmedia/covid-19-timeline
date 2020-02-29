import _debounce from 'lodash.debounce';
import { detectPlatform } from '@/utils/udn-newmedia-utils';
import gaTable from '@/utils/gaFormator';

function detectDevice(w) {
  switch (true) {
    case (w < 767.98):
      return 'mob';          
      break;
    case (768 <= w && w <= 1024.98):
      return 'pad';
      break;
    default:
      return 'pc';
      break;
  }
}

const rwdMethods = {
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    isMob() {
      return this.windowWidth <= 1024 ? true : false;
    },
    deviceType() {
      const w = this.windowWidth;
      return detectDevice(w);
    }
  },
  methods: {
    handleResize: _debounce(function() {
      this.windowWidth = window.innerWidth;
    }, 100),
  },
  mounted() {
    window.addEventListener('resize', this.handleResize, true);
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize, true);
  },
}

const autoResize_2 = {
  computed: {
    isMob() {
      return this.$root.isMob;
    }
  },
  watch: {
    isMob: function() {
      this.$forceUpdate();
    }
  }
}

const autoResize_3 = {
  computed: {
    deviceType() {
      return this.$root.deviceType;
    }
  },
  watch: {
    deviceType: function() {
      this.$forceUpdate();
    }
  }
}

const selectSrcMethod_2 = {
  methods: {
    selectSrc_2: function(mob, pc) {
      const isMob = window.innerWidthwidth <= 1024 ? true : false;;
      return isMob ? mob : pc;
    },
  },
}

const selectSrcMethod_3 = {
  methods: {
    selectSrc_3: function(mob, pad, pc) {
      const w = window.innerWidth;
      const deviceType = detectDevice(w);
      switch (deviceType) {
        case 'mob':
          return mob;
          break;

        case 'pad':
          return pad;    
          break;
      
        default:
          return pc;
          break;
      }
    },
  },
}

const sendGaMethods = {
  methods: {
    sendGA: function(item) {
      /**
      * item = {
      *   category: ... 
      *   action: ... 
      *   label: ... 
      * }
      */
      window.ga("newmedia.send", {
        "hitType": "event",
        "eventCategory": item.category,
        "eventAction": item.action,
        "eventLabel": "[" + detectPlatform() + "] [" + document.querySelector('title').innerHTML + "] [" + item.label +"]"
      });
    },
    formatGA: function(name) {
      return gaTable[name];
    },
  },
}

const _setProps = {
  methods: {
    // p = 傳入的props
    // 優先使用jsonProps的資料
    // 有jsonProps 不能有其他props
    setProps (p) {
      if (this.jsonProps !== null) {
        if (this.jsonProps[p] !== undefined) {
          return this.jsonProps[p]
        } else { 
          return this[p]
        }
      } else {
        return this[p]
      }
    }
  }
}

export {
  rwdMethods,
  autoResize_2,
  autoResize_3,
  selectSrcMethod_2,
  selectSrcMethod_3,
  sendGaMethods,
  _setProps
};