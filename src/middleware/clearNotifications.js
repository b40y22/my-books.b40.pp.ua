export default function clearNotifications({ to, next }) {
    console.log('clearNotifications')
    console.log(to)
    this.$store.resetAllMessages();
    return next();
}