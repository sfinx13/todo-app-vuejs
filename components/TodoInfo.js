app.component('todo-info', {
    props: {
        details: {
            type: Object,
            required: true
        }
    },
    template: `
        <div class="todo-info">
            <div>{{ details.total - details.done }} remaining</div> <div>Total : {{ details.total  }}</div>
        </div>`
})