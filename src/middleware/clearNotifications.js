import store from "@/store";

export default function clearNotifications() {
    store.commit('resetAllMessages')
}
