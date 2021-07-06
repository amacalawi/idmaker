import IDPortal from './components/IDPortalComponent.vue'
import Example from './components/ExampleComponent.vue'

export const routes = [
    {
        path:'/example',
        component: Example
    },
    {
        path:'/',
        component: IDPortal
    }
];