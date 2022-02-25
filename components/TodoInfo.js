app.component('todo-info', {
    props: {
        details: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="todo-info">
            <div>{{ details.total - details.done }} remaining</div> <div>{{ details.total }} item<span v-if="details.total > 1">s</span></div>
        </div>`
})