import { Swipe, SwipeItem, Button,Progress } from "vant";
let plugins = [Swipe, SwipeItem, Button,Progress];

export default function getVant(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}