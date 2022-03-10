import { createApp } from "vue";
import App from "./App.vue";
import ZestratVueComponents from '@zerops/zestrat-vue';

const vm = createApp(App);
vm.use(ZestratVueComponents);
vm.mount("#app");
